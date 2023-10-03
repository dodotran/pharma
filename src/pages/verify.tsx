import { Layout } from '@/libs/shared/Layout'
import { authRouter } from '@/server/api/routers/auth'
import { authOptions } from '@/server/auth'
import { prisma } from '@/server/db'
import { Button, Stack, Typography, styled } from '@mui/material'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import VerifyError from 'public/assets/imgs/failed.png'
import VerifySuccess from 'public/assets/imgs/pass.png'
import { FC, useState } from 'react'

export async function getServerSideProps({ locale, req, res, query }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  if (session || !query?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const caller = authRouter.createCaller({ session: null, prisma })

  let success
  let errorMessage = ''

  try {
    await caller.verify({ token: query?.token as string })
    success = true
  } catch (error) {
    success = false
    errorMessage = (error as { message: string }).message
  }

  return {
    props: {
      success,
      errorMessage,
      ...(await serverSideTranslations(locale as string, ['common', 'auth'])),
    },
  }
}

type Props = {
  success: boolean
  errorMessage?: string
}

const Verify: FC<Props> = ({ success, errorMessage }) => {
  const { t } = useTranslation('common')
  const [_success] = useState(success)

  return (
    <Layout title={t('verify.title')}>
      <Stack mb={2} pt={{ xs: 2, sm: 5 }} alignItems="center">
        <Stack alignItems="center" mb={4}>
          <MuiImage src={_success ? VerifySuccess : VerifyError} alt="verify image" />

          <Typography mt={1.5}>{t(_success ? 'verify.success' : 'verify.failed')}</Typography>

          <Typography>
            {t(_success ? 'vartify.description-success' : (errorMessage as string))}
          </Typography>
        </Stack>

        <Stack width={{ xs: '100%', md: 460 }} spacing={2}>
          <Button LinkComponent={Link} href="/" fullWidth variant="contained">
            {t('Ok')}
          </Button>
        </Stack>
      </Stack>
    </Layout>
  )
}

export default Verify

const MuiImage = styled(Image)({
  width: 100,
  height: 100,
})
