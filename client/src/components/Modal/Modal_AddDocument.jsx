import React, { useState } from 'react'
import { createDocAsync } from '../../redux/stores/document/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function Modal_AddDocument() {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.info)

  const [doc, setDoc] = useState({
    title: '',
  })

  const handleClick = (e) => {
    e.preventDefaults
    const newDoc = { title: doc.title, admin: userInfo._id }
    dispatch(createDocAsync(newDoc))
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
        <form>
          <input className="modal-input" onChange={handleChange} />
          <button className="orange-button" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
