import { Status } from '../api/status'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Page: NextPage = () => {
  const [status, setStatus] = useState<Status>({
    message: 'initial message',
    version: '0.0.0',
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
      <main>
        <h1>Status</h1>
        <p>{status.message}</p>
        <p>{status.version}</p>
      </main>
    </div>
  )
}

export default Page
