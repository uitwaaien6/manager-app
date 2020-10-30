import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import employeesReducer from './reducers/employeesReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    employees: employeesReducer
});

export default () => {
    return createStore(rootReducer);
}