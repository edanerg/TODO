import {
    LOG_IN,
    LOG_OUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    currentUser: JSON.parse(localStorage.getItem('user'))
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOG_IN:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                currentUser: action.payload.user,
                token: action.payload.token
            };
        case LOG_OUT:
            localStorage.setItem('token', null);
            localStorage.setItem('user', null);
            return {
                currentUser: null,
                token: null
            };
        default:
            return state;
    }
}