import { yellow } from '@/libs/config/colors'
import { LayoutAdmin } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { Box, Stack, Typography } from '@mui/material'
import { Chart as ChartJS, registerables } from 'chart.js'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(...registerables)

const Dashboard = () => {
  const { data: totalOrder } = api.order.getRevenue.useQuery()
  const { data: dataProduct } = api.product.getAll.useQuery()
  const { data: dataOrder } = api.order.orderPending.useQuery()
  const { data: dataChart } = api.order.getOrderByMonth.useQuery()

  const [userData, setUserData] = useState({
    labels: dataChart?.map((data: any) => data.title),
    datasets: [
      {
        label: 'Tổng doang thu theo tháng',
        data: dataChart?.map((data: any) => data.total),
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  })

  return (
    <LayoutAdmin>
      <Stack direction="row" spacing={5}>
        <Box width={900}>{dataChart && <Bar data={userData} />}</Box>

        <Stack spacing={3}>
          <Stack bgcolor={yellow[200]} p={3} alignItems="center" spacing={3} borderRadius={2}>
            <Typography variant="body1">Tổng đơn sản phẩm tồn kho</Typography>
            <Typography variant="h5" fontWeight={700}>
              {dataProduct?.length}
            </Typography>
          </Stack>

          <Stack bgcolor={yellow[200]} p={3} alignItems="center" spacing={3} borderRadius={2}>
            <Typography variant="body1">Doanh thu</Typography>

            <Typography variant="h5" fontWeight={700}>
              {totalOrder?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Typography>
          </Stack>

          <Stack bgcolor={yellow[200]} p={3} alignItems="center" spacing={3} borderRadius={2}>
            <Typography variant="body1">Số đơn hàng chưa thanh toán</Typography>

            <Typography variant="h5" fontWeight={700}>
              {dataOrder}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </LayoutAdmin>
  )
}

export { Dashboard }
