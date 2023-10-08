import { trueGrey } from '@/libs/config/colors'
import {
  CategorySchemaType,
  CreateCategorySchema,
  CreateCategorySchemaType,
} from '@/libs/schema/category.schema'
import { Input } from '@/libs/shared/Form'
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
  category: CategorySchemaType | null
  open: boolean
  handleClose: () => void
}

const Update: React.FC<UpdateProps> = ({ category, open, handleClose }) => {
  const { t } = useTranslation('common')
  const { mutate, isLoading } = api.category.update.useMutation()
  const utils = api.useContext()

  const { control, handleSubmit, reset } = useForm<CreateCategorySchemaType>({
    defaultValues: {
      name: category?.name as string,
    },
    values: {
      name: category?.name as string,
    },
    resolver: zodResolver(CreateCategorySchema),
  })

  const onSubmit: SubmitHandler<CreateCategorySchemaType> = async (data) => {
    mutate(
      { name: data.name, id: category?.id as string },
      {
        onSuccess: () => {
          enqueueSnackbar(t('category.success'), {
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
          utils.category.invalidate()
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
          <Typography fontWeight={700}>{t('category.update')}</Typography>

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
          <Stack>
            <Input
              control={control}
              name="name"
              label={t('category.category_name') as string}
              fullWidth
              placeholder={t('category.category_name_placeholder') as string}
              required
            />
          </Stack>

          <Button variant="contained" type="submit">
            {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

            {t('category.update')}
          </Button>
        </Stack>
      </BoxContainer>
    </Modal>
  )
}

export { Update }

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
