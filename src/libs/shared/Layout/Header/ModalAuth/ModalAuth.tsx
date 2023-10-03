import { Box, Modal, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import ArrowLeftIcon from 'public/assets/svgs/arrow-left-account.svg'
import CloseIcon from 'public/assets/svgs/exit.svg'
import React from 'react'
import { FormForgotPassword } from './FormForgotPassword'
import { FormSignIn } from './FormSignIn'
import { FormSignUp } from './FormSignUp'
import { BoxContainer, ButtonClose } from './styled'

type ModalAuthType = {
  open: boolean
  handleClose: () => void
}

type TabPanelProps = {
  children: React.ReactNode
  dir?: string
  index: number
  value: number
}

const ModalAuth: React.FC<ModalAuthType> = ({ handleClose, open }) => {
  const [value, setValue] = React.useState(0)

  const handleMoveTabSignIn = () => {
    setValue(0)
  }

  const handleMoveTabSignUp = () => {
    setValue(1)
  }

  const handleMoveTabFgPass = () => {
    setValue(2)
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    )
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <BoxContainer>
        <Stack direction="row" justifyContent={value !== 0 ? 'space-between' : 'flex-end'}>
          {value !== 0 && (
            <ButtonClose onClick={handleMoveTabSignIn}>
              <Image width={24} height={24} src={ArrowLeftIcon} alt="close icon" />
            </ButtonClose>
          )}

          <ButtonClose onClick={handleClose}>
            <Image src={CloseIcon} alt="close icon" />
          </ButtonClose>
        </Stack>

        <Box minHeight={400}>
          <TabPanel value={value} index={0}>
            <FormSignIn
              handleChangeTab={handleMoveTabFgPass}
              handleToSignUp={handleMoveTabSignUp}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <FormSignUp handleClose={handleClose} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <FormForgotPassword handleClose={handleClose} />
          </TabPanel>
        </Box>
      </BoxContainer>
    </Modal>
  )
}

export { ModalAuth }
