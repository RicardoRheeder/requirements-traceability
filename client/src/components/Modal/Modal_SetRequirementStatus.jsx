import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setModalObject,
  updateDataTree,
} from '../../redux/stores/common/actions'
import {
  getStatusesAsync,
  setStatusesAsync,
} from '../../redux/stores/document/actions'
import { SketchPicker } from 'react-color'
import { StatusIcon } from '../RequirementStatus'
import {
  Tree_Update,
  Tree_UpdateReqStatusList,
} from '../../utils/TreeNodeHelperFunctions'

export default function Modal_SetRequirementStatus({ reqID = null }) {
  const dispatch = useDispatch()
  const selectedDocObject = useSelector((state) => state.document.current_doc)
  const modalObject = useSelector((state) => state.common.modalObject, [])
  const storeTreeData = useSelector((state) => state.common.treeData, [])
  const fetchedStatuses = useSelector(
    (state) => state.document.fetchedStatuses,
    {}
  )

  useEffect(() => {
    if (selectedDocObject != null) {
      dispatch(getStatusesAsync(selectedDocObject._id))
      console.log('fetching statuses')
    }
  }, [])

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
    var td = Tree_UpdateReqStatusList(storeTreeData, reqID, selectedIconName)
    updateTree(td)
    dispatch(setModalObject({ visible: false, mode: 0 }))
  }

  /**
   * Receives a tree structure, sends it to get the IDs cleaned up, and pushes it to Redux
   * @param {Object} tree - the tree stucture to clean and push to Redux store
   */
  const updateTree = (tree) => {
    // NewTree - a new array just used so that REACT knows to rerender
    var nt = [].concat(tree)
    dispatch(updateDataTree(JSON.parse(JSON.stringify(Tree_Update(nt)))))
  }

  const handleReqCreate = () => {
    let newStatusObj = {
      ...fetchedStatuses,
      [reqName]: color['hex'],
    }
    dispatch(setStatusesAsync(selectedDocObject._id, newStatusObj))
    setTimeout(() => {
      dispatch(getStatusesAsync(selectedDocObject._id))
    }, 1000)
  }

  function getDocumentRequirements() {
    if (fetchedStatuses == null) {
      return <></>
    }

    var arrayOfKeys = Object.keys(fetchedStatuses)
    return arrayOfKeys.map((status, i) => {
      // console.log(status)
      return (
        <span
          onClick={() => {
            setSelectedIconName(status)
          }}
        >
          <StatusIcon
            statusName={status}
            statusColor={fetchedStatuses[status]}
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
            <div className="container-header">{'Selected status: '}</div>
            {fetchedStatuses != null ? (
              <StatusIcon
                statusName={selectedIconName}
                statusColor={fetchedStatuses[selectedIconName]}
              />
            ) : (
              <></>
            )}
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
            <div className="container-header">
              {'New status name: '}
              <input
                className="status-name-input"
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
