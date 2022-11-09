// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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
    name: process.env.npm_package_name || 'frontend+undef',
    state: 'healthy',
    version: process.env.npm_package_version || '0.0.0+undef',
  })
}
