import { LayoutAdmin } from '@/libs/shared/Layout'
import { ReactTable } from '@/libs/shared/Table'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Create } from './Create'

const Product = () => {
  const { data, isLoading } = api.product.getAll.useQuery()
  const { t } = useTranslation('product')

  const columns = [
    {
      header: t('name'),
      accessorKey: 'name',
    },
    {
      header: t('price'),
      accessorKey: 'price',
    },
    {
      header: t('quantity'),
      accessorKey: 'quantity',
    },
    {
      header: t('unit'),
      accessorKey: 'unit.name',
    },
    {
      header: t('expired_date'),
      accessorKey: 'expired_date',
    },
    {
      header: t('image'),
      accessorKey: 'image[0]',
    },
    {
      header: t('status'),
      accessorKey: 'status',
    },
    {
      header: t('category'),
      accessorKey: 'category.name',
    },
    {
      header: t('created_at'),
      accessorKey: 'createdAt',
    },
    {
      header: t('updated_at'),
      accessorKey: 'updatedAt',
    },
  ]

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <LayoutAdmin>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h2">{t('title')}</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          {t('create')}
        </Button>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />

      <Create open={open} handleClose={handleClose} />
    </LayoutAdmin>
  )
}

export { Product }
