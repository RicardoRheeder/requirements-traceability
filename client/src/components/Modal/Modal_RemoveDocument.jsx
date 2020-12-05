import React, { useState } from 'react'
import {
  deleteDocAsync,
  fetchUserDocsAsync,
} from '../../redux/stores/document/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { setModalObject } from '../../redux/stores/common/actions'
import { fetchUserRecentDocsAsync } from '../../redux/stores/user/actions'

export default function Modal_RemoveDocument() {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const selectedDoc = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )
  const userInfo = useSelector((state) => state.user.info)

  const [doc, setDoc] = useState({
    title: '',
  })

  const handleSubmit = (e) => {
    e.preventDefaults
    if (selectedDoc.title.trim() === doc.title.trim()) {
      dispatch(deleteDocAsync({ id: selectedDoc._id, user: userInfo._id }))
    }
    setDoc({ title: '' })
    dispatch(setModalObject({ visible: false, mode: 0 }))
    dispatch(fetchUserDocsAsync(user))
    dispatch(fetchUserRecentDocsAsync(user.email))

  }

  const handleChange = (e) => {
    const { value } = e.target
    setDoc({ ...doc, title: value })
  }

  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Remove document</h1>
        <h2>
          For authorization, please enter the name of the document you want to
          permanently remove.
        </h2>
        <br></br>
        <h3>
          Please type{' '}
          <span className="remove-document-title-span">
            {selectedDoc.title}
          </span>{' '}
          below and click 'submit' to permanently delete the document.
        </h3>
        <form onSubmit={handleSubmit}>
          <input className="modal-input" onChange={handleChange} />

          <div className="button-container">
            <button className="orange-button modal-button">
              Submit
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
