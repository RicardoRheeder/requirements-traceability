import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { createDocAsync } from '../../redux/stores/documents/actions'

export default function Modal_AddDocument() {
<<<<<<< HEAD
  const dispatch = useDispatch()
  const { user } = useAuth0()

  const documents = useSelector((state) => state.documents.documents)
  const error = useSelector((state) => state.documents.error)

  const [inputData, setInputData] = useState('')

  console.log(documents)

  const submitName = () => {
    // slicing the user id to remove "auth0|"
    const oldId = user.sub
    const newID = oldId.slice(6, oldId.length)

    // createDocAsync({ title: 'test123', admin: newID })

    dispatch(createDocAsync({ title: inputData, admin: newID }))
  }

  return (
    <div>
      <h2>Add document</h2>
      <div>Please enter the name of the empty document to create.</div>
      <form>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button onClick={submitName}>Submit</button>
      </form>
=======
  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Add document</h1>
        <h2>Please enter the name of the empty document to create.</h2>
        <form>
          <input className="modal-input" />
          <button className="orange-button">Submit</button>
        </form>
      </div>
>>>>>>> master
    </div>
  )
}
