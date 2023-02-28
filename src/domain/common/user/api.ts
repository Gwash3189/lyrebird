import { Fetch } from 'nextjs-backend-helpers/client/fetch'
import { z } from 'zod'

const userResponse = z.object({
  data: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    image: z.number()
  })
})

export type UserResponse = z.infer<typeof userResponse>

export const userQuery = Fetch
  .input<UserResponse>({
    path: ({ id }: { id: string }) => `/api/user/${id}`,
    validation: {
      response: userResponse
    }
  })
