import Link from 'next/link'
import React from 'react'
import TmpContent from './TmpContent'
import styles from './Component.module.scss'

type Props = {
  title?: string
  children?: React.ReactNode
}

const Component: React.FC<Props> = (props: Props) => {
  const basePath = process.env.basePath || ''
  const { title, children } = props

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.brandArea}>
          {/* logo */}
          <Link href="/">
            <a>
              <img
                alt="the logo image"
                className="mx-2 logotype"
                height={64}
                src={basePath + '/images/logotype.png'}
                width={256}
              />
            </a>
          </Link>
        </div>

        {/* nav */}
        <nav>
          <Link href="/">
            <a>item 1</a>
          </Link>
        </nav>
        <hr />
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        {/* fill */}
        <div className="w-screen bg-gray-200 footer-fill">
          <div className="container w-screen max-w-3xl py-2 mx-auto grid grid-cols-2">
            <span className="text-xs col-start-1">© Copyright Your Name</span>
            <div className="flex justify-end col-start-2">
              <img
                alt="the logo image"
                className="px-1"
                height={64}
                src={basePath + '/images/logotype-small.png'}
                width={128}
              />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

Component.defaultProps = {
  title: '(default page)',
  children: TmpContent,
}

export default Component
