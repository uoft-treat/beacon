import React from "react";
import {TreatService} from "../../services/impl/TreatService";

export const requireTreatSession = (WrappedClass) => {

    return class WithHover extends React.Component {

        componentDidMount() {
            if (!TreatService.getInstance().getSessionToken()) {
                this.props.history.push("/");
            }
        }

        render() {
            return (
                <WrappedClass {...this.props} />
            );
        }
    }

};