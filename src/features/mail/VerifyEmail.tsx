import { Link, Text } from '@react-email/components'
import { FC } from 'react'
import { MailLayout, textStyle } from './Layout'

interface EmailProps {
  url: string
  name: string
  language: string
}

const VerifyEmail: FC<EmailProps> = (props) => {
  const { url, name, language } = props
  return (
    <MailLayout language={language}>
      {language === 'jp' ? (
        <>
          <Text style={textStyle}>
            Xin chào <b>{name}</b>
          </Text>

          <Text style={textStyle}>
            Cảm ơn bạn đã đăng ký Pharma. Để hoàn tất việc đăng ký tài khoản, vui lòng nhấp vào liên
            kết bên dưới để hoàn tất xác minh email của bạn.
          </Text>

          <Text className="my-6" style={textStyle}>
            <Link href={url}>{url}</Link>
          </Text>
        </>
      ) : (
        <>
          <Text style={textStyle}>
            Hi <b>{name}</b>
          </Text>

          <Text style={textStyle}>
            Thank you for registering with KPI Master. To complete your account registration, please
            click on the link below to complete your email verification.
          </Text>

          <Text className="my-6" style={textStyle}>
            <Link href={url}>{url}</Link>
          </Text>
        </>
      )}
    </MailLayout>
  )
}

export { VerifyEmail }
