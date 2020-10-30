import {
    SEND_DOC_START,
    SEND_DOC_FAILURE,
    SEND_DOC_SUCCESS
} from './actionType';

const axios = require('axios').default;

const url = "http://localhost:5000/documents";

export const sendDocStart = ()=>{
    return {
        type: SEND_DOC_START
    }
}

export const sendDocSuccess = (doc)=>{
    return {
        type: SEND_DOC_SUCCESS,
        data: doc
    }
}

export const sendDocFailure = (err)=>{
    return {
        type: SEND_DOC_FAILURE,
        data: err
    }
}

//send the document (tree structure) to the backend
export const sendDocAsync = ()=>{
    return(dispatch)=>{
        dispatch(sendDocStart())
        axios.post(`${url}/update-tree`, {tree: doc.tree})
        .then((doc)=>{
            dispatch(sendDocSuccess(doc))
        })
        .catch((err)=>{
            dispatch(sendDocFailure(err))
        })
    }
}