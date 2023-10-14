import { api } from '@/utils/api'
import {
  Box,
  Modal,
  Tab as MuiTab,
  Tabs as MuiTabs,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NoImage from 'public/assets/imgs/no-image.png'
import ArrowRightIcon from 'public/assets/svgs/arrow-right.svg'
import { useState } from 'react'
import { HEADER_CLIENT_HEIGHT } from '../AppBar'

type ModalCategoryType = {
  open: boolean
  handleClose: () => void
}

type TabPanelProps = {
  children: React.ReactNode
  dir?: string
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ModalCategory: React.FC<ModalCategoryType> = ({ handleClose, open }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { data } = api.category.get.useQuery()
  const { data: product } = api.product.getRandomProduct.useQuery()

  const router = useRouter()
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ zIndex: 1 }}
    >
      <BoxContainer>
        <Stack direction="row">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation="vertical"
          >
            {data?.map((item, index) => (
              <Tab
                label={item.name}
                {...a11yProps(0)}
                icon={<Image src={ArrowRightIcon} alt="icon" />}
                iconPosition="end"
                key={index}
              />
            ))}
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            <Stack direction="row" spacing={3}>
              {product?.map((item, index) => (
                <Stack
                  key={index}
                  maxWidth={250}
                  spacing={1}
                  onClick={() => router.push(`detail-product/${item.id}`)}
                >
                  <Image
                    src={item.image[0]?.url ? item?.image[0].url : NoImage}
                    alt="image"
                    width={100}
                    height={100}
                  />

                  <Typography
                    variant="body2"
                    width={200}
                    whiteSpace="normal"
                    textOverflow="ellipsis"
                  >
                    {item.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Stack direction="row" spacing={3}>
              {product?.map((item, index) => (
                <Stack
                  key={index}
                  maxWidth={250}
                  spacing={1}
                  onClick={() => router.push(`detail-product/${item.id}`)}
                >
                  <Image
                    src={item.image[0]?.url ? item?.image[0].url : NoImage}
                    alt="image"
                    width={100}
                    height={100}
                  />

                  <Typography
                    variant="body2"
                    width={200}
                    whiteSpace="normal"
                    textOverflow="ellipsis"
                  >
                    {item.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Stack direction="row" spacing={3}>
              {product?.map((item, index) => (
                <Stack
                  key={index}
                  maxWidth={250}
                  spacing={1}
                  onClick={() => router.push(`detail-product/${item.id}`)}
                >
                  <Image
                    src={item.image[0]?.url ? item?.image[0].url : NoImage}
                    alt="image"
                    width={100}
                    height={100}
                  />

                  <Typography
                    variant="body2"
                    width={200}
                    whiteSpace="normal"
                    textOverflow="ellipsis"
                  >
                    {item.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CustomTabPanel>
        </Stack>
      </BoxContainer>
    </Modal>
  )
}

export { ModalCategory }

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: HEADER_CLIENT_HEIGHT + 30,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80%',
  minHeight: 250,
  boxShadow: theme.shadows[1],
  padding: '20px 15px',
  borderRadius: 10,
  background: theme.palette.base.white,
}))

const Tabs = styled(MuiTabs)(({ theme }) => ({}))

const Tab = styled(MuiTab)(({ theme }) => ({
  fontWeight: 700,
  height: 30,
  marginRight: 11,
  backgroundColor: theme.palette.base.black[300],
  color: theme.palette.base.gray[300],
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}))
