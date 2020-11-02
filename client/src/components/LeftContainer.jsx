import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../redux/stores/common/actions'
import { useAuth0 } from '@auth0/auth0-react'
import { DocumentPanel } from './'

export default function LeftContainer() {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const docs = useSelector((state) => state.document.documents)
  const getSuccess = useSelector((state) => state.document.success)
  console.log(getSuccess)

  const RenderDocumentPanels = (listOfDocs) => {
    if (listOfDocs.length != 0) {
      return listOfDocs.map((document, i) => {
        return <DocumentPanel document={document} key={i} />
      })
    }
    return (
      <div>
        <div>No existing documents.</div>
        <div>Click the 'Add' button below to get started.</div>
      </div>
    )
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
