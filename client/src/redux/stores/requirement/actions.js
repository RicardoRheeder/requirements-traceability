import {
    UPDATE_REQ_NAME_START,
    UPDATE_REQ_NAME_FAILURE,
    UPDATE_REQ_NAME_SUCCESS,
} from './actionTypes';

const axios = require('axios').default;

const url = "http://localhost:5000/requirement";

export const updateReqNameStart = ()=>{
    return {
        type: UPDATE_REQ_NAME_START
    }
} 

export const updateReqNameSuccess = (doc)=>{
    return {
        type: UPDATE_REQ_NAME_SUCCESS,
        data: doc
    }
}

export const updateReqNameFailure = (err)=>{
    return {
        type: UPDATE_REQ_NAME_SUCCESS,
        data: err
    }
}


export const updateReqNameAsync = (reqTitle,req)=>{
    return (dispatch)=>{
        dispatch(updateReqNameStart())
        axios.patch(`${url}/update-name/${req._id}`, {title: reqTitle.title})
        .then((req)=>{
            console.log(req)
            dispatch(updateReqNameSuccess(req))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(updateReqNameFailure(err))
        })
    }
}



