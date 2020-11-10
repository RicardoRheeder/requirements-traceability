import React from 'react'

export default function CollaboratorIcon({ username }) {
  return (
    <div className="collaborator-icon" title={username}>
      {username[0].toUpperCase()}
    </div>
  )
}
