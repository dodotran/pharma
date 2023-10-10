import { Layout } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import NoImage from 'public/assets/imgs/no-image.png'
import { useTranslation } from 'react-i18next'

const DetailProduct = () => {
  const { t } = useTranslation('product')
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data } = api.product.byId.useQuery({ id })
  const { mutate } = api.cart.create.useMutation()
  const utils = api.useContext()

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
    <Layout>
      <Stack padding="0 50px" spacing={5}>
        <Typography variant="h5">Detail Product</Typography>

        <Stack direction="row" spacing={5} justifyContent="center">
          <Stack spacing={2}>
            <Image
              src={data?.image[0]?.url ? data?.image[0]?.url : NoImage}
              width={400}
              height={400}
              alt="image"
            />

            <Stack direction="row" spacing={3}>
              {data?.image.map((item, index) => (
                <Image
                  key={index}
                  src={item.url ? item.url : NoImage}
                  width={100}
                  height={100}
                  alt="image"
                />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={6}>
            <Stack spacing={1}>
              <Typography variant="body2">
                {t('trademark')}: {data?.trademark?.name}
              </Typography>

              <Typography variant="h5" fontWeight={700}>
                {data?.name}
              </Typography>

              <Typography variant="h5" color={green[400]}>
                {data?.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} /{' '}
                {data?.unit?.name}
              </Typography>

              <Typography variant="body1">
                {t('unit')} : {data?.unit?.name}
              </Typography>

              <Typography variant="body1">
                {t('trademark')} : {data?.trademark?.name}
              </Typography>

              <Typography variant="body1">
                {t('category')} : {data?.category?.name}
              </Typography>

              <Typography variant="body1">
                {t('manufacturing_country')} : {data?.trademark?.country}
              </Typography>

              <Typography variant="body1">
                {t('ingredient')} : {data?.product_detail?.ingredient}
              </Typography>

              <Typography variant="body1">
                {t('short_description')} : {data?.product_detail?.short_description}
              </Typography>
            </Stack>
            <Button variant="contained" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}

export { DetailProduct }
