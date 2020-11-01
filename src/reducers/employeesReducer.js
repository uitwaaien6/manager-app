import * as employeesTypes from '../actions/employeesTypes';

const initialState = {
    employees: []
};

function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case employeesTypes.ADD_EMPLOYEE:
            console.log(action.payload);
            return { ...state, employees: [...state.employees, action.payload] };
        default:
            return state;
    };
};


export default employeesReducer;