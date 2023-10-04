import { LayoutAdmin } from '@/libs/shared/Layout'
import { Modal } from '@/libs/shared/Modal'
import { ReactTable } from '@/libs/shared/Table'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { FormCreateProduct } from './FormCreateProduct'

const Product = () => {
  const { data, isLoading } = api.product.getAll.useQuery()

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Price',
      accessorKey: 'price',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'Unit',
      accessorKey: 'unit.name',
    },
    {
      header: 'Expired',
      accessorKey: 'expired_date',
    },
    {
      header: 'Image',
      accessorKey: 'image[0]',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Category',
      accessorKey: 'category.name',
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
    },
    {
      header: 'Updated At',
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
        <Typography variant="h2">Product</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Create
        </Button>
      </Stack>

      <ReactTable columns={columns} data={data} isLoading={isLoading} />

      <Modal open={open} handleClose={handleClose} title="Product">
        <FormCreateProduct />
      </Modal>
    </LayoutAdmin>
  )
}

export { Product }
