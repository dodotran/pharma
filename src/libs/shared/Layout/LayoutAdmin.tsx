import { Box, BoxProps, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React from 'react'
import { Sidebar } from '../SideBar'
import { Header } from './Header'
import { HEADER_HEIGHT } from './Header/AppBar'

type LayoutType = BoxProps<
  'div',
  {
    title?: string | null
    children: React.ReactNode
    HeaderComponent?: React.ReactNode
    disableSidebar?: boolean
  }
>

const LayoutAdmin: React.FC<LayoutType> = ({
  title,
  children,
  HeaderComponent,
  disableSidebar = false,
  ...contentProps
}) => {
  const { t } = useTranslation('meta')

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title ? t(title) : 'KPI master'}</title>
      </Head>
      {HeaderComponent ? HeaderComponent : <Header />}
      <Stack direction="row">
        {!disableSidebar && <Sidebar />}
        <ContentPage {...contentProps}>{children}</ContentPage>
      </Stack>
    </>
  )
}

export { LayoutAdmin }

const ContentPage = styled(Box)(({ theme }) => ({
  marginTop: HEADER_HEIGHT,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))
