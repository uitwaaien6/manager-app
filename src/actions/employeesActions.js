import * as employeesTypes from '../actions/employeesTypes';

export function getEmployeesAction(payload) {
    return {
        type: employeesTypes.GET_EMPLOYEES,
        payload
    };
}

