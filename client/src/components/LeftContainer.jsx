import React from 'react'

import { DocumentPanel } from './'

export default function LeftContainer() {
  let MockList = [
    'CMPT371ReqDoc',
    'Test Document',
    'etc',
    'test 1',
    'test 2',
    'test 3',
    'test 4',
    'test 5',
  ]

  const RenderDocumentPanels = (listOfDocs) => {
    var i = 0
    return listOfDocs.map((document) => {
      i += 1
      return <DocumentPanel documentTitle={document} key={i} />
    })
  }

  return (
    <div>
      <div className="display-area">{RenderDocumentPanels(MockList)}</div>
      <div className="add-remove-buttons">
        <button className="orange-button add-button">Add</button>
        <button className="orange-button remove-button">Remove</button>
      </div>
    </div>
  )
}
