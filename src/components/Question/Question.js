import React from 'react';

import Answer from './Answer/Answer';
import './Question.scss';
import Prev from '../../assets/images/prev.jpg';

const question = (props) => {
    const answers = props.answers.map(answer =>
        <Answer key={answer.id}
                clicked={() => props.selectAnswer(props.questionId, answer.id)}
                selected={answer.selected}>
            {answer.label}
        </Answer>);

    const questionClassName = ["Question"];
    if (props.show) {
        questionClassName.push("Show");
    }

    let prevArrow = null;
    if (props.showPrev) {
        prevArrow = <img className="Prev" src={Prev} alt="Previous question" onClick={props.prevQuestion}/>;
    }

    return (
        <div className={questionClassName.join(" ")}>
            <div className="Navigate">
                {prevArrow}
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