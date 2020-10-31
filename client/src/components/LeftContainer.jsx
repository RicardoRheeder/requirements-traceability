import React from 'react'

import { DocumentPanel } from './'

export default function LeftContainer({ docs }) {
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
      return <DocumentPanel documentTitle={document.title} key={i} />
    })
  }

  return (
    <div className="left-container-root">
      {/* search bar here */}
      <div className="display-area">{RenderDocumentPanels(docs)}</div>
      <div className="add-remove-buttons">
        <button className="orange-button add-button">Add</button>
        <button className="orange-button remove-button">Remove</button>
      </div>
    </div>
  )
}
