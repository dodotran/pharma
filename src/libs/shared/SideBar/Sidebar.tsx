import { Box, List } from '@mui/material'
import { useTranslation } from 'next-i18next'
import UnitIcon from 'public/assets/imgs/boxes.png'
import CategoryIcon from 'public/assets/imgs/category.png'
import StatusOrderIcon from 'public/assets/imgs/clipboard.png'
import DashBoardIcon from 'public/assets/imgs/dashboard.png'
import MedicineIcon from 'public/assets/imgs/medicine.png'
import OrderIcon from 'public/assets/imgs/shopping-bag.png'
import TradeMarkIcon from 'public/assets/imgs/trademark.png'
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
    },
    {
      title: t('sidebar.product'),
      icon: MedicineIcon,
      href: '/admin/product',
    },
    { title: t('sidebar.category'), icon: CategoryIcon, href: '/admin/category' },
    {
      title: t('sidebar.unit'),
      icon: UnitIcon,
      href: '/admin/unit',
    },
    {
      title: t('sidebar.order'),
      icon: OrderIcon,
      href: '/admin/order',
    },
    {
      title: t('sidebar.status_order'),
      icon: StatusOrderIcon,
      href: '/admin/status-order',
    },
    {
      title: t('sidebar.trademark'),
      icon: TradeMarkIcon,
      href: '/admin/trademark',
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
