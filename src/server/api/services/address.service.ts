import { CreateAddress, UpdateAddress } from '@/libs/schema/address.schema'
import { prisma } from '@/server/db'
import { UtilsService } from './utils.service'

class AddressService extends UtilsService {
  async getProvince() {
    const province = prisma.province.findMany()

    return province
  }

  async getDistrict(provinceId: string) {
    const district = prisma.district.findMany({
      where: {
        province_id: provinceId,
      },
    })

    return district
  }

  async getWard(districtId: string) {
    const ward = prisma.ward.findMany({
      where: {
        district_id: districtId,
      },
    })

    return ward
  }

  async createAddress(data: CreateAddress, userId: string) {
    this.CheckAuth(userId)

    const address = await prisma.address.create({
      data: {
        ...data,
        userId,
      },
    })

    return address
  }

  async getAddress(userId: string) {
    this.CheckAuth(userId)

    const address = await prisma.address.findMany({
      where: {
        userId,
      },
      include: {
        ward: true,
        district: true,
        province: true,
      },
    })

    return address
  }

  async updateAddress(data: UpdateAddress, userId: string) {
    this.CheckAuth(userId)

    const address = await prisma.address.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })

    return address
  }
}

export default AddressService
