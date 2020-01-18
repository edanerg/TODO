import {
    LOG_IN,
    LOG_OUT
} from '../actions/types';

export const logIn = userInfo => {
    return {
        type: LOG_IN,
        payload: {
            user: userInfo,
            token: userInfo.tokenObj.id_token
        }
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}
