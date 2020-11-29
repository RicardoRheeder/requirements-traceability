import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'
import { getStatusesAsync } from '../../redux/stores/document/actions'
import { SketchPicker } from 'react-color'
import { StatusIcon } from '../RequirementStatus'

export default function Modal_SetRequirementStatus() {
  const dispatch = useDispatch()
  const selectedDocObject = useSelector((state) => state.document.current_doc)
  const modalObject = useSelector((state) => state.common.modalObject, [])

  // useEffect(() => {
  //   if (selectedDocObject != null) {
  //     dispatch(getStatusesAsync(selectedDocObject._id))
  //   }
  // }, [modalObject])

  const selectedDoc = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )

  // const fetchedStatuses = useSelector(
  //   (state) => state.document.fetchedStatuses,
  //   {}
  // )

  const [statusListFromDoc, setStatusListFromDoc] = useState({
    satisfied: '#00d084',
    unsatisfied: '#b80000',
    WIP: '#ffc107',
    review: '#FF5722',
  })

  const [selectedIconName, setSelectedIconName] = useState('unsatisfied')
  const [reqName, setReqName] = useState('')
  const [color, setColor] = useState('')
  const handleChange = (color) => setColor(color)

  const handleOnClick = () => {
    dispatch(setModalObject({ visible: false, mode: 0 }))
  }

  const handleReqCreate = () => {
    setStatusListFromDoc((state) => ({ ...state, [reqName]: color['hex'] }))
  }

  const handeReqNameChange = () => {}

  function getDocumentRequirements() {
    if (statusListFromDoc == null) {
      return <></>
    }

    var arrayOfKeys = Object.keys(statusListFromDoc)
    return arrayOfKeys.map((status, i) => {
      console.log(status)
      return (
        <span
          onClick={() => {
            setSelectedIconName(status)
          }}
        >
          <StatusIcon
            statusName={status}
            statusColor={statusListFromDoc[status]}
            isSelected={status == selectedIconName ? true : false}
          />
        </span>
      )
    })
  }

  return (
    <div className="modal-root modal-root-child modal-status">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Set/Create a status</h1>
        <div className="left-container">
          <h2>{'List of available statuses:'}</h2>
          <div>
            {'Selected status: '}
            <StatusIcon
              statusName={selectedIconName}
              statusColor={statusListFromDoc[selectedIconName]}
            />
          </div>
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
