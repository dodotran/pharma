import { Body, Container, Head, Html, Section, Tailwind, Text } from '@react-email/components'
import { FC, PropsWithChildren } from 'react'
import { Header } from './Header'

const MailLayout: FC<PropsWithChildren<{ language: string }>> = ({ children, language }) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body>
          <Container className="m-auto flex flex-col p-4 sm:p-10" style={main}>
            <Header />
            <Section className="px-6 py-1 sm:py-6">
              {children}
              {language === 'vi' ? (
                <>
                  <Text className="my-6" style={textStyle}>
                    Best regards
                  </Text>

                  <Text className="my-6" style={textStyle}>
                    Pharma Team
                  </Text>
                </>
              ) : (
                <>
                  <Text className="my-6" style={textStyle}>
                    Best regards.
                  </Text>

                  <Text className="my-6" style={textStyle}>
                    Pharma Team
                  </Text>
                </>
              )}
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

export { MailLayout }

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Noto Sans",sans-serif',
  maxWidth: '656px',
}

export const textStyle = {
  fontSize: '17px',
  color: '#222222',
}
