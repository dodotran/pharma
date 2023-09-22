import { LoginSchema, type SignInType } from '@/libs/schema'
import { Input } from '@/libs/shared/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignIn = () => {
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
  } = useTranslation('common')

  const redirectForgot = () => {
    router.push('/forgot-password')
  }

  const redirectSignUp = () => {
    router.push('/sign-up')
  }

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
    } else {
      const error = res?.error as string
      enqueueSnackbar(error, { variant: 'error' })
      event?.preventDefault()
    }
  }

  return (
    <>
      <Stack direction="row" justifyContent="center" pt={{ xs: 2, sm: 10 }}>
        <Stack
          alignItems="center"
          sx={{ mr: { md: 8, xl: 19.375 }, display: { xs: 'none', lg: 'flex' } }}
          spacing={5.25}
          justifyContent="center"
        >
          {/* <video autoPlay loop muted height={362} width={635}>
            <source src="/assets/videos/banner.mp4" type="video/mp4" />
          </video> */}

          {/* <Stack direction="row" spacing={5}>
            <Image src={Hand1} alt="hand 1" />
            <Image src={Hand2} alt="hand 2" />
            <Image src={Hand3} alt="hand 3" />
          </Stack> */}
        </Stack>

        <Stack
          sx={{
            width: { xs: '100%', sm: 450 },
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Stack alignItems="center" mb={4}>
            {/* <Image src={Logo} priority alt="logo" /> */}

            <Typography align="center">{t('title')}</Typography>

            <Typography align="center" width={{ xs: '100%', sm: 500 }}>
              {t('child_title')}
            </Typography>
          </Stack>

          <Stack width="100%" spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              control={control}
              name="email"
              label={t('email') as string}
              fullWidth
              placeholder={t('enter_email') as string}
            />

            <Input
              control={control}
              name="password"
              label={t('password') as string}
              type="password"
              fullWidth
              placeholder={t('enter_password') as string}
            />

            <Button fullWidth variant="contained" type="submit">
              {t('title')}
            </Button>
          </Stack>

          <Stack width={{ xs: '100%', sm: 450 }} mt={1} spacing={1}>
            <Stack direction="row" justifyContent="end" alignItems="center" height={46}>
              <Typography onClick={redirectForgot} mr={1.75}>
                {t('forgot')}
              </Typography>
            </Stack>

            <Stack py={1.5} spacing={0.5} justifyContent="center" direction="row">
              <Typography variant="body2" color="greyScale.600" fontWeight={400}>
                {t('not_have_account')}
              </Typography>

              <Typography onClick={redirectSignUp}>{t('sign_up')}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export { SignIn }
