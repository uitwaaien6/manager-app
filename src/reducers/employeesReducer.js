import * as employeesTypes from '../actions/employeesTypes';

const initialState = {
    employees: []
};

function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case employeesTypes.GET_EMPLOYEES:
            return { ...state, employees: action.payload };
        default:
            return state;
    };
};


export default employeesReducer;