import { defaultTheme } from '@/libs/config/theme'
import { customComponents, defaultAnchor } from '@/libs/shared/Snackbar'
import { api } from '@/utils/api'
import { EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { AppProps, type AppType } from 'next/app'
import { SnackbarProvider } from 'notistack'

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: 'USD',
  intent: 'capture',
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <PayPalScriptProvider options={initialOptions}>
            <SnackbarProvider
              anchorOrigin={defaultAnchor}
              autoHideDuration={1000}
              Components={customComponents}
            >
              <CssBaseline />

              <Component {...pageProps} />
            </SnackbarProvider>
          </PayPalScriptProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(appWithTranslation(MyApp))
