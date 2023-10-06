import { Layout } from '@/libs/shared/Layout'
import { Stack } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'auth', 'product'])),
    },
  }
}

export default function Home() {
  return (
    <Layout>
      <Stack>12727</Stack>
    </Layout>
  )
}
