import React from 'react';

import Answer from '../Answers/Answer/Answer';
import './Question.scss';
import Prev from '../../../assets/images/prev.jpg';

const question = (props) => {
    const answers = props.answers.map(answer =>
        <Answer key={answer.id}
                clicked={() => props.selectAnswer(props.questionId, answer.id)}
                selected={answer.selected}
        >
            {answer.label}
        </Answer>);

    const className = ["Question"];
    if (props.show) {
        className.push("Show");
    }

    return (
        <div className={className.join(" ")}>
            <div className="Navigate">
                <img className="Prev" src={Prev} alt="Previous question" onClick={props.prevQuestion}/>
                <img className="Next" src={Prev} alt="Next question" onClick={props.nextQuestion}/>
            </div>
            <h2 className="Title">
                {props.title}
            </h2>
            <p className="Description">
                {props.description}
            </p>
            <div className="Answers">
                {answers}
            </div>
        </div>
    );
}

export default question;