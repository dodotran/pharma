import { ResetPasswordInputSchema, ResetPasswordType } from '@/libs/schema'
import { Input } from '@/libs/shared/Form'
import { Layout } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'

const ResetPassword = () => {
  const router = useRouter()
  const { mutate, isLoading } = api.auth.resetPassword.useMutation()

  const { t } = useTranslation('auth')

  const { control, handleSubmit } = useForm<ResetPasswordType>({
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: '',
    },
    resolver: zodResolver(ResetPasswordInputSchema),
  })

  const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
    const { token } = router.query as { token: string }
    mutate(
      {
        password: data.password,
        confirmPassword: data.confirmPassword,
        token,
      },

      {
        onSuccess: () => {
          enqueueSnackbar(t('reset-password.success'), {
            variant: 'success',
          })
          router.push('/')
        },
        onError(error) {
          enqueueSnackbar(t(error.message, { ns: 'common' }), {
            variant: 'error',
          })
        },
      },
    )
  }
  return (
    <Layout title={t('reset-password.title')}>
      <Stack
        width={{ xs: '100%', sm: 460 }}
        direction="column"
        margin="auto"
        mt={{ xs: 2, sm: 10 }}
        mb={5}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack alignItems="center" mb={{ xs: 3, sm: 4 }}>
          <Typography variant="h3" fontWeight={700}>
            {t('reset-password.title')}
          </Typography>
        </Stack>

        <Stack width={{ xs: '100%', sm: 450 }} spacing={2}>
          <Input
            control={control}
            name="password"
            label={t('reset-password.new-password') as string}
            type="password"
            placeholder={t('reset-password.enter-new-password') as string}
          />

          <Input
            control={control}
            name="confirmPassword"
            label={t('reset-password.confirm-password') as string}
            type="password"
            placeholder={t('reset-password.enter-confirm-password') as string}
          />

          <Button
            variant="contained"
            disabled={isLoading}
            sx={{ textTransform: 'capitalize' }}
            type="submit"
          >
            {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}
            {t('reset-password.submit')}
          </Button>
        </Stack>
      </Stack>
    </Layout>
  )
}

export { ResetPassword }
