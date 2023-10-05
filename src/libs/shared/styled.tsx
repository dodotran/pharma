import styled from '@emotion/styled'
import { Button } from '@mui/material'
import Image from 'next/image'

const ButtonDetail = styled(Button)({
  backgroundColor: 'transparent',
  padding: 0,
  minWidth: 0,
  '&:hover': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '&:focus': {
    backgroundColor: 'transparent',
  },
})

const MuiImage = styled(Image)({
  cursor: 'pointer',
  width: 25,
  height: 25,
})

export { ButtonDetail, MuiImage }
