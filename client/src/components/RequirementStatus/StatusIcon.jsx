import React from 'react'

export default function StatusIcon({
  statusName = 'empty',
  statusColor = 'empty',
  isSelected = false,
  canBeDeleted = false,
}) {
  return (
    <span
      style={{ backgroundColor: statusColor }}
      className={'status-icon' + (isSelected == true ? ' status-selected' : '') + (canBeDeleted == true ? ' status-deletable' : '')}
    >
      {statusName}
    </span>
  )
}
