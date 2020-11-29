import React, { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
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
import { UpdateUserRecentDocsAsync } from '../redux/stores/user/actions'
import { Tree_CountSatisfiedReqs } from '../utils/TreeNodeHelperFunctions'

var satisfiedArray = [0, 0]

export const DocumentPanel = ({ document }) => {
  const { user } = useAuth0()
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
    getStatusSatisfactory()
  }, [document.versions])

  function getStatusSatisfactory() {
    if (document != null && document.tree != null) {
      satisfiedArray = Tree_CountSatisfiedReqs(JSON.parse(document.tree))
    }
  }

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
    // updating recent docs array
    dispatch(UpdateUserRecentDocsAsync(user.email, document._id))
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
        <div
          className={
            'status' +
            (satisfiedArray[0] == satisfiedArray[1]
              ? ' satisfied'
              : ' unsatisfied')
          }
        >
          {satisfiedArray[0] + '/' + satisfiedArray[1]}
        </div>
      </div>

      <div className="doc-version-title">
        {'(Latest version: ' + currentDropDownVersion + ')'}
      </div>
    </div>
  )
}
