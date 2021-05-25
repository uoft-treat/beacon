import React, {Component} from 'react';
import './CommonButton.scss';

export class CommonButton extends Component {
    render() {
        const {text, onClick} = this.props;
        return (
            <button className={"btn"} onClick={onClick}>
                {text}
            </button>
        )
    }
}