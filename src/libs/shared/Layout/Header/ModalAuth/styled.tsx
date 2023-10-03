import { Box, Button, styled } from '@mui/material'

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  minHeight: 250,
  boxShadow: theme.shadows[1],
  padding: 20,
  borderRadius: 10,
  background: theme.palette.base.white,
}))

const ButtonClose = styled(Button)({
  minWidth: 0,
  paddingTop: 0,
  paddingBottom: 0,
  padding: 0,
})

export { BoxContainer, ButtonClose }
