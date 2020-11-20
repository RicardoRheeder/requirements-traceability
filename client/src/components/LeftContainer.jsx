import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../redux/stores/common/actions'
import { useAuth0 } from '@auth0/auth0-react'
import { DocumentPanel } from './'

export default function LeftContainer() {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const docs = useSelector((state) => state.document.documents)
  const selectedDoc = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )
  
  const updateSearch = e => {
    console.log(e.target.value);
  }

  const RenderDocumentPanels = (listOfDocs) => {
    if (listOfDocs.length != 0) {
      return listOfDocs.map((document, i) => {
        return <DocumentPanel document={document} key={i} />
      })
    }
    return (
      <div className="left-container-placeholder">
        <h2>No existing documents.</h2>
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
      <div className="document-searchbox-container">
        <input className="document-searchbox" type="text" onChange={updateSearch}></input>
      </div>
      <div className="display-area">{RenderDocumentPanels(docs)}</div>
      <div className="add-remove-button-container">
        <button
          className="orange-button add-remove-button"
          onClick={addDocumentButton}
        >
          Add
        </button>

        <button
          className={
            'orange-button add-remove-button ' + (selectedDoc ? '' : 'disabled')
          }
          onClick={removeDocumentButton}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
