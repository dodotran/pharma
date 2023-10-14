import { grey } from '@/libs/config/colors'
import { LayoutAccount } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import NoImage from 'public/assets/imgs/no-image.png'

const HistoryOrder = () => {
  const { data } = api.order.getHistoryOrder.useQuery()
  const { mutate } = api.order.updateStatusOrder.useMutation()
  const { mutate: mutateOrder } = api.order.finalOrder.useMutation()

  const utils = api.useContext()
  const { t } = useTranslation('account')

  const handleUpdateStatusOrder = (id: string) => {
    mutate(
      { id, statusId: 'clnj24r0i0006wdy8sac4si32' },
      {
        onSuccess: () => {
          enqueueSnackbar(t('cancel_order_success'), { variant: 'success' })
        },
        onError: () => {
          enqueueSnackbar('cancel_order_failed', { variant: 'error' })
        },
        onSettled: () => {
          utils.order.invalidate()
        },
      },
    )
  }

  const handleFinalOrder = (id: string) => {
    mutateOrder(
      { id },
      {
        onSuccess: () => {
          enqueueSnackbar(t('final_order_success'), { variant: 'success' })
        },
        onError: () => {
          enqueueSnackbar('final_order_failed', { variant: 'error' })
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
        <Typography variant="h5">{t('history_order')}</Typography>

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
                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={4} width={200}>
                    <Typography fontSize={14}>
                      <b>{t('name')}:</b> {item.address.name}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>{t('phone_number')}:</b> {item.address.phone_number}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>{t('type_address')}:</b> {item.address.type_address}
                    </Typography>
                  </Stack>

                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={4} width={200}>
                    <Typography fontSize={14}>
                      <b>{t('name_product')}:</b> {item.product.name}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>{t('quantity')}:</b> {item.quantity} / {item.product.unit?.name}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>{t('price')}:</b>
                      {item.product.price} VND
                    </Typography>
                  </Stack>

                  <Stack borderRight={`1px dashed ${grey[400]}`} pr={4} width={200}>
                    <Typography fontSize={14}>
                      <b>{t('status_payment')}:</b> {item.payment_method?.status}
                    </Typography>

                    <Typography fontSize={14}>
                      <b>{t('status_order')}:</b> {item.status.name}
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

                  <Stack spacing={4}>
                    <Button
                      variant="outlined"
                      onClick={() => handleUpdateStatusOrder(item.id)}
                      disabled={
                        item.status.id === 'clnj24r0i0006wdy8sac4si32' ||
                        item.status.id === 'clnq7yp8n0002wdekwpmedkdn'
                      }
                    >
                      {t('cancel_order')}
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => handleFinalOrder(item.id)}
                      disabled={
                        item.status.id === 'clnj24r0i0006wdy8sac4si32' ||
                        item.status.id === 'clnq7yp8n0002wdekwpmedkdn'
                      }
                    >
                      {t('final_order')}
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
