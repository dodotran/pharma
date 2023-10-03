import { ForgotPasswordInputSchema, ForgotPasswordType } from '@/libs/schema'
import { Input } from '@/libs/shared/Form'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormForgotPasswordType = {
  handleClose: () => void
}

const FormForgotPassword: React.FC<FormForgotPasswordType> = ({ handleClose }) => {
  const { t } = useTranslation('auth')
  const { mutate, isLoading } = api.auth.forgotPassword.useMutation()
  const router = useRouter()

  const { control, handleSubmit } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
      language: 'vi',
    },
    resolver: zodResolver(ForgotPasswordInputSchema),
  })

  const onSubmit: SubmitHandler<ForgotPasswordType> = useCallback(
    async (data) => {
      mutate(
        { ...data, language: router.locale as 'vi' | 'en' },
        {
          onSuccess: () => {
            enqueueSnackbar(t('forgot-password.success'), {
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
    [mutate, t],
  )

  return (
    <Stack width="100%" spacing={3} alignItems="center">
      <Typography textAlign="center" variant="h3">
        {t('forgot-password.title')}
      </Typography>

      <Typography textAlign="center">{t('forgot-password.description')}</Typography>

      <Stack component="form" spacing={3} width="80%" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="email"
          label={t('sign-in.email') as string}
          fullWidth
          placeholder={t('sign-in.enter-email') as string}
        />

        <Button variant="contained" type="submit">
          {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

          {t('forgot-password.submit')}
        </Button>
      </Stack>
    </Stack>
  )
}

export { FormForgotPassword }
