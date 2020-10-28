import React from 'react'

export default function Modal_AddDocument() {


  const submitName = () => {
    dispatch(BACKAPI_CreateDoc(user, 'nameofdoc'))
  }

  return (
    <div>
      <h2>Add document</h2>
      <div>Please enter the name of the empty document to create.</div>
      <form>
        <input />
        <button onClick={submitName}>Submit</button>
      </form>
    </div>
  )
}
