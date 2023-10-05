import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const data = fetch('/api/open-api/product')
  console.log('DATA: ', data)
  return (
    <Stack>
      <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
    </Stack>
  )
}

export { Home }
