import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setModalObject,
  updateDataTree,
} from '../../redux/stores/common/actions'
import { useAuth0 } from '@auth0/auth0-react'
import {
  fetchUserDocsAsync,
  commitTreeAsync,
  getDocAsync,
  setFetchedTree,
} from '../../redux/stores/document/actions'
import { setCurrentDocVersion } from '../../redux/stores/common/actions'

export default function Modal_CommitDocument() {
  const { user } = useAuth0()
  const CURRENTWORKINGVERSION = 'Current working version'

  const storeTreeData = useSelector((state) => state.common.treeData, [])
  const selectedDocObject = useSelector((state) => state.document.current_doc)

  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.info)
  const selectedDocumentPanelObject = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )
  const [doc, setDoc] = useState({
    title: '',
  })

  const commitDocumentToDB = () => {
    let docObject = { tree: JSON.stringify(storeTreeData) }
    let docID = selectedDocObject._id

    // committing the tree to the db (adding it to the versions array)
    dispatch(commitTreeAsync(docObject, docID, doc.title))
    // console.log('selected DOC')
    // console.log(selectedDocumentPanelObject)
    // dispatch(updateDataTree(JSON.parse(selectedDocumentPanelObject.tree)))
    // setTimeout(() => {
    //   dispatch(setFetchedTree(JSON.parse(selectedDocumentPanelObject.tree)))
    // }, 250)

    // dispatch(fetchUserDocsAsync(user))
    // setTimeout(() => {
    // dispatch(getDocAsync(docID))
    // }, 250)
    dispatch(setModalObject({ visible: false, mode: 0 }))
    dispatch(setCurrentDocVersion(CURRENTWORKINGVERSION))
  }

  const handleChange = (e) => {
    const { value } = e.target
    setDoc({ ...doc, title: value })
  }

  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Commit document</h1>
        <form>
          {/* <h2>Please enter a commit message.</h2>
          <input className="modal-input" onChange={handleChange} /> */}
          <h2>Please enter a version number.</h2>
          <input className="modal-input" onChange={handleChange} />

          <div className="button-container">
            <button
              className="orange-button modal-button"
              onClick={commitDocumentToDB}
            >
              Save Version
            </button>
            <button
              className="orange-button modal-button"
              onClick={() =>
                dispatch(setModalObject({ visible: false, mode: 0 }))
              }
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
