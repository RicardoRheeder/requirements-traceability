import {
  SET_LOGGEDIN,
  UPDATE_TREEDATA,
  UPDATE_SELECTEDNODEID,
  SET_MODALOBJECT,
  SET_SELECTED_DOCUMENTPANEL_OBJECT,
  SET_USERCOLOROBJECT,
  SET_CURRENTDOCVERSION,
} from './actionTypes'

export const setLoggedIn = (data) => ({ type: SET_LOGGEDIN, data })
export const updateDataTree = (data) => ({ type: UPDATE_TREEDATA, data })
export const updateSelectedNodeID = (data) => ({
  type: UPDATE_SELECTEDNODEID,
  data,
})
export const setModalObject = (data) => ({ type: SET_MODALOBJECT, data })
export const setSelectedDocumentPanelObject = (data) => ({
  type: SET_SELECTED_DOCUMENTPANEL_OBJECT,
  data,
})

export const setUserColorObject = (data) => ({
  type: SET_USERCOLOROBJECT,
  data,
})

export const setCurrentDocVersion = (data) => ({
  type: SET_CURRENTDOCVERSION,
  data,
})
