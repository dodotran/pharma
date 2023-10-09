import { z } from 'zod'

export const WardSchema = z.object({
  ward_id: z.string(),
  name: z.string(),
  district_id: z.string(),
})

export const DistrictSchema = z.object({
  district_id: z.string(),
  name: z.string(),
  province_id: z.string(),
})

export const ProvinceSchema = z.object({
  province_id: z.string(),
  name: z.string(),
})

export const AddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.enum(['HOME', 'OFFICE', 'OTHER']),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  ward: WardSchema,
  district: DistrictSchema,
  province: ProvinceSchema,
})

export const AddressDetail = z.object({
  id: z.string(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.enum(['HOME', 'OFFICE', 'OTHER']),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const createAddressSchema = z.object({
  name: z.string().min(1),
  phone_number: z.string().min(1),
  address_detail: z.string().min(1),
  type_address: z.enum(['HOME', 'OFFICE', 'OTHER']),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
})

export const updateAddressSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  phone_number: z.string().min(1),
  address_detail: z.string().min(1),
  type_address: z.enum(['HOME', 'OFFICE', 'OTHER']),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
})

export type AddressType = z.infer<typeof AddressSchema>
export type CreateAddress = z.infer<typeof createAddressSchema>
export type UpdateAddress = z.infer<typeof updateAddressSchema>
export type WardType = z.infer<typeof WardSchema>
export type DistrictType = z.infer<typeof DistrictSchema>
export type ProvinceType = z.infer<typeof ProvinceSchema>
