import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../redux/stores/common/actions'

import { DocumentPanel } from './'

export default function LeftContainer() {
  const dispatch = useDispatch()

  let MockList = [
    'CMPT371ReqDoc',
    'Test Document',
    'etc',
    'test 1',
    'test 2',
    'test 3',
    'test 4',
    'test 5',
    'test 6',
    'test 7',
  ]

  const RenderDocumentPanels = (listOfDocs) => {
    var i = 0
    return listOfDocs.map((document) => {
      i += 1
      return <DocumentPanel documentTitle={document} key={i} />
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
      <div className="display-area">{RenderDocumentPanels(MockList)}</div>
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
