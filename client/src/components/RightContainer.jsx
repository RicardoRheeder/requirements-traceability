import React from 'react'
import NotificationCard from './NotificationCard'
import { useSelector } from 'react-redux'

export default function RightContainer() {
  const notifications = useSelector((state) => state.user.notifications)

  const renderRecentNotifications = (notifications) => {
    console.log(notifications)
    if (notifications != null && Array.isArray(notifications)) {
      return notifications.map((notification, i) => {
        return <NotificationCard notification={notification} key={i} />
      })
    }
    return (
      <div className="left-container-placeholder">
        <h2>No existing notifications.</h2>
      </div>
    )
  }

  return (
    <div className="right-container">
      <h1>Notifications: </h1>
      {renderRecentNotifications(notifications)}
    </div>
  )
}
