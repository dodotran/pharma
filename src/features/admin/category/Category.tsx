import { LayoutAdmin } from '@/libs/shared/Layout'
import { Modal } from '@/libs/shared/Modal'
import { ReactTable } from '@/libs/shared/Table'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { FormCreateCategory } from './FormCreateCategory'

const Category = () => {
  const { data: dataSession } = useSession()
  console.log(dataSession)

  const { data, isLoading } = api.category.get.useQuery()
  console.log(data)
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
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

      <Modal open={open} handleClose={handleClose} title="Category">
        <FormCreateCategory />
      </Modal>
    </LayoutAdmin>
  )
}

export { Category }
