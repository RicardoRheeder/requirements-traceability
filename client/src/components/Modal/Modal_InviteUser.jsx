import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUserToDocAsync } from '../../redux/stores/document/actions'

export default function Modal_InviteUser() {
  const modalObject = useSelector((state) => state.common.modalObject, [])
  const selectedDoc = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )
  const { _id } = useSelector((state) => state.user.info)

  const dispatch = useDispatch()
  const [email, setEmail] = useState({
    email: '',
  })

  const handleSubmit = (e) => {
    e.preventDefaults

    const request = {
      documentID: selectedDoc._id,
      userId: _id,
      email: email.email.trim(),
    }
    dispatch(addUserToDocAsync(request))
  }
  const handleChange = (e) => {
    const { value } = e.target
    setEmail({ ...email, email: value })
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
        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
            type="email"
            id="emails"
            name="emails"
            multiple
            onChange={handleChange}
          />
          <button className="orange-button submit-button">Submit</button>
        </form>
      </div>
    </div>
  )
}
