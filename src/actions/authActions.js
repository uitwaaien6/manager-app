import * as authTypes from './authTypes';

export function authSigninAction(payload) {
    return {
        type: authTypes.AUTH_SIGNIN,
        payload
    };
};

export function authSignupAction(payload) {
    return {
        type: authTypes.AUTH_SIGNUP,
        payload
    };
};

export function authSignoutAction() {
    return {
        type: authTypes.AUTH_SIGNOUT
    }
}

export function authErrorAction(payload) {
    return {
        type: authTypes.AUTH_ERROR,
        payload
    }
}

export function authLoadingAction(payload) {
    return {
        type: authTypes.AUTH_LOADING,
        payload
    };
};

export function authMessageAction(payload) {
    return {
        type: authTypes.AUTH_MESSAGE,
        payload
    }
}