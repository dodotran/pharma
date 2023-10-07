import { Layout } from '@/libs/shared/Layout'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  return (
    <Layout>
      <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
    </Layout>
  )
}

export { Home }
