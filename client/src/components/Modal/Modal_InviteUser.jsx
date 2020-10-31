import React from 'react'
import { useSelector } from 'react-redux'

export default function Modal_InviteUser() {
  const modalObject = useSelector((state) => state.common.modalObject, [])

  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h2>{'Invite user(s) to document'}</h2>
        <div>
          {'Please enter the email address(es) of the user(s) to invite.'}
        </div>
        <div>
          {'When entering multiple email addresses, use commas to separate.'}
        </div>
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
