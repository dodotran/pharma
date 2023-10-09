import { LoginSchema, type SignInType } from '@/libs/schema'
import { Input } from '@/libs/shared/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Typography, styled } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Stack } from '@mui/system'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import FacebookIcon from 'public/assets/imgs/facebook.png'
import GoogleIcon from 'public/assets/imgs/google.png'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormSignInType = {
  handleChangeTab: () => void
  handleToSignUp: () => void
}

const FormSignIn: React.FC<FormSignInType> = ({ handleChangeTab, handleToSignUp }) => {
  const router = useRouter()
  const { callbackUrl = '/' } = router.query

  const { control, handleSubmit } = useForm<SignInType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const {
    t,
    i18n: { language },
  } = useTranslation('auth')

  const onSubmit: SubmitHandler<SignInType> = async (data, event) => {
    const { email, password } = data
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      language: language,
    })

    if (res?.ok) {
      router.push(callbackUrl as string)
      enqueueSnackbar(t('sign-in.success'), { variant: 'success' })
    } else {
      const error = res?.error as string
      event?.preventDefault()
      error === 'verify'
        ? enqueueSnackbar(t('verify.title'), {
            variant: 'error',
            description: t('verify.description'),
            textIsKey: true,
            verifyEmail: email,
            persist: true,
          })
        : enqueueSnackbar(error, { variant: 'error', textIsKey: true })
    }
  }

  const githubSignIn = async () => {
    const res = await signIn('google', { callbackUrl: callbackUrl as string })
  }

  return (
    <Stack alignItems="center" width="100%" height="100%">
      <Typography textAlign="center" variant="h3">
        {t('sign-in.title')}
      </Typography>

      <Stack width="80%" spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
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

        <Button fullWidth variant="contained" type="submit">
          {t('sign-in.title')}
        </Button>
      </Stack>

      <Stack
        width="80%"
        mt={1}
        spacing={1}
        direction="row"
        justifyContent="end"
        alignItems="center"
        height={46}
      >
        <Typography variant="body2" onClick={handleChangeTab} mr={1.75} sx={{ cursor: 'pointer' }}>
          {t('sign-in.forgot')}
        </Typography>
      </Stack>

      <Divider flexItem>{t('or')}</Divider>

      <Stack width="80%" spacing={2} mt={2}>
        <ButtonAuth
          sx={{ borderColor: `${blue[400]} !important` }}
          startIcon={<Icon src={FacebookIcon} alt="facebook" />}
          onClick={githubSignIn}
        >
          Facebook
        </ButtonAuth>

        <ButtonAuth startIcon={<Icon src={GoogleIcon} alt="google" />}>Google</ButtonAuth>
      </Stack>

      <Stack justifyContent="center" direction="row" sx={{ cursor: 'pointer' }} mt={4}>
        <Typography variant="body2" mr={0.5}>
          {t('sign-in.not-account')}
        </Typography>

        <LinkSignUp onClick={handleToSignUp}>{t('sign-in.register')}</LinkSignUp>
      </Stack>
    </Stack>
  )
}

export { FormSignIn }

const ButtonAuth = styled(Button)({
  border: '1px solid',
})

const Icon = styled(Image)({
  width: 20,
  height: 20,
})

const LinkSignUp = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  cursor: 'pointer',
  color: theme.palette.blue[888],
  '&:hover': {
    textDecoration: 'underline',
  },
}))
