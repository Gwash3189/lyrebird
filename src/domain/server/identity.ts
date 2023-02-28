/* eslint-disable camelcase */
import type { GetServerSidePropsContext, PreviewData } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions as nextAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { ParsedUrlQuery } from 'querystring'

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions)
}

export async function isAuthenticated (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, callback: (session: Session) => any) {
  const session = await getServerAuthSession(context)

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/401'
      }
    }
  }

  return session
}
