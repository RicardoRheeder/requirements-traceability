import React from 'react'

export default function NotificationCard({ notification }) {
  const style = {
    color: 'blue',
    fontSize: '20px',
  }
  return <div style={style}>{notification}</div>
}
