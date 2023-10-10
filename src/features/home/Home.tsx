import { greyScale } from '@/libs/config/colors'
import { Layout } from '@/libs/shared/Layout'
import { ListTrademark, Product } from '@/libs/shared/components'
import { api } from '@/utils/api'
import { Box, Grid, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import Slide1 from 'public/assets/imgs/Slide1.webp'
import Banner from 'public/assets/imgs/banner_1.webp'
import Slide2 from 'public/assets/imgs/slide_2.webp'
import Slide3 from 'public/assets/imgs/slide_3.webp'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Home = () => {
  const { data: productData } = api.product.getAll.useQuery()
  const { data } = api.product.getRandomProduct.useQuery()

  return (
    <Layout>
      <Box padding="0 310px">
        <Stack direction="row" justifyContent="center" spacing={3}>
          <SwiperStyled
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image src={Slide1} alt="slide 1" width={805} height={246} />
            </SwiperSlide>

            <SwiperSlide>
              <Image src={Slide2} alt="slide 2" width={805} height={246} />
            </SwiperSlide>

            <SwiperSlide>
              <Image src={Slide3} alt="slide 3" width={805} height={246} />
            </SwiperSlide>
          </SwiperStyled>

          <Stack spacing={2}>
            <Image src={Banner} alt="banner" />

            <Tab>
              <Typography>Cùng Nhà thuốc Pharma bảo vệ sức khỏe của bạn.</Typography>
            </Tab>
          </Stack>
        </Stack>

        <Box mt={4} pt={2} borderTop={`1px dashed ${greyScale[300]}`}>
          <Typography variant="h3">Sản phẩm nổi bật</Typography>

          <Grid container rowSpacing={4} spacing={5} width="100%" mt={1}>
            {productData?.map((item, index) => (
              <Grid item key={index}>
                <Product
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  unitName={item?.unit?.name}
                  image={item.image[0]?.url}
                  key={item.id}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={4} pt={2} borderTop={`1px dashed ${greyScale[300]}`}>
          <Typography variant="h3">Sản phẩm bán chạy</Typography>

          <Grid container rowSpacing={4} spacing={6} width="100%" mt={1}>
            {data?.map((item, index) => (
              <Grid item key={index}>
                <Product
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  unitName={item?.unit?.name}
                  image={item.image[0]?.url}
                  key={item.id}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={4} pt={2} borderTop={`1px dashed ${greyScale[300]}`}>
          <Typography variant="h3" mb={3}>
            Thương hiệu yêu thích
          </Typography>

          <ListTrademark />
        </Box>
      </Box>
    </Layout>
  )
}

export { Home }

const SwiperStyled = styled(Swiper)({
  height: 246,
  width: 805,
  padding: '0px !important',
  marginLeft: '0px !important',
  marginRight: '0px !important',
})

const Tab = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 5),
  backgroundColor: theme.palette.blueGrey[400],
  height: '100%',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 391,
  color: theme.palette.common.white,
}))
