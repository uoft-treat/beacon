import React, {Component} from 'react';
import {requireTreatSession} from "./hocs/requireTreatSession";
import {CommonButton} from "../components/CommonButton";
import {TreatService} from "../services/impl/TreatService";

export class _SurveyPage extends Component {

    state = {
        gender: "male",
        age: 20,
    };

    render() {
        return (
            <div>
                <p>Please answer a few questions before you start the experiment.</p>

                <br/><br/>

                <label>What is your gender?</label>
                <br/><br/>
                <select
                    className={"default-input"}
                    onChange={e => {
                        this.setState({gender: e.target.value})
                    }}
                    value={this.state.gender}
                >
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"other"}>Other</option>
                </select>

                <br/><br/>

                <label>What is your age?</label>
                <br/><br/>
                <input
                    onChange={e => {
                        this.setState({age: e.target.value})
                    }}
                    value={this.state.age}
                    className={"default-input"}
                    type={"number"}
                />

                <br/><br/>

                <CommonButton
                    onClick={() => {
                        TreatService.getInstance().setSurveyData(this.state.gender, this.state.age);
                        this.props.history.push("/experiment");
                    }}
                    text={"Next"}
                />
            </div>
        )
    }
}

export const SurveyPage = requireTreatSession(_SurveyPage);
