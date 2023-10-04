import { Box, Modal as MuiModal, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/exit.svg'
import React from 'react'

import { trueGrey } from '@/libs/config/colors'
import { BoxContainer, ButtonClose } from './styled'

type ModalType = {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
  title: string
}

const Modal: React.FC<ModalType> = ({ handleClose, open, children, title }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <BoxContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          pb={1}
          borderBottom={`1px solid ${trueGrey[200]}`}
        >
          <Typography fontWeight={700}>{title}</Typography>

          <ButtonClose onClick={handleClose}>
            <Image src={CloseIcon} alt="close icon" />
          </ButtonClose>
        </Stack>

        <Box minHeight={500}>{children}</Box>
      </BoxContainer>
    </MuiModal>
  )
}

export { Modal }
