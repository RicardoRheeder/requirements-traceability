import React, { useEffect } from 'react'
import { useDispatch, useSelector, dispatch } from 'react-redux'
import { DocumentPanel } from './DocumentPanel'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserRecentDocsAsync } from '../redux/stores/user/actions'

export default function RecentDocCard({}) {
  const dispatch = useDispatch()
  const recent_docs = useSelector((state) => state.user.recent_docs)
  const renderRecentDocs = (recent_docs) => {
    if (recent_docs != null) {
      return recent_docs.map((recent_doc, i) => {
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
