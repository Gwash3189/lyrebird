import { PrismaClient } from '@prisma/client'
import { env } from '@/env/server.mjs'

function createClient () {
  return new PrismaClient({
    log:
        env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })
}

let client

if (client === undefined) {
  client = createClient()
}

export const prisma = client
