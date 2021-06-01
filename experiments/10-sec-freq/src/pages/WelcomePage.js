import React, {Component, Fragment} from 'react';
import {CommonButton} from "../components/CommonButton";
import * as queryString from "query-string";
import {TreatService} from "../services/impl/TreatService";

const WELCOME_TEXT = `
In this experiment, you will be asked to tap the screen within 10 seconds as many times as possible.
`;

const ERROR_TEXT = `
Invalid link, you must provide a TREAT experiment session to use this application.
`;

export class WelcomePage extends Component {

    state = {
        error: false,
    };

    componentDidMount() {
        const queryVars = queryString.parse(this.props.location.search);
        if (!queryVars.sessionId) {
            this.setState({error: true});
        } else {
            TreatService.getInstance().setSessionToken(queryVars.sessionId);
        }
    }

    render() {

        const {error} = this.state;

        return (
            <div>
                {error ? (
                    <p>{ERROR_TEXT}</p>
                ) : (
                    <Fragment>
                        <p>{WELCOME_TEXT}</p>
                        <CommonButton
                            onClick={() => {
                                this.props.history.push("/survey");
                            }}
                            text={"Next"}
                        />
                    </Fragment>
                )}
            </div>
        )
    }
}
