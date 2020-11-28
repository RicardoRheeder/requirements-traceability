import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { addUserToDocAsync } from '../../redux/stores/document/actions'
import { SketchPicker } from 'react-color'
import { StatusIcon } from '../RequirementStatus'

export default function Modal_SetRequirementStatus() {
  const modalObject = useSelector((state) => state.common.modalObject, [])
  const selectedDoc = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )

  const dispatch = useDispatch()

  // var statusListFromDoc = {
  //   satisfied: '#00d084',
  //   unsatisfied: '#b80000',
  //   WIP: '#ffc107',
  //   review: '#FF5722',
  // }

  const [statusListFromDoc, setStatusListFromDoc] = useState({
    satisfied: '#00d084',
    unsatisfied: '#b80000',
    WIP: '#ffc107',
    review: '#FF5722',
  })

  const [reqName, setReqName] = useState('')
  const [color, setColor] = useState('')
  const handleChange = (color) => setColor(color)

  const handleOnClick = () => {
    dispatch(setModalObject({ visible: false, mode: 0 }))
  }

  const handleReqCreate = () => {
    // var tempStatusObject = statusListFromDoc
    // tempStatusObject[reqName] = color['hex']
    // console.log(tempStatusObject)

    setStatusListFromDoc((state) => ({ ...state, [reqName]: color['hex'] }))
  }

  const handeReqNameChange = () => {}

  function getDocumentRequirements() {
    var arrayOfKeys = Object.keys(statusListFromDoc)
    return arrayOfKeys.map((status) => {
      console.log(status)
      return (
        <StatusIcon
          statusName={status}
          statusColor={statusListFromDoc[status]}
        />
      )
    })
  }

  return (
    <div className="modal-root modal-root-child modal-status">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Set/Create a status</h1>
        <div className="left-container">
          <h2>{'List of available statuses:'}</h2>
          <div>{'Select a requirement below: '}</div>
          <div className="modal-status-container">
            {getDocumentRequirements()}
          </div>
          <div className="button-container">
            <button
              className="orange-button modal-button"
              onClick={() => handleOnClick()}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="right-container">
          <div>
            <h2>{'Create new status: '}</h2>
            <div>
              {'New status name: '}
              <input
                onChange={(e) => setReqName(e.target.value)}
                value={reqName}
              />
            </div>
          </div>
          <div className="color-picker">
            <SketchPicker
              width={'300px'}
              color={color}
              onChangeComplete={handleChange}
            />
          </div>
          <button
            className="orange-button modal-button"
            onClick={() => handleReqCreate()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
