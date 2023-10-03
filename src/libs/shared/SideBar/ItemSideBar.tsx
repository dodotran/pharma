import {
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled,
} from '@mui/material'
import Image, { type StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type StyleListItemButtonType = {
  active?: boolean
}

type ListItemButtonType = {
  menu: {
    title: string
    icon: StaticImageData
    href: string
    disable?: boolean
    subMenu?: {
      title: string
      icon: StaticImageData
      href: string
    }[]
  }
}

const ListItemButton: React.FC<ListItemButtonType> = ({ menu }) => {
  const router = useRouter()

  const checkHref = (href: string) => {
    return router.pathname === href
  }

  const handleDirection = (href: string) => {
    // router.push(menu.href)
    if (href === '/admin') {
      setOpen(!open)
    }
  }

  const [open, setOpen] = React.useState(false)

  return (
    <>
      <StyleListItemButton
        active={checkHref(menu.href)}
        onClick={() => handleDirection(menu.href)}
        disabled={menu.disable}
      >
        <ListItemIcon>
          <MuiImage src={menu.icon} alt={menu.title} />
        </ListItemIcon>

        <ListItemText primary={menu.title} />
      </StyleListItemButton>

      {open &&
        menu.subMenu?.map((subMenu) => (
          <StyleListSubItemButton key={subMenu.title}>
            <ListItemIcon>
              <MuiImage src={subMenu.icon} alt={subMenu.title} />
            </ListItemIcon>

            <ListItemText primary={subMenu.title} />
          </StyleListSubItemButton>
        ))}
    </>
  )
}

const StyleListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyleListItemButtonType>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.rgba[0] : theme.palette.common.white,
  color: active ? theme.palette.green[700] : theme.palette.coolGrey[500],
  borderRadius: '6px',
  padding: `10px 12px`,
  marginBottom: theme.spacing(1),

  '&:hover': {
    backgroundColor: active && theme.palette.rgba[1],
  },
}))

const StyleListSubItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyleListItemButtonType>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.rgba[0] : theme.palette.common.white,
  color: active ? theme.palette.green[700] : theme.palette.coolGrey[500],
  borderRadius: '6px',
  padding: '10px 14px',
  marginLeft: 24,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: active && theme.palette.rgba[1],
  },
}))

const ListItemIcon = styled(MuiListItemIcon)({
  minWidth: 20,
  marginRight: '14px',
})

const ListItemText = styled(MuiListItemText)({
  '.MuiListItemText-primary': {
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  margin: 0,
})

const MuiImage = styled(Image)({
  width: 24,
  height: 24,
})

export { ListItemButton, ListItemIcon, ListItemText }
