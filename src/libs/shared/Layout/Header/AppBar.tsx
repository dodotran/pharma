import { AppBar as MuiAppBar, styled } from '@mui/material'

export const HEADER_HEIGHT = 60
export const HEADER_CLIENT_HEIGHT = 100

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  height: HEADER_CLIENT_HEIGHT,
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
}))

const AppBarAdmin = styled(MuiAppBar)(({ theme }) => ({
  height: HEADER_HEIGHT,
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
}))

export { AppBar, AppBarAdmin }
