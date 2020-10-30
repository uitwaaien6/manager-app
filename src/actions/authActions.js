import * as authTypes from './authTypes';

export function signinAction(payload) {
    return {
        type: authTypes.SIGNIN,
        payload
    };
};

export function signupAction(payload) {
    return {
        type: authTypes.SIGNUP,
        payload
    };
};

export function errorAction(payload) {
    return {
        type: authTypes.AUTH_ERROR,
        payload
    }
}
