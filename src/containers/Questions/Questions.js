import React, {Component} from 'react';
import {connect} from 'react-redux';

import Question from '../../components/Question/Question';
import FinalPage from '../../components/FinalPage/FinalPage';
import './Questions.scss';
import VirtualWrapper from '../../hoc/VirtualWrapper/VirtualWrapper';
import * as actionTypes from '../../store/actionTypes';

class Questions extends Component {
    isCurrentQuestion = (questionId) => {
        return questionId === this.props.ques.currentQuestion;
    }

    showPrevArrow = () => {
        return this.props.ques.currentQuestion > 1;
    }

    render() {
        const status = <p>Question {this.props.ques.currentQuestion} of {this.props.ques.questions.length}</p>;
        const questions = this.props.ques.questions.map(question => <Question key={question.id}
                                                                              questionId={question.id}
                                                                              title={question.title}
                                                                              description={question.description}
                                                                              answers={question.answers}
                                                                              selectAnswer={this.props.onSelectAnswer}
                                                                              show={this.isCurrentQuestion(question.id)}
                                                                              showPrev={this.showPrevArrow()}
                                                                              prevQuestion={this.props.onSelectPrevQuestion}
                                                                              nextQuestion={this.props.onSelectNextQuestion}
            />
        );

        let content = <VirtualWrapper>
            {status}
            {questions}
        </VirtualWrapper>


        if (this.props.ques.showFinalPage) {
            content = <FinalPage score={this.props.ques.finalScore}/>
        }

        return (
            <div className="Questions">
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ques: state.ques
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectAnswer: (questionId, answerId) => dispatch({
            type: actionTypes.SELECT_ANSWER,
            payload: {questionId: questionId, answerId: answerId}
        }),
        onSelectNextQuestion: () => dispatch({
            type: actionTypes.NEXT_QUESTION
        }),
        onSelectPrevQuestion: () => dispatch({
            type: actionTypes.PREV_QUESTION
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);