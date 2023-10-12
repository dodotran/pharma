import { LayoutAdmin } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { Chart as ChartJS, registerables } from 'chart.js'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

const UserData = [
  {
    id: 1,
    month: 'Tháng 1',
    total: 80000,
  },
  {
    id: 2,
    month: 'Tháng 2',
    total: 45677,
  },
  {
    id: 3,
    month: 'Tháng 3',
    total: 78888,
  },
  {
    id: 4,
    month: 'Tháng 4',
    total: 12000,
  },
  {
    id: 5,
    month: 'Tháng 5',
    total: 4300,
  },
  {
    id: 6,
    month: 'Tháng 6',
    total: 430570,
  },
  {
    id: 7,
    month: 'Tháng 7',
    total: 430550,
  },
  {
    id: 8,
    month: 'Tháng 8',
    total: 4300,
  },
  {
    id: 9,
    month: 'Tháng 9',
    total: 43004,
  },
  {
    id: 10,
    month: 'Tháng 10',
    total: 44442,
  },
  {
    id: 11,
    month: 'Tháng 11',
    total: 4300,
  },
  {
    id: 11,
    month: 'Tháng 12',
    total: 4300,
  },
]

ChartJS.register(...registerables)

const Dashboard = () => {
  const { data } = api.order.getRevenue.useQuery()
  console.log(data)

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: 'Tổng doang thu theo tháng',
        data: UserData.map((data) => data.total),
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  })

  return (
    <LayoutAdmin>
      <Bar data={userData} />
    </LayoutAdmin>
  )
}

export { Dashboard }
