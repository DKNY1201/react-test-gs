import React from 'react';

import './Answer.scss';

const answer = (props) => {
    const className = ["Answer"];

    if (props.selected) {
        className.push("Selected");
    }

    return (
        <div className={className.join(" ")} onClick={props.clicked}>
            {props.children}
        </div>
    )
}

export default answer;