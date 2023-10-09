import { OrderAdminPage } from '@/features/admin/order'
import { authOptions } from '@/server/auth'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'auth', 'product'])),
    },
  }
}

export default OrderAdminPage
