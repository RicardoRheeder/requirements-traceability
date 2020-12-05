import {
  CREATE_DOC_START,
  CREATE_DOC_FAILURE,
  CREATE_DOC_SUCCESS,
  DELETE_DOC_START,
  DELETE_DOC_FAILURE,
  DELETE_DOC_SUCCESS,
  FETCH_USER_DOCS_START,
  FETCH_USER_DOCS_SUCCESS,
  FETCH_USER_DOCS_FAILURE,
  UPDATE_CURRENT_DOCUMENT,
  ADD_USER_TO_DOC_START,
  ADD_USER_TO_DOC_FAILURE,
  ADD_USER_TO_DOC_SUCCESS,
  GET_TREE_START,
  GET_TREE_FAILURE,
  GET_TREE_SUCCESS,
  SEND_TREE_START,
  SEND_TREE_FAILURE,
  SEND_TREE_SUCCESS,
  SEND_REQ_START,
  SEND_REQ_FAILURE,
  SEND_REQ_SUCCESS,
  COMMIT_TREE_START,
  COMMIT_TREE_FAILURE,
  COMMIT_TREE_SUCCESS,
  FETCH_DOC_START,
  FETCH_DOC_FAILURE,
  FETCH_DOC_SUCCESS,
  SET_STATUSES_START,
  SET_STATUSES_SUCCESS,
  SET_STATUSES_FAILURE,
  GET_STATUSES_START,
  GET_STATUSES_FAILURE,
  GET_STATUSES_SUCCESS,
  SET_DOC_TITLE_START,
  SET_DOC_TITLE_FAILURE,
  SET_DOC_TITLE_SUCCESS,
  SET_CURRENT_DOC,
  FETCH_DOC_COLLABORATORS_START,
  FETCH_DOC_COLLABORATORS_SUCCESS,
  FETCH_DOC_COLLABORATORS_FAILURE,
  SET_FETCHED_TREE,
} from './actionTypes'

import { Tree_GetRequirementObject } from '../../../utils/TreeNodeHelperFunctions'

const axios = require('axios').default

const url = 'http://localhost:5000'

// Create doc actions ***********************************************
// action to start creating doc
export const createDocStart = () => {
  return {
    type: CREATE_DOC_START,
  }
}

// action to finish making a doc
export const createDocSuccess = (doc) => {
  return {
    type: CREATE_DOC_SUCCESS,
    data: doc.data.response,
  }
}

// action when creating doc fails
export const createDocFailure = (err) => {
  return {
    type: CREATE_DOC_FAILURE,
    data: err.data.message,
  }
}

// action for async creating doc
export const createDocAsync = (doc) => {
  return (dispatch) => {
    dispatch(createDocStart())
    axios
      .post(`${url}/documents/create-document`, {
        title: doc.title,
        admin: doc.admin,
      })
      .then((doc) => {
        dispatch(createDocSuccess(doc))
      })
      .catch((err) => {
        dispatch(createDocFailure(err))
      })
  }
}

// Delete doc actions ***********************************************
// action to start deleting doc
export const deleteDocStart = () => {
  return {
    type: DELETE_DOC_START,
  }
}

// action to finish deleting doc
export const deleteDocSuccess = (docs) => {
  return {
    type: DELETE_DOC_SUCCESS,
    data: docs.data.response,
  }
}

// action when deleting doc fails
export const deleteDocFailure = (err) => {
  return {
    type: DELETE_DOC_FAILURE,
    data: err.data.message,
  }
}

// action for async deleting doc
export const deleteDocAsync = (doc) => {
  return (dispatch) => {
    dispatch(deleteDocStart())
    axios
      .delete(`${url}/documents/delete/${doc.id}`, { data: { user: doc.user } })
      .then((newList) => {
        dispatch(deleteDocSuccess(newList))
      })
      .catch((err) => {
        dispatch(deleteDocFailure(err))
      })
  }
}

// Fetching user documents *********************************************************
// action for fetching user docs start
export const fetchUserDocsStart = () => {
  return {
    type: FETCH_USER_DOCS_START,
  }
}

// action for fetching user docs success
export const fetchUserDocsSuccess = (documents) => {
  return {
    type: FETCH_USER_DOCS_SUCCESS,
    payload: documents.data.response,
  }
}

// action for when fetching user docs fails
export const fetchUserDocsFailure = (error) => {
  return {
    type: FETCH_USER_DOCS_FAILURE,
    payload: error.data.message,
  }
}

// async action for fetching user docs
export const fetchUserDocsAsync = (user) => {
  return (dispatch) => {
    dispatch(fetchUserDocsStart())
    // getting user docs
    axios
      .get(`${url}/users/get/documents-with-email/${user.email}`)
      .then((docs) => dispatch(fetchUserDocsSuccess(docs)))
      .catch((err) => {
        dispatch(fetchUserDocsFailure(err))
      })
  }
}

// Updating current document that the user has selected ********************************************
export const updateCurrentDocument = (data) => ({
  type: UPDATE_CURRENT_DOCUMENT,
  data,
})

// Adding user to document ********************************************
// action to start adding a user to a doc
export const addUserToDocStart = () => {
  return {
    type: ADD_USER_TO_DOC_START,
  }
}

// action for adding user to a doc on success
export const addUserToDocSuccess = (doc) => {
  return {
    type: ADD_USER_TO_DOC_SUCCESS,
    data: doc.data.response,
  }
}

// action for adding user to a doc on failure
export const addUserToDocFailure = (error) => {
  return {
    type: ADD_USER_TO_DOC_FAILURE,
    data: error.data.message,
  }
}

// async action for adding user to a doc
export const addUserToDocAsync = (request) => {
  return (dispatch) => {
    dispatch(addUserToDocStart())
    // adding user to a document
    axios
      .patch(`${url}/documents/add-user/${request.documentID}`, {
        email: request.email,
        userId: request.userId,
      })
      .then((doc) => dispatch(addUserToDocSuccess(doc)))
      .catch((err) => dispatch(addUserToDocFailure(err)))
  }
}

// Getting tree from database ********************************************
// action to start getting the tree structure
export const getTreeStart = () => {
  return {
    type: GET_TREE_START,
  }
}

// action for getting tree on success
export const getTreeSuccess = (doc) => {
  return {
    type: GET_TREE_SUCCESS,
    data: doc.data.response,
  }
}

// action for getting tree on failure
export const getTreeFailure = (error) => {
  return {
    type: GET_TREE_FAILURE,
    data: error.data.message,
  }
}

// async action for getting tree structure
export const getTreeAsync = (docObj) => {
  return (dispatch) => {
    dispatch(getTreeStart())
    axios
      .get(`${url}/documents/get-tree/${docObj._id}`)
      .then((doc) => dispatch(getTreeSuccess(doc)))
      .catch((err) => dispatch(getTreeFailure(err)))
  }
}
// Committing tree to database *******************************
export const commitTreeStart = () => {
  return {
    type: COMMIT_TREE_START,
  }
}

export const commitTreeSuccess = (doc) => {
  console.log('TEST COMMIT')
  console.log(doc.data.response)
  return {
    type: COMMIT_TREE_SUCCESS,
    data: doc.data.response,
  }
}

export const commitTreeFailure = (err) => {
  return {
    type: COMMIT_TREE_FAILURE,
    data: err.data.message,
  }
}

export const commitTreeAsync = (doc, docID, versionName) => {
  return (dispatch) => {
    dispatch(commitTreeStart())
    axios
      .patch(`${url}/documents/commit-doc/${docID}`, {
        tree: doc.tree,
        name: versionName,
      })
      .then((doc) => {
        dispatch(commitTreeSuccess(doc))
      })
      .catch((err) => {
        dispatch(commitTreeFailure(err))
      })
  }
}

// Sending tree to database *******************************
// Sending tree structure to database
export const sendTreeStart = () => {
  return {
    type: SEND_TREE_START,
  }
}
export const sendTreeSuccess = (doc) => {
  return {
    type: SEND_TREE_SUCCESS,
    data: doc.data.response,
  }
}
export const sendTreeFailure = (err) => {
  return {
    type: SEND_TREE_FAILURE,
    data: err.data.message,
  }
}

//send the document (tree structure) to the backend
export const sendTreeAsync = (treeData, docID) => {
  return (dispatch) => {
    dispatch(sendTreeStart())
    axios
      .patch(`${url}/documents/update-tree/${docID}`, { tree: treeData })
      .then((doc) => {
        dispatch(sendTreeSuccess(doc))
      })
      .catch((err) => {
        dispatch(sendTreeFailure(err))
      })
  }
}

// Sending a requirement to database *******************************
export const sendReqStart = () => {
  return {
    type: SEND_REQ_START,
  }
}

export const sendReqSuccess = (doc) => {
  console.log(doc)
  return {
    type: SEND_REQ_SUCCESS,
    data: doc.data.tree,
  }
}

export const sendReqFailure = (err) => {
  return {
    type: SEND_REQ_FAILURE,
    data: err,
  }
}

//send the requirement to the backend
export const sendReqAsync = (requirement, docID) => {
  return (dispatch) => {
    dispatch(sendReqStart())
    axios
      .patch(`${url}/documents/update-req/${docID}`, { req: requirement })
      .then((doc) => {
        console.log(doc)
        dispatch(sendReqSuccess(doc))
      })
      .catch((err) => {
        dispatch(sendReqFailure(err))
      })
  }
}

//send the requirement to the backend
export const sendReqAsyncOnUnmount = (
  storeTreeData,
  selectedNodeId,
  localUser,
  desiredUser,
  docID
) => {
  return (dispatch) => {
    // Get requirement we are editing, and remove the user's name from it
    var requirement = JSON.stringify(
      Tree_GetRequirementObject(
        storeTreeData,
        selectedNodeId,
        localUser,
        desiredUser
      )
    )
    dispatch(sendReqAsync(requirement, docID)) // Send the updated requirement to the database
  }
}

//setting current doc *************************
export const setCurrentDoc = (document) => {
  return {
    type: SET_CURRENT_DOC,
    data: document,
  }
}

//Fetching single document *************************
// action to start the fetch of collaborators
export const getDocStart = () => {
  return {
    type: FETCH_DOC_START,
  }
}

// action for getting Doc on failure
export const getDocFailure = (error) => {
  return {
    type: FETCH_DOC_FAILURE,
    data: error.data.message,
  }
}

// action for getting Doc on success
export const getDocSuccess = (doc) => {
  return {
    type: FETCH_DOC_SUCCESS,
    data: doc.data.response,
  }
}

// Get the doc asynchronously
export const getDocAsync = (docId) => {
  return (dispatch) => {
    dispatch(getDocStart())
    axios
      .get(`${url}/documents/get/${docId}`)
      .then((doc) => {
        dispatch(getDocSuccess(doc))
      })
      .catch((error) => dispatch(getDocFailure(error)))
  }
}

// Fetching document collaborators **********************
export const getDocCollaboratorsStart = () => {
  return {
    type: FETCH_DOC_COLLABORATORS_START,
  }
}

// action for getting Doc on failure
export const getDocCollaboratorsFailure = (error) => {
  return {
    type: FETCH_DOC_COLLABORATORS_FAILURE,
    data: error.data.message,
  }
}

// action for getting Doc on success
export const getDocCollaboratorsSuccess = (collaborators) => {
  return {
    type: FETCH_DOC_COLLABORATORS_SUCCESS,
    data: collaborators.data.response.collaborators,
  }
}

// action for getting collaborators async
export const getDocCollaboratorsAsync = (docId) => {
  return (dispatch) => {
    dispatch(getDocCollaboratorsStart())
    axios
      .get(`${url}/documents/get-collabs/${docId}`)
      .then((collaborators) => {
        dispatch(getDocCollaboratorsSuccess(collaborators))
      })
      .catch((error) => dispatch(getDocCollaboratorsFailure(error)))
  }
}

// Setting the statuses array in the backend actions**********************
// start the request
export const setStatusesStart = () => {
  return {
    type: SET_STATUSES_START,
  }
}

// set the returned document on success
export const setStatusesSuccess = (res) => {
  return {
    type: SET_STATUSES_SUCCESS,
    data: res.data.response,
  }
}

// set the error message on failure
export const setStatusesFailure = (res) => {
  return {
    type: SET_STATUSES_FAILURE,
    data: res.data.message,
  }
}

// set the statuses array asynchronously
export const setStatusesAsync = (documentID, statusArray) => {
  return (dispatch) => {
    dispatch(setStatusesStart())
    axios
      .patch(`${url}/documents/set-statuses/${documentID}`, {
        statuses: statusArray,
      })
      .then((res) => dispatch(setStatusesSuccess(res)))
      .catch((error) => dispatch(setStatusesFailure(error)))
  }
}

// Getting the statuses array for given document**********************************
// Start the request
export const getStatusesStart = () => {
  return {
    type: GET_STATUSES_START,
  }
}

// set the returned array on success
export const getStatusesSuccess = (res) => {
  return {
    type: GET_STATUSES_SUCCESS,
    data: res.data.response.statuses,
  }
}

// set the error message on failure
export const getStatusesFailure = (res) => {
  return {
    type: GET_STATUSES_FAILURE,
    data: res.data.message,
  }
}

// get the statuses array asynchronously
export const getStatusesAsync = (docID) => {
  console.log('DOC ID')
  console.log(docID)
  return (dispatch) => {
    dispatch(getStatusesStart())
    axios
      .get(`${url}/documents/get-statuses/${docID}`)
      .then((res) => dispatch(getStatusesSuccess(res)))
      .catch((error) => dispatch(getStatusesFailure(error)))
  }
}

// Setting the title of a document
// Start the request
export const setDocTitleStart = () => {
  return {
    type: SET_DOC_TITLE_START,
  }
}

// set the returned title on success
export const setDocTitleSuccess = (res) => {
  return {
    type: SET_DOC_TITLE_SUCCESS,
    data: res.data.response,
  }
}

// set the error message on failure
export const setDocTitleFailure = (error) => {
  return {
    type: SET_DOC_TITLE_FAILURE,
    data: res.data.message,
  }
}

export const setDocTitleAsync = (docID, docTitle) => {
  return (dispatch) => {
    dispatch(setDocTitleStart())
    axios
      .patch(`${url}/documents/set-title/${docID}`, { title: docTitle })
      .then((res) => dispatch(setDocTitleSuccess(res)))
      .catch((error) => dispatch(setDocTitleFailure(error)))
  }
}

// Setting fetched tree actions **********************
export const setFetchedTree = (tree) => {
  return {
    type: SET_FETCHED_TREE,
    data: tree,
  }
}
