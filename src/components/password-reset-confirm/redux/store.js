import { createStore, combineReducers } from 'redux';
import reset from './password-reset-confirm';

const rootReducer = combineReducers({ reset });

export default createStore(rootReducer);
