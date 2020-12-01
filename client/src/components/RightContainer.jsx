import React from 'react'
import NotificationCard from './NotificationCard'
import { useSelector } from 'react-redux'

export default function RightContainer() {
  const notifications = useSelector((state) => state.user.notifications)

  const renderRecentNotifications = (notifications) => {
    if (notifications != null && Array.isArray(notifications)) {
      return notifications.map((notification, i) => {
        return <NotificationCard notification={notification} key={i} />
      })
    }
    return (
      <div className="right-container-placeholder">
        <div className="notification-header">No existing notifications.</div>
      </div>
    )
  }

  return (
    <div className="right-container">
      <div className="notification-header">Notifications: </div>
      {renderRecentNotifications(notifications)}
    </div>
  )
}
