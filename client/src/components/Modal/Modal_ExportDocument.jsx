import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'

import { renderToStaticMarkup } from 'react-dom/server'
import { useAuth0 } from '@auth0/auth0-react'
import { sendHTMLAsync } from '../../redux/stores/document/actions'

export default function Modal_ExportDocument() {
  const storeTreeData = useSelector((state) => state.common.treeData, [])

  const dispatch = useDispatch()

  const handleSubmit = (e) => {}

  const handleChange = (e) => {
    const { value } = e.target
  }

  const handleOnClick = () => {
    console.log('Export the document from here')

    const src = document.getElementById('editor-root-div')
    // const src = document.getElementById('test-div')
    // const args = '-f html -t pdf -o output.pdf'
    const args = '-f html --pdf-engine=wkhtmltopdf -o test.pdf'
    const stringSrc = JSON.stringify(src.innerHTML)
    dispatch(sendHTMLAsync(stringSrc, args))
  }

  return (
    <div className="modal-root modal-root-child">
      <div className="modal-contents-container">
        <h1 className="modal-contents-title">Export document</h1>
        <form onSubmit={handleSubmit}>
          <h2>Please enter the desired filename to export the document as.</h2>
          <input className="modal-input" onChange={handleChange} />

          <div className="button-container">
            <button
              className="orange-button modal-button"
              onClick={handleOnClick}
            >
              Submit
            </button>
            <button
              className="orange-button modal-button"
              onClick={() =>
                dispatch(setModalObject({ visible: false, mode: 0 }))
              }
            >
              Close
            </button>
            <textarea name="" id="test-div" cols="30" rows="10">
              blah blah blah
            </textarea>
          </div>
        </form>
      </div>
    </div>
  )
}
