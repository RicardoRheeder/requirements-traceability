import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../redux/stores/common/actions'
import { useAuth0 } from '@auth0/auth0-react'
import { DocumentPanel } from './'
import { fetchUserDocsAsync } from '../redux/stores/document/actions'
import { fetchUserInfoAsync } from '../redux/stores/user/actions'
import { useState } from 'react'

export default function LeftContainer() {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const docs = useSelector((state) => state.document.documents)
  const selectedDoc = useSelector(
    (state) => state.common.selectedDocumentPanelObject
  )

  const [searchboxIsEmpty, setSearchboxIsEmpty] = useState(true)
  const [orderedDocList, setOrderedDocList] = useState([])

  // use effect to fetch the user info when the component mounts
  useEffect(() => {}, [docs])

  const updateSearch = (e) => {
    if (e.target.value.length == 0) {
      setSearchboxIsEmpty(true)
    } else {
      setSearchboxIsEmpty(false)
    }
    var matchingSearchs = []
    for (let i = 0; i < docs.length; i++) {
      var lowerCaseTitle = docs[i].title.toLowerCase()
      var lowerCaseSearchValue = e.target.value.toLowerCase()
      if (lowerCaseTitle.includes(lowerCaseSearchValue)) {
        console.log(docs[i].title + ' contains ' + e.target.value)
        matchingSearchs[matchingSearchs.length] = docs[i]
      }
    }
    setOrderedDocList(matchingSearchs)
  }

  const RenderDocumentPanels = (listOfDocs) => {
    console.log(listOfDocs)
    var orderedDocList = []
    for (let i = listOfDocs.length - 1; i >= 0; i--) {
      orderedDocList.push(listOfDocs[i])
    }
    if (orderedDocList.length != 0) {
      return orderedDocList.map((document, i) => {
        let tempDoc = JSON.parse(JSON.stringify(document))
        return <DocumentPanel document={tempDoc} key={i} />
      })
    }
    return (
      <div className="left-container-placeholder">
        <h2>No existing documents.</h2>
        <div>Click the 'Add' button below to get started.</div>
      </div>
    )
  }

  const addDocumentButton = () => {
    dispatch(setModalObject({ visible: true, mode: 0 }))
  }

  const removeDocumentButton = () => {
    dispatch(fetchUserInfoAsync(user))
    console.log(user);
    console.log(selectedDoc);
    var adminEmail = "";
    if(user.email==adminEmail){
      dispatch(setModalObject({ visible: true, mode: 1 }))
    }
  }

  return (
    <div className="left-container-root">
      <div className="document-searchbox-container">
        Search:{' '}
        <input
          className="document-searchbox"
          type="text"
          onChange={updateSearch}
        ></input>
      </div>
      <div className="display-area">
        {searchboxIsEmpty
          ? RenderDocumentPanels(docs)
          : RenderDocumentPanels(orderedDocList)}
      </div>
      <div className="add-remove-button-container">
        <button
          className="orange-button add-remove-button"
          onClick={addDocumentButton}
        >
          Add
        </button>

        <button
          className={
            'orange-button add-remove-button ' + (selectedDoc ? '' : 'disabled')
          }
          onClick={removeDocumentButton}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
