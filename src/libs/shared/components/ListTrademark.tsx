import { greyScale } from '@/libs/config/colors'
import { api } from '@/utils/api'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const ListTrademark = () => {
  const { data } = api.trademark.get.useQuery()

  return (
    <Stack direction="row" spacing={4}>
      {data?.map((item) => (
        <Stack
          key={item.id}
          width={116}
          textAlign="center"
          spacing={2}
          border={`1px solid ${greyScale[300]}`}
          padding={1}
        >
          <Image src={item.image} alt={item.name} width={100} height={100} />

          <Box borderTop={`1px dashed`} pt={1}>
            <Typography variant="body2">{item.name}</Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}

export { ListTrademark }
