import React from 'react'
import { useDispatch, useSelector, dispatch } from 'react-redux'
import { DocumentPanel } from './DocumentPanel'

export default function RecentDocCard({}) {
  const recent_docs = useSelector((state) => state.user.recent_docs)

  const renderRecentDocs = (recent_docs) => {
    if (recent_docs != null) {
      return recent_docs.map((recent_doc, i) => {
        console.log(recent_doc)

        return <DocumentPanel document={recent_doc} key={i} />
      })
    }
    return (
      <div className="left-container-placeholder">
        <h2>No existing documents.</h2>
        <div>Click the 'Add' button below to get started.</div>
      </div>
    )
  }
  return <div>{renderRecentDocs(recent_docs)}</div>
}
