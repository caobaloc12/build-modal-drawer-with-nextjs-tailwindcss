import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Modal.module.css'

export type ModalSize = 'default' | 'sm' | 'lg'

export interface ModalProps {
  isOpen: boolean
  closable?: boolean
  showCloseIcon?: boolean
  title?: React.ReactNode
  size?: ModalSize
  width?: string | number
  onClose: () => void
  children?: React.ReactNode
}

const combineClasses = (...args: string[]) => args.join(' ')

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closable,
  showCloseIcon,
  size = 'sm',
  title,
  width,
  onClose,
  children,
}) => {
  const isServer = typeof window === 'undefined'

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closable && event.key === 'Escape') {
        onClose()
      }
    }

    if (!isServer) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closable, isServer, onClose])

  if (!isServer && isOpen) {
    const container = document.getElementById('modal-portal')

    const modalContent = (
      <>
        <div className={styles.mask} />
        <div
          className={styles.wrapper}
          onClick={() => {
            if (closable) {
              onClose()
            }
          }}
        >
          <div
            className={combineClasses(styles.modal, styles[`modal-${size}`])}
            onClick={(e) => e.stopPropagation()}
            style={width ? { width } : {}}
          >
            {showCloseIcon && (
              <span className={styles['close-btn']} onClick={onClose}>
                &times;
              </span>
            )}
            {title}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </>
    )
    return container != null
      ? ReactDOM.createPortal(modalContent, container)
      : null
  }

  return null
}

export default Modal
