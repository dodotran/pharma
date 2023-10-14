import { Box, BoxProps, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React from 'react'
import { Header } from './Header'
import { HEADER_CLIENT_HEIGHT } from './Header/AppBar'

type LayoutType = BoxProps<
  'div',
  {
    title?: string | null
    description?: string
    children: React.ReactNode
    HeaderComponent?: React.ReactNode
  }
>

const Layout: React.FC<LayoutType> = ({ title, children, HeaderComponent, ...contentProps }) => {
  const { t } = useTranslation('meta')

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title ? t(title) : 'Pharma'}</title>
      </Head>
      {HeaderComponent ? HeaderComponent : <Header />}
      <Stack direction="row">
        <ContentPage {...contentProps}>{children}</ContentPage>
      </Stack>
    </>
  )
}

export { Layout }

const ContentPage = styled(Box)(({ theme }) => ({
  marginTop: HEADER_CLIENT_HEIGHT,
  minHeight: `calc(100vh - ${HEADER_CLIENT_HEIGHT}px)`,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  padding: '24px 10%',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(3, 3),
  },
}))
