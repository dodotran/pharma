import { api } from '@/utils/api'
import { Box, Button, InputBase, Modal, Stack, styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { HEADER_CLIENT_HEIGHT } from '../AppBar'

const Search = () => {
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const { data } = api.product.getAll.useQuery()
  const [search, setSearch] = useState('' as string)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearch = () => {
    handleOpen()
  }

  const router = useRouter()

  return (
    <SectionSearch>
      <InputSearch
        name="search"
        placeholder={`${t('search_placeholder')}`}
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <ButtonSearch variant="outlined" onClick={handleSearch}>
        Tìm kiếm
      </ButtonSearch>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ zIndex: 1, backgroundColor: 'transparent !important' }}
      >
        <BoxContainer>
          {data
            ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                spacing={2}
                borderBottom="1px dashed"
                pb={1}
                onClick={() => router.push(`detail-product/${item.id}`)}
              >
                <Typography variant="body2">{item.name}</Typography>
              </Stack>
            )).length === 0 && <Typography>No data</Typography>}
        </BoxContainer>
      </Modal>
    </SectionSearch>
  )
}

export { Search }

const ButtonSearch = styled(Button)(({ theme }) => ({
  height: 32,
  width: 100,
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const SectionSearch = styled(Stack)(({ theme }) => ({
  background: theme.palette.base.white,
  borderRadius: 8,
  padding: theme.spacing(0, 1.75),
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 2000,
}))

const InputSearch = styled(InputBase)(({ theme }) => ({
  marginRight: theme.spacing(1.75),
  borderRadius: theme.spacing(1),
  color: theme.palette.common.black,
  gap: 8,
  background: theme.palette.base.white,
  zIndex: 2000,
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1.75, 1, 0),
  },
  height: 58,
  width: 465,
  '& .MuiInputAdornment-positionStart': {
    marginRight: 0,
  },
  fontSize: 18,
  [theme.breakpoints.down('lg')]: {
    width: 350,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 34,
  },
}))

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: HEADER_CLIENT_HEIGHT + 10,
  left: '27%',
  transform: 'translateX(-27%)',
  width: 600,
  height: 250,
  overflowY: 'auto',
  boxShadow: theme.shadows[1],
  padding: '20px 15px',
  borderRadius: 10,
  background: theme.palette.base.white,
}))
