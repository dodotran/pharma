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

const StatusOrder = () => {
  const { t } = useTranslation('common')
  const { data, isLoading } = api.order.getStatus.useQuery()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [status, setStatus] = useState<UnitSchemaProductType | null>(null)

  const handleOpenUpdate = (status: UnitSchemaProductType) => {
    setOpenUpdate(true)
    setStatus(status)
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false)
    setStatus(null)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      header: t('status_order.status_id'),
      accessorKey: 'id',
    },
    {
      header: t('status_order.status_name'),
      accessorKey: 'name',
    },
    {
      header: t('status_order.created_at'),
      accessorKey: 'createdAt',
    },
    {
      header: t('status_order.updated_at'),
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
        <Typography variant="h2">{t('status_order.title')}</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          {t('status_order.create')}
        </Button>
      </Stack>
      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />

      {open && <Create open={open} handleClose={handleClose} />}

      {openUpdate && <Update unit={status} open={openUpdate} handleClose={handleCloseUpdate} />}
    </LayoutAdmin>
  )
}

export { StatusOrder }
