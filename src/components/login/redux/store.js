import { createStore, combineReducers } from 'redux';
import login from './login-reducer';

const rootReducer = combineReducers({ login });

export default createStore(rootReducer);
