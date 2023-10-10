import { UnitSchemaProductType } from '@/libs/schema/category.schema'
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

const Unit = () => {
  const { t } = useTranslation('common')
  const { data, isLoading } = api.unit.get.useQuery()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [unit, setUnit] = useState<UnitSchemaProductType | null>(null)

  const handleOpenUpdate = (unit: UnitSchemaProductType) => {
    setOpenUpdate(true)
    setUnit(unit)
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false)
    setUnit(null)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      header: t('unit.unit_id'),
      accessorKey: 'id',
    },
    {
      header: t('unit.unit_name'),
      accessorKey: 'name',
    },
    {
      header: t('unit.number-of-drugs'),
      accessorKey: 'product.length',
    },
    {
      header: t('unit.created_at'),
      accessorKey: 'createdAt',
    },
    {
      header: t('unit.updated_at'),
      accessorKey: 'updatedAt',
    },
    {
      header: '',
      accessorKey: 'action',
      cell: ({ row }: { row: any }) => {
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
        <Typography variant="h2">{t('unit.title')}</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          {t('unit.create')}
        </Button>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />

      <Create open={open} handleClose={handleClose} />

      <Update unit={unit} open={openUpdate} handleClose={handleCloseUpdate} />
    </LayoutAdmin>
  )
}

export { Unit }
