import { Button, Stack } from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <Stack>
      <Button onClick={() => router.push('/sign-in')}>Sign in</Button>
    </Stack>
  )
}

function AuthShowcase() {
  const { data: sessionData } = useSession()

  return (
    <div>
      <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      <button onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}
