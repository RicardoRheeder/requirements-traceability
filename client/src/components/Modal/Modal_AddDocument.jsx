import React, { useState } from 'react'
import {
  createDocAsync,
  fetchUserDocsAsync,
} from '../../redux/stores/document/actions'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { useAuth0 } from '@auth0/auth0-react'

export default function Modal_AddDocument() {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.info)

  const [doc, setDoc] = useState({
    title: '',
  })

  const handleSubmit = (e) => {
    e.preventDefaults
    const newDoc = { title: doc.title, admin: userInfo._id }
    dispatch(createDocAsync(newDoc))
    setDoc({ title: '' })
    dispatch(setModalObject({ visible: false, mode: 0 }))
    dispatch(fetchUserDocsAsync(user))
  }

  const handleChange = (e) => {
    const { value } = e.target
    setDoc({ ...doc, title: value })
  }

  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Add document</h1>
        <h2>Please enter the name of the empty document to create.</h2>
        <form onSubmit={handleSubmit}>
          <input className="modal-input" onChange={handleChange} />
          <button className="orange-button">Submit</button>
        </form>
      </div>
    </div>
  )
}
