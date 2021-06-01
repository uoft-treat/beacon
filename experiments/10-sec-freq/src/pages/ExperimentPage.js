import React, {Component} from 'react';
import {requireTreatSession} from "./hocs/requireTreatSession";
import './ExperimentPage.scss';
import {ExperimentTapRegion} from "../components/ExperimentTapRegion";
import {DataSubmissionService} from "../services/impl/DataSubmissionService";
import {TreatService} from "../services/impl/TreatService";

class _ExperimentPage extends Component {

    state = {
        startTime: null,
        timeLeft: 10,
        done: false,
        timesPressed: 0,
    };

    countdownInterval = null;

    resetSession = () => {
        this.setState({
            startTime: null,
            endTime: null,
        })
    };

    recordStartTime = () => {
        this.setState({startTime: new Date()});
    };

    startCountdown = async () => {
        this.setState({timeLeft: 10 - ((new Date().getTime() - this.state.startTime.getTime()) / 1000)});
        if (this.state.timeLeft < 0) {
            clearInterval(this.countdownInterval);
            this.setState({done: true, timeLeft: 0});
            const surveyData = TreatService.getInstance().getSurveyData();
            await DataSubmissionService.getInstance().submitData(
                surveyData.gender,
                surveyData.age,
                this.state.timesPressed,
            );
        }
    };

    render() {

        const {timesPressed, timeLeft, done} = this.state;

        return (
            <div>

                <ExperimentTapRegion
                    onClick={() => {
                        if (timesPressed === 0) {
                            this.recordStartTime();
                            this.countdownInterval = setInterval(this.startCountdown, 10);
                        }
                        this.setState({timesPressed: timesPressed + 1});
                    }}
                    disabled={done}
                >
                    {timesPressed === 0 ? (
                        <span>Begin tapping to show countdown.</span>
                    ) : (
                        <span>
                            {timesPressed}<br/>
                            {timeLeft.toFixed(2)} seconds left
                        </span>
                    )}

                </ExperimentTapRegion>

                {done ? (
                    <p className={"large-description"}>
                        You pressed the button <b>{timesPressed} times.</b><br/><br/>
                        Thank you for your participation! Feel free to close this page.
                    </p>
                ) : (
                    <p className={"large-description"}>
                        Press the dark region as many times as possible within 10 seconds.
                    </p>
                )}
            </div>
        )
    }
}

export const ExperimentPage = requireTreatSession(_ExperimentPage);
