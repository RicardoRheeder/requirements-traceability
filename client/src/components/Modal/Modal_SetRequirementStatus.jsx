import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { addUserToDocAsync } from '../../redux/stores/document/actions'

export default function Modal_SetRequirementStatus() {
  const modalObject = useSelector((state) => state.common.modalObject, [])
  const selectedDoc = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )

  const dispatch = useDispatch()
  
  const handleOnClick = () => {
    dispatch(setModalObject({ visible: false, mode: 0 }))
  }

  const handleChange = (e) => {
  }

  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">{'Invite user(s) to document'}</h1>
        <h2>
          {'Please enter the email address(es) of the user(s) to invite.'}
        </h2>
        <h2>
          {'When entering multiple email addresses, use commas to separate.'}
        </h2>
        <form>
          <input
            className="modal-input"
            type="email"
            id="emails"
            name="emails"
            multiple
            onChange={handleChange}
          />

          <div className="button-container">
            <button
              className="orange-button modal-button"
              onClick={() => handleOnClick()}
            >
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
