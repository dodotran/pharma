import { Box, List } from '@mui/material'
import { useTranslation } from 'next-i18next'
import UnitIcon from 'public/assets/imgs/boxes.png'
import CategoryIcon from 'public/assets/imgs/category.png'
import DashBoardIcon from 'public/assets/imgs/dashboard.png'
import { HEADER_HEIGHT } from '../Layout/Header/AppBar'
import { ListItemButton } from './ItemSideBar'

const SIDE_BAR_WIDTH = 250

const SidebarAccount = () => {
  const { t } = useTranslation('common')

  const menus = [
    {
      title: t('sidebar_account.info_account'),
      icon: DashBoardIcon,
      href: '/account',
    },
    {
      title: t('sidebar_account.address_management'),
      icon: CategoryIcon,
      href: '/account/address',
    },
    {
      title: t('sidebar_account.history_order'),
      icon: UnitIcon,
      href: '/account/history-order',
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

export { SidebarAccount }
