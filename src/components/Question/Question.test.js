import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Question from './Question';
import Answer from './Answer/Answer';

configure({adapter: new Adapter()});

describe('<Question />', () => {
    let wrapper;

    const answers = [
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
    ];

    beforeEach(() => {
        wrapper = shallow(<Question answers={answers}/>);
    });

    it('should render 4 <Question />s', () => {
        expect(wrapper.find(Answer)).toHaveLength(4);
    });
});