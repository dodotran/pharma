import { LayoutAdmin } from '@/libs/shared/Layout'
import { Modal } from '@/libs/shared/Modal'
import { ReactTable } from '@/libs/shared/Table'
import { ButtonDetail, MuiImage } from '@/libs/shared/styled'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import DetailIcon from 'public/assets/imgs/detail.png'
import EditIcon from 'public/assets/imgs/edit.png'
import { useState } from 'react'
import { FormCreateCategory } from './FormCreateCategory'
import { FormUpdateCategory } from './FormUpdateCategory'

const Category = () => {
  const { data, isLoading } = api.category.get.useQuery()

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
    {
      header: '',
      accessorKey: 'action',
      cell: ({ row }) => {
        const { id } = row.original

        return (
          <Stack direction="row" alignItems="center" spacing={3.5}>
            <ButtonDetail>
              <MuiImage src={DetailIcon} alt="detail" />
            </ButtonDetail>

            <ButtonDetail onClick={() => handleOpenUpdate(id)}>
              <MuiImage src={EditIcon} alt="edit" />
            </ButtonDetail>
          </Stack>
        )
      },
    },
  ]

  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [id, setId] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpenUpdate = (id: string) => {
    setId(id)
    setOpenUpdate(true)
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false)
    setId('')
  }

  return (
    <LayoutAdmin>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h2">Product</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Create
        </Button>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />

      <Modal open={open} handleClose={handleClose} title="Category">
        <FormCreateCategory />
      </Modal>

      <Modal open={openUpdate} handleClose={handleCloseUpdate} title="Category">
        <FormUpdateCategory id={id} />
      </Modal>
    </LayoutAdmin>
  )
}

export { Category }
