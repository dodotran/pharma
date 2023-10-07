import { CategorySchemaType } from '@/libs/schema/category.schema'
import { LayoutAdmin } from '@/libs/shared/Layout'
import { ReactTable } from '@/libs/shared/Table'
import { ButtonDetail, MuiImage } from '@/libs/shared/styled'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import DetailIcon from 'public/assets/imgs/detail.png'
import EditIcon from 'public/assets/imgs/edit.png'
import { useState } from 'react'
import { Create } from './Create'
import { Update } from './Update'

const Category = () => {
  const { data, isLoading } = api.category.get.useQuery()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [category, setCategory] = useState<CategorySchemaType | null>(null)
  const { t } = useTranslation('common')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpenUpdate = (data: CategorySchemaType) => {
    setCategory(data)
    setOpenUpdate(true)
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false)
    setCategory(null)
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
      accessorKey: 'product.length',
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
        return (
          <Stack direction="row" alignItems="center" spacing={3.5}>
            <ButtonDetail>
              <MuiImage src={DetailIcon} alt="detail" />
            </ButtonDetail>

            <ButtonDetail onClick={() => handleOpenUpdate(row.original)}>
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

      {open && <Create open={open} handleClose={handleClose} />}

      {openUpdate && (
        <Update category={category} open={openUpdate} handleClose={handleCloseUpdate} />
      )}
    </LayoutAdmin>
  )
}

export { Category }
