import { grey } from '@/libs/config/colors'
import { Layout } from '@/libs/shared/Layout'
import { TableCart } from '@/libs/shared/Table'
import { api } from '@/utils/api'
import { Box, Button, Stack, Tooltip, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import NoImage from 'public/assets/imgs/no-image.png'
import DecrementIcon from 'public/assets/svgs/minus.svg'
import IncrementIcon from 'public/assets/svgs/plus.svg'
import TrashIcon from 'public/assets/svgs/trash.svg'

const Cart = () => {
  const { data: cartData, isLoading } = api.cart.getAll.useQuery()
  const { mutate: incrementCart } = api.cart.incrementCart.useMutation()
  const { mutate: decrementCart } = api.cart.decrementCart.useMutation()
  const { mutate: deleteCart } = api.cart.delete.useMutation()
  const utils = api.useContext()
  const router = useRouter()
  const { t } = useTranslation(['cart', 'common'])

  const handleIncrement = (id: string) => {
    incrementCart(
      { product_id: id },
      {
        onError: (error) => {
          enqueueSnackbar(t(error.message, { ns: 'common' }), { variant: 'error' })
        },
        onSettled: () => {
          utils.cart.invalidate()
        },
      },
    )
  }

  const handleDecrement = (id: string) => {
    decrementCart(
      { product_id: id },
      {
        onError: () => {
          enqueueSnackbar('Cập nhật số lượng thất bại!', { variant: 'error' })
        },
        onSettled: () => {
          utils.cart.invalidate()
        },
      },
    )
  }

  const handleDeleteCart = (id: string) => {
    deleteCart(
      { product_id: id },
      {
        onError: () => {
          enqueueSnackbar('Xóa sản phẩm thất bại!', { variant: 'error' })
        },
        onSettled: () => {
          utils.cart.invalidate()
        },
      },
    )
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
        const price = row.original.quantity * row.original.product.price

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
          <Stack direction="row" alignItems="center" width={100} spacing={1} component="form">
            <ButtonCart onClick={() => handleDecrement(row.original.product_id)}>
              <Image src={DecrementIcon} alt="decrement" width={18} height={18} />
            </ButtonCart>

            <Box border={`2px dashed ${grey[300]}`} padding={1}>
              <Typography fontSize={14} fontWeight={700}>
                {row.original.quantity}
              </Typography>
            </Box>

            <ButtonCart onClick={() => handleIncrement(row.original.product_id)}>
              <Image src={IncrementIcon} alt="increment" width={18} height={18} />
            </ButtonCart>
          </Stack>
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
      header: '',
      accessorKey: 'action',
      cell: ({ row }: { row: any }) => {
        return (
          <ButtonCustom onClick={() => handleDeleteCart(row.original.product_id)}>
            <Image src={TrashIcon} alt="icon" />
          </ButtonCustom>
        )
      },
    },
  ]

  const totalPrice = cartData?.reduce((total, item) => {
    return total + item.quantity * item.product.price
  }, 0)

  return (
    <Layout title="Giỏ hàng" bgcolor={grey[300]}>
      <Stack direction="row" justifyContent="center" spacing={6}>
        {cartData?.length === 0 ? (
          <Stack
            width={800}
            padding={2}
            paddingBottom={8}
            mr={2}
            bgcolor="base.white"
            justifyContent="center"
          >
            <Typography variant="h5" fontWeight={700} textAlign="center">
              Giỏ hàng trống
            </Typography>
          </Stack>
        ) : (
          <Box>
            <TableCart columns={columns} data={cartData || []} isLoading={isLoading} />
          </Box>
        )}

        <BoxTotal spacing={3}>
          <DetailTotal direction="row">
            <Typography fontWeight={700}>Tổng tiền:</Typography>

            <Typography>
              {totalPrice?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Typography>
          </DetailTotal>

          <DetailTotal direction="row">
            <Typography fontWeight={700}>Giảm giá trực tiếp:</Typography>

            <Typography>0Đ</Typography>
          </DetailTotal>

          <DetailTotal direction="row">
            <Typography fontWeight={700}>Giảm giá voucher:</Typography>

            <Typography>0Đ</Typography>
          </DetailTotal>

          <DetailTotal direction="row" borderBottom={`1px solid ${grey[400]} !important`}>
            <Typography fontWeight={700}>Tiết kiệm được:</Typography>

            <Typography>0Đ</Typography>
          </DetailTotal>

          <DetailTotal direction="row">
            <Typography fontWeight={700}>Tạm tính:</Typography>

            <Typography>
              {totalPrice?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Typography>
          </DetailTotal>

          <Button
            variant="contained"
            onClick={() => router.push('/checkout')}
            disabled={cartData?.length === 0}
          >
            Mua hàng
          </Button>

          <Typography fontSize={14} textAlign="center">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với&nbsp;
            <Link href="/">Điều khoản dịch vụ</Link>,&nbsp;
            <Link href="/"> Chính sách thu thập và xử lý dữ liệu cá nhân</Link>&nbsp; của chúng tôi
          </Typography>
        </BoxTotal>
      </Stack>
    </Layout>
  )
}

export { Cart }

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
