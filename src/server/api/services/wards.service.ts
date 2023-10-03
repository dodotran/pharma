import { prisma } from '@/server/db'

class WardsService {
  async get() {
    const province = await prisma.province.findUnique({
      where: {
        province_id: '11',
      },
      include: {
        districts: {
          include: {
            Ward: true,
          },
        },
      },
    })

    return province
  }

  async getDistrict(id: string) {
    const wards = await prisma.wards.findMany({
      where: {
        district_id: id,
      },
    })

    return wards
  }
}

export default WardsService
