import { Box, List } from '@mui/material'
import { useTranslation } from 'next-i18next'
import DashBoardIcon from 'public/assets/svgs/dashboard.svg'
import { HEADER_HEIGHT } from '../Layout/Header/AppBar'
import { ListItemButton } from './ItemSideBar'

const SIDE_BAR_WIDTH = 250

const Sidebar = () => {
  const { t } = useTranslation('common')

  const menus = [
    {
      title: t('sidebar.dashboard'),
      icon: DashBoardIcon,
      href: '/admin',
      subMenu: [
        { title: 'Hwhwwh', icon: DashBoardIcon, href: '/admin' },
        { title: 'Hwhwwh', icon: DashBoardIcon, href: '/admin' },
        { title: 'Hwhwwh', icon: DashBoardIcon, href: '/admin' },
      ],
    },
    { title: t('sidebar.category'), icon: DashBoardIcon, href: '/admin/category' },
    {
      title: t('sidebar.product'),
      icon: DashBoardIcon,
      href: '/admin/product',
    },
  ]

  return (
    <Box
      sx={{
        marginTop: `${HEADER_HEIGHT}px`,
        width: SIDE_BAR_WIDTH,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          width: SIDE_BAR_WIDTH,
          height: '100%',
          borderRight: (theme) => `1px solid ${theme.palette.greyScale[300]}`,
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            px: 2,
            py: 3.25,
            transition: 'all 1s ease-in-out',
          }}
          component="nav"
        >
          {menus.map((menu) => (
            <ListItemButton key={menu.title} menu={menu} />
          ))}
        </List>
      </Box>
    </Box>
  )
}

export { Sidebar }
