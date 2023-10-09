import { grey, trueGrey } from '@/libs/config/colors'
import { CreateAddress, createAddressSchema } from '@/libs/schema/address.schema'
import { Input, Select } from '@/libs/shared/Form'
import { LayoutAccount } from '@/libs/shared/Layout'
import { ReactTable } from '@/libs/shared/Table'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Modal, Stack, Typography, styled } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import AddressIcon from 'public/assets/imgs/address.png'
import CloseIcon from 'public/assets/svgs/exit.svg'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Address = () => {
  const { t } = useTranslation('account')
  const [open, setOpen] = useState(false)
  const [provinceId, setProvinceId] = useState('')
  const [districtId, setDistrictId] = useState('')
  const { data, isLoading } = api.address.getAddress.useQuery()
  const { data: dataProvince } = api.address.getProvince.useQuery()
  const { data: dataDistrict } = api.address.getDistrictById.useQuery({ province_id: provinceId })
  const { data: dataWard } = api.address.getWardById.useQuery({ district_id: districtId })
  const { mutate } = api.address.createdAddress.useMutation()
  const { update } = useSession()
  const utils = api.useContext()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const provinceMapper = dataProvince?.map((item) => ({
    label: item.name,
    value: item.province_id,
  }))

  const districtMapper = dataDistrict?.map((item) => ({
    label: item.name,
    value: item.district_id,
  }))

  const wardMapper = dataWard?.map((item) => ({
    label: item.name,
    value: item.ward_id,
  }))

  const { control, handleSubmit, reset } = useForm<CreateAddress>({
    defaultValues: {
      name: '',
      phone_number: '',
      address_detail: '',
      district_id: '',
      province_id: '',
      ward_id: '',
      type_address: 'HOME',
    },
    resolver: zodResolver(createAddressSchema),
  })

  const typeAddress = [
    {
      label: t('address.home'),
      value: 'HOME',
    },
    {
      label: t('address.office'),
      value: 'OFFICE',
    },
    {
      label: t('address.other'),
      value: 'OTHER',
    },
  ]

  const onSubmit: SubmitHandler<CreateAddress> = async (data) => {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          enqueueSnackbar(t('create_success'), {
            variant: 'success',
          })
          handleClose()
          reset()
          update()
        },
        onError: (err) => {
          const error = String(err.message)
          const description = t(error, { ns: 'common' })
          enqueueSnackbar(t(`${description}`), {
            variant: 'error',
          })
        },
        onSettled: () => {
          utils.address.invalidate()
        },
      },
    )
  }

  const columns = [
    {
      header: t('name'),
      accessorKey: 'name',
    },
    {
      header: t('address.phone_number'),
      accessorKey: 'phone_number',
    },
    {
      header: t('address.province'),
      accessorKey: 'province.name',
    },
    {
      header: t('address.district'),
      accessorKey: 'district.name',
    },
    {
      header: t('address.ward'),
      accessorKey: 'ward.name',
    },

    {
      header: t('address.address_detail'),
      accessorKey: 'address_detail',
    },
    {
      header: t('address.type_address'),
      accessorKey: 'type_address',
    },
  ]

  return (
    <LayoutAccount>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h1">{t('address.big_title')}</Typography>

          <Button variant="contained" onClick={handleOpen}>
            {t('address.create_address')}
          </Button>
        </Stack>

        {data?.length === 0 ? (
          <Stack justifyContent="center" alignItems="center" height="60vh">
            <Stack width={300} alignItems="center" textAlign="center" spacing={3}>
              <Image src={AddressIcon} alt="image" width={200} height={200} />

              <Typography fontWeight={700}>{t('address.title1')}</Typography>

              <Typography>{t('address.title2')}</Typography>

              <Button onClick={handleOpen} variant="contained">
                {t('address.create_address')}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <ReactTable columns={columns} data={data || []} isLoading={isLoading} />
        )}

        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <BoxContainer component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction="row"
                justifyContent="space-between"
                pb={1}
                borderBottom={`1px solid ${trueGrey[200]}`}
              >
                <Typography fontWeight={700}>{t('address.create_address')}</Typography>

                <ButtonClose onClick={handleClose}>
                  <Image src={CloseIcon} alt="close icon" />
                </ButtonClose>
              </Stack>

              <Stack width="100%" spacing={2} padding={2} component="form" justifyContent="center">
                <Stack spacing={2} borderBottom={`1px dashed ${grey[400]}`}>
                  <Typography fontWeight={700}>{t('address.address_detail')}</Typography>

                  <Stack spacing={2} pb={3}>
                    <Input
                      control={control}
                      name="name"
                      label={t('name')}
                      placeholder={t('enter_name')}
                    />

                    <Input
                      control={control}
                      name="phone_number"
                      label={t('address.phone_number')}
                      placeholder={t('address.enter_phone_number')}
                    />
                  </Stack>
                </Stack>

                <Stack spacing={2} borderBottom={`1px dashed ${grey[400]}`} pb={3}>
                  <Typography fontWeight={700}>{t('address.info_user')}</Typography>

                  <Stack spacing={2}>
                    <Select
                      control={control}
                      name="province_id"
                      label={t('address.province')}
                      options={provinceMapper}
                      onChange={(e) => setProvinceId(e.target.value as string)}
                    />

                    <Select
                      control={control}
                      name="district_id"
                      label={t('address.district')}
                      options={districtMapper}
                      onChange={(e) => setDistrictId(e.target.value as string)}
                      disabled={provinceId === ''}
                    />

                    <Select
                      control={control}
                      name="ward_id"
                      label={t('address.ward')}
                      options={wardMapper}
                      disabled={districtId === ''}
                    />

                    <Input
                      control={control}
                      name="address_detail"
                      label={t('address.address_detail')}
                      placeholder={t('address.enter_address_detail')}
                      multiline
                      minRows={2}
                    />
                  </Stack>
                </Stack>
              </Stack>

              <Stack pb={2} px={2}>
                <Select
                  control={control}
                  name="type_address"
                  label={t('address.type_address')}
                  options={typeAddress}
                />
              </Stack>

              <Button variant="contained" fullWidth type="submit">
                {t('address.create_address')}
              </Button>
            </BoxContainer>
          </Modal>
        )}
      </Stack>
    </LayoutAccount>
  )
}

export { Address }

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  boxShadow: theme.shadows[1],
  padding: 20,
  borderRadius: 2,
  background: theme.palette.base.white,
  overflow: 'auto',
}))

const ButtonClose = styled(Button)({
  minWidth: 0,
  paddingTop: 0,
  paddingBottom: 0,
  padding: 0,
})
