import * as authTypes from '../actions/authTypes';

const initialState = {
    currentUser: {
        token: null,
        exp: null,
        status: null
    },
    loading: false,
    error: null,
    msg: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case authTypes.AUTH_SIGNUP:
            return { ...state, msg: action.payload.verificationMsg, error: null, loading: false };
        case authTypes.AUTH_SIGNIN:
            return { ...state, currentUser: { token: action.payload.token, exp: action.payload.expiration, status: action.payload.status }, error: null, loading: false };
        case authTypes.AUTH_SIGNOUT:
            return { ...state, currentUser: { token: null, exp: null }, msg: 'Succesfully logged out' }; 
        case authTypes.AUTH_ERROR:
            return { ...state, error: action.payload, msg: null, loading: null };
        case authTypes.AUTH_LOADING:
            return { ...state, loading: action.payload };
        case authTypes.AUTH_UPDATE_STATUS:
            return { ...state, currentUser: { ...currentUser, status: action.payload } };
        default:
            return state;
    };
};


export default authReducer;