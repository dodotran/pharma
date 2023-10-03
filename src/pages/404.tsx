// @mui
import { Button, Container, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NotFound from 'public/assets/svgs/404-not-found.svg'

export default function Custom404() {
  const router = useRouter()

  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Image404 src={NotFound} alt="404" sx={{ mx: 'auto', my: { xs: 5, sm: 10 } }} />

          <Button variant="contained" onClick={() => router.push('/')}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  )
}

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

const Image404 = styled(Image)(({}) => ({}))
