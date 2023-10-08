import { green, yellow } from '@/libs/config/colors'
import { api } from '@/utils/api'
import { Button, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import NoImage from 'public/assets/imgs/no-image.png'

type ProductProps = {
  id: string
  name: string
  price: number
  unitName: string | undefined
  image?: string
}

const Product: React.FC<ProductProps> = ({ id, name, price, unitName, image }) => {
  const { mutate } = api.cart.create.useMutation()
  const { data } = api.cart.getAll.useQuery()
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const handleAddToCart = async () => {
    await mutate(
      {
        product_id: id,
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Thêm vào giỏ hàng thành công', { variant: 'success' })
        },
        onError: (error) => {
          enqueueSnackbar(t(error.message), { variant: 'error' })
        },
        onSettled: () => {
          utils.cart.invalidate()
        },
      },
    )
  }

  return (
    <Stack width={250} boxShadow=" 0 0 12px rgba(15,61,145,.12)" borderRadius={1}>
      <Stack
        alignItems="center"
        justifyContent="center"
        height={250}
        width={250}
        borderBottom={`1px dashed ${green[700]}`}
      >
        <MuiImage
          src={image ? image : NoImage}
          alt={name}
          width={image ? 250 : 100}
          height={image ? 250 : 100}
        />
      </Stack>

      <Stack padding={2} spacing={2}>
        <NamePharmacy variant="subtitle1">{name}</NamePharmacy>

        <Typography variant="subtitle1" color={yellow[500]} fontWeight={700}>
          {price} đ/ {unitName}
        </Typography>

        <Button variant="contained" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </Stack>
    </Stack>
  )
}

export { Product }

const MuiImage = styled(Image)({
  cursor: 'pointer',
  borderStartStartRadius: 2,
  borderStartEndRadius: 2,
})

const NamePharmacy = styled(Typography)({
  fontWeight: 600,
  height: 60,
})
