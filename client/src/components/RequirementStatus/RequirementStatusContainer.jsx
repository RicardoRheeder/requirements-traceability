import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { Tree_RemoveReqStatus } from '../../utils/TreeNodeHelperFunctions'
import { StatusIcon } from './'

export default function RequirementStatusContainer({
  onFocusReq,
  reqID,
  requirementStatuses = null,
  storeTreeData = null,
  updateTree,
}) {
  const dispatch = useDispatch()
  const fetchedStatuses = useSelector(
    (state) => state.document.fetchedStatuses,
    {}
  )

  const openStatusSelection = () => {
    onFocusReq(reqID)
    dispatch(setModalObject({ visible: true, mode: 5, requirementID: reqID }))
  }

  const removeStatus = (statusName) => {
    onFocusReq(reqID)
    setTimeout(() => {
      var td = Tree_RemoveReqStatus(storeTreeData, reqID, statusName)
      updateTree(td)
      dispatch(setModalObject({ visible: false, mode: 0 }))
      console.log(statusName)
    }, 100)
  }

  const renderStatuses = (requirementStatuses) => {
    return requirementStatuses.map((name, i) => {
      var color = fetchedStatuses[name]
      return (
        <span key={i} onClick={() => removeStatus(name)}>
          <StatusIcon
            key={i}
            statusName={name}
            statusColor={color}
            canBeDeleted={true}
          />
        </span>
      )
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
        {requirementStatuses != null &&
        fetchedStatuses != null &&
        requirementStatuses.length != 0
          ? renderStatuses(requirementStatuses)
          : ''}
      </span>
    </div>
  )
}
