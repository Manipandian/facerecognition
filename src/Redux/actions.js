import axios from 'axios';

import {
    getImageUrl, ON_ROUTER_CHANGE
} from './constants.js';

export const onRoutChange = (route) => {
    return {
        type: ON_ROUTER_CHANGE,
        payload: route
    }
}

export const getUrlInput = (input) => {
    return {
        type: getImageUrl.CHANGE_URL_CONTENT,
        payload: input
    }
}

export const getDirectUrl = () => {
    let inputElement = document.getElementById('url-text-box');
    console.log(inputElement.value);
    if(inputElement.value && inputElement.value !== '') {
        return {
            type: getImageUrl.GET_DIRECT_URL_CONTENT,
            payload: inputElement.value
        }
    }
    return {
        type: getImageUrl.GET_DIRECT_URL_EMPTY
    }
}

export const generateURL = (file) => {
    const imageURLKey = "22440e1cd91b632ec17776940f9d3417";
    return async (dispatch) => {
        dispatch({type: getImageUrl.REQUEST_URL_PENDING});
        try {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let fileName = (file.name).substr(0, file.name.lastIndexOf('.')).toLowerCase()
            reader.onloadend = async () => {
              let imageData = await (reader.result).toString().replace(/^data:(.*,)?/, '');
              const bodyFormData = new FormData();
              bodyFormData.append('image', imageData);
              let res = await axios.post(`https://api.imgbb.com/1/upload?key=${imageURLKey}&name=${fileName}`, bodyFormData);
              dispatch({type: getImageUrl.REQUEST_URL_SUCCESS, payload: res.data.data.url});
            }

        } catch(error) { 
            dispatch({type: getImageUrl.REQUEST_URL_FAILED, payload: error.message})
        }
    }
}