import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  return (
    <Stack>
      <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
    </Stack>
  )
}

export { Home }
