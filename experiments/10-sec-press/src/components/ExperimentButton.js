import React from 'react';
import './ExperimentButton.scss';

export const ExperimentButton = ({onMouseDown, onMouseUp, disabled, pressed}) => {
    return (
        <div
            className={`experiment-button ${disabled && "disabled"} ${pressed && "pressed"}`}
            onMouseDown={!disabled && onMouseDown}
            onMouseUp={!disabled && onMouseUp}
            onTouchStart={!disabled && onMouseDown}
            onTouchEnd={!disabled && onMouseUp}
        />
    )
};
