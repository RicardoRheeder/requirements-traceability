import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalObject } from '../../redux/stores/common/actions'

import { renderToStaticMarkup } from 'react-dom/server'
import { useAuth0 } from '@auth0/auth0-react'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Modal_ExportDocument() {
  const storeTreeData = useSelector((state) => state.common.treeData, [])

  const dispatch = useDispatch()

  const handleSubmit = (e) => {}

  const handleChange = (e) => {
    const { value } = e.target
  }

  const handleOnClick = () => {
    console.log('Export the document from here')

    html2canvas(document.getElementById('editor-root-div')).then((canvas) => {
      var img = new Image()
      const imgData = canvas.toDataURL('image/png')
      img.src = canvas.toDataURL('image/png')

      img.onload = function () {
        var doc = new jsPDF()
        doc.setFontSize(12)
        doc.addImage(imgData, 'PNG', 0, 0)
        doc.save('a4.pdf')
      }
    })

    console.log(canvas)
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
          </div>
        </form>
      </div>
    </div>
  )
}
