import * as employeesTypes from '../actions/employeesTypes';

export function employeesGetAction(payload) {
    return {
        type: employeesTypes.EMPLOYEES_GET,
        payload
    };
}

export function employeesLoadingAction(payload) {
    return {
        type: employeesTypes.EMPLOYEES_LOADING,
        payload
    };
}

export function employeesErrorAction(payload) {
    return {
        type: employeesTypes.EMPLOYEES_ERROR,
        payload
    };
}

