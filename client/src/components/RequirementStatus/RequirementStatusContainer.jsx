import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { StatusIcon } from './'

export default function RequirementStatusContainer({
  requirementStatuses = null,
}) {
  const dispatch = useDispatch()

  const openStatusSelection = () => {
    dispatch(setModalObject({ visible: true, mode: 5 }))
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
      <div className="white-box-container">

        {/* {whiteboxIsOpen == true ? (
          <div className="white-box">
            <div>
              <span className="status-input-span status-span">
                Status Name:
                <input className="status-name-input"></input>
              </span>
              <br />
              <span className="colour-select-span status-span">
                Status Colour:
                <button className="blue-select colour-button"></button>
                <button className="red-select colour-button"></button>
                <button className="green-select colour-button"></button>
                <button className="yellow-select colour-button"></button>
                <button className="orange-select colour-button"></button>
                <button className="grey-select colour-button"></button>
              </span>
              <br />
              <span className="available-status-span status-span">
                Available Statuses:
                <select className="available-statuses-selectbox">
                  <option value="unsatisifed">Unsatisfied</option>
                  <option value="satisifed">Satisfied</option>
                  <option value="WIP">WIP</option>
                  <option value="review">Review</option>
                </select>
              </span>
              <br />
              <button className="submit-new-status">Submit New Status</button>
              <button className="submit-existing-status">
                {' '}
                Submit Existing Status
              </button>
            </div>
          </div>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  )
}
