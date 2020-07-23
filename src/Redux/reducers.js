import {
    CHANGE_URL_CONTENT,
    REQUEST_URL_PENDING,
    REQUEST_URL_SUCCESS,
    REQUEST_URL_FAILED
} from './constants.js';

export const urlStore = {
    input: '',
    isPending: false,
    error: ''
}

export const storeURL = (state = urlStore, action = {}) => {
    // console.log()
    switch(action.type) {
        case REQUEST_URL_PENDING: 
        return Object.assign({}, state, {isPending: true});
        case CHANGE_URL_CONTENT:
        case REQUEST_URL_SUCCESS:
            return Object.assign({}, state, {isPending: false, input: action.payload});
        case REQUEST_URL_FAILED:
            return Object.assign({}, state, {isPending: false, error: action.payload});
        default:
            return state;
    }
}


