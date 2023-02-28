import { getServerAuthSession } from '@/domain/server/identity'
import { NextApiRequest, NextApiResponse } from 'next'

export async function restricted (req: NextApiRequest, res: NextApiResponse, stop: () => void) {
  const session = await getServerAuthSession({ req, res })
  if (session === null || session.user?.id !== req.query.id) {
    res.status(401).json({
      errors: ['Unauthorised']
    })
    stop()
  }
}

export async function authenticated (req: NextApiRequest, res: NextApiResponse, stop: () => void) {
  const session = await getServerAuthSession({ req, res })
  if (session === null) {
    res.status(401).json({
      errors: ['Unauthorised']
    })
    stop()
  }
}
