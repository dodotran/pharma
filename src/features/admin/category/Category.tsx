import { LayoutAdmin } from '@/libs/shared/Layout'
import { Modal } from '@/libs/shared/Modal'
import { ReactTable } from '@/libs/shared/Table'
import { ButtonDetail, MuiImage } from '@/libs/shared/styled'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import DetailIcon from 'public/assets/imgs/detail.png'
import EditIcon from 'public/assets/imgs/edit.png'
import { useState } from 'react'
import { Create } from './Create'
import { FormUpdateCategory } from './Update'

const Category = () => {
  const { data, isLoading } = api.category.get.useQuery()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [id, setId] = useState('')
  const { t } = useTranslation('common')

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

  const columns = [
    {
      header: t('category.category_id'),
      accessorKey: 'id',
    },
    {
      header: t('category.category_name'),
      accessorKey: 'name',
    },
    {
      header: t('category.number_of_drugs'),
      accessorKey: 'Product.length',
    },
    {
      header: t('category.created_at'),
      accessorKey: 'createdAt',
    },
    {
      header: t('category.updated_at'),
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

  return (
    <LayoutAdmin>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h2">{t('category.title')}</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          {t('category.create')}
        </Button>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />

      <Create open={open} handleClose={handleClose} />

      <Modal open={openUpdate} handleClose={handleCloseUpdate} title="Category">
        <FormUpdateCategory id={id} />
      </Modal>
    </LayoutAdmin>
  )
}

export { Category }
