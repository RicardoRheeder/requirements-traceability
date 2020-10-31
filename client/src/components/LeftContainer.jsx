import React from 'react'
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../redux/stores/common/actions'
=======
import { useSelector } from 'react-redux'
>>>>>>> 2e65a0a61fad7e2003c3aaed5b1b1327e1c8b586

import { DocumentPanel } from './'

export default function LeftContainer() {
  const docs = useSelector((state) => state.document.documents)

  const RenderDocumentPanels = (listOfDocs) => {
    var i = 0
    return listOfDocs.map((document, i) => {
      i += 1
<<<<<<< HEAD
      return (
        <DocumentPanel documentTitle={document.title} documentID={i} key={i} />
      )
=======
      return <DocumentPanel documentTitle={document.title} key={i} />
>>>>>>> 2e65a0a61fad7e2003c3aaed5b1b1327e1c8b586
    })
  }

  const addDocumentButton = () => {
    dispatch(setModalObject({ visible: true, mode: 0 }))
  }

  const removeDocumentButton = () => {
    dispatch(setModalObject({ visible: true, mode: 1 }))
  }

  return (
    <div className="left-container-root">
      {/* search bar here */}
      <div className="display-area">{RenderDocumentPanels(docs)}</div>
      <div className="add-remove-buttons">
        <button
          className="orange-button add-button"
          onClick={addDocumentButton}
        >
          Add
        </button>
        <button
          className="orange-button remove-button"
          onClick={removeDocumentButton}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
