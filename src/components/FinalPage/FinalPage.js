import React from 'react';

import './FinalPage.scss';

const finalPage = (props) => {
    return (
        <div className="Question Show">
            <h3>Your score is {props.score}</h3>
        </div>
    )
}

export default finalPage;