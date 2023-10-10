import { Button, InputBase, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import SearchIcon from 'public/assets/svgs/icon_search.svg'

const Search = () => {
  const { t } = useTranslation('common')
  return (
    <SectionSearch>
      <InputSearch name="search" placeholder={`${t('search_placeholder')}`} type="search" />

      <ButtonSearch variant="text">
        <Image src={SearchIcon} alt="search icon" width={20} height={20} />
      </ButtonSearch>
    </SectionSearch>
  )
}

export { Search }

const ButtonSearch = styled(Button)(({ theme }) => ({
  height: 28,
  width: 32,
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const SectionSearch = styled(Stack)(({ theme }) => ({
  background: theme.palette.trueGrey[100],
  borderRadius: 8,
  padding: theme.spacing(0, 1.75),
  flexDirection: 'row',
  alignItems: 'center',
}))

const InputSearch = styled(InputBase)(({ theme }) => ({
  marginRight: theme.spacing(1.75),
  borderRadius: theme.spacing(1),
  color: theme.palette.common.black,
  gap: 8,
  backgroundColor: theme.palette.greyScale[100],
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
