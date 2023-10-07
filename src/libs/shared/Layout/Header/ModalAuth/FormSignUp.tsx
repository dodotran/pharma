import { SignUpInputSchema, SignUpInputType } from '@/libs/schema'
import { Input } from '@/libs/shared/Form'
import { DatePickerSeparator } from '@/libs/shared/Form/DatePicker'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormSignUpType = {
  handleClose: () => void
}

const FormSignUp: React.FC<FormSignUpType> = ({ handleClose }) => {
  const { t } = useTranslation('auth')
  const router = useRouter()
  const { mutate, isLoading } = api.auth.signUp.useMutation()

  const { control, handleSubmit } = useForm<SignUpInputType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      date_of_birth: '',
      language: 'vi',
    },
    resolver: zodResolver(SignUpInputSchema),
  })

  const onSubmit: SubmitHandler<SignUpInputType> = useCallback(
    async (data) => {
      mutate(
        { ...data, language: router.locale as 'vi' | 'en' },
        {
          onSuccess: () => {
            enqueueSnackbar(t('sign-up.success'), { variant: 'success' })
            handleClose()
          },
          onError: (err) => {
            const error = String(err.message)
            const description = t(error, { ns: 'common' })
            enqueueSnackbar(description, { variant: 'error' })
          },
        },
      )
    },
    [mutate, t],
  )

  return (
    <Stack alignItems="center" width="100%" height="100%" pb={3}>
      <Typography textAlign="center" variant="h3">
        {t('sign-up.title')}
      </Typography>

      <Stack width="90%" spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
        <Input
          control={control}
          name="email"
          label={t('sign-in.email') as string}
          fullWidth
          placeholder={t('sign-in.enter-email') as string}
        />

        <Input
          control={control}
          name="password"
          label={t('sign-in.password') as string}
          type="password"
          fullWidth
          placeholder={t('sign-in.enter-password') as string}
        />

        <Input
          control={control}
          name="name"
          label={t('sign-up.name') as string}
          fullWidth
          placeholder={t('sign-up.enter-name') as string}
        />

        <DatePickerSeparator
          control={control}
          name="date_of_birth"
          label={t('dob', { ns: 'common' })}
          fullWidth
        />

        <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
          {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}
          {t('sign-up.title')}
        </Button>
      </Stack>
    </Stack>
  )
}

export { FormSignUp }
