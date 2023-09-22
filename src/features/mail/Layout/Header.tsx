import { Img, Section } from '@react-email/components'
import { FC } from 'react'

const logo = 'https://i.imgur.com/l9pWgUw.png'

const Header: FC = () => {
  return (
    <Section className="px-6 py-1 sm:py-6 flex justify-start">
      <Img src={logo} className="w-[92px]" />
    </Section>
  )
}

export { Header }
