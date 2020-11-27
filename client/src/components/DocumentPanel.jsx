import React, { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedDocumentPanelObject,
  setModalObject,
  updateDataTree,
  setCurrentDocVersion,
} from '../redux/stores/common/actions'
import {
  getDocAsync,
  updateCurrentDocument,
} from '../redux/stores/document/actions'

export const DocumentPanel = ({ document }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const selectedDocumentPanelObject = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )

  const [selectedVersionTree, setSelectedVersionTree] = useState()
  const [versionList, setVersionList] = useState([])
  const [currentDropDownVersion, setCurrentDropDownVersion] = useState('')

  useEffect(() => {
    refreshVersionList()
  }, [])

  function refreshVersionList() {
    let defaultOption = '0.0'
    let tempVersionsList = []
    if (document.versions.length > 0) {
      // looping over versions array and parsing
      document.versions.forEach((version) => {
        const parsedVersion = JSON.parse(version)
        tempVersionsList.push(parsedVersion.versionName)
      })
      tempVersionsList.reverse()
      setSelectedVersionTree(JSON.parse(document.tree))
      // setting default option
      defaultOption = tempVersionsList[0]
      setCurrentDropDownVersion(defaultOption)
      setVersionList(tempVersionsList)
    } else {
      setCurrentDropDownVersion(defaultOption)
      setSelectedVersionTree(JSON.parse(document.tree))
    }
  }

  const _onDropdownSelect = (thing) => {
    // finding the corresponding tree for the version that was selected
    document.versions.forEach((version) => {
      const parsedVersion = JSON.parse(version)

      if (thing.value == parsedVersion.versionName) {
        dispatch(updateDataTree(JSON.parse(parsedVersion.tree)))
        setCurrentDropDownVersion(parsedVersion.versionName)
        setSelectedVersionTree(JSON.parse(parsedVersion.tree))
      }
    })
  }

  const inviteUserButton = () => {
    dispatch(setModalObject({ visible: true, mode: 2 }))
  }

  const openDocumentIntoEditor = () => {
    // fetching the current document
    dispatch(getDocAsync(document._id))
    // updating the selected version
    dispatch(updateDataTree(selectedVersionTree))
    // setting the current version of the document
    dispatch(setCurrentDocVersion(currentDropDownVersion))
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
            src="./assets/images/add-friend-icon.png"
          ></img>
        </button>
        <h2 className="doc-title">{document.title}</h2>
      </div>

      <div className="document-panel-dropdown">
        {/* <Dropdown
          options={versionList}
          onChange={_onDropdownSelect}
          value={currentDropDownVersion}
          placeholder="Select an option"
          className="dropdown-custom-wrapper"
          controlClassName="dropdown-custom-control"
          placeholderClassName="dropdown-custom-placeholder"
          menuClassName="dropdown-custom-menu"
          arrowClassName="dropdown-custom-arrow"
        /> */}
      </div>
    </div>
  )
}
