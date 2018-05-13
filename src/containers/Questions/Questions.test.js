import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Questions from './Questions';
import FinalPage from '../../components/FinalPage/FinalPage';
import Question from '../../components/Question/Question';

configure({adapter: new Adapter()});

describe('<Questions />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Questions/>);
    });

    it('should render 3 <Question />s at beginning', () => {
        expect(wrapper.find(Question)).toHaveLength(3);
    });

    it('should render <FinalPage /> if not showFinalPage property in state is true', () => {
        wrapper.setState({showFinalPage: true})
        expect(wrapper.find(FinalPage)).toHaveLength(1);
    });
});