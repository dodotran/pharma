import { defaultTheme } from '@/libs/config/theme'
import { customComponents, defaultAnchor } from '@/libs/shared/Snackbar'
import { api } from '@/utils/api'
import { EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { AppProps, type AppType } from 'next/app'
import { SnackbarProvider } from 'notistack'
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider
          anchorOrigin={defaultAnchor}
          autoHideDuration={1000}
          Components={customComponents}
        >
          <CssBaseline />

          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(appWithTranslation(MyApp))
