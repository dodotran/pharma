import { Button, Link, Text } from '@react-email/components'
import { FC } from 'react'
import { MailLayout } from './Layout'

interface EmailProps {
  url: string
  name: string
  language: string
}

const ForgotPasswordMail: FC<EmailProps> = (props) => {
  const { url, name, language } = props
  return (
    <MailLayout language={language}>
      {language === 'vi' ? (
        <>
          <Text style={textStyle}>
            Xin chào <b>{name}</b>
          </Text>

          <Text style={textStyle}>
            Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn không làm
            yêu cầu này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không bị thay đổi. Để
            thiết lập lại mật khẩu của bạn, vui lòng nhấp vào nút bên dưới:
          </Text>
          <Button
            href={url}
            style={{ color: 'white !important' }}
            className="w-[154px] bg-[#129151] text-center py-[14px] text-white rounded-[6px] font-semibold"
          >
            Đặt lai mật khẩu
          </Button>

          <Text className="my-6" style={textStyle}>
            Bạn cũng có thể nhấp vào đường dẫn này để đặt lại mật khẩu::&nbsp;
            <Link href={url}>{url}</Link>
          </Text>
        </>
      ) : (
        <>
          <Text style={textStyle}>
            Hi <b>{name}</b>
          </Text>

          <Text style={textStyle}>
            We have received a request to reset the password for your account. If you did not make
            this request, please ignore this email and your password will not be changed. To reset
            your password, please click the button below:
          </Text>

          <Button
            href={url}
            style={{ color: 'white !important' }}
            className="w-[154px] bg-[#129151] text-center py-[14px] text-white rounded-[6px] font-semibold"
          >
            Reset password
          </Button>

          <Text className="my-6" style={textStyle}>
            If the button doesn&apos;t work, please use this link to access the password reset page:
          </Text>

          <Text className="my-6" style={textStyle}>
            <Link href={url}>{url}</Link>
          </Text>
        </>
      )}
    </MailLayout>
  )
}

export { ForgotPasswordMail }

const textStyle = {
  fontSize: '17px',
  color: '#222222',
}
