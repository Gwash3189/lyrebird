import React from 'react'
import Layout from '@/components/Layout'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Session } from 'next-auth'
import { isAuthenticated } from '@/domain/server/identity'

export default function Settings ({ session }: { session: Session }) {
  return (
    <Layout current={'settings'} session={session}>
      This content is proctected via a server side call to unstable_getServerSession
    </Layout>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
  return await isAuthenticated(context, (session) => ({
    props: {
      session
    }
  }))
}
