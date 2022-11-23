// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export type Status = {
  name: string
  state: string
  version: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Status>
) {
  res.status(200).json({
    name: publicRuntimeConfig.PACKAGE_NAME,
    state: 'healthy',
    version: publicRuntimeConfig.PACKAGE_VERSION,
  })
}
