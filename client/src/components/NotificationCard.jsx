import React from 'react'

export default function NotificationCard({ notification }) {
  const sentenceConstructer = (remainingSentenceParts) => {
    return remainingSentenceParts.map((part) => {
      return <div>{part}</div>
    })
  }

  var arrayOfSentenceParts = notification.split('\n')
  console.log(arrayOfSentenceParts)

  return arrayOfSentenceParts.length > 1 ? (
    <div className="notification-card">
      {sentenceConstructer(arrayOfSentenceParts)}
    </div>
  ) : (
    <div className="notification-card">{notification}</div>
  )
}
