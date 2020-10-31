import React from 'react'
import { useSelector } from 'react-redux'

import { DocumentPanel } from './'

export default function LeftContainer() {
  const docs = useSelector((state) => state.document.documents)
  console.log(docs)

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
