import React from 'react';

import './ExperimentTapRegion.scss';

export const ExperimentTapRegion = ({onClick, children, disabled}) => {

    return (

        <div
            className={"experiment-tap-region" + (disabled ? " disabled" : "")}
            onClick={onClick}
        >
            {children}
        </div>

    );

};