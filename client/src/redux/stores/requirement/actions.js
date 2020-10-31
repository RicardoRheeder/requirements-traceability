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


export const updateReqNameAsync = (req,reqID)=>{
    return (dispatch)=>{
        dispatch(updateReqNameStart())
        axios.patch(`${url}/update-name/${reqID}`, {title: req.title})
        .then((doc)=>{
            console.log(doc)
            dispatch(updateReqNameSuccess(doc))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(updateReqNameFailure(err))
        })
    }
}



