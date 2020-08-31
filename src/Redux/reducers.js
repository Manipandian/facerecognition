import {
    getImageUrl, ON_ROUTER_CHANGE, ON_OPERATION_CHANGE
} from './constants.js';

export const mainStore = {
    input: '',
    isPending: false,
    error: '',
    isSignedIn: false,
    router: 'signin'
}

export const operation = {
    operType: 'face'
}


const updateRoute = (route, state) => {
    return route === 'home' ?
    Object.assign({}, state, {input: 'https://i.ibb.co/gm6rCR1/news-preview-mob-image-preview-1018.jpg', isSignedIn: true, router: route}) :
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
        case getImageUrl.GET_DIRECT_URL_CONTENT:
            return Object.assign({}, state, {isPending: false, input: action.payload});
        default:
            return state;
    }
}

export const updateOperation = (state = operation, action={}) => {
    switch(action.type) {
        case ON_OPERATION_CHANGE:
            return Object.assign({}, state, {operType: action.payload});
        default:
            return state;
    }
}


