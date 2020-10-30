import * as authTypes from '../actions/authTypes';

const initialState = {
    currentUser: {
        token: null,
        exp: null
    },
    loading: false,
    error: null,
    msg: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case authTypes.SIGNIN:
            return { ...state, currentUser: { token: action.payload.token, exp: action.payload.expiration }, error: null, loading: false };
        case authTypes.SIGNUP:
            return { ...state, currentUser: { token: action.payload.token, exp: action.payload.expiration }, msg: 'Succesfully signed up', error: null, loading: false };
        case authTypes.AUTH_ERROR:
            return { ...state, error: action.payload, msg: null, loading: null };
        case authTypes.SIGN_OUT:
            return { ...state, currentUser: { token: null, exp: null }, msg: 'Succesfully logged out' }; 
        case authTypes.LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    };
};


export default authReducer;