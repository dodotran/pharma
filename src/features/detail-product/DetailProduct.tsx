import { base, grey } from '@/libs/config/colors'
import { Layout } from '@/libs/shared/Layout'
import { Product } from '@/libs/shared/components'
import { api } from '@/utils/api'
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import FreeShip from 'public/assets/imgs/fast-delivery.png'
import NoImage from 'public/assets/imgs/no-image.png'
import { useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Stack sx={{ p: 3 }}>{children}</Stack>}
    </Box>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const DetailProduct = () => {
  const { t } = useTranslation('product')
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data } = api.product.byId.useQuery({ id })
  const { data: trademarkData } = api.product.getTrademarkProduct.useQuery({ id })
  const { mutate } = api.cart.create.useMutation()
  const utils = api.useContext()

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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
      <Stack padding={{ xs: '0 10px', md: '0 30px', lg: '0 50px' }} spacing={5}>
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

              <Box bgcolor={base.gray} p={3} borderRadius={2}>
                <Typography variant="h5" color={green[400]} fontWeight="bold">
                  {data?.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} /{' '}
                  {data?.unit?.name}
                </Typography>
                <Typography variant="body2" mt={2}>
                  Giá đã bao gồm Thuế.
                </Typography>
                <Typography variant="body2">
                  Phí vận chuyển và các chi phí khác (nếu có) sẽ được thể hiện khi đặt hàng.
                </Typography>
              </Box>

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
            </Stack>

            <Stack spacing={3} direction="row">
              <Button variant="outlined" onClick={handleAddToCart}>
                Mua ngay
              </Button>

              <Button variant="contained" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Stack spacing={2} border={`1px solid ${grey[300]}`} padding={2} borderRadius={2}>
              <Typography variant="body2" fontWeight={700}>
                Các hình thức giao hàng
              </Typography>

              <Typography variant="body2">Freeship cho đơn hàng từ 500.000đ</Typography>

              <Stack direction="row" spacing={3}>
                <Box border="1px dashed" borderRadius={2} padding="5px 8px">
                  <Typography variant="body2">Vietel Post</Typography>
                </Box>

                <Box border="1px dashed" borderRadius={3} padding="5px 8px">
                  <Typography variant="body2">Grab</Typography>
                </Box>
              </Stack>
            </Stack>

            <Stack
              spacing={2}
              border={`1px solid ${grey[300]}`}
              padding={2}
              borderRadius={2}
              direction="row"
              alignItems="center"
            >
              <Image src={FreeShip} width={60} height={60} alt="image" />

              <Typography variant="body2">Cam kết giao hàng trong 2 giờ</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="center" spacing={3}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Mô tả" {...a11yProps(0)} sx={{ fontWeight: 700 }} />
                <Tab label="Thông tin sản phẩm" {...a11yProps(1)} sx={{ fontWeight: 700 }} />
                <Tab label="Giới thiệu" {...a11yProps(2)} sx={{ fontWeight: 700 }} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              {data?.product_detail?.description}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              {data?.product_detail?.ingredient}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <Stack width="70%" spacing={3}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius={1}
                  padding={3}
                  border={`1px dashed ${grey[400]}`}
                >
                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={1} width="40%">
                    <Typography fontSize={14}>
                      <b>Tên thương hiệu:</b> {data?.trademark?.name}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>Quốc gia:</b> {data?.trademark?.country}
                    </Typography>

                    <Image
                      src={data?.trademark?.image as string}
                      alt={data?.trademark?.introduce as string}
                      width={100}
                      height={100}
                    />
                  </Stack>

                  <Stack pr={1} width="40%">
                    <Typography fontSize={14}>{data?.trademark?.introduce}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CustomTabPanel>
          </Box>

          <Stack
            spacing={4}
            maxHeight={600}
            sx={{ overflowY: 'auto' }}
            width={400}
            alignItems="center"
          >
            <Typography variant="h3">Sản phẩm liên quan</Typography>

            {trademarkData?.map((item) => (
              <Product
                id={item.id}
                name={item.name}
                price={item.price}
                unitName={item?.unit?.name}
                image={item.image[0]?.url}
                key={item.id}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}

export { DetailProduct }
