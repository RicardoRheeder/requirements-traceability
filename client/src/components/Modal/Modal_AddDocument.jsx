import React from 'react'

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
