import * as employeesTypes from '../actions/employeesTypes';

export function addEmployeeAction(payload) {
    return {
        type: employeesTypes.ADD_EMPLOYEE,
        payload
    };
}

