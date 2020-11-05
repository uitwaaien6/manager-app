import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import employeesReducer from '../reducers/employeesReducer';

const rootReducer = combineReducers({
    authReducer,
    employeesReducer
});

export default () => {
    return createStore(rootReducer);
}