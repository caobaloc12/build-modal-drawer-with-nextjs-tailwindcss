import { Drawer, Modal } from 'components'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import styles from 'styles/Home.module.css'

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Build my own modal, drawer with Next.js and TailwindCSS</title>
        <meta
          name='description'
          content='Build my own modal, drawer with Next.js and TailwindCSS'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Build my own modal, drawer with Next.js and TailwindCSS!
        </h1>

        <div className='flex flex-col space-y-4'>
          <button
            onClick={openModal}
            className={`${styles.btn} ${styles['btn-primary']}`}
          >
            Open Modal
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`${styles.btn} ${styles['btn-primary']}`}
          >
            Open Drawer
          </button>
        </div>
      </main>

      <footer className={styles.footer}>Lorem, ipsum.</footer>
      <Modal
        title='Modal title'
        closable
        showCloseIcon
        isOpen={isModalOpen}
        size='lg'
        onClose={closeModal}
      >
        <div className=''>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis quae
            iure possimus sit vel exercitationem ipsam veniam totam sint
            obcaecati.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            saepe eius doloremque, totam temporibus veritatis esse sint enim
            commodi inventore!
          </p>
        </div>
      </Modal>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title='Drawer title'
        closable
        showCloseIcon
        placement='right'
      >
        <div className=''>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis quae!
          </p>
        </div>
      </Drawer>
    </div>
  )
}

export default Home
