import { blueGrey, grey } from '@/libs/config/colors'
import { Layout } from '@/libs/shared/Layout'
import { TableCart } from '@/libs/shared/Table'
import { api } from '@/utils/api'
import { Box, Button, Stack, Tooltip, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import NoImage from 'public/assets/imgs/no-image.png'
import { useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

const Checkout = () => {
  const { data: cartData, isLoading } = api.cart.getAll.useQuery()
  const utils = api.useContext()
  const { t } = useTranslation(['cart', 'common'])
  const { mutate } = api.order.createOrder.useMutation()
  const { data: addressData } = api.address.getAddress.useQuery()
  const [id, setId] = useState('')

  const handleSetId = (id: string) => {
    setId(id)
  }

  const columns = [
    {
      header: t('name_product'),
      accessorKey: 'product.name',
      cell: ({ row }: { row: any }) => {
        return (
          <Stack direction="row" alignItems="center" spacing={3}>
            <Box border={`1px solid ${grey[300]}`} borderRadius={1} padding={1}>
              <Image
                src={row.original.product.image[0] ? row.original.product.image[0].url : NoImage}
                width={60}
                height={60}
                alt="image cart"
              />
            </Box>

            <Typography fontSize={14}>{row.original.product.name}</Typography>
          </Stack>
        )
      },
    },
    {
      header: t('price'),
      accessorKey: 'product.price',
      cell: ({ row }: { row: any }) => {
        const price = row.original.product.price

        return (
          <Typography fontSize={14}>
            {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
          </Typography>
        )
      },
    },
    {
      header: t('quantity'),
      accessorKey: 'quantity',
      cell: ({ row }: { row: any }) => {
        return (
          <Typography fontSize={14} fontWeight={700} color="red">
            {row.original.quantity}
          </Typography>
        )
      },
    },
    {
      header: t('unit'),
      accessorKey: 'product.unit.name',
      cell: ({ row }: { row: any }) => {
        const price = row.original.product.price
        const title = `${price.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })} /${row.original.product?.unit.name}`

        return (
          <Tooltip title={title}>
            <ButtonCustom>{row.original.product?.unit.name}</ButtonCustom>
          </Tooltip>
        )
      },
    },
    {
      header: t('total'),
      accessorKey: 'total',
      cell: ({ row }: { row: any }) => {
        const price = row.original.quantity * row.original.product.price

        return (
          <Typography fontSize={14}>
            {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
          </Typography>
        )
      },
    },
  ]

  const totalPrice = cartData?.reduce((total, item) => {
    return total + item.quantity * item.product.price
  }, 0) as number

  const total = Math.floor(totalPrice / 24000)

  const handleOrder = () => {
    cartData?.forEach((item) => {
      {
        mutate(
          {
            product_id: item.product_id,
            quantity: item.quantity,
            address_id: id,
            is_paid: true,
            order_payment_id: '',
            payment_id: '',
            payment_source: 'SHIP_CODE',
            payer_id: '',
            status: 'PENDING',
            status_order_id: 'clnj0828b0000wdy8q34ux2jf',
          },
          {
            onSuccess: () => {
              enqueueSnackbar('ĐẶt hàng thành công!', { variant: 'success' })
            },
            onError: () => {
              enqueueSnackbar('ĐẶt hàng thất bại!', { variant: 'error' })
            },
            onSettled: () => {
              utils.order.invalidate()
              utils.cart.invalidate()
            },
          },
        )
      }
    })
  }

  if (cartData?.length === 0) {
    return (
      <Layout title="Giỏ hàng" bgcolor={grey[300]}>
        <Stack direction="row" justifyContent="center" alignItems="center" height="80vh">
          <Typography fontSize={20} fontWeight={700}>
            Giỏ hàng trống
          </Typography>
        </Stack>
      </Layout>
    )
  }

  return (
    <Layout title="Giỏ hàng" bgcolor={grey[300]}>
      <Stack direction="row" justifyContent="center" spacing={6}>
        <Stack spacing={2}>
          <TableCart columns={columns} data={cartData || []} isLoading={isLoading} />

          <Stack direction="row" spacing={6}>
            <Stack width={800} padding={3} bgcolor="base.white" borderRadius={1} spacing={3}>
              <Typography fontSize={20} fontWeight={700}>
                Chọn địa chỉ giao hàng
              </Typography>

              {addressData?.map((item) => {
                return (
                  <Stack
                    key={item.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius={1}
                    padding={3}
                    border={`1px dashed ${grey[400]}`}
                    sx={{ backgroundColor: id === item.id ? blueGrey[100] : '' }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Stack borderRight={`1px dashed ${grey[400]}`} pr={4}>
                        <Typography fontSize={14}>
                          <b>Họ và tên:</b> {item.name}
                        </Typography>

                        <Typography fontSize={14}>
                          <b>SDT:</b> {item.phone_number}
                        </Typography>

                        <Typography fontSize={14}>
                          <b>Loại địa chỉ:</b> {item.type_address}
                        </Typography>
                      </Stack>

                      <Stack borderRight={`1px dashed ${grey[400]}`} pr={4}>
                        <Typography fontSize={14}>
                          <b>Tỉnh/Thành phố:</b> {item?.province?.name}
                        </Typography>

                        <Typography fontSize={14}>
                          <b>Quận/Huyện:</b> {item.district?.name}
                        </Typography>

                        <Typography fontSize={14}>
                          <b>Phường/Xã</b>: {item.phone_number}
                        </Typography>
                      </Stack>

                      <Stack>
                        <Typography fontSize={14}>
                          <b>Địa chỉ chi tiết:</b> {item?.address_detail}
                        </Typography>
                      </Stack>
                    </Stack>

                    <ButtonCart onClick={() => handleSetId(item.id)}>
                      <Typography fontSize={14} fontWeight={700}>
                        Chọn
                      </Typography>
                    </ButtonCart>
                  </Stack>
                )
              })}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={6}>
            <Stack width={800} padding={3} bgcolor="base.white" borderRadius={1} spacing={3}>
              <Typography fontSize={20} fontWeight={700}>
                Phương thức thanh toán online
              </Typography>

              <PayPalButton
                amount={total}
                onSuccess={(details: any, data: any) => {
                  cartData?.forEach((item) => {
                    {
                      mutate(
                        {
                          product_id: item.product_id,
                          quantity: item.quantity,
                          address_id: id,
                          is_paid: true,
                          order_payment_id: data.orderID,
                          payment_id: data.paymentID,
                          payment_source: data.paymentSource,
                          payer_id: data.payerID,
                          status: 'SUCCESS',
                          status_order_id: 'clnj0828b0000wdy8q34ux2jf',
                        },
                        {
                          onSuccess: () => {
                            enqueueSnackbar('Thanh toán thành công!', { variant: 'success' })
                          },
                          onSettled: () => {
                            utils.order.invalidate()
                            utils.cart.invalidate()
                          },
                        },
                      )
                    }
                  })
                }}
                onError={() => {
                  enqueueSnackbar('Thanh toán thất bại!', { variant: 'error' })
                }}
              />
            </Stack>
          </Stack>
        </Stack>

        <Box>
          <BoxTotal spacing={3}>
            <DetailTotal direction="row">
              <Typography fontWeight={700}>Tạm tính:</Typography>

              <Typography>
                {totalPrice?.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Typography>
            </DetailTotal>

            <DetailTotal direction="row">
              <Typography fontWeight={700}>Thành tiền:</Typography>

              <Typography>
                {totalPrice?.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Typography>
            </DetailTotal>

            <Button
              variant="contained"
              disabled={!id || cartData?.length === 0}
              onClick={handleOrder}
            >
              Đặt hàng
            </Button>

            <Typography fontSize={14} textAlign="center">
              Bằng việc tiến hành đặt mua hàng, bạn đồng ý với&nbsp;
              <Link href="/">Điều khoản dịch vụ</Link>,&nbsp;
              <Link href="/"> Chính sách thu thập và xử lý dữ liệu cá nhân</Link>&nbsp; của chúng
              tôi
            </Typography>
          </BoxTotal>
        </Box>
      </Stack>
    </Layout>
  )
}

export { Checkout }

const ButtonCart = styled(Button)({
  padding: 6,
  minWidth: 30,
  border: '1px solid',
  borderColor: grey[300],
})

const ButtonCustom = styled(Button)({
  padding: '6px 10px',
  minWidth: 0,
  border: '1px solid',
  borderColor: grey[300],
  borderRadius: 5,
})

const BoxTotal = styled(Stack)(({ theme }) => ({
  padding: 32,
  backgroundColor: grey[200],
  boxShadow: ' 0 0 12px rgba(15,61,145,.12)',
  borderRadius: 5,
  background: theme.palette.base.white,
  width: 400,
  maxHeight: 600,
}))

const DetailTotal = styled(Stack)(({ theme }) => ({
  borderBottom: `1px dashed ${grey[300]}`,
  justifyContent: 'space-between',
  padding: '8px 0',
}))
