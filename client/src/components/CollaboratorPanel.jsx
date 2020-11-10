import React from 'react'

import { CollaboratorIcon } from './'

const testUserObjects = [
  { userID: '12312', username: 'ricardo' },
  //{ userID: '54564', username: 'Faiz' },
]

const generateUserIcons = (userStruct) => {
  return userStruct.map(({ userID, username }) => {
    return <CollaboratorIcon username={username} />
  })
}

export default function CollaboratorPanel() {
  return (
    <span className="collaborator-panel">
      {generateUserIcons(testUserObjects)}
    </span>
  )
}
