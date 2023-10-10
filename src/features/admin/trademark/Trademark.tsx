import { TrademarkProduct } from '@/libs/schema/trademark'
import { LayoutAdmin } from '@/libs/shared/Layout'
import { ReactTable } from '@/libs/shared/Table'
import { ButtonDetail, MuiImage } from '@/libs/shared/styled'
import { api } from '@/utils/api'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import DetailIcon from 'public/assets/imgs/detail.png'
import EditIcon from 'public/assets/imgs/edit.png'
import { useState } from 'react'
import { Create } from './Create'
import { Update } from './Update'

const Trademark = () => {
  const { t } = useTranslation('trademark')
  const { data, isLoading } = api.trademark.get.useQuery()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [status, setStatus] = useState<TrademarkProduct | null>(null)

  const handleOpenUpdate = (status: TrademarkProduct) => {
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
      header: t('id'),
      accessorKey: 'id',
    },
    {
      header: t('name_trademark'),
      accessorKey: 'name',
    },
    {
      header: t('country_trademark'),
      accessorKey: 'country',
    },
    {
      header: t('image'),
      accessorKey: 'image',
      cell: ({ row }: { row: any }) => {
        return <Image width="100" height="100" src={row.original.image} alt={row.original.name} />
      },
    },
    {
      header: t('introduce'),
      accessorKey: 'introduce',
    },
    {
      header: t('number_of_drugs'),
      accessorKey: 'product.length',
    },
    {
      header: t('created_at'),
      accessorKey: 'createdAt',
    },
    {
      header: t('updated_at'),
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
        <Typography variant="h2">{t('title')}</Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          {t('create.title')}
        </Button>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />

      {open && <Create open={open} handleClose={handleClose} />}

      {openUpdate && <Update unit={status} open={openUpdate} handleClose={handleCloseUpdate} />}
    </LayoutAdmin>
  )
}

export { Trademark }
