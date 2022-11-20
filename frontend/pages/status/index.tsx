import aspida from '@aspida/fetch'
import useAspidaSWR from '@aspida/swr'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import api from '~/lib/client/rest/$api'
import { Status } from '~/pages/api/status'
import styles from '~/styles/Status.module.css'

const BFFStatus: React.FC = () => {
  const client = api(
    aspida(fetch, {
      baseURL:
        process.env.NEXT_PUBLIC_BFF_ENDPOINT_REST_BASE_PATH || 'undef.local',
    })
  )
  const { data, error } = useAspidaSWR(client.rest.status)
  if (error)
    return (
      <Fragment>
        <p>Failed to load</p>
      </Fragment>
    )
  if (!data)
    return (
      <Fragment>
        <p>Loading...</p>
      </Fragment>
    )
  return (
    <Fragment>
      <dl>
        <dt>name:</dt>
        <dd>{data.name}</dd>
        <dt>state:</dt>
        <dd>{data.state}</dd>
        <dt>version:</dt>
        <dd>{data.version}</dd>
      </dl>
    </Fragment>
  )
}

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
            <dl>
              <dt>name:</dt>
              <dd>{status.name}</dd>
              <dt>state:</dt>
              <dd>{status.state}</dd>
              <dt>version:</dt>
              <dd>{status.version}</dd>
            </dl>
          </div>
          <div className={styles.card}>
            <h2>BFF Status</h2>
            <BFFStatus></BFFStatus>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page
