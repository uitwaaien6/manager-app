import * as authTypes from './authTypes';

export function signinAction(payload) {
    console.log(payload);
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

export function signoutAction() {
    return {
        type: authTypes.SIGNOUT
    }
}

export function errorAction(payload) {
    return {
        type: authTypes.AUTH_ERROR,
        payload
    }
}

export function loadingAction(payload) {
    return {
        type: authTypes.LOADING,
        payload
    };
};

