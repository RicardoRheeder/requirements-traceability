import React from 'react'

export default function StatusIcon({ statusName, statusColor }) {
  return (
    <span style={{ backgroundColor: statusColor }} className="status-icon">
      {statusName}
    </span>
  )
}
