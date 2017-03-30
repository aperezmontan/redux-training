import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { newDuckTop, pointer, newDuckInputContainer, newDuckInput, darkBtn, submitDuckBtn } from './styles.css'
import { formatDuck } from 'helpers/utils'

const modalStyle = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
}

const { func, string, object, bool } = PropTypes

Modal.PropTypes = {
  isOpen: bool.isRequired,
  isSubmitDisabled: bool.isRequired,
  duckText: string.isRequired,
  user: object.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDuckText: func.isRequired,
  duckFanout: func.isRequired
}

export default function Modal (props) {
  function submitDuck () {
    props.duckFanout(formatDuck(props.duckText, props.user))
  }
  return (
    <span className={darkBtn} onClick={props.openModal}>
      Duck
      <ReactModal style={modalStyle} isOpen={props.isOpen} onRequestClose={props.closeModal} contentLabel="Modal">
        <div className={newDuckTop}>
          <span> Compose New Duck </span>
          <span className={pointer} onClick={props.closeModal}> X </span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea 
            className={newDuckInput}
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.ducktext}
            maxLength={140}
            type="text"
            placeholder="What's up ?"
          />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}
        >
          Submit Duck
        </button>
      </ReactModal>
    </span>
  )
}
