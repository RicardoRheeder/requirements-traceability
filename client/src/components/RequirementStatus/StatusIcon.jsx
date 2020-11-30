import React from 'react'

export default function StatusIcon({
  statusName = 'empty',
  statusColor = 'empty',
  isSelected = false,
  canBeDeleted = false,
}) {
  return (
    <span
      style={{
        backgroundImage:
          'radial-gradient(ellipse, ' +
          statusColor +
          ' 0%, ' +
          statusColor +
          ' 60%, #000000 100%)',
      }}
      className={
        'status-icon' +
        (isSelected == true ? ' status-selected' : '') +
        (canBeDeleted == true ? ' status-deletable' : '')
      }
    >
      {statusName}
    </span>
  )
}
