import { Button, Stack, styled, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoHeader from 'public/assets/imgs/logo.png'
import CartIcon from 'public/assets/imgs/shop.png'
import ArrowDown from 'public/assets/svgs/arrow-down.svg'
import { useEffect, useState } from 'react'
import { Account } from './Account'
import { AppBar, HEADER_CLIENT_HEIGHT } from './AppBar'
import { Language } from './Language'
import { ModalAuth } from './ModalAuth'
import { ModalCategory } from './ModalCategory'
import { Search } from './Search'

const Header = () => {
  const { data } = useSession()
  const { t } = useTranslation('common')
  const router = useRouter()
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

  const handelOpenCart = () => {
    if (!data?.user.id) {
      setOpen(true)

      return
    }

    router.push('/cart')
  }

  const [openCategory, setOpenCategory] = useState(false)

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory)
  }

  const handleCloseCategory = () => {
    setOpenCategory(false)
  }

  return (
    <AppBar elevation={0}>
      <StackContainer>
        <Stack direction="row" spacing={14} alignItems="center">
          <Link href={'/'}>
            <MuiImage src={LogoHeader} alt="logo-header" priority />
          </Link>

          <Stack direction="row" spacing={4}>
            <ButtonCategory
              endIcon={<Image src={ArrowDown} alt="icon" />}
              variant="outlined"
              onClick={handleOpenCategory}
            >
              Danh mục
            </ButtonCategory>

            <Search />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="outlined"
            endIcon={<Image src={CartIcon} alt="cart" width={30} height={30} />}
            onClick={handelOpenCart}
          >
            <Typography fontSize={14} color="black" fontWeight="bold">
              Cart
            </Typography>
          </Button>

          <Language />

          {data?.user.id ? (
            <Account />
          ) : (
            <>
              <Button onClick={handleOpen}>{t('sign-in')}</Button>

              {open && <ModalAuth open={open} handleClose={handleClose} />}
            </>
          )}
        </Stack>

        {openCategory && <ModalCategory open={openCategory} handleClose={handleCloseCategory} />}
      </StackContainer>
    </AppBar>
  )
}

export { Header }

const StackContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 5),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: HEADER_CLIENT_HEIGHT,
  background: theme.palette.blue[0o0],
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}))

const MuiImage = styled(Image)({
  cursor: 'pointer',
  width: 40,
  height: 40,
})

const ButtonCategory = styled(Button)(({ theme }) => ({
  minWidth: 0,
  background: theme.palette.base.white,
  padding: 14,
  color: theme.palette.common.black,
}))
