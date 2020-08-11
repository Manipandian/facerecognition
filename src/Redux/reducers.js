import {
    getImageUrl
} from './constants.js';

export const urlStore = {
    input: 'https://i.ibb.co/tD1bq4b/1392771.jpg',
    isPending: false,
    error: ''
}

export const storeURL = (state = urlStore, action = {}) => {
    // console.log()
    switch(action.type) {
        case getImageUrl.REQUEST_URL_PENDING: 
        return Object.assign({}, state, {isPending: true, input: ''});
        case getImageUrl.CHANGE_URL_CONTENT:
        case getImageUrl.REQUEST_URL_SUCCESS:
            return Object.assign({}, state, {isPending: false, input: action.payload});
        case getImageUrl.REQUEST_URL_FAILED:
            return Object.assign({}, state, {isPending: false, error: action.payload});
        default:
            return state;
    }
}


