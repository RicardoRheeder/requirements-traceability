import React from 'react'
import Dropdown from 'react-dropdown'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedDocumentPanelObject,
  setModalObject,
  updateDataTree,
} from '../redux/stores/common/actions'
import { updateCurrentDocument } from '../redux/stores/document/actions'

export const DocumentPanel = ({ document }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const selectedDocumentPanelObject = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )

  let versionsList = []
  let defaultOption = 'No versions'
  if (document.versions.length > 0) {
    // looping over versions array and parsing
    document.versions.forEach((version) => {
      const parsedVersion = JSON.parse(version)
      versionsList.push(parsedVersion.versionName)
    })
    // setting default option
    // defaultOption = versionsList[versionsList.length - 1]
  }

  // const testListOfVersions = ['1.1.0', '1.2.0']
  // const defaultOption = testListOfVersions[0]

  const _onDropdownSelect = (thing) => {
    console.log(thing)
    // finding the corresponding tree for the version that was selected
    document.versions.forEach((version) => {
      const parsedVersion = JSON.parse(version)

      if (thing.value == parsedVersion.versionName) {
        console.log(parsedVersion)
        dispatch(updateDataTree(JSON.parse(parsedVersion.tree)))
      }
    })
  }

  const inviteUserButton = () => {
    dispatch(setModalObject({ visible: true, mode: 2 }))
  }

  const openDocumentIntoEditor = () => {
    dispatch(updateCurrentDocument(document))
    // dispatch(updateDataTree(JSON.parse(document.tree)))
    history.push('/editor')
  }

  return (
    <div
      className={
        'document-panel-component' +
        (selectedDocumentPanelObject._id == document._id ? ' selected' : '')
      }
      onClick={() => {
        dispatch(setSelectedDocumentPanelObject(document))
      }}
      onDoubleClick={openDocumentIntoEditor}
    >
      <div className="document-panel-title">
        <button className="add-person-button" onClick={inviteUserButton}>
          <img
            className="add-person-button-image"
            src="/assets/images/add-friend-icon.png"
          ></img>
        </button>
        <h2>{document.title}</h2>
      </div>

      <div className="document-panel-dropdown">
        <Dropdown
          options={versionsList}
          onChange={_onDropdownSelect}
          value={defaultOption}
          placeholder="Select an option"
          className="dropdown-custom-wrapper"
          controlClassName="dropdown-custom-control"
          placeholderClassName="dropdown-custom-placeholder"
          menuClassName="dropdown-custom-menu"
          arrowClassName="dropdown-custom-arrow"
        />
      </div>
    </div>
  )
}
