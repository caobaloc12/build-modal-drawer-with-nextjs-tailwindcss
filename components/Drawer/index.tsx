import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Drawer.module.css'

type Placement = 'left' | 'right'

export interface DrawerProps {
  isOpen: boolean
  closable?: boolean
  placement?: Placement
  showCloseIcon?: boolean
  title?: React.ReactNode
  width?: string | number
  onClose: () => void
  children?: React.ReactNode
}

const combineClasses = (...args: string[]) => args.join(' ')

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  closable,
  showCloseIcon,
  placement = 'right',
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
    const container = document.getElementById('drawer-portal')

    const drawerContent = (
      <>
        <div
          className={styles.mask}
          onClick={() => {
            if (closable) {
              onClose()
            }
          }}
        />
        <div
          className={combineClasses(
            styles.wrapper,
            placement === 'right'
              ? 'right-0 animate-fade-r'
              : 'left-0 animate-fade-l'
          )}
        >
          <div
            className={styles.drawer}
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
      ? ReactDOM.createPortal(drawerContent, container)
      : null
  }

  return null
}

export default Drawer
