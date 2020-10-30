import * as authTypes from '../actions/authTypes';

const initialState = {
    token: null,
    loading: false,
    error: null,
    msg: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case authTypes.SIGNIN:
            return { ...state, token: action.payload, test: 'Logged in', error: null, loading: false };
        case authTypes.SIGNUP:
            return { ...state, token: action.payload, msg: 'Succesfully signed up', error: null, loading: false };
        case authTypes.AUTH_ERROR:
            return { ...state, error: action.payload, msg: null, loading: null };
        case 'LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    };
};


export default authReducer;