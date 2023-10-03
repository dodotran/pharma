import { Img, Section } from '@react-email/components'
import { FC } from 'react'

const logo =
  'https://gorzelinski.com/static/1db41e3ecd311724a15306b270d99dd9/6e87d/next-js-logo.png'

const Header: FC = () => {
  return (
    <Section className="px-6 py-1 sm:py-6 flex justify-start">
      <Img src={logo} className="w-[92px]" />
    </Section>
  )
}

export { Header }
