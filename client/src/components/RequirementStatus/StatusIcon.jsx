import React from 'react'

export default function StatusIcon({
  statusName = 'empty',
  statusColor = 'empty',
}) {
  return (
    <span style={{ backgroundColor: statusColor }} className="status-icon">
      {statusName}
    </span>
  )
}
