import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { createDocAsync } from '../../redux/stores/documents/actions'

export default function Modal_AddDocument() {
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
    </div>
  )
}
