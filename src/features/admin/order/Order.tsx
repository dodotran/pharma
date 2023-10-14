import { grey } from '@/libs/config/colors'
import { LayoutAdmin } from '@/libs/shared/Layout'
import { ReactTable } from '@/libs/shared/Table'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import NoImage from 'public/assets/imgs/no-image.png'
import { useState } from 'react'
import { UpdateStatus } from './UpdateStatus'

const OrderAdminPage = () => {
  const { data, isLoading } = api.order.getAllOrder.useQuery()
  const { mutate } = api.order.updateStatusOrder.useMutation()
  const { t } = useTranslation('product')
  const utils = api.useContext()
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState()

  const handleOpen = (order: any) => {
    setOrder(order)
    setOpen(true)
  }
  const handleClose = () => {
    setOrder(undefined)
    setOpen(false)
  }

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

  const columns = [
    {
      header: t('name'),
      accessorKey: 'product.name',
    },
    {
      header: t('price'),
      accessorKey: 'product.price',
    },
    {
      header: t('quantity'),
      accessorKey: 'quantity',
    },
    {
      header: t('unit'),
      accessorKey: 'product.unit.name',
    },
    {
      header: t('image'),
      accessorKey: 'product.image[0].url',
      cell: ({ row }: { row: any }) => {
        return (
          <Image
            width="100"
            height="100"
            src={row.original.product.image[0] ? row.original.product.image[0].url : NoImage}
            alt={row.original.product.name}
          />
        )
      },
    },
    {
      header: t('status'),
      accessorKey: 'status.name',
      cell: ({ row }: { row: any }) => {
        return (
          <Typography
            onClick={() => handleOpen(row.original)}
            variant="body2"
            sx={{ cursor: 'pointer' }}
          >
            {row.original.status.name}
          </Typography>
        )
      },
    },
    {
      header: t('payment_method'),
      accessorKey: 'payment_method.payment_source',
    },
    {
      header: t('payment_status'),
      accessorKey: 'payment_method.status',
    },
    {
      header: t('address'),
      accessorKey: 'address.name',
      cell: ({ row }: { row: any }) => {
        const { address } = row.original
        return (
          <Stack>
            <Stack
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
                    <b>Họ và tên:</b> {address.name}
                  </Typography>

                  <Typography fontSize={14}>
                    <b>SDT:</b> {address.phone_number}
                  </Typography>

                  <Typography fontSize={14}>
                    <b>Địa chỉ:</b> {address.province.name} - {address.district.name} -{' '}
                    {address.ward.name}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )
      },
    },
    {
      header: t('created_at'),
      accessorKey: 'createdAt',
    },
    {
      header: '',
      accessorKey: 'action',
      cell: ({ row }: { row: any }) => {
        return (
          <Button
            onClick={() => handleUpdateStatusOrder(row.original.id)}
            variant="outlined"
            disabled={
              row.original.status.id === 'clnj24r0i0006wdy8sac4si32' ||
              row.original.status.id === 'clnq7yp8n0002wdekwpmedkdn'
            }
          >
            Huỷ đơn hàng
          </Button>
        )
      },
    },
  ]

  return (
    <LayoutAdmin>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h2">{t('title_order')}</Typography>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />
      {open && <UpdateStatus open={open} handleClose={handleClose} order={order} />}
    </LayoutAdmin>
  )
}

export { OrderAdminPage }
