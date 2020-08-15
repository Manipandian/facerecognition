import {
    getImageUrl, ON_ROUTER_CHANGE
} from './constants.js';

export const mainStore = {
    input: '',
    isPending: false,
    error: '',
    isSignedIn: false,
    router: 'signin'
}


const updateRoute = (route, state) => {
    return route === 'home' ?
    Object.assign({}, state, {input: 'https://i.ibb.co/tD1bq4b/1392771.jpg', isSignedIn: true, router: route}) :
    Object.assign({}, state, {isSignedIn: false, router: route});
}

export const storeURL = (state = mainStore, action = {}) => {
    switch(action.type) {
        case ON_ROUTER_CHANGE:
            return updateRoute(action.payload, state);
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


