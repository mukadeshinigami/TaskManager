import React, { useEffect } from 'react'
import * as ReactModalImport from 'react-modal'
const ReactModal: any = (ReactModalImport as any).default ?? ReactModalImport
import './Modal.css'

type Props = {
  isOpen: boolean
  onRequestClose: () => void
  title?: string
  children?: React.ReactNode
}

export default function Modal({ isOpen, onRequestClose, title, children }: Props) {
  useEffect(() => {
    // ensure the app element for accessibility — adjust selector if your root id differs
    try {
      ReactModal.setAppElement('#root')
    } catch (e) {
      // ignore in SSR or test where document might not be present
    }
  }, [])

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        console.info('[Modal] onRequestClose called')
        try {
          onRequestClose()
        } catch (e) {
          console.error('[Modal] onRequestClose threw', e)
        }
      }}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      onAfterOpen={() => console.info('[Modal] after open')}
      onAfterClose={() => console.info('[Modal] after close')}
      overlayClassName="modal-overlay"
      className="modal-content"
      closeTimeoutMS={150}
    >
      {console.info('[Modal] render, isOpen=', isOpen)}
      <div className="modal-header">
        {title ? <h3 style={{ margin: 0 }}>{title}</h3> : null}
        <div className="modal-close-button">
          <button onClick={onRequestClose} aria-label="Close modal">
            Close
          </button>
        </div>
      </div>
      <div className="modal-body">{children}</div>
    </ReactModal>
  )
}
