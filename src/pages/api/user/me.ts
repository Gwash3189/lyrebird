import { NextApiRequest, NextApiResponse } from 'next'
import { install, data } from 'nextjs-backend-helpers'
import { AppController } from 'nextjs-backend-helpers/controllers/app-controller'
import { prisma } from '@/domain/server/db/client'
import { getServerAuthSession } from '@/domain/server/identity'
import { authenticated } from '@/domain/server/user/middleware'

export class MeController extends AppController {
  constructor () {
    super()

    this.before(authenticated)
  }

  async get (req: NextApiRequest, res: NextApiResponse<any>) {
    const session = await getServerAuthSession({ req, res })
    const response = await prisma.user.findFirst({
      where: {
        id: session?.user?.id
      }
    })

    res.json(data(response))
  }
}

export default install(MeController)
