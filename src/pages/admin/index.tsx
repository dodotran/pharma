import { Product } from '@/features/admin'
import { StatusOrder } from '@/features/admin/status-order'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'auth', 'product'])),
    },
  }
}

export default StatusOrder
