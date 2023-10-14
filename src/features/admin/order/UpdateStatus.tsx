import { trueGrey } from '@/libs/config/colors'
import { UpdateStatusOrderSchema, UpdateStatusOrderType } from '@/libs/schema/order.schema'
import { Select } from '@/libs/shared/Form'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, CircularProgress, Modal, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import CloseIcon from 'public/assets/svgs/exit.svg'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type UpdateProps = {
  order: any
  open: boolean
  handleClose: () => void
}

const UpdateStatus: React.FC<UpdateProps> = ({ order, open, handleClose }) => {
  const { t } = useTranslation('common')
  const { mutate, isLoading } = api.order.updateStatusOrder.useMutation()
  const { data } = api.order.getStatus.useQuery()
  const utils = api.useContext()

  const orderStatusMapping = data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const { control, handleSubmit, reset } = useForm<UpdateStatusOrderType>({
    defaultValues: {
      statusId: order?.status.id,
    },
    values: {
      statusId: order?.status.id,
    },
    resolver: zodResolver(UpdateStatusOrderSchema),
  })

  const onSubmit: SubmitHandler<UpdateStatusOrderType> = async (data) => {
    mutate(
      { ...data, id: order?.id as string },
      {
        onSuccess: () => {
          enqueueSnackbar(t('status_order.success'), {
            variant: 'success',
          })
          handleClose()
          reset()
        },
        onError: (err) => {
          const error = String(err.message)
          const description = t(error, { ns: 'common' })
          enqueueSnackbar(t(`${description}`), {
            variant: 'error',
          })
        },
        onSettled() {
          utils.order.invalidate()
        },
      },
    )
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <BoxContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          pb={1}
          borderBottom={`1px solid ${trueGrey[200]}`}
        >
          <Typography fontWeight={700}>{t('status_order.update')}</Typography>

          <ButtonClose onClick={handleClose}>
            <Image src={CloseIcon} alt="close icon" />
          </ButtonClose>
        </Stack>

        <Stack
          width="100%"
          spacing={3}
          padding={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Select
            control={control}
            name="statusId"
            label="Status order"
            options={orderStatusMapping || []}
          />

          <Button variant="contained" type="submit">
            {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

            {t('status_order.update')}
          </Button>
        </Stack>
      </BoxContainer>
    </Modal>
  )
}

export { UpdateStatus }

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: theme.shadows[1],
  padding: 20,
  borderRadius: 2,
  background: theme.palette.base.white,
}))

const ButtonClose = styled(Button)({
  minWidth: 0,
  paddingTop: 0,
  paddingBottom: 0,
  padding: 0,
})
