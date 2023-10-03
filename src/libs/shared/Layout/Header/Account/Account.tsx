import { Menu, MenuItem } from '@/libs/shared/Menu'
import styled from '@emotion/styled'
import { Box, IconButton, ListItemIcon, Modal, Stack, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AdminIcon from 'public/assets/imgs/admin.png'
import AvatarDefault from 'public/assets/imgs/avatar-default.png'
import LogOutIcon from 'public/assets/imgs/logout.png'
import UserIcon from 'public/assets/imgs/online-service.png'
import ChangeIcon from 'public/assets/imgs/password.png'
import ArrowDownIcon from 'public/assets/svgs/arrow-down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow-left.svg'
import CloseIcon from 'public/assets/svgs/exit.svg'
import { useState } from 'react'
import { FormChangePassword } from '../ModalAuth/FormChangePassword'
import { BoxContainer, ButtonClose } from '../ModalAuth/styled'
import { StackName } from './Menu'

const Account = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const router = useRouter()

  const { data: sessionData } = useSession()

  const [openModal, setOpenModel] = useState(false)

  const handleOpenModal = () => {
    setOpenModel(true)
  }

  const handleCloseModel = () => {
    setOpenModel(false)
  }

  const menu = [
    {
      title: t('menu.account'),
      icon: UserIcon,
      handle: () => router.push('/account'),
    },
    {
      title: t('menu.change_password'),
      icon: ChangeIcon,
      handle: () => handleOpenModal(),
    },
    {
      title: t('menu.admin'),
      icon: AdminIcon,
      handle: () => router.push('/admin'),
    },
    {
      title: t('menu.logout'),
      icon: LogOutIcon,
      handle: () => signOut(),
    },
  ]

  return (
    <Box display={{ xs: 'none', md: 'block' }}>
      <StackName direction="row" spacing={1} onClick={handleClick}>
        <Image
          src={sessionData?.user.image ? sessionData?.user.image : AvatarDefault}
          width={28}
          height={28}
          alt="avatar"
          style={{ borderRadius: '100%' }}
        />

        <Typography variant="body2">{sessionData?.user?.name}</Typography>

        <IconButton
          size="small"
          sx={{ ml: 2, p: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Image src={open ? ArrowLeftIcon : ArrowDownIcon} alt="down" />
        </IconButton>
      </StackName>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        elevation={1}
      >
        {menu.map((item) => (
          <MenuItem key={item.title} onClick={item.handle as () => void}>
            <ListItemIcon>
              <IconMenu src={item.icon} alt="edit icon" />
            </ListItemIcon>
            <Typography variant="body2">{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>

      <Modal
        open={openModal}
        onClose={handleCloseModel}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <BoxContainer>
          <Stack direction="row" justifyContent="flex-end">
            <ButtonClose onClick={handleCloseModel}>
              <Image src={CloseIcon} alt="close icon" />
            </ButtonClose>
          </Stack>

          <FormChangePassword handleClose={handleCloseModel} />
        </BoxContainer>
      </Modal>
    </Box>
  )
}

export { Account }

const IconMenu = styled(Image)({
  width: 25,
  height: 25,
})
