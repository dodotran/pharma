import { grey } from '@/libs/config/colors'
import { LayoutAccount } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import NoImage from 'public/assets/imgs/no-image.png'

const HistoryOrder = () => {
  const { data } = api.order.getHistoryOrder.useQuery()
  const { mutate } = api.order.updateStatusOrder.useMutation()
  const utils = api.useContext()

  const handleUpdateStatusOrder = (id: string) => {
    mutate(
      { id, statusId: 'clnj24r0i0006wdy8sac4si32' },
      {
        onSuccess: () => {
          enqueueSnackbar('Huỷ thành công!', { variant: 'success' })
        },
        onError: () => {
          enqueueSnackbar('Huỷ thất bại!', { variant: 'error' })
        },
        onSettled: () => {
          utils.order.invalidate()
        },
      },
    )
  }

  return (
    <LayoutAccount>
      <Stack>
        <Typography variant="h5">Lịch sử mua hàng</Typography>

        <Stack mt={6} width="70%" spacing={3}>
          {data?.map((item) => (
            <Stack key={item.id}>
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={1}
                padding={3}
                border={`1px dashed ${grey[400]}`}
              >
                <Stack direction="row" spacing={2}>
                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={4}>
                    <Typography fontSize={14}>
                      <b>Họ và tên:</b> {item.address.name}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>SDT:</b> {item.address.phone_number}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>Loại địa chỉ:</b> {item.address.type_address}
                    </Typography>
                  </Stack>

                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={4}>
                    <Typography fontSize={14}>
                      <b>Tên sản phẩm:</b> {item.product.name}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>Số lượng:</b> {item.quantity} / {item.product.unit?.name}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>Giá</b>: {item.product.price} VND
                    </Typography>
                  </Stack>

                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={4}>
                    <Typography fontSize={14}>
                      <b>Trạng thái thanh toán:</b> {item.payment_method?.status}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>Trạng thái đơn hàng:</b> {item.status.name}
                    </Typography>
                  </Stack>

                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={4}>
                    <Image
                      src={item.product.image[0]?.url ? item.product.image[0]?.url : NoImage}
                      alt="image"
                      width={100}
                      height={100}
                    />
                  </Stack>

                  <Stack>
                    <Button
                      variant="outlined"
                      onClick={() => handleUpdateStatusOrder(item.id)}
                      disabled={item.status.id === 'clnj24r0i0006wdy8sac4si32'}
                    >
                      Huỷ đơn hàng
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </LayoutAccount>
  )
}

export { HistoryOrder }
