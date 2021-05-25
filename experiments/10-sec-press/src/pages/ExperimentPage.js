import React, {Component} from 'react';
import {ExperimentButton} from "../components/ExperimentButton";
import {requireTreatSession} from "./hocs/requireTreatSession";
import './ExperimentPage.scss';
import {DataSubmissionService} from "../services/impl/DataSubmissionService";
import {TreatService} from "../services/impl/TreatService";

class _ExperimentPage extends Component {

    state = {
        startTime: null,
        endTime: null,
        buttonPressed: false,
    };

    resetSession = () => {
        this.setState({
            startTime: null,
            endTime: null,
        })
    };

    recordStartTime = () => {
        this.setState({startTime: new Date()});
    };

    recordEndTime = () => {
        this.setState({endTime: new Date()}, async () => {

            const surveyData = TreatService.getInstance().getSurveyData();

            await DataSubmissionService.getInstance().submitData(
                surveyData.gender,
                surveyData.age,
                (this.state.endTime.getTime() - this.state.startTime.getTime()) / 1000,
            );

            TreatService.getInstance().setSessionToken("");
        });
    };

    render() {

        const {startTime, endTime, buttonPressed} = this.state;

        return (
            <div>
                <ExperimentButton
                    disabled={!!endTime}
                    pressed={buttonPressed}
                    onMouseDown={() => {
                        this.setState({buttonPressed: true});
                        this.resetSession();
                        this.recordStartTime();
                    }}
                    onMouseUp={() => {
                        this.setState({buttonPressed: false});
                        this.recordEndTime();
                    }}
                />
                {startTime && endTime ? (
                    <p className={"large-description"}>
                        You pressed the button for: <b>{(endTime.getTime() - startTime.getTime()) / 1000} seconds.</b><br/><br/>
                        Thank you for your participation! Feel free to close this page.
                    </p>
                ): (
                    <p className={"large-description"}>
                        Press and hold the button, release when you think 10 seconds has passed.
                    </p>
                )}
            </div>
        )
    }
}

export const ExperimentPage = requireTreatSession(_ExperimentPage);
