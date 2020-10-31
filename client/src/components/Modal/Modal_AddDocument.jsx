import React from 'react'

export default function Modal_AddDocument() {
  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h2 className="modal-contents-title">Add document</h2>
        <div>Please enter the name of the empty document to create.</div>
        <form>
          <input className="modal-input" />
          <button className="orange-button">Submit</button>
        </form>
      </div>
    </div>
  )
}
