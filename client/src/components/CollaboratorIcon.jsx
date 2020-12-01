import React from 'react'

export default function CollaboratorIcon({
  username,
  color,
  smallIcon = false,
}) {
  return (
    <div
      className={
        'collaborator-icon' + (smallIcon == true ? ' small' : ' normal')
      }
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
      {username && username.length > 0 ? username[0].toUpperCase() : ''}
    </div>
  )
}
