import React from 'react'

export default function Modal_RemoveDocument() {
  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Remove document</h1>
        <h2>For authorization, please enter the name of the document you want to permanently remove.</h2>
        <form>
          <input className="modal-input" />
          <button className="orange-button">Submit</button>
        </form>
      </div>
    </div>
  )
}
