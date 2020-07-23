import axios from 'axios';

import {
    CHANGE_URL_CONTENT,
    REQUEST_URL_PENDING,
    REQUEST_URL_SUCCESS,
    REQUEST_URL_FAILED
} from './constants.js';

export const getUrlInput = (input) => {
    console.log("Action event", input);
    return {
        type: CHANGE_URL_CONTENT,
        payload: input
    }
}

export const generateURL = (file) => {
    const imageURLKey = "22440e1cd91b632ec17776940f9d3417";
    return async (dispatch) => {
        dispatch({type: REQUEST_URL_PENDING});
        try {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let fileName = (file.name).substr(0, file.name.lastIndexOf('.')).toLowerCase()
            reader.onloadend = async () => {
              let imageData = await (reader.result).toString().replace(/^data:(.*,)?/, '');
              const bodyFormData = new FormData();
              bodyFormData.append('image', imageData);
              console.log("Encoded data", imageData);
              let res = await axios.post(`https://api.imgbb.com/1/upload?key=${imageURLKey}&name=${fileName}`, bodyFormData);
                console.log("O/P image", res.data.data.url)
              dispatch({type: REQUEST_URL_SUCCESS, payload: res.data.data.url});
            }

        } catch(error) { 
            dispatch({type: REQUEST_URL_FAILED, payload: error.message})
        }
    }
}