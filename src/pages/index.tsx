import { Layout } from '@/libs/shared/Layout'
import { Button } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'auth'])),
    },
  }
}

export default function Home() {
  const router = useRouter()

  return (
    <Layout>
      <Button onClick={() => router.push('/sign-in')}>Sign in</Button>
    </Layout>
  )
}
