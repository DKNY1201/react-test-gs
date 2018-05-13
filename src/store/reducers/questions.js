import * as actionTypes from '../actionTypes';

const initialState = {
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_ANSWER:
            const questions = [...state.questions];
            const questionIndex = questions.findIndex(ques => ques.id === action.payload.questionId);
            const question = {...questions.filter(ques => ques.id === action.payload.questionId)[0]};
            // const question = {...questions.find(ques => ques.id === action.payload.questionId)[0]};
            const answers = [...question.answers];
            const answerIndex = answers.findIndex(ans => ans.id === action.payload.answerId);
            const answer = {...answers.filter(ans => ans.id === action.payload.answerId)[0]};
            answer.selected = !answer.selected;

            answers[answerIndex] = answer;
            question.answers = answers;
            questions[questionIndex] = question;

            return {
                ...state,
                questions: questions
            }
        // case actionTypes.UPDATE_FINAL_SCORE:
        //     let finalScore = 0;
        //     const questions = state.questions;
        //
        //     for (let question of questions) {
        //         const answers = question.answers;
        //
        //         let isCorrect = true;
        //
        //         for (let answer of answers) {
        //             if ((answer.isCorrect && !answer.selected) || (!answer.isCorrect && answer.selected)) {
        //                 isCorrect = false;
        //                 break;
        //             }
        //         }
        //
        //         if (isCorrect) {
        //             finalScore += question.score;
        //         }
        //     }
        //
        //     return {
        //         ...state,
        //         finalScore: finalScore
        //     }
        case actionTypes.NEXT_QUESTION:
            const totalQuestions = state.questions.length;

            if (state.currentQuestion < totalQuestions) {
                return {
                    ...state,
                    currentQuestion: state.currentQuestion + 1
                }
            } else {
                let finalScore = 0;
                const questions = state.questions;

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

                return {
                    ...state,
                    finalScore: finalScore,
                    showFinalPage: true
                }
            }
        case actionTypes.PREV_QUESTION:
            if (state.currentQuestion > 1) {
                return {
                    ...state,
                    currentQuestion: state.currentQuestion - 1
                }
            }
            break;
    }

    return state;
}

export default reducer;