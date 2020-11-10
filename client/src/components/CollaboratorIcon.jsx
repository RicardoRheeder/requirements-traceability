import React from 'react'

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

export default function CollaboratorIcon({ username }) {
  let randomColor = getRandColor(getRandomInt(3, 6))
  return (
    <div
      className="collaborator-icon"
      title={username}
      style={{
        backgroundImage:
          'radial-gradient(circle, ' +
          randomColor +
          ' 0%, ' +
          randomColor +
          ' 35%, #000000 100%)',
      }}
    >
      {username[0].toUpperCase()}
    </div>
  )
}
