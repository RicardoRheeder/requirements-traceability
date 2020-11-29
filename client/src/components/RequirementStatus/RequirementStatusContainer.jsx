import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { StatusIcon } from './'

export default function RequirementStatusContainer({
  onFocusReq,
  reqID,
  requirementStatuses = null,
}) {
  const dispatch = useDispatch()

  const openStatusSelection = () => {
    onFocusReq(reqID)
    dispatch(setModalObject({ visible: true, mode: 5, requirementID: reqID }))
  }

  var statusListFromDoc = {
    satisfied: '#00d084',
    unsatisfied: '#b80000',
    WIP: '#ffc107',
    review: '#FF5722',
  }

  const renderStatuses = (requirementStatuses) => {
    return requirementStatuses.map((name, i) => {
      var color = statusListFromDoc[name]
      return <StatusIcon key={i} statusName={name} statusColor={color} />
    })
  }
  return (
    <div className="requirement-status-field">
      <span className="status-node-container">
        <button
          className="add-status-button"
          onClick={() => {
            openStatusSelection()
          }}
        >
          +
        </button>
        {requirementStatuses != null && requirementStatuses.length != 0
          ? renderStatuses(requirementStatuses)
          : ''}
      </span>
    </div>
  )
}
