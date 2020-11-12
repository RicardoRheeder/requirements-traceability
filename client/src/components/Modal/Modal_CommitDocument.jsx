import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { useAuth0 } from '@auth0/auth0-react'
import { sendDocAsync } from '../../redux/stores/document/actions'

export default function Modal_CommitDocument() {
  const { user } = useAuth0()

  const storeTreeData = useSelector((state) => state.common.treeData, [])
  const selectedDocObject = useSelector((state) => state.document.current_doc)

  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.info)

  const [doc, setDoc] = useState({
    title: '',
  })

  const handleSubmit = (e) => {
    e.preventDefaults
  }

  const commitDocumentToDB = () => {
    let docObject = { tree: JSON.stringify(storeTreeData) }
    let docID = selectedDocObject
    dispatch(sendDocAsync (docObject, docID))
  }

  const handleChange = (e) => {
    const { value } = e.target
  }

  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Commit document</h1>
        <form onSubmit={handleSubmit}>
          <h2>Please enter a commit message.</h2>
          <input className="modal-input" onChange={handleChange} />
          <button className="orange-button" onClick={commitDocumentToDB}>Submit</button>
          <button
            className="orange-button"
            onClick={() =>
              dispatch(setModalObject({ visible: false, mode: 0 }))
            }
          >
            Close
          </button>
        </form>
      </div>
    </div>
  )
}
