import * as employeesTypes from '../actions/employeesTypes';

const initialState = {
    employees: [],
    loading: false,
    error: null,
    msg: null
};

function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case employeesTypes.EMPLOYEES_GET:
            return { ...state, employees: action.payload, loading: false, error: null };
        case employeesTypes.EMPLOYEES_LOADING:
            return { ...state, loading: action.payload };
        case employeesTypes.EMPLOYEES_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    };
};


export default employeesReducer;