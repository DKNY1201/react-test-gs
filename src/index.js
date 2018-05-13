import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import questionsReducer from './store/reducers/questions';

const rootReducer = combineReducers({
    ques: questionsReducer
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
