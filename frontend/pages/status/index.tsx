import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Status } from '~/pages/api/status'
import styles from '~/styles/Status.module.css'

const Page: NextPage = () => {
  const [status, setStatus] = useState<Status>({
    name: 'initial name',
    state: 'initial state',
    version: '0.0.0+initial',
  })

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/api/status')
      const json = await res.json()
      setStatus(json)
    }
    fetchStatus()
  }, [])

  return (
    <div>
      <Head>
        <title>Status</title>
      </Head>
      <main className={styles.main}>
        <h1>Status</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Frontend Status</h2>
            <p>name: {status.name}</p>
            <p>state: {status.state}</p>
            <p>version: {status.version}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page
