import React from 'react'
import { useSelector } from 'react-redux'

export default function Modal_InviteUser() {
  const modalObject = useSelector((state) => state.common.modalObject, [])

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
          />
          <button className="orange-button submit-button">Submit</button>
        </form>
      </div>
    </div>
  )
}
