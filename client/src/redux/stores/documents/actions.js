import {
    CREATE_DOC_START,
    CREATE_DOC_FAILURE,
    CREATE_DOC_SUCCESS,
    DELETE_DOC_START,
    DELETE_DOC_FAILURE,
    DELETE_DOC_SUCCESS,
} from './actionTypes';

const axios = require('axios').default;

const url = "http://localhost:5000/documents";

export const createDocStart = ()=>{
    return {
        type: CREATE_DOC_START
    }
} 

export const createDocSuccess = (doc)=>{
    return {
        type: CREATE_DOC_SUCCESS,
        data: doc
    }
}

export const createDocFailure = (err)=>{
    return {
        type: CREATE_DOC_SUCCESS,
        data: err
    }
}


export const createDocAsync = (doc)=>{
    return (dispatch)=>{
        dispatch(createDocStart())
        axios.post(`${url}/create-document`, {title: doc.title, admin: doc.admin})
        .then((doc)=>{
            console.log(doc)
            dispatch(createDocSuccess(doc))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(createDocFailure(err))
        })
    }
}



