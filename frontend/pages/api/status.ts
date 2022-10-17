// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type Status = {
  message: string
  version: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Status>
) {
  res.status(200).json({
    message: 'ok(frontend)',
    version: '0.1.2',
  })
}
