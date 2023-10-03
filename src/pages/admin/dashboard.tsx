import { Stack } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'auth'])),
    },
  }
}

export default function Dashboard() {
  return <Stack>Admin</Stack>
}
