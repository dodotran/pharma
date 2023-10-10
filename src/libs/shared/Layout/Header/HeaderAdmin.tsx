import { Button, Stack, styled } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import LogoHeader from 'public/assets/imgs/logo.png'
import { useEffect, useState } from 'react'
import { Account } from './Account'
import { AppBarAdmin } from './AppBar'
import { Language } from './Language'
import { ModalAuth } from './ModalAuth'

const HeaderAdmin = () => {
  const { data } = useSession()
  const { t } = useTranslation('common')

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (data?.user.id) {
      setOpen(false)
    }
  }, [data])

  return (
    <AppBarAdmin elevation={0}>
      <StackContainer>
        <Stack direction="row" spacing={18.75} alignItems="center">
          <Link href={'/'}>
            <MuiImage src={LogoHeader} alt="logo-header" priority />
          </Link>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Language />

          {data?.user.id ? (
            <Account />
          ) : (
            <>
              <Button onClick={handleOpen}>{t('sign-in')}</Button>

              <ModalAuth open={open} handleClose={handleClose} />
            </>
          )}
        </Stack>
      </StackContainer>
    </AppBarAdmin>
  )
}

export { HeaderAdmin }

const StackContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 5),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}))

const MuiImage = styled(Image)({
  cursor: 'pointer',
  width: 40,
  height: 40,
})
