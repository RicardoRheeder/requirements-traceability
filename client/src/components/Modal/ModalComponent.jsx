import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { setModalObject } from '../../redux/stores/common/actions'

import {
  Modal_AddDocument,
  Modal_RemoveDocument,
  Modal_InviteUser,
  Modal_CommitDocument,
  Modal_ExportDocument,
  Modal_SetRequirementStatus,
} from './'

export default function ModalComponent() {
  const modalObject = useSelector((state) => state.common.modalObject, {})
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setModalObject({ visible: false, mode: 0 }))
  }

  return (
    <div className="modal-root">
      {modalObject.visible ? (
        <Modal
          isOpen={modalObject.visible}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="close-button-container">
            <button className="orange-button close-button" onClick={closeModal}>
              X
            </button>
          </div>
          {modalObject.mode == 0 ? (
            <Modal_AddDocument />
          ) : modalObject.mode == 1 ? (
            <Modal_RemoveDocument />
          ) : modalObject.mode == 2 ? (
            <Modal_InviteUser />
          ) : modalObject.mode == 3 ? (
            <Modal_CommitDocument />
          ) : modalObject.mode == 4 ? (
            <Modal_ExportDocument />
          ) : modalObject.mode == 5 ? (
            <Modal_SetRequirementStatus />
          ) : (
            <></>
          )}
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}
