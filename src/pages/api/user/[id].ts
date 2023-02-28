import { NextApiRequest, NextApiResponse } from 'next'
import { install, data, error } from 'nextjs-backend-helpers'
import { AppController } from 'nextjs-backend-helpers/controllers/app-controller'
import { prisma } from '@/domain/server/db/client'
import { z } from 'zod'

export class UserController extends AppController {
  constructor () {
    super()

    this.before(this.ensure({
      query: z.object({ id: z.string().uuid() })
    }))
    // this.before(restricted)
  }

  async get (_req: NextApiRequest, res: NextApiResponse<any>) {
    const response = await prisma.user.findFirst({
      where: {
        id: this.params.query<{ id: string }>().id
      }
    })

    res.json(data(response))
  }

  async delete (_req: NextApiRequest, res: NextApiResponse<any>) {
    const user = await prisma.user.findFirst({
      where: {
        id: this.params.query<{ id: string }>().id
      }
    })

    if (user === null) {
      res.status(404).json(error('User not found'))
      return
    }

    await prisma.session.deleteMany({
      where: {
        userId: user.id
      }
    })

    await prisma.account.deleteMany({
      where: {
        userId: user.id
      }
    })

    res.json(data({
      user: await prisma.user.delete({
        where: {
          id: this.params.query<{ id: string }>().id
        }
      })
    }))
  }
}

export default install(UserController)
