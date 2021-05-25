import React, {Component} from 'react';
import {requireTreatSession} from "./hocs/requireTreatSession";

export class _ResultPage extends Component {

    render() {
        return (
            <div>
                <p>Result Page</p>
            </div>
        )
    }
}

export const ResultPage = requireTreatSession(_ResultPage);
