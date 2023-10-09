import {
  DistrictSchema,
  WardSchema,
  createAddressSchema,
  updateAddressSchema,
} from '@/libs/schema/address.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { AddressSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import AddressService from '../services/address.service'

const addressService = new AddressService()

export const addressRouter = createTRPCRouter({
  getProvince: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/province' } })
    .input(z.void())
    .output(z.any())
    .query(() => {
      return addressService.getProvince()
    }),
  getDistrictById: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/district/:id' } })
    .input(z.object({ province_id: z.string() }))
    .output(z.array(DistrictSchema))
    .query(({ input }) => {
      return addressService.getDistrict(input.province_id)
    }),
  getWardById: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/ward/:id' } })
    .input(z.object({ district_id: z.string() }))
    .output(z.array(WardSchema))
    .query(({ input }) => {
      return addressService.getWard(input.district_id)
    }),
  createdAddress: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/create' } })
    .input(createAddressSchema)
    .output(AddressSchema)
    .mutation(({ input, ctx }) => {
      return addressService.createAddress(input, ctx.session.user.id)
    }),
  getAddress: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/get-address' } })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return addressService.getAddress(ctx.session.user.id)
    }),
  updateAddress: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/update-address' } })
    .input(updateAddressSchema)
    .output(AddressSchema)
    .mutation(({ input, ctx }) => {
      return addressService.updateAddress(input, ctx.session.user.id)
    }),
  getAddressById: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/get-address/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.any())
    .query(({ input, ctx }) => {
      return addressService.getAddressById(input.id, ctx.session.user.id)
    }),
})
