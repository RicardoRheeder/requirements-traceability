import React from 'react'

export default function StatusIcon({
  statusName = 'empty',
  statusColor = 'empty',
  isSelected = false,
}) {
  return (
    <span
      style={{ backgroundColor: statusColor }}
      className={'status-icon ' + (isSelected == true ? 'status-selected' : '')}
    >
      {statusName}
    </span>
  )
}
