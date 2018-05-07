import React, {Component} from 'react';

import Questions from './Questions/Questions';

class Exam extends Component {
    render() {
        return (
            <div className="Exam">
                <Questions/>
            </div>
        )
    }
}

export default Exam;