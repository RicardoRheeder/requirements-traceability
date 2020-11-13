import React from 'react'

export default function CollaboratorIcon({ username, color }) {
  return (
    <div
      className="collaborator-icon"
      title={username}
      style={{
        backgroundImage:
          'radial-gradient(circle, ' +
          color +
          ' 0%, ' +
          color +
          ' 35%, #000000 100%)',
      }}
    >
      {username[0].toUpperCase()}
    </div>
  )
}
