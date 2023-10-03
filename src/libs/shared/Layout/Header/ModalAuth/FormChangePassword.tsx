import { ChangePasswordInputSchema, ChangePasswordType } from '@/libs/schema'
import { Input } from '@/libs/shared/Form'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormChangePasswordType = {
  handleClose: () => void
}

const FormChangePassword: React.FC<FormChangePasswordType> = ({ handleClose }) => {
  const { t } = useTranslation('auth')
  const { mutate, isLoading } = api.auth.changePassword.useMutation()

  const { control, handleSubmit } = useForm<ChangePasswordType>({
    defaultValues: {
      'new-password': '',
      'old-password': '',
      'confirm-new-password': '',
    },
    resolver: zodResolver(ChangePasswordInputSchema),
  })

  const onSubmit: SubmitHandler<ChangePasswordType> = useCallback(
    async (data) => {
      mutate(
        { ...data },
        {
          onSuccess: () => {
            enqueueSnackbar(t('change-password.success'), {
              variant: 'success',
            })
            handleClose()
          },
          onError: (err) => {
            const error = String(err.message)
            const description = t(error, { ns: 'common' })
            enqueueSnackbar(t(`${description}`), {
              variant: 'error',
            })
          },
        },
      )
    },
    [mutate, t, handleClose],
  )

  return (
    <Stack width="100%" spacing={3} alignItems="center" paddingBottom={3}>
      <Typography textAlign="center" variant="h3">
        {t('change-password.title')}
      </Typography>

      <Typography textAlign="center">{t('change-password.description')}</Typography>

      <Stack component="form" spacing={3} width="80%" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="old-password"
          label={t('change-password.old-password') as string}
          fullWidth
          placeholder={t('change-password.enter-old-password') as string}
          type="password"
        />

        <Input
          control={control}
          name="new-password"
          label={t('change-password.new-password') as string}
          fullWidth
          placeholder={t('change-password.enter-new-password') as string}
          type="password"
        />

        <Input
          control={control}
          name="confirm-new-password"
          label={t('change-password.confirm-password') as string}
          fullWidth
          placeholder={t('change-password.enter-confirm-password') as string}
          type="password"
        />

        <Button variant="contained" type="submit">
          {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

          {t('change-password.submit')}
        </Button>
      </Stack>
    </Stack>
  )
}

export { FormChangePassword }
