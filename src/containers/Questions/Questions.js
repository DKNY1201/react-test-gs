import React, {Component} from 'react';

import Question from '../../components/Questions/Question/Question';
import FinalPage from '../../components/FinalPage/FinalPage';
import './Questions.scss';
import VirtualWrapper from '../../hoc/VirtualWrapper/VirtualWrapper';

class Questions extends Component {
    state = {
        questions: [
            {
                id: 1,
                title: "Question 1",
                description: "Which are not states of The United State?",
                answers: [
                    {
                        id: 11,
                        label: "Washington",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 12,
                        label: "Iowa",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 13,
                        label: "Seattle",
                        selected: false,
                        isCorrect: true
                    },
                    {
                        id: 14,
                        label: "London",
                        selected: false,
                        isCorrect: true
                    },
                ],
                score: 1
            },
            {
                id: 2,
                title: "Question 2",
                description: "Who is the current president of The United State?",
                answers: [
                    {
                        id: 21,
                        label: "Barack Obama",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 22,
                        label: "Donald Trump",
                        selected: false,
                        isCorrect: true
                    },
                    {
                        id: 23,
                        label: "Vladimir Putin",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 24,
                        label: "Kim Jong-un",
                        selected: false,
                        isCorrect: false
                    }
                ],
                score: 1
            },
            {
                id: 3,
                title: "Question 3",
                description: "How many different ways are there to arrange the 6 letters in the word SUNDAY?",
                answers: [
                    {
                        id: 31,
                        label: "1000",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 32,
                        label: "600",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 33,
                        label: "720",
                        selected: false,
                        isCorrect: true
                    },
                    {
                        id: 34,
                        label: "120",
                        selected: false,
                        isCorrect: false
                    }
                ],
                score: 1
            }

        ],
        finalScore: 0,
        currentQuestion: 1,
        showFinalPage: false
    }

    selectAnswerHandler = (questionId, answerId) => {
        const questions = [...this.state.questions];
        const questionIndex = questions.findIndex(ques => ques.id === questionId);
        const question = {...questions.filter(ques => ques.id === questionId)[0]};
        const answers = [...question.answers];
        const answerIndex = answers.findIndex(ans => ans.id === answerId);
        const answer = {...answers.filter(ans => ans.id === answerId)[0]};
        answer.selected = !answer.selected;

        answers[answerIndex] = answer;
        question.answers = answers;
        questions[questionIndex] = question;

        this.setState({
            questions: questions
        })
    }

    updateFinalScore = () => {
        let finalScore = 0;
        const questions = this.state.questions;

        for (let question of questions) {
            const answers = question.answers;

            let isCorrect = true;

            for (let answer of answers) {
                if ((answer.isCorrect && !answer.selected) || (!answer.isCorrect && answer.selected)) {
                    isCorrect = false;
                    break;
                }
            }

            if (isCorrect) {
                finalScore += question.score;
            }
        }

        this.setState({
            finalScore: finalScore
        })

    }

    nextQuestionHandler = () => {
        const totalQuestions = this.state.questions.length;

        if (this.state.currentQuestion < totalQuestions) {
            this.setState((prevState) => {
                return {
                    currentQuestion: prevState.currentQuestion + 1
                }
            })
        } else {
            this.updateFinalScore();

            this.setState({
                showFinalPage: true
            })
        }
    }

    prevQuestionHandler = () => {
        if (this.state.currentQuestion > 1) {
            this.setState((prevState) => {
                return {
                    currentQuestion: prevState.currentQuestion - 1
                }
            })
        }
    }

    isCurrentQuestion = (questionId) => {
        return questionId === this.state.currentQuestion;
    }

    showPrevArrow = () => {
        return this.state.currentQuestion > 1;
    }

    render() {
        const status = <p>Question {this.state.currentQuestion} of {this.state.questions.length}</p>;
        const questions = this.state.questions.map(question => <Question key={question.id}
                              questionId = {question.id}
                              title={question.title}
                              description={question.description}
                              answers={question.answers}
                              selectAnswer={this.selectAnswerHandler}
                              show={this.isCurrentQuestion(question.id)}
                              showPrev={this.showPrevArrow()}
                              prevQuestion={() =>this.prevQuestionHandler()}
                              nextQuestion={() =>this.nextQuestionHandler()}
                    />
        );

        let content = <VirtualWrapper>
            {status}
            {questions}
        </VirtualWrapper>


        if (this.state.showFinalPage) {
            content = <FinalPage score={this.state.finalScore} />
        }

        return (
            <div className="Questions">
                {content}
            </div>
        )
    }
}

export default Questions;