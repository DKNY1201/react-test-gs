import React, {Component} from 'react';

import Question from '../../components/Questions/Question/Question';
import FinalPage from '../../components/FinalPage/FinalPage';

class Questions extends Component {
    state = {
        questions: [
            {
                id: 1,
                title: "Question 1",
                description: "Desc of question 1",
                answers: [
                    {
                        id: 11,
                        label: "Question 1 - Answer 1",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 12,
                        label: "Question 1 - Answer 2",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 13,
                        label: "Question 1 - Answer 3",
                        selected: false,
                        isCorrect: true
                    },
                    {
                        id: 14,
                        label: "Question 1 - Answer 4",
                        selected: false,
                        isCorrect: true
                    },
                ],
                isCorrect: false,
                score: 1
            },
            {
                id: 2,
                title: "Question 2",
                description: "Desc of question 2",
                answers: [
                    {
                        id: 21,
                        label: "Question 2 - Answer 1",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 22,
                        label: "Question 2 - Answer 2",
                        selected: false,
                        isCorrect: true
                    },
                    {
                        id: 23,
                        label: "Question 2 - Answer 3",
                        selected: false,
                        isCorrect: false
                    },
                    {
                        id: 24,
                        label: "Question 2 - Answer 4",
                        selected: false,
                        isCorrect: true
                    }
                ],
                isCorrect: false,
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

    render() {
        let content = this.state.questions.map((question, index) =>
            <Question key={question.id}
                      questionId = {question.id}
                      title={question.title}
                      description={question.description}
                      answers={question.answers}
                      selectAnswer={this.selectAnswerHandler}
                      show={this.isCurrentQuestion(question.id)}
                      prevQuestion={() =>this.prevQuestionHandler()}
                      nextQuestion={() =>this.nextQuestionHandler()}
        />);

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