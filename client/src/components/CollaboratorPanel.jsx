import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserColorObject } from '../redux/stores/common/actions'

import { CollaboratorIcon } from './'

var listOfUserObjects = [
  { _id: '111', username: 'testUser1' },
  { _id: '222', username: 'testUser2' },
  { _id: '333', username: 'testUser3' },
]

const getRandColor = (brightness) => {
  // Six levels of brightness from 0 to 5, 0 being the darkest
  var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256]
  var mix = [brightness * 51, brightness * 51, brightness * 51] //51 => 255/5
  var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(
    function (x) {
      return Math.round(x / 2.0)
    }
  )
  return 'rgb(' + mixedrgb.join(',') + ')'
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export default function CollaboratorPanel() {
  const dispatch = useDispatch()
  const userColorObject = useSelector(
    (state) => state.common.userColorObject,
    {}
  )
  const currentDocument = useSelector((state) => state.document.current_doc, {})

  if (currentDocument != null) {
    listOfUserObjects = currentDocument.collaborators
    console.log(listOfUserObjects)
  }

  const generateUserIcons = (userStruct) => {
    return userStruct.map(({ _id, username }, i) => {
      let randomColor

      if (userColorObject) {
        if (userColorObject[username]) {
          randomColor = userColorObject[username]
        } else {
          randomColor = getRandColor(getRandomInt(3, 6))
          setTimeout(() => {
            dispatch(setUserColorObject({ [username]: randomColor }))
          }, 200)
        }

        return (
          <CollaboratorIcon
            key={i}
            username={username}
            color={randomColor}
            smallIcon={false}
          />
        )
      }
    })
  }

  return (
    <span className="collaborator-panel">
      {generateUserIcons(listOfUserObjects)}
    </span>
  )
}
