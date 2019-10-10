import { createStore, combineReducers } from 'redux';
import reset from './reset-reducer';

const rootReducer = combineReducers({ reset });

export default createStore(rootReducer);
