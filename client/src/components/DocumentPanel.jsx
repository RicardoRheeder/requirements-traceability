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
  const CURRENTWORKINGVERSION = 'Current working version'

  useEffect(() => {
    refreshVersionList()
  }, [])

  function refreshVersionList() {
    let tempVersionsList = []
    if (document.versions.length > 0) {
      // looping over versions array and parsing
      document.versions.forEach((version) => {
        const parsedVersion = JSON.parse(version)
        tempVersionsList.push(parsedVersion.versionName)
      })
      tempVersionsList.push(CURRENTWORKINGVERSION)
      tempVersionsList.reverse()

      var defaultOption = '0.0'
      setSelectedVersionTree(JSON.parse(document.tree))
      // setting default option
      defaultOption = tempVersionsList[1]
      setCurrentDropDownVersion(defaultOption)
      setVersionList(tempVersionsList)
    } else {
      setSelectedVersionTree(JSON.parse(document.tree))
      setCurrentDropDownVersion(defaultOption)
    }
  }

  // const _onDropdownSelect = (thing) => {
  //   // finding the corresponding tree for the version that was selected
  //   document.versions.forEach((version) => {
  //     const parsedVersion = JSON.parse(version)

  //     if (thing.value == parsedVersion.versionName) {
  //       dispatch(updateDataTree(JSON.parse(parsedVersion.tree)))
  //       setCurrentDropDownVersion(parsedVersion.versionName)
  //       setSelectedVersionTree(JSON.parse(parsedVersion.tree))
  //     }
  //   })
  // }

  const inviteUserButton = () => {
    dispatch(setModalObject({ visible: true, mode: 2 }))
  }

  const openDocumentIntoEditor = () => {
    // fetching the current document
    dispatch(getDocAsync(document._id))
    // updating the selected version
    dispatch(updateDataTree(selectedVersionTree))
    // setting the current version of the document
    dispatch(setCurrentDocVersion(CURRENTWORKINGVERSION))
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
        <h2 className="doc-panel-header">{document.title}</h2>
      </div>

      <div className="doc-version-title">
        {'(Latest version: ' + currentDropDownVersion + ')'}
      </div>
    </div>
  )
}
