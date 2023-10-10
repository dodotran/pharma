import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','sex','password','date_of_birth','createdAt','updatedAt','role']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const PasswordResetScalarFieldEnumSchema = z.enum(['id','user_id','token','created_at','updated_at']);

export const AddressScalarFieldEnumSchema = z.enum(['id','name','phone_number','address_detail','type_address','created_at','updated_at','province_id','district_id','ward_id','userId']);

export const DistrictScalarFieldEnumSchema = z.enum(['district_id','province_id','name']);

export const ProvinceScalarFieldEnumSchema = z.enum(['province_id','name']);

export const WardScalarFieldEnumSchema = z.enum(['ward_id','district_id','name']);

export const UnitScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ProductScalarFieldEnumSchema = z.enum(['id','name','price','quantity','unit_id','expired_date','category_id','trademark_id','status','createdAt','updatedAt']);

export const ProductDetailScalarFieldEnumSchema = z.enum(['id','product_id','description','short_description','ingredient','how_to_use','createdAt','updatedAt']);

export const ImageProductScalarFieldEnumSchema = z.enum(['id','url','product_id','createdAt','updatedAt']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const CartScalarFieldEnumSchema = z.enum(['id','user_id','product_id','quantity','createdAt','updatedAt']);

export const OrderScalarFieldEnumSchema = z.enum(['id','user_id','product_id','quantity','address_id','is_paid','createdAt','updatedAt','status_order_id']);

export const StatusOrderScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const TrademarkScalarFieldEnumSchema = z.enum(['id','name','image','country','introduce','createdAt','updatedAt']);

export const PaymentMethodScalarFieldEnumSchema = z.enum(['id','order_id','payment_source','order_payment_id','payment_id','payer_id','status','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserTypeSchema = z.enum(['ADMIN','USER']);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`

export const AddressTypeSchema = z.enum(['HOME','OFFICE','OTHER']);

export type AddressTypeType = `${z.infer<typeof AddressTypeSchema>}`

export const statusSchema = z.enum(['DANG_BAN','HET_HANG','DUNG_BAN','DEN_HIEU_THUOC']);

export type statusType = `${z.infer<typeof statusSchema>}`

export const PaymentStatusSchema = z.enum(['PENDING','SUCCESS','FAILED']);

export type PaymentStatusType = `${z.infer<typeof PaymentStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserTypeSchema,
  id: z.string().cuid(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  sex: z.string().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// PASSWORD RESET SCHEMA
/////////////////////////////////////////

export const PasswordResetSchema = z.object({
  id: z.string().cuid(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type PasswordReset = z.infer<typeof PasswordResetSchema>

/////////////////////////////////////////
// ADDRESS SCHEMA
/////////////////////////////////////////

export const AddressSchema = z.object({
  type_address: AddressTypeSchema,
  id: z.string().cuid(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string().nullable(),
})

export type Address = z.infer<typeof AddressSchema>

/////////////////////////////////////////
// DISTRICT SCHEMA
/////////////////////////////////////////

export const DistrictSchema = z.object({
  district_id: z.string().cuid(),
  province_id: z.string(),
  name: z.string(),
})

export type District = z.infer<typeof DistrictSchema>

/////////////////////////////////////////
// PROVINCE SCHEMA
/////////////////////////////////////////

export const ProvinceSchema = z.object({
  province_id: z.string().cuid(),
  name: z.string(),
})

export type Province = z.infer<typeof ProvinceSchema>

/////////////////////////////////////////
// WARD SCHEMA
/////////////////////////////////////////

export const WardSchema = z.object({
  ward_id: z.string().cuid(),
  district_id: z.string(),
  name: z.string(),
})

export type Ward = z.infer<typeof WardSchema>

/////////////////////////////////////////
// UNIT SCHEMA
/////////////////////////////////////////

export const UnitSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Unit = z.infer<typeof UnitSchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  status: statusSchema,
  id: z.string().cuid(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// PRODUCT DETAIL SCHEMA
/////////////////////////////////////////

export const ProductDetailSchema = z.object({
  id: z.string().cuid(),
  product_id: z.string(),
  description: z.string(),
  short_description: z.string(),
  ingredient: z.string(),
  how_to_use: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProductDetail = z.infer<typeof ProductDetailSchema>

/////////////////////////////////////////
// IMAGE PRODUCT SCHEMA
/////////////////////////////////////////

export const ImageProductSchema = z.object({
  id: z.string().cuid(),
  url: z.string(),
  product_id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ImageProduct = z.infer<typeof ImageProductSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// CART SCHEMA
/////////////////////////////////////////

export const CartSchema = z.object({
  id: z.string().cuid(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Cart = z.infer<typeof CartSchema>

/////////////////////////////////////////
// ORDER SCHEMA
/////////////////////////////////////////

export const OrderSchema = z.object({
  id: z.string().cuid(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  status_order_id: z.string(),
})

export type Order = z.infer<typeof OrderSchema>

/////////////////////////////////////////
// STATUS ORDER SCHEMA
/////////////////////////////////////////

export const StatusOrderSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type StatusOrder = z.infer<typeof StatusOrderSchema>

/////////////////////////////////////////
// TRADEMARK SCHEMA
/////////////////////////////////////////

export const TrademarkSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  image: z.string(),
  country: z.string(),
  introduce: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Trademark = z.infer<typeof TrademarkSchema>

/////////////////////////////////////////
// PAYMENT METHOD SCHEMA
/////////////////////////////////////////

export const PaymentMethodSchema = z.object({
  status: PaymentStatusSchema,
  id: z.string().cuid(),
  order_id: z.string(),
  payment_source: z.string(),
  order_payment_id: z.string().nullable(),
  payment_id: z.string().nullable(),
  payer_id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  password_reset: z.union([z.boolean(),z.lazy(() => PasswordResetArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  cart: z.union([z.boolean(),z.lazy(() => CartFindManyArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  address: z.boolean().optional(),
  cart: z.boolean().optional(),
  order: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  sex: z.boolean().optional(),
  password: z.boolean().optional(),
  date_of_birth: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  role: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  password_reset: z.union([z.boolean(),z.lazy(() => PasswordResetArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  cart: z.union([z.boolean(),z.lazy(() => CartFindManyArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// PASSWORD RESET
//------------------------------------------------------

export const PasswordResetIncludeSchema: z.ZodType<Prisma.PasswordResetInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PasswordResetArgsSchema: z.ZodType<Prisma.PasswordResetDefaultArgs> = z.object({
  select: z.lazy(() => PasswordResetSelectSchema).optional(),
  include: z.lazy(() => PasswordResetIncludeSchema).optional(),
}).strict();

export const PasswordResetSelectSchema: z.ZodType<Prisma.PasswordResetSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  token: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ADDRESS
//------------------------------------------------------

export const AddressIncludeSchema: z.ZodType<Prisma.AddressInclude> = z.object({
  province: z.union([z.boolean(),z.lazy(() => ProvinceArgsSchema)]).optional(),
  district: z.union([z.boolean(),z.lazy(() => DistrictArgsSchema)]).optional(),
  ward: z.union([z.boolean(),z.lazy(() => WardArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AddressCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AddressArgsSchema: z.ZodType<Prisma.AddressDefaultArgs> = z.object({
  select: z.lazy(() => AddressSelectSchema).optional(),
  include: z.lazy(() => AddressIncludeSchema).optional(),
}).strict();

export const AddressCountOutputTypeArgsSchema: z.ZodType<Prisma.AddressCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AddressCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AddressCountOutputTypeSelectSchema: z.ZodType<Prisma.AddressCountOutputTypeSelect> = z.object({
  order: z.boolean().optional(),
}).strict();

export const AddressSelectSchema: z.ZodType<Prisma.AddressSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  address_detail: z.boolean().optional(),
  type_address: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  province_id: z.boolean().optional(),
  district_id: z.boolean().optional(),
  ward_id: z.boolean().optional(),
  userId: z.boolean().optional(),
  province: z.union([z.boolean(),z.lazy(() => ProvinceArgsSchema)]).optional(),
  district: z.union([z.boolean(),z.lazy(() => DistrictArgsSchema)]).optional(),
  ward: z.union([z.boolean(),z.lazy(() => WardArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AddressCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DISTRICT
//------------------------------------------------------

export const DistrictIncludeSchema: z.ZodType<Prisma.DistrictInclude> = z.object({
  Province: z.union([z.boolean(),z.lazy(() => ProvinceArgsSchema)]).optional(),
  ward: z.union([z.boolean(),z.lazy(() => WardFindManyArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DistrictCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DistrictArgsSchema: z.ZodType<Prisma.DistrictDefaultArgs> = z.object({
  select: z.lazy(() => DistrictSelectSchema).optional(),
  include: z.lazy(() => DistrictIncludeSchema).optional(),
}).strict();

export const DistrictCountOutputTypeArgsSchema: z.ZodType<Prisma.DistrictCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DistrictCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DistrictCountOutputTypeSelectSchema: z.ZodType<Prisma.DistrictCountOutputTypeSelect> = z.object({
  ward: z.boolean().optional(),
  address: z.boolean().optional(),
}).strict();

export const DistrictSelectSchema: z.ZodType<Prisma.DistrictSelect> = z.object({
  district_id: z.boolean().optional(),
  province_id: z.boolean().optional(),
  name: z.boolean().optional(),
  Province: z.union([z.boolean(),z.lazy(() => ProvinceArgsSchema)]).optional(),
  ward: z.union([z.boolean(),z.lazy(() => WardFindManyArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DistrictCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROVINCE
//------------------------------------------------------

export const ProvinceIncludeSchema: z.ZodType<Prisma.ProvinceInclude> = z.object({
  districts: z.union([z.boolean(),z.lazy(() => DistrictFindManyArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProvinceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProvinceArgsSchema: z.ZodType<Prisma.ProvinceDefaultArgs> = z.object({
  select: z.lazy(() => ProvinceSelectSchema).optional(),
  include: z.lazy(() => ProvinceIncludeSchema).optional(),
}).strict();

export const ProvinceCountOutputTypeArgsSchema: z.ZodType<Prisma.ProvinceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProvinceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProvinceCountOutputTypeSelectSchema: z.ZodType<Prisma.ProvinceCountOutputTypeSelect> = z.object({
  districts: z.boolean().optional(),
  address: z.boolean().optional(),
}).strict();

export const ProvinceSelectSchema: z.ZodType<Prisma.ProvinceSelect> = z.object({
  province_id: z.boolean().optional(),
  name: z.boolean().optional(),
  districts: z.union([z.boolean(),z.lazy(() => DistrictFindManyArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProvinceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WARD
//------------------------------------------------------

export const WardIncludeSchema: z.ZodType<Prisma.WardInclude> = z.object({
  district: z.union([z.boolean(),z.lazy(() => DistrictArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WardCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WardArgsSchema: z.ZodType<Prisma.WardDefaultArgs> = z.object({
  select: z.lazy(() => WardSelectSchema).optional(),
  include: z.lazy(() => WardIncludeSchema).optional(),
}).strict();

export const WardCountOutputTypeArgsSchema: z.ZodType<Prisma.WardCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WardCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WardCountOutputTypeSelectSchema: z.ZodType<Prisma.WardCountOutputTypeSelect> = z.object({
  address: z.boolean().optional(),
}).strict();

export const WardSelectSchema: z.ZodType<Prisma.WardSelect> = z.object({
  ward_id: z.boolean().optional(),
  district_id: z.boolean().optional(),
  name: z.boolean().optional(),
  district: z.union([z.boolean(),z.lazy(() => DistrictArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WardCountOutputTypeArgsSchema)]).optional(),
}).strict()

// UNIT
//------------------------------------------------------

export const UnitIncludeSchema: z.ZodType<Prisma.UnitInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UnitArgsSchema: z.ZodType<Prisma.UnitDefaultArgs> = z.object({
  select: z.lazy(() => UnitSelectSchema).optional(),
  include: z.lazy(() => UnitIncludeSchema).optional(),
}).strict();

export const UnitCountOutputTypeArgsSchema: z.ZodType<Prisma.UnitCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UnitCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UnitCountOutputTypeSelectSchema: z.ZodType<Prisma.UnitCountOutputTypeSelect> = z.object({
  product: z.boolean().optional(),
}).strict();

export const UnitSelectSchema: z.ZodType<Prisma.UnitSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
  image: z.union([z.boolean(),z.lazy(() => ImageProductFindManyArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  cart: z.union([z.boolean(),z.lazy(() => CartFindManyArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  product_detail: z.union([z.boolean(),z.lazy(() => ProductDetailArgsSchema)]).optional(),
  trademark: z.union([z.boolean(),z.lazy(() => TrademarkArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  image: z.boolean().optional(),
  cart: z.boolean().optional(),
  order: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  price: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unit_id: z.boolean().optional(),
  expired_date: z.boolean().optional(),
  category_id: z.boolean().optional(),
  trademark_id: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  image: z.union([z.boolean(),z.lazy(() => ImageProductFindManyArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  cart: z.union([z.boolean(),z.lazy(() => CartFindManyArgsSchema)]).optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  product_detail: z.union([z.boolean(),z.lazy(() => ProductDetailArgsSchema)]).optional(),
  trademark: z.union([z.boolean(),z.lazy(() => TrademarkArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT DETAIL
//------------------------------------------------------

export const ProductDetailIncludeSchema: z.ZodType<Prisma.ProductDetailInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

export const ProductDetailArgsSchema: z.ZodType<Prisma.ProductDetailDefaultArgs> = z.object({
  select: z.lazy(() => ProductDetailSelectSchema).optional(),
  include: z.lazy(() => ProductDetailIncludeSchema).optional(),
}).strict();

export const ProductDetailSelectSchema: z.ZodType<Prisma.ProductDetailSelect> = z.object({
  id: z.boolean().optional(),
  product_id: z.boolean().optional(),
  description: z.boolean().optional(),
  short_description: z.boolean().optional(),
  ingredient: z.boolean().optional(),
  how_to_use: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// IMAGE PRODUCT
//------------------------------------------------------

export const ImageProductIncludeSchema: z.ZodType<Prisma.ImageProductInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

export const ImageProductArgsSchema: z.ZodType<Prisma.ImageProductDefaultArgs> = z.object({
  select: z.lazy(() => ImageProductSelectSchema).optional(),
  include: z.lazy(() => ImageProductIncludeSchema).optional(),
}).strict();

export const ImageProductSelectSchema: z.ZodType<Prisma.ImageProductSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  product_id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  product: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CART
//------------------------------------------------------

export const CartIncludeSchema: z.ZodType<Prisma.CartInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

export const CartArgsSchema: z.ZodType<Prisma.CartDefaultArgs> = z.object({
  select: z.lazy(() => CartSelectSchema).optional(),
  include: z.lazy(() => CartIncludeSchema).optional(),
}).strict();

export const CartSelectSchema: z.ZodType<Prisma.CartSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  product_id: z.boolean().optional(),
  quantity: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// ORDER
//------------------------------------------------------

export const OrderIncludeSchema: z.ZodType<Prisma.OrderInclude> = z.object({
  address: z.union([z.boolean(),z.lazy(() => AddressArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  status: z.union([z.boolean(),z.lazy(() => StatusOrderArgsSchema)]).optional(),
  payment_method: z.union([z.boolean(),z.lazy(() => PaymentMethodArgsSchema)]).optional(),
}).strict()

export const OrderArgsSchema: z.ZodType<Prisma.OrderDefaultArgs> = z.object({
  select: z.lazy(() => OrderSelectSchema).optional(),
  include: z.lazy(() => OrderIncludeSchema).optional(),
}).strict();

export const OrderSelectSchema: z.ZodType<Prisma.OrderSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  product_id: z.boolean().optional(),
  quantity: z.boolean().optional(),
  address_id: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  status_order_id: z.boolean().optional(),
  address: z.union([z.boolean(),z.lazy(() => AddressArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  status: z.union([z.boolean(),z.lazy(() => StatusOrderArgsSchema)]).optional(),
  payment_method: z.union([z.boolean(),z.lazy(() => PaymentMethodArgsSchema)]).optional(),
}).strict()

// STATUS ORDER
//------------------------------------------------------

export const StatusOrderIncludeSchema: z.ZodType<Prisma.StatusOrderInclude> = z.object({
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StatusOrderCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StatusOrderArgsSchema: z.ZodType<Prisma.StatusOrderDefaultArgs> = z.object({
  select: z.lazy(() => StatusOrderSelectSchema).optional(),
  include: z.lazy(() => StatusOrderIncludeSchema).optional(),
}).strict();

export const StatusOrderCountOutputTypeArgsSchema: z.ZodType<Prisma.StatusOrderCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StatusOrderCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StatusOrderCountOutputTypeSelectSchema: z.ZodType<Prisma.StatusOrderCountOutputTypeSelect> = z.object({
  order: z.boolean().optional(),
}).strict();

export const StatusOrderSelectSchema: z.ZodType<Prisma.StatusOrderSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StatusOrderCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRADEMARK
//------------------------------------------------------

export const TrademarkIncludeSchema: z.ZodType<Prisma.TrademarkInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TrademarkCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TrademarkArgsSchema: z.ZodType<Prisma.TrademarkDefaultArgs> = z.object({
  select: z.lazy(() => TrademarkSelectSchema).optional(),
  include: z.lazy(() => TrademarkIncludeSchema).optional(),
}).strict();

export const TrademarkCountOutputTypeArgsSchema: z.ZodType<Prisma.TrademarkCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TrademarkCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TrademarkCountOutputTypeSelectSchema: z.ZodType<Prisma.TrademarkCountOutputTypeSelect> = z.object({
  product: z.boolean().optional(),
}).strict();

export const TrademarkSelectSchema: z.ZodType<Prisma.TrademarkSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  country: z.boolean().optional(),
  introduce: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TrademarkCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PAYMENT METHOD
//------------------------------------------------------

export const PaymentMethodIncludeSchema: z.ZodType<Prisma.PaymentMethodInclude> = z.object({
  order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
}).strict()

export const PaymentMethodArgsSchema: z.ZodType<Prisma.PaymentMethodDefaultArgs> = z.object({
  select: z.lazy(() => PaymentMethodSelectSchema).optional(),
  include: z.lazy(() => PaymentMethodIncludeSchema).optional(),
}).strict();

export const PaymentMethodSelectSchema: z.ZodType<Prisma.PaymentMethodSelect> = z.object({
  id: z.boolean().optional(),
  order_id: z.boolean().optional(),
  payment_source: z.boolean().optional(),
  order_payment_id: z.boolean().optional(),
  payment_id: z.boolean().optional(),
  payer_id: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional()
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional()
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sex: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserTypeFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  password_reset: z.union([ z.lazy(() => PasswordResetRelationFilterSchema),z.lazy(() => PasswordResetWhereInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressListRelationFilterSchema).optional(),
  cart: z.lazy(() => CartListRelationFilterSchema).optional(),
  order: z.lazy(() => OrderListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetOrderByWithRelationInputSchema).optional(),
  address: z.lazy(() => AddressOrderByRelationAggregateInputSchema).optional(),
  cart: z.lazy(() => CartOrderByRelationAggregateInputSchema).optional(),
  order: z.lazy(() => OrderOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sex: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumUserTypeWithAggregatesFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional()
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PasswordResetWhereInputSchema: z.ZodType<Prisma.PasswordResetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetWhereInputSchema),z.lazy(() => PasswordResetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetWhereInputSchema),z.lazy(() => PasswordResetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PasswordResetOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordResetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PasswordResetWhereUniqueInputSchema: z.ZodType<Prisma.PasswordResetWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string().optional(),
  token: z.string().optional(),
  user_id_token: z.lazy(() => PasswordResetUser_idTokenCompoundUniqueInputSchema).optional()
}).strict();

export const PasswordResetOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordResetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PasswordResetCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasswordResetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasswordResetMinOrderByAggregateInputSchema).optional()
}).strict();

export const PasswordResetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordResetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AddressWhereInputSchema: z.ZodType<Prisma.AddressWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AddressWhereInputSchema),z.lazy(() => AddressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AddressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AddressWhereInputSchema),z.lazy(() => AddressWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address_detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type_address: z.union([ z.lazy(() => EnumAddressTypeFilterSchema),z.lazy(() => AddressTypeSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  province_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  district_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ward_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  province: z.union([ z.lazy(() => ProvinceRelationFilterSchema),z.lazy(() => ProvinceWhereInputSchema) ]).optional().nullable(),
  district: z.union([ z.lazy(() => DistrictRelationFilterSchema),z.lazy(() => DistrictWhereInputSchema) ]).optional().nullable(),
  ward: z.union([ z.lazy(() => WardRelationFilterSchema),z.lazy(() => WardWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  order: z.lazy(() => OrderListRelationFilterSchema).optional()
}).strict();

export const AddressOrderByWithRelationInputSchema: z.ZodType<Prisma.AddressOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address_detail: z.lazy(() => SortOrderSchema).optional(),
  type_address: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  province: z.lazy(() => ProvinceOrderByWithRelationInputSchema).optional(),
  district: z.lazy(() => DistrictOrderByWithRelationInputSchema).optional(),
  ward: z.lazy(() => WardOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  order: z.lazy(() => OrderOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AddressWhereUniqueInputSchema: z.ZodType<Prisma.AddressWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const AddressOrderByWithAggregationInputSchema: z.ZodType<Prisma.AddressOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address_detail: z.lazy(() => SortOrderSchema).optional(),
  type_address: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AddressCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AddressMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AddressMinOrderByAggregateInputSchema).optional()
}).strict();

export const AddressScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AddressScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AddressScalarWhereWithAggregatesInputSchema),z.lazy(() => AddressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AddressScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AddressScalarWhereWithAggregatesInputSchema),z.lazy(() => AddressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address_detail: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type_address: z.union([ z.lazy(() => EnumAddressTypeWithAggregatesFilterSchema),z.lazy(() => AddressTypeSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  province_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  district_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ward_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const DistrictWhereInputSchema: z.ZodType<Prisma.DistrictWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DistrictWhereInputSchema),z.lazy(() => DistrictWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DistrictWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DistrictWhereInputSchema),z.lazy(() => DistrictWhereInputSchema).array() ]).optional(),
  district_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  province_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Province: z.union([ z.lazy(() => ProvinceRelationFilterSchema),z.lazy(() => ProvinceWhereInputSchema) ]).optional().nullable(),
  ward: z.lazy(() => WardListRelationFilterSchema).optional(),
  address: z.lazy(() => AddressListRelationFilterSchema).optional()
}).strict();

export const DistrictOrderByWithRelationInputSchema: z.ZodType<Prisma.DistrictOrderByWithRelationInput> = z.object({
  district_id: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  Province: z.lazy(() => ProvinceOrderByWithRelationInputSchema).optional(),
  ward: z.lazy(() => WardOrderByRelationAggregateInputSchema).optional(),
  address: z.lazy(() => AddressOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DistrictWhereUniqueInputSchema: z.ZodType<Prisma.DistrictWhereUniqueInput> = z.object({
  district_id: z.string().cuid().optional()
}).strict();

export const DistrictOrderByWithAggregationInputSchema: z.ZodType<Prisma.DistrictOrderByWithAggregationInput> = z.object({
  district_id: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DistrictCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DistrictMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DistrictMinOrderByAggregateInputSchema).optional()
}).strict();

export const DistrictScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DistrictScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DistrictScalarWhereWithAggregatesInputSchema),z.lazy(() => DistrictScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DistrictScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DistrictScalarWhereWithAggregatesInputSchema),z.lazy(() => DistrictScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  district_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  province_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProvinceWhereInputSchema: z.ZodType<Prisma.ProvinceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProvinceWhereInputSchema),z.lazy(() => ProvinceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProvinceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProvinceWhereInputSchema),z.lazy(() => ProvinceWhereInputSchema).array() ]).optional(),
  province_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  districts: z.lazy(() => DistrictListRelationFilterSchema).optional(),
  address: z.lazy(() => AddressListRelationFilterSchema).optional()
}).strict();

export const ProvinceOrderByWithRelationInputSchema: z.ZodType<Prisma.ProvinceOrderByWithRelationInput> = z.object({
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  districts: z.lazy(() => DistrictOrderByRelationAggregateInputSchema).optional(),
  address: z.lazy(() => AddressOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProvinceWhereUniqueInputSchema: z.ZodType<Prisma.ProvinceWhereUniqueInput> = z.object({
  province_id: z.string().cuid().optional()
}).strict();

export const ProvinceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProvinceOrderByWithAggregationInput> = z.object({
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProvinceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProvinceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProvinceMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProvinceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProvinceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProvinceScalarWhereWithAggregatesInputSchema),z.lazy(() => ProvinceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProvinceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProvinceScalarWhereWithAggregatesInputSchema),z.lazy(() => ProvinceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  province_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const WardWhereInputSchema: z.ZodType<Prisma.WardWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WardWhereInputSchema),z.lazy(() => WardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WardWhereInputSchema),z.lazy(() => WardWhereInputSchema).array() ]).optional(),
  ward_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  district_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  district: z.union([ z.lazy(() => DistrictRelationFilterSchema),z.lazy(() => DistrictWhereInputSchema) ]).optional().nullable(),
  address: z.lazy(() => AddressListRelationFilterSchema).optional()
}).strict();

export const WardOrderByWithRelationInputSchema: z.ZodType<Prisma.WardOrderByWithRelationInput> = z.object({
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  district: z.lazy(() => DistrictOrderByWithRelationInputSchema).optional(),
  address: z.lazy(() => AddressOrderByRelationAggregateInputSchema).optional()
}).strict();

export const WardWhereUniqueInputSchema: z.ZodType<Prisma.WardWhereUniqueInput> = z.object({
  ward_id: z.string().cuid().optional()
}).strict();

export const WardOrderByWithAggregationInputSchema: z.ZodType<Prisma.WardOrderByWithAggregationInput> = z.object({
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WardCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WardMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WardMinOrderByAggregateInputSchema).optional()
}).strict();

export const WardScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WardScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WardScalarWhereWithAggregatesInputSchema),z.lazy(() => WardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WardScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WardScalarWhereWithAggregatesInputSchema),z.lazy(() => WardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  ward_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  district_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UnitWhereInputSchema: z.ZodType<Prisma.UnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.lazy(() => ProductListRelationFilterSchema).optional()
}).strict();

export const UnitOrderByWithRelationInputSchema: z.ZodType<Prisma.UnitOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UnitWhereUniqueInputSchema: z.ZodType<Prisma.UnitWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const UnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.UnitOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UnitCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UnitMinOrderByAggregateInputSchema).optional()
}).strict();

export const UnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UnitScalarWhereWithAggregatesInputSchema),z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnitScalarWhereWithAggregatesInputSchema),z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  unit_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expired_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  trademark_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.lazy(() => ImageProductListRelationFilterSchema).optional(),
  unit: z.union([ z.lazy(() => UnitRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  cart: z.lazy(() => CartListRelationFilterSchema).optional(),
  order: z.lazy(() => OrderListRelationFilterSchema).optional(),
  product_detail: z.union([ z.lazy(() => ProductDetailRelationFilterSchema),z.lazy(() => ProductDetailWhereInputSchema) ]).optional().nullable(),
  trademark: z.union([ z.lazy(() => TrademarkRelationFilterSchema),z.lazy(() => TrademarkWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit_id: z.lazy(() => SortOrderSchema).optional(),
  expired_date: z.lazy(() => SortOrderSchema).optional(),
  category_id: z.lazy(() => SortOrderSchema).optional(),
  trademark_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => ImageProductOrderByRelationAggregateInputSchema).optional(),
  unit: z.lazy(() => UnitOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  cart: z.lazy(() => CartOrderByRelationAggregateInputSchema).optional(),
  order: z.lazy(() => OrderOrderByRelationAggregateInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailOrderByWithRelationInputSchema).optional(),
  trademark: z.lazy(() => TrademarkOrderByWithRelationInputSchema).optional()
}).strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit_id: z.lazy(() => SortOrderSchema).optional(),
  expired_date: z.lazy(() => SortOrderSchema).optional(),
  category_id: z.lazy(() => SortOrderSchema).optional(),
  trademark_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  unit_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expired_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  category_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  trademark_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusWithAggregatesFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductDetailWhereInputSchema: z.ZodType<Prisma.ProductDetailWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductDetailWhereInputSchema),z.lazy(() => ProductDetailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductDetailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductDetailWhereInputSchema),z.lazy(() => ProductDetailWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  short_description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ingredient: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  how_to_use: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict();

export const ProductDetailOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductDetailOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  short_description: z.lazy(() => SortOrderSchema).optional(),
  ingredient: z.lazy(() => SortOrderSchema).optional(),
  how_to_use: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional()
}).strict();

export const ProductDetailWhereUniqueInputSchema: z.ZodType<Prisma.ProductDetailWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  product_id: z.string().optional()
}).strict();

export const ProductDetailOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductDetailOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  short_description: z.lazy(() => SortOrderSchema).optional(),
  ingredient: z.lazy(() => SortOrderSchema).optional(),
  how_to_use: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductDetailCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductDetailMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductDetailMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProductDetailScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductDetailScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductDetailScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductDetailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductDetailScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductDetailScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductDetailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  short_description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ingredient: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  how_to_use: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ImageProductWhereInputSchema: z.ZodType<Prisma.ImageProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageProductWhereInputSchema),z.lazy(() => ImageProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageProductWhereInputSchema),z.lazy(() => ImageProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ImageProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ImageProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional()
}).strict();

export const ImageProductWhereUniqueInputSchema: z.ZodType<Prisma.ImageProductWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ImageProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ImageProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ImageProductCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImageProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImageProductMinOrderByAggregateInputSchema).optional()
}).strict();

export const ImageProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ImageProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ImageProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.lazy(() => ProductListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CartWhereInputSchema: z.ZodType<Prisma.CartWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CartWhereInputSchema),z.lazy(() => CartWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CartWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CartWhereInputSchema),z.lazy(() => CartWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict();

export const CartOrderByWithRelationInputSchema: z.ZodType<Prisma.CartOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional()
}).strict();

export const CartWhereUniqueInputSchema: z.ZodType<Prisma.CartWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const CartOrderByWithAggregationInputSchema: z.ZodType<Prisma.CartOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CartCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CartAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CartMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CartMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CartSumOrderByAggregateInputSchema).optional()
}).strict();

export const CartScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CartScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CartScalarWhereWithAggregatesInputSchema),z.lazy(() => CartScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CartScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CartScalarWhereWithAggregatesInputSchema),z.lazy(() => CartScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const OrderWhereInputSchema: z.ZodType<Prisma.OrderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderWhereInputSchema),z.lazy(() => OrderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  address_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_paid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status_order_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => AddressRelationFilterSchema),z.lazy(() => AddressWhereInputSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusOrderRelationFilterSchema),z.lazy(() => StatusOrderWhereInputSchema) ]).optional(),
  payment_method: z.union([ z.lazy(() => PaymentMethodRelationFilterSchema),z.lazy(() => PaymentMethodWhereInputSchema) ]).optional().nullable(),
}).strict();

export const OrderOrderByWithRelationInputSchema: z.ZodType<Prisma.OrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  address_id: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status_order_id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => AddressOrderByWithRelationInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  status: z.lazy(() => StatusOrderOrderByWithRelationInputSchema).optional(),
  payment_method: z.lazy(() => PaymentMethodOrderByWithRelationInputSchema).optional()
}).strict();

export const OrderWhereUniqueInputSchema: z.ZodType<Prisma.OrderWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const OrderOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  address_id: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status_order_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OrderCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => OrderAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OrderMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => OrderSumOrderByAggregateInputSchema).optional()
}).strict();

export const OrderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrderScalarWhereWithAggregatesInputSchema),z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderScalarWhereWithAggregatesInputSchema),z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  address_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_paid: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status_order_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const StatusOrderWhereInputSchema: z.ZodType<Prisma.StatusOrderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StatusOrderWhereInputSchema),z.lazy(() => StatusOrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusOrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusOrderWhereInputSchema),z.lazy(() => StatusOrderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  order: z.lazy(() => OrderListRelationFilterSchema).optional()
}).strict();

export const StatusOrderOrderByWithRelationInputSchema: z.ZodType<Prisma.StatusOrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => OrderOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StatusOrderWhereUniqueInputSchema: z.ZodType<Prisma.StatusOrderWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const StatusOrderOrderByWithAggregationInputSchema: z.ZodType<Prisma.StatusOrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StatusOrderCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StatusOrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StatusOrderMinOrderByAggregateInputSchema).optional()
}).strict();

export const StatusOrderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StatusOrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StatusOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => StatusOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusOrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => StatusOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TrademarkWhereInputSchema: z.ZodType<Prisma.TrademarkWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TrademarkWhereInputSchema),z.lazy(() => TrademarkWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrademarkWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrademarkWhereInputSchema),z.lazy(() => TrademarkWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  introduce: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  product: z.lazy(() => ProductListRelationFilterSchema).optional()
}).strict();

export const TrademarkOrderByWithRelationInputSchema: z.ZodType<Prisma.TrademarkOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  introduce: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TrademarkWhereUniqueInputSchema: z.ZodType<Prisma.TrademarkWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const TrademarkOrderByWithAggregationInputSchema: z.ZodType<Prisma.TrademarkOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  introduce: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TrademarkCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TrademarkMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TrademarkMinOrderByAggregateInputSchema).optional()
}).strict();

export const TrademarkScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TrademarkScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TrademarkScalarWhereWithAggregatesInputSchema),z.lazy(() => TrademarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrademarkScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrademarkScalarWhereWithAggregatesInputSchema),z.lazy(() => TrademarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  introduce: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PaymentMethodWhereInputSchema: z.ZodType<Prisma.PaymentMethodWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentMethodWhereInputSchema),z.lazy(() => PaymentMethodWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentMethodWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentMethodWhereInputSchema),z.lazy(() => PaymentMethodWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  payment_source: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order_payment_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  payment_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  payer_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPaymentStatusFilterSchema),z.lazy(() => PaymentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  order: z.union([ z.lazy(() => OrderRelationFilterSchema),z.lazy(() => OrderWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PaymentMethodOrderByWithRelationInputSchema: z.ZodType<Prisma.PaymentMethodOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  payment_source: z.lazy(() => SortOrderSchema).optional(),
  order_payment_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  payment_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  payer_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => OrderOrderByWithRelationInputSchema).optional()
}).strict();

export const PaymentMethodWhereUniqueInputSchema: z.ZodType<Prisma.PaymentMethodWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  order_id: z.string().optional()
}).strict();

export const PaymentMethodOrderByWithAggregationInputSchema: z.ZodType<Prisma.PaymentMethodOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  payment_source: z.lazy(() => SortOrderSchema).optional(),
  order_payment_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  payment_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  payer_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PaymentMethodCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PaymentMethodMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PaymentMethodMinOrderByAggregateInputSchema).optional()
}).strict();

export const PaymentMethodScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PaymentMethodScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  payment_source: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order_payment_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  payment_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  payer_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPaymentStatusWithAggregatesFilterSchema),z.lazy(() => PaymentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetCreateInputSchema: z.ZodType<Prisma.PasswordResetCreateInput> = z.object({
  id: z.string().cuid().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPassword_resetInputSchema)
}).strict();

export const PasswordResetUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordResetUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetUpdateInputSchema: z.ZodType<Prisma.PasswordResetUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPassword_resetNestedInputSchema).optional()
}).strict();

export const PasswordResetUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetCreateManyInputSchema: z.ZodType<Prisma.PasswordResetCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordResetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressCreateInputSchema: z.ZodType<Prisma.AddressCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province: z.lazy(() => ProvinceCreateNestedOneWithoutAddressInputSchema).optional(),
  district: z.lazy(() => DistrictCreateNestedOneWithoutAddressInputSchema).optional(),
  ward: z.lazy(() => WardCreateNestedOneWithoutAddressInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddressInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressUncheckedCreateInputSchema: z.ZodType<Prisma.AddressUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string().optional().nullable(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressUpdateInputSchema: z.ZodType<Prisma.AddressUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province: z.lazy(() => ProvinceUpdateOneWithoutAddressNestedInputSchema).optional(),
  district: z.lazy(() => DistrictUpdateOneWithoutAddressNestedInputSchema).optional(),
  ward: z.lazy(() => WardUpdateOneWithoutAddressNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAddressNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressCreateManyInputSchema: z.ZodType<Prisma.AddressCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const AddressUpdateManyMutationInputSchema: z.ZodType<Prisma.AddressUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DistrictCreateInputSchema: z.ZodType<Prisma.DistrictCreateInput> = z.object({
  district_id: z.string().cuid().optional(),
  name: z.string(),
  Province: z.lazy(() => ProvinceCreateNestedOneWithoutDistrictsInputSchema).optional(),
  ward: z.lazy(() => WardCreateNestedManyWithoutDistrictInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictUncheckedCreateInputSchema: z.ZodType<Prisma.DistrictUncheckedCreateInput> = z.object({
  district_id: z.string().cuid().optional(),
  province_id: z.string(),
  name: z.string(),
  ward: z.lazy(() => WardUncheckedCreateNestedManyWithoutDistrictInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictUpdateInputSchema: z.ZodType<Prisma.DistrictUpdateInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Province: z.lazy(() => ProvinceUpdateOneWithoutDistrictsNestedInputSchema).optional(),
  ward: z.lazy(() => WardUpdateManyWithoutDistrictNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const DistrictUncheckedUpdateInputSchema: z.ZodType<Prisma.DistrictUncheckedUpdateInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward: z.lazy(() => WardUncheckedUpdateManyWithoutDistrictNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const DistrictCreateManyInputSchema: z.ZodType<Prisma.DistrictCreateManyInput> = z.object({
  district_id: z.string().cuid().optional(),
  province_id: z.string(),
  name: z.string()
}).strict();

export const DistrictUpdateManyMutationInputSchema: z.ZodType<Prisma.DistrictUpdateManyMutationInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DistrictUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DistrictUncheckedUpdateManyInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProvinceCreateInputSchema: z.ZodType<Prisma.ProvinceCreateInput> = z.object({
  province_id: z.string().cuid().optional(),
  name: z.string(),
  districts: z.lazy(() => DistrictCreateNestedManyWithoutProvinceInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutProvinceInputSchema).optional()
}).strict();

export const ProvinceUncheckedCreateInputSchema: z.ZodType<Prisma.ProvinceUncheckedCreateInput> = z.object({
  province_id: z.string().cuid().optional(),
  name: z.string(),
  districts: z.lazy(() => DistrictUncheckedCreateNestedManyWithoutProvinceInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutProvinceInputSchema).optional()
}).strict();

export const ProvinceUpdateInputSchema: z.ZodType<Prisma.ProvinceUpdateInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  districts: z.lazy(() => DistrictUpdateManyWithoutProvinceNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutProvinceNestedInputSchema).optional()
}).strict();

export const ProvinceUncheckedUpdateInputSchema: z.ZodType<Prisma.ProvinceUncheckedUpdateInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  districts: z.lazy(() => DistrictUncheckedUpdateManyWithoutProvinceNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutProvinceNestedInputSchema).optional()
}).strict();

export const ProvinceCreateManyInputSchema: z.ZodType<Prisma.ProvinceCreateManyInput> = z.object({
  province_id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const ProvinceUpdateManyMutationInputSchema: z.ZodType<Prisma.ProvinceUpdateManyMutationInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProvinceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProvinceUncheckedUpdateManyInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WardCreateInputSchema: z.ZodType<Prisma.WardCreateInput> = z.object({
  ward_id: z.string().cuid().optional(),
  name: z.string(),
  district: z.lazy(() => DistrictCreateNestedOneWithoutWardInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutWardInputSchema).optional()
}).strict();

export const WardUncheckedCreateInputSchema: z.ZodType<Prisma.WardUncheckedCreateInput> = z.object({
  ward_id: z.string().cuid().optional(),
  district_id: z.string(),
  name: z.string(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutWardInputSchema).optional()
}).strict();

export const WardUpdateInputSchema: z.ZodType<Prisma.WardUpdateInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district: z.lazy(() => DistrictUpdateOneWithoutWardNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutWardNestedInputSchema).optional()
}).strict();

export const WardUncheckedUpdateInputSchema: z.ZodType<Prisma.WardUncheckedUpdateInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutWardNestedInputSchema).optional()
}).strict();

export const WardCreateManyInputSchema: z.ZodType<Prisma.WardCreateManyInput> = z.object({
  ward_id: z.string().cuid().optional(),
  district_id: z.string(),
  name: z.string()
}).strict();

export const WardUpdateManyMutationInputSchema: z.ZodType<Prisma.WardUpdateManyMutationInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WardUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WardUncheckedUpdateManyInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitCreateInputSchema: z.ZodType<Prisma.UnitCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedManyWithoutUnitInputSchema).optional()
}).strict();

export const UnitUncheckedCreateInputSchema: z.ZodType<Prisma.UnitUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUnitInputSchema).optional()
}).strict();

export const UnitUpdateInputSchema: z.ZodType<Prisma.UnitUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateManyWithoutUnitNestedInputSchema).optional()
}).strict();

export const UnitUncheckedUpdateInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUncheckedUpdateManyWithoutUnitNestedInputSchema).optional()
}).strict();

export const UnitCreateManyInputSchema: z.ZodType<Prisma.UnitCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UnitUpdateManyMutationInputSchema: z.ZodType<Prisma.UnitUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductCreateNestedManyWithoutProductInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailCreateNestedOneWithoutProductInputSchema).optional(),
  trademark: z.lazy(() => TrademarkCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUpdateManyWithoutProductNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutProductNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUpdateOneWithoutProductNestedInputSchema).optional(),
  trademark: z.lazy(() => TrademarkUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductDetailCreateInputSchema: z.ZodType<Prisma.ProductDetailCreateInput> = z.object({
  id: z.string().cuid().optional(),
  description: z.string(),
  short_description: z.string(),
  ingredient: z.string(),
  how_to_use: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutProduct_detailInputSchema)
}).strict();

export const ProductDetailUncheckedCreateInputSchema: z.ZodType<Prisma.ProductDetailUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  product_id: z.string(),
  description: z.string(),
  short_description: z.string(),
  ingredient: z.string(),
  how_to_use: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductDetailUpdateInputSchema: z.ZodType<Prisma.ProductDetailUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  how_to_use: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutProduct_detailNestedInputSchema).optional()
}).strict();

export const ProductDetailUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductDetailUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  how_to_use: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductDetailCreateManyInputSchema: z.ZodType<Prisma.ProductDetailCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  product_id: z.string(),
  description: z.string(),
  short_description: z.string(),
  ingredient: z.string(),
  how_to_use: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductDetailUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductDetailUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  how_to_use: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductDetailUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductDetailUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  how_to_use: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageProductCreateInputSchema: z.ZodType<Prisma.ImageProductCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutImageInputSchema).optional()
}).strict();

export const ImageProductUncheckedCreateInputSchema: z.ZodType<Prisma.ImageProductUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  product_id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ImageProductUpdateInputSchema: z.ZodType<Prisma.ImageProductUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneWithoutImageNestedInputSchema).optional()
}).strict();

export const ImageProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ImageProductUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageProductCreateManyInputSchema: z.ZodType<Prisma.ImageProductCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  product_id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ImageProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ImageProductUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ImageProductUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CartCreateInputSchema: z.ZodType<Prisma.CartCreateInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCartInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutCartInputSchema)
}).strict();

export const CartUncheckedCreateInputSchema: z.ZodType<Prisma.CartUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CartUpdateInputSchema: z.ZodType<Prisma.CartUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCartNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutCartNestedInputSchema).optional()
}).strict();

export const CartUncheckedUpdateInputSchema: z.ZodType<Prisma.CartUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CartCreateManyInputSchema: z.ZodType<Prisma.CartCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CartUpdateManyMutationInputSchema: z.ZodType<Prisma.CartUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CartUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CartUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrderCreateInputSchema: z.ZodType<Prisma.OrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  address: z.lazy(() => AddressCreateNestedOneWithoutOrderInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutOrderInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderInputSchema),
  status: z.lazy(() => StatusOrderCreateNestedOneWithoutOrderInputSchema),
  payment_method: z.lazy(() => PaymentMethodCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderUncheckedCreateInputSchema: z.ZodType<Prisma.OrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string(),
  payment_method: z.lazy(() => PaymentMethodUncheckedCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderUpdateInputSchema: z.ZodType<Prisma.OrderUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  status: z.lazy(() => StatusOrderUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  payment_method: z.lazy(() => PaymentMethodUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderUncheckedUpdateInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status_order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_method: z.lazy(() => PaymentMethodUncheckedUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderCreateManyInputSchema: z.ZodType<Prisma.OrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string()
}).strict();

export const OrderUpdateManyMutationInputSchema: z.ZodType<Prisma.OrderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status_order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatusOrderCreateInputSchema: z.ZodType<Prisma.StatusOrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutStatusInputSchema).optional()
}).strict();

export const StatusOrderUncheckedCreateInputSchema: z.ZodType<Prisma.StatusOrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutStatusInputSchema).optional()
}).strict();

export const StatusOrderUpdateInputSchema: z.ZodType<Prisma.StatusOrderUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutStatusNestedInputSchema).optional()
}).strict();

export const StatusOrderUncheckedUpdateInputSchema: z.ZodType<Prisma.StatusOrderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutStatusNestedInputSchema).optional()
}).strict();

export const StatusOrderCreateManyInputSchema: z.ZodType<Prisma.StatusOrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StatusOrderUpdateManyMutationInputSchema: z.ZodType<Prisma.StatusOrderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatusOrderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StatusOrderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TrademarkCreateInputSchema: z.ZodType<Prisma.TrademarkCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  image: z.string(),
  country: z.string(),
  introduce: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedManyWithoutTrademarkInputSchema).optional()
}).strict();

export const TrademarkUncheckedCreateInputSchema: z.ZodType<Prisma.TrademarkUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  image: z.string(),
  country: z.string(),
  introduce: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutTrademarkInputSchema).optional()
}).strict();

export const TrademarkUpdateInputSchema: z.ZodType<Prisma.TrademarkUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introduce: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateManyWithoutTrademarkNestedInputSchema).optional()
}).strict();

export const TrademarkUncheckedUpdateInputSchema: z.ZodType<Prisma.TrademarkUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introduce: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUncheckedUpdateManyWithoutTrademarkNestedInputSchema).optional()
}).strict();

export const TrademarkCreateManyInputSchema: z.ZodType<Prisma.TrademarkCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  image: z.string(),
  country: z.string(),
  introduce: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TrademarkUpdateManyMutationInputSchema: z.ZodType<Prisma.TrademarkUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introduce: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TrademarkUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TrademarkUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introduce: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodCreateInputSchema: z.ZodType<Prisma.PaymentMethodCreateInput> = z.object({
  id: z.string().cuid().optional(),
  payment_source: z.string(),
  order_payment_id: z.string().optional().nullable(),
  payment_id: z.string().optional().nullable(),
  payer_id: z.string(),
  status: z.lazy(() => PaymentStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutPayment_methodInputSchema).optional()
}).strict();

export const PaymentMethodUncheckedCreateInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order_id: z.string(),
  payment_source: z.string(),
  order_payment_id: z.string().optional().nullable(),
  payment_id: z.string().optional().nullable(),
  payer_id: z.string(),
  status: z.lazy(() => PaymentStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PaymentMethodUpdateInputSchema: z.ZodType<Prisma.PaymentMethodUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.lazy(() => OrderUpdateOneWithoutPayment_methodNestedInputSchema).optional()
}).strict();

export const PaymentMethodUncheckedUpdateInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodCreateManyInputSchema: z.ZodType<Prisma.PaymentMethodCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  order_id: z.string(),
  payment_source: z.string(),
  order_payment_id: z.string().optional().nullable(),
  payment_id: z.string().optional().nullable(),
  payer_id: z.string(),
  status: z.lazy(() => PaymentStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PaymentMethodUpdateManyMutationInputSchema: z.ZodType<Prisma.PaymentMethodUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumUserTypeFilterSchema: z.ZodType<Prisma.EnumUserTypeFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const PasswordResetRelationFilterSchema: z.ZodType<Prisma.PasswordResetRelationFilter> = z.object({
  is: z.lazy(() => PasswordResetWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PasswordResetWhereInputSchema).optional().nullable()
}).strict();

export const AddressListRelationFilterSchema: z.ZodType<Prisma.AddressListRelationFilter> = z.object({
  every: z.lazy(() => AddressWhereInputSchema).optional(),
  some: z.lazy(() => AddressWhereInputSchema).optional(),
  none: z.lazy(() => AddressWhereInputSchema).optional()
}).strict();

export const CartListRelationFilterSchema: z.ZodType<Prisma.CartListRelationFilter> = z.object({
  every: z.lazy(() => CartWhereInputSchema).optional(),
  some: z.lazy(() => CartWhereInputSchema).optional(),
  none: z.lazy(() => CartWhereInputSchema).optional()
}).strict();

export const OrderListRelationFilterSchema: z.ZodType<Prisma.OrderListRelationFilter> = z.object({
  every: z.lazy(() => OrderWhereInputSchema).optional(),
  some: z.lazy(() => OrderWhereInputSchema).optional(),
  none: z.lazy(() => OrderWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AddressOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AddressOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CartOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CartOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrderOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OrderOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumUserTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTypeFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetUser_idTokenCompoundUniqueInputSchema: z.ZodType<Prisma.PasswordResetUser_idTokenCompoundUniqueInput> = z.object({
  user_id: z.string(),
  token: z.string()
}).strict();

export const PasswordResetCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAddressTypeFilterSchema: z.ZodType<Prisma.EnumAddressTypeFilter> = z.object({
  equals: z.lazy(() => AddressTypeSchema).optional(),
  in: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => NestedEnumAddressTypeFilterSchema) ]).optional(),
}).strict();

export const ProvinceRelationFilterSchema: z.ZodType<Prisma.ProvinceRelationFilter> = z.object({
  is: z.lazy(() => ProvinceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProvinceWhereInputSchema).optional().nullable()
}).strict();

export const DistrictRelationFilterSchema: z.ZodType<Prisma.DistrictRelationFilter> = z.object({
  is: z.lazy(() => DistrictWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DistrictWhereInputSchema).optional().nullable()
}).strict();

export const WardRelationFilterSchema: z.ZodType<Prisma.WardRelationFilter> = z.object({
  is: z.lazy(() => WardWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WardWhereInputSchema).optional().nullable()
}).strict();

export const AddressCountOrderByAggregateInputSchema: z.ZodType<Prisma.AddressCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address_detail: z.lazy(() => SortOrderSchema).optional(),
  type_address: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AddressMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AddressMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address_detail: z.lazy(() => SortOrderSchema).optional(),
  type_address: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AddressMinOrderByAggregateInputSchema: z.ZodType<Prisma.AddressMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address_detail: z.lazy(() => SortOrderSchema).optional(),
  type_address: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAddressTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAddressTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AddressTypeSchema).optional(),
  in: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => NestedEnumAddressTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAddressTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAddressTypeFilterSchema).optional()
}).strict();

export const WardListRelationFilterSchema: z.ZodType<Prisma.WardListRelationFilter> = z.object({
  every: z.lazy(() => WardWhereInputSchema).optional(),
  some: z.lazy(() => WardWhereInputSchema).optional(),
  none: z.lazy(() => WardWhereInputSchema).optional()
}).strict();

export const WardOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WardOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DistrictCountOrderByAggregateInputSchema: z.ZodType<Prisma.DistrictCountOrderByAggregateInput> = z.object({
  district_id: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DistrictMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DistrictMaxOrderByAggregateInput> = z.object({
  district_id: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DistrictMinOrderByAggregateInputSchema: z.ZodType<Prisma.DistrictMinOrderByAggregateInput> = z.object({
  district_id: z.lazy(() => SortOrderSchema).optional(),
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DistrictListRelationFilterSchema: z.ZodType<Prisma.DistrictListRelationFilter> = z.object({
  every: z.lazy(() => DistrictWhereInputSchema).optional(),
  some: z.lazy(() => DistrictWhereInputSchema).optional(),
  none: z.lazy(() => DistrictWhereInputSchema).optional()
}).strict();

export const DistrictOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DistrictOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProvinceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProvinceCountOrderByAggregateInput> = z.object({
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProvinceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProvinceMaxOrderByAggregateInput> = z.object({
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProvinceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProvinceMinOrderByAggregateInput> = z.object({
  province_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WardCountOrderByAggregateInputSchema: z.ZodType<Prisma.WardCountOrderByAggregateInput> = z.object({
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WardMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WardMaxOrderByAggregateInput> = z.object({
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WardMinOrderByAggregateInputSchema: z.ZodType<Prisma.WardMinOrderByAggregateInput> = z.object({
  ward_id: z.lazy(() => SortOrderSchema).optional(),
  district_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z.object({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.UnitCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UnitMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.UnitMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const EnumstatusFilterSchema: z.ZodType<Prisma.EnumstatusFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusFilterSchema) ]).optional(),
}).strict();

export const ImageProductListRelationFilterSchema: z.ZodType<Prisma.ImageProductListRelationFilter> = z.object({
  every: z.lazy(() => ImageProductWhereInputSchema).optional(),
  some: z.lazy(() => ImageProductWhereInputSchema).optional(),
  none: z.lazy(() => ImageProductWhereInputSchema).optional()
}).strict();

export const UnitRelationFilterSchema: z.ZodType<Prisma.UnitRelationFilter> = z.object({
  is: z.lazy(() => UnitWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UnitWhereInputSchema).optional().nullable()
}).strict();

export const CategoryRelationFilterSchema: z.ZodType<Prisma.CategoryRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional().nullable()
}).strict();

export const ProductDetailRelationFilterSchema: z.ZodType<Prisma.ProductDetailRelationFilter> = z.object({
  is: z.lazy(() => ProductDetailWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProductDetailWhereInputSchema).optional().nullable()
}).strict();

export const TrademarkRelationFilterSchema: z.ZodType<Prisma.TrademarkRelationFilter> = z.object({
  is: z.lazy(() => TrademarkWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TrademarkWhereInputSchema).optional().nullable()
}).strict();

export const ImageProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ImageProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit_id: z.lazy(() => SortOrderSchema).optional(),
  expired_date: z.lazy(() => SortOrderSchema).optional(),
  category_id: z.lazy(() => SortOrderSchema).optional(),
  trademark_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit_id: z.lazy(() => SortOrderSchema).optional(),
  expired_date: z.lazy(() => SortOrderSchema).optional(),
  category_id: z.lazy(() => SortOrderSchema).optional(),
  trademark_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit_id: z.lazy(() => SortOrderSchema).optional(),
  expired_date: z.lazy(() => SortOrderSchema).optional(),
  category_id: z.lazy(() => SortOrderSchema).optional(),
  trademark_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumstatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumstatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstatusFilterSchema).optional()
}).strict();

export const ProductRelationFilterSchema: z.ZodType<Prisma.ProductRelationFilter> = z.object({
  is: z.lazy(() => ProductWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional().nullable()
}).strict();

export const ProductDetailCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductDetailCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  short_description: z.lazy(() => SortOrderSchema).optional(),
  ingredient: z.lazy(() => SortOrderSchema).optional(),
  how_to_use: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductDetailMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductDetailMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  short_description: z.lazy(() => SortOrderSchema).optional(),
  ingredient: z.lazy(() => SortOrderSchema).optional(),
  how_to_use: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductDetailMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductDetailMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  short_description: z.lazy(() => SortOrderSchema).optional(),
  ingredient: z.lazy(() => SortOrderSchema).optional(),
  how_to_use: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ImageProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ImageProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ImageProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CartCountOrderByAggregateInputSchema: z.ZodType<Prisma.CartCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CartAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CartAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CartMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CartMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CartMinOrderByAggregateInputSchema: z.ZodType<Prisma.CartMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CartSumOrderByAggregateInputSchema: z.ZodType<Prisma.CartSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const AddressRelationFilterSchema: z.ZodType<Prisma.AddressRelationFilter> = z.object({
  is: z.lazy(() => AddressWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AddressWhereInputSchema).optional().nullable()
}).strict();

export const StatusOrderRelationFilterSchema: z.ZodType<Prisma.StatusOrderRelationFilter> = z.object({
  is: z.lazy(() => StatusOrderWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StatusOrderWhereInputSchema).optional().nullable()
}).strict();

export const PaymentMethodRelationFilterSchema: z.ZodType<Prisma.PaymentMethodRelationFilter> = z.object({
  is: z.lazy(() => PaymentMethodWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PaymentMethodWhereInputSchema).optional().nullable()
}).strict();

export const OrderCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  address_id: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status_order_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OrderAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  address_id: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status_order_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrderMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  product_id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  address_id: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status_order_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrderSumOrderByAggregateInputSchema: z.ZodType<Prisma.OrderSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StatusOrderCountOrderByAggregateInputSchema: z.ZodType<Prisma.StatusOrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatusOrderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StatusOrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatusOrderMinOrderByAggregateInputSchema: z.ZodType<Prisma.StatusOrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrademarkCountOrderByAggregateInputSchema: z.ZodType<Prisma.TrademarkCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  introduce: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrademarkMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TrademarkMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  introduce: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrademarkMinOrderByAggregateInputSchema: z.ZodType<Prisma.TrademarkMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  introduce: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPaymentStatusFilterSchema: z.ZodType<Prisma.EnumPaymentStatusFilter> = z.object({
  equals: z.lazy(() => PaymentStatusSchema).optional(),
  in: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => NestedEnumPaymentStatusFilterSchema) ]).optional(),
}).strict();

export const OrderRelationFilterSchema: z.ZodType<Prisma.OrderRelationFilter> = z.object({
  is: z.lazy(() => OrderWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => OrderWhereInputSchema).optional().nullable()
}).strict();

export const PaymentMethodCountOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMethodCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  payment_source: z.lazy(() => SortOrderSchema).optional(),
  order_payment_id: z.lazy(() => SortOrderSchema).optional(),
  payment_id: z.lazy(() => SortOrderSchema).optional(),
  payer_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMethodMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMethodMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  payment_source: z.lazy(() => SortOrderSchema).optional(),
  order_payment_id: z.lazy(() => SortOrderSchema).optional(),
  payment_id: z.lazy(() => SortOrderSchema).optional(),
  payer_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMethodMinOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMethodMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order_id: z.lazy(() => SortOrderSchema).optional(),
  payment_source: z.lazy(() => SortOrderSchema).optional(),
  order_payment_id: z.lazy(() => SortOrderSchema).optional(),
  payment_id: z.lazy(() => SortOrderSchema).optional(),
  payer_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPaymentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPaymentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PaymentStatusSchema).optional(),
  in: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => NestedEnumPaymentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional()
}).strict();

export const AddressCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AddressCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressCreateWithoutUserInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema),z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CartCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CartCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutUserInputSchema),z.lazy(() => CartCreateWithoutUserInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutUserInputSchema),z.lazy(() => CartCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrderCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.OrderCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutUserInputSchema),z.lazy(() => OrderCreateWithoutUserInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema),z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional()
}).strict();

export const AddressUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AddressUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressCreateWithoutUserInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema),z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CartUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CartUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutUserInputSchema),z.lazy(() => CartCreateWithoutUserInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutUserInputSchema),z.lazy(() => CartCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.OrderUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutUserInputSchema),z.lazy(() => OrderCreateWithoutUserInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema),z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EnumUserTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserTypeSchema).optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PasswordResetUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PasswordResetUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const AddressUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AddressUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressCreateWithoutUserInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema),z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CartUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CartUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutUserInputSchema),z.lazy(() => CartCreateWithoutUserInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutUserInputSchema),z.lazy(() => CartCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CartUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CartUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CartUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CartUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CartUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CartUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CartScalarWhereInputSchema),z.lazy(() => CartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrderUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.OrderUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutUserInputSchema),z.lazy(() => OrderCreateWithoutUserInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema),z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PasswordResetUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PasswordResetUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const AddressUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressCreateWithoutUserInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema),z.lazy(() => AddressCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CartUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CartUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutUserInputSchema),z.lazy(() => CartCreateWithoutUserInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutUserInputSchema),z.lazy(() => CartCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CartUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CartUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CartUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CartUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CartUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CartUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CartScalarWhereInputSchema),z.lazy(() => CartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutUserInputSchema),z.lazy(() => OrderCreateWithoutUserInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema),z.lazy(() => OrderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPassword_resetInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPassword_resetInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPassword_resetNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPassword_resetNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPassword_resetInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPassword_resetInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPassword_resetInputSchema) ]).optional(),
}).strict();

export const ProvinceCreateNestedOneWithoutAddressInputSchema: z.ZodType<Prisma.ProvinceCreateNestedOneWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => ProvinceCreateWithoutAddressInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProvinceCreateOrConnectWithoutAddressInputSchema).optional(),
  connect: z.lazy(() => ProvinceWhereUniqueInputSchema).optional()
}).strict();

export const DistrictCreateNestedOneWithoutAddressInputSchema: z.ZodType<Prisma.DistrictCreateNestedOneWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutAddressInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DistrictCreateOrConnectWithoutAddressInputSchema).optional(),
  connect: z.lazy(() => DistrictWhereUniqueInputSchema).optional()
}).strict();

export const WardCreateNestedOneWithoutAddressInputSchema: z.ZodType<Prisma.WardCreateNestedOneWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => WardCreateWithoutAddressInputSchema),z.lazy(() => WardUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WardCreateOrConnectWithoutAddressInputSchema).optional(),
  connect: z.lazy(() => WardWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const OrderCreateNestedManyWithoutAddressInputSchema: z.ZodType<Prisma.OrderCreateNestedManyWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutAddressInputSchema),z.lazy(() => OrderCreateWithoutAddressInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema),z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyAddressInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedCreateNestedManyWithoutAddressInputSchema: z.ZodType<Prisma.OrderUncheckedCreateNestedManyWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutAddressInputSchema),z.lazy(() => OrderCreateWithoutAddressInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema),z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyAddressInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumAddressTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAddressTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AddressTypeSchema).optional()
}).strict();

export const ProvinceUpdateOneWithoutAddressNestedInputSchema: z.ZodType<Prisma.ProvinceUpdateOneWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProvinceCreateWithoutAddressInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProvinceCreateOrConnectWithoutAddressInputSchema).optional(),
  upsert: z.lazy(() => ProvinceUpsertWithoutAddressInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProvinceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProvinceUpdateWithoutAddressInputSchema),z.lazy(() => ProvinceUncheckedUpdateWithoutAddressInputSchema) ]).optional(),
}).strict();

export const DistrictUpdateOneWithoutAddressNestedInputSchema: z.ZodType<Prisma.DistrictUpdateOneWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutAddressInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DistrictCreateOrConnectWithoutAddressInputSchema).optional(),
  upsert: z.lazy(() => DistrictUpsertWithoutAddressInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => DistrictWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DistrictUpdateWithoutAddressInputSchema),z.lazy(() => DistrictUncheckedUpdateWithoutAddressInputSchema) ]).optional(),
}).strict();

export const WardUpdateOneWithoutAddressNestedInputSchema: z.ZodType<Prisma.WardUpdateOneWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => WardCreateWithoutAddressInputSchema),z.lazy(() => WardUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WardCreateOrConnectWithoutAddressInputSchema).optional(),
  upsert: z.lazy(() => WardUpsertWithoutAddressInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => WardWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WardUpdateWithoutAddressInputSchema),z.lazy(() => WardUncheckedUpdateWithoutAddressInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutAddressNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAddressInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAddressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAddressInputSchema) ]).optional(),
}).strict();

export const OrderUpdateManyWithoutAddressNestedInputSchema: z.ZodType<Prisma.OrderUpdateManyWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutAddressInputSchema),z.lazy(() => OrderCreateWithoutAddressInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema),z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyAddressInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutAddressInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutAddressInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedUpdateManyWithoutAddressNestedInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutAddressInputSchema),z.lazy(() => OrderCreateWithoutAddressInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema),z.lazy(() => OrderCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyAddressInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutAddressInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutAddressInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProvinceCreateNestedOneWithoutDistrictsInputSchema: z.ZodType<Prisma.ProvinceCreateNestedOneWithoutDistrictsInput> = z.object({
  create: z.union([ z.lazy(() => ProvinceCreateWithoutDistrictsInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutDistrictsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProvinceCreateOrConnectWithoutDistrictsInputSchema).optional(),
  connect: z.lazy(() => ProvinceWhereUniqueInputSchema).optional()
}).strict();

export const WardCreateNestedManyWithoutDistrictInputSchema: z.ZodType<Prisma.WardCreateNestedManyWithoutDistrictInput> = z.object({
  create: z.union([ z.lazy(() => WardCreateWithoutDistrictInputSchema),z.lazy(() => WardCreateWithoutDistrictInputSchema).array(),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WardCreateManyDistrictInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AddressCreateNestedManyWithoutDistrictInputSchema: z.ZodType<Prisma.AddressCreateNestedManyWithoutDistrictInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutDistrictInputSchema),z.lazy(() => AddressCreateWithoutDistrictInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyDistrictInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WardUncheckedCreateNestedManyWithoutDistrictInputSchema: z.ZodType<Prisma.WardUncheckedCreateNestedManyWithoutDistrictInput> = z.object({
  create: z.union([ z.lazy(() => WardCreateWithoutDistrictInputSchema),z.lazy(() => WardCreateWithoutDistrictInputSchema).array(),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WardCreateManyDistrictInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AddressUncheckedCreateNestedManyWithoutDistrictInputSchema: z.ZodType<Prisma.AddressUncheckedCreateNestedManyWithoutDistrictInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutDistrictInputSchema),z.lazy(() => AddressCreateWithoutDistrictInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyDistrictInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProvinceUpdateOneWithoutDistrictsNestedInputSchema: z.ZodType<Prisma.ProvinceUpdateOneWithoutDistrictsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProvinceCreateWithoutDistrictsInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutDistrictsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProvinceCreateOrConnectWithoutDistrictsInputSchema).optional(),
  upsert: z.lazy(() => ProvinceUpsertWithoutDistrictsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProvinceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProvinceUpdateWithoutDistrictsInputSchema),z.lazy(() => ProvinceUncheckedUpdateWithoutDistrictsInputSchema) ]).optional(),
}).strict();

export const WardUpdateManyWithoutDistrictNestedInputSchema: z.ZodType<Prisma.WardUpdateManyWithoutDistrictNestedInput> = z.object({
  create: z.union([ z.lazy(() => WardCreateWithoutDistrictInputSchema),z.lazy(() => WardCreateWithoutDistrictInputSchema).array(),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WardUpsertWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => WardUpsertWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WardCreateManyDistrictInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WardUpdateWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => WardUpdateWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WardUpdateManyWithWhereWithoutDistrictInputSchema),z.lazy(() => WardUpdateManyWithWhereWithoutDistrictInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WardScalarWhereInputSchema),z.lazy(() => WardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AddressUpdateManyWithoutDistrictNestedInputSchema: z.ZodType<Prisma.AddressUpdateManyWithoutDistrictNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutDistrictInputSchema),z.lazy(() => AddressCreateWithoutDistrictInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyDistrictInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutDistrictInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutDistrictInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WardUncheckedUpdateManyWithoutDistrictNestedInputSchema: z.ZodType<Prisma.WardUncheckedUpdateManyWithoutDistrictNestedInput> = z.object({
  create: z.union([ z.lazy(() => WardCreateWithoutDistrictInputSchema),z.lazy(() => WardCreateWithoutDistrictInputSchema).array(),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => WardCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WardUpsertWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => WardUpsertWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WardCreateManyDistrictInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WardWhereUniqueInputSchema),z.lazy(() => WardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WardUpdateWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => WardUpdateWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WardUpdateManyWithWhereWithoutDistrictInputSchema),z.lazy(() => WardUpdateManyWithWhereWithoutDistrictInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WardScalarWhereInputSchema),z.lazy(() => WardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AddressUncheckedUpdateManyWithoutDistrictNestedInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyWithoutDistrictNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutDistrictInputSchema),z.lazy(() => AddressCreateWithoutDistrictInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema),z.lazy(() => AddressCreateOrConnectWithoutDistrictInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyDistrictInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutDistrictInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutDistrictInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutDistrictInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutDistrictInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DistrictCreateNestedManyWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictCreateNestedManyWithoutProvinceInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutProvinceInputSchema),z.lazy(() => DistrictCreateWithoutProvinceInputSchema).array(),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DistrictCreateManyProvinceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AddressCreateNestedManyWithoutProvinceInputSchema: z.ZodType<Prisma.AddressCreateNestedManyWithoutProvinceInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutProvinceInputSchema),z.lazy(() => AddressCreateWithoutProvinceInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyProvinceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DistrictUncheckedCreateNestedManyWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictUncheckedCreateNestedManyWithoutProvinceInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutProvinceInputSchema),z.lazy(() => DistrictCreateWithoutProvinceInputSchema).array(),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DistrictCreateManyProvinceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AddressUncheckedCreateNestedManyWithoutProvinceInputSchema: z.ZodType<Prisma.AddressUncheckedCreateNestedManyWithoutProvinceInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutProvinceInputSchema),z.lazy(() => AddressCreateWithoutProvinceInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyProvinceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DistrictUpdateManyWithoutProvinceNestedInputSchema: z.ZodType<Prisma.DistrictUpdateManyWithoutProvinceNestedInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutProvinceInputSchema),z.lazy(() => DistrictCreateWithoutProvinceInputSchema).array(),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DistrictUpsertWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => DistrictUpsertWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DistrictCreateManyProvinceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DistrictUpdateWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => DistrictUpdateWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DistrictUpdateManyWithWhereWithoutProvinceInputSchema),z.lazy(() => DistrictUpdateManyWithWhereWithoutProvinceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DistrictScalarWhereInputSchema),z.lazy(() => DistrictScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AddressUpdateManyWithoutProvinceNestedInputSchema: z.ZodType<Prisma.AddressUpdateManyWithoutProvinceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutProvinceInputSchema),z.lazy(() => AddressCreateWithoutProvinceInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyProvinceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutProvinceInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutProvinceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DistrictUncheckedUpdateManyWithoutProvinceNestedInputSchema: z.ZodType<Prisma.DistrictUncheckedUpdateManyWithoutProvinceNestedInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutProvinceInputSchema),z.lazy(() => DistrictCreateWithoutProvinceInputSchema).array(),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => DistrictCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DistrictUpsertWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => DistrictUpsertWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DistrictCreateManyProvinceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DistrictWhereUniqueInputSchema),z.lazy(() => DistrictWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DistrictUpdateWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => DistrictUpdateWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DistrictUpdateManyWithWhereWithoutProvinceInputSchema),z.lazy(() => DistrictUpdateManyWithWhereWithoutProvinceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DistrictScalarWhereInputSchema),z.lazy(() => DistrictScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AddressUncheckedUpdateManyWithoutProvinceNestedInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyWithoutProvinceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutProvinceInputSchema),z.lazy(() => AddressCreateWithoutProvinceInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema),z.lazy(() => AddressCreateOrConnectWithoutProvinceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyProvinceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutProvinceInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutProvinceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutProvinceInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutProvinceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DistrictCreateNestedOneWithoutWardInputSchema: z.ZodType<Prisma.DistrictCreateNestedOneWithoutWardInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutWardInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutWardInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DistrictCreateOrConnectWithoutWardInputSchema).optional(),
  connect: z.lazy(() => DistrictWhereUniqueInputSchema).optional()
}).strict();

export const AddressCreateNestedManyWithoutWardInputSchema: z.ZodType<Prisma.AddressCreateNestedManyWithoutWardInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutWardInputSchema),z.lazy(() => AddressCreateWithoutWardInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema),z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyWardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AddressUncheckedCreateNestedManyWithoutWardInputSchema: z.ZodType<Prisma.AddressUncheckedCreateNestedManyWithoutWardInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutWardInputSchema),z.lazy(() => AddressCreateWithoutWardInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema),z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyWardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DistrictUpdateOneWithoutWardNestedInputSchema: z.ZodType<Prisma.DistrictUpdateOneWithoutWardNestedInput> = z.object({
  create: z.union([ z.lazy(() => DistrictCreateWithoutWardInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutWardInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DistrictCreateOrConnectWithoutWardInputSchema).optional(),
  upsert: z.lazy(() => DistrictUpsertWithoutWardInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => DistrictWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DistrictUpdateWithoutWardInputSchema),z.lazy(() => DistrictUncheckedUpdateWithoutWardInputSchema) ]).optional(),
}).strict();

export const AddressUpdateManyWithoutWardNestedInputSchema: z.ZodType<Prisma.AddressUpdateManyWithoutWardNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutWardInputSchema),z.lazy(() => AddressCreateWithoutWardInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema),z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutWardInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutWardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyWardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutWardInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutWardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutWardInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutWardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AddressUncheckedUpdateManyWithoutWardNestedInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyWithoutWardNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutWardInputSchema),z.lazy(() => AddressCreateWithoutWardInputSchema).array(),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema),z.lazy(() => AddressCreateOrConnectWithoutWardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AddressUpsertWithWhereUniqueWithoutWardInputSchema),z.lazy(() => AddressUpsertWithWhereUniqueWithoutWardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AddressCreateManyWardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AddressWhereUniqueInputSchema),z.lazy(() => AddressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithWhereUniqueWithoutWardInputSchema),z.lazy(() => AddressUpdateWithWhereUniqueWithoutWardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AddressUpdateManyWithWhereWithoutWardInputSchema),z.lazy(() => AddressUpdateManyWithWhereWithoutWardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageProductCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ImageProductCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ImageProductCreateWithoutProductInputSchema),z.lazy(() => ImageProductCreateWithoutProductInputSchema).array(),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageProductCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UnitCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.UnitCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutProductInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const CartCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.CartCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutProductInputSchema),z.lazy(() => CartCreateWithoutProductInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutProductInputSchema),z.lazy(() => CartCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrderCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.OrderCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutProductInputSchema),z.lazy(() => OrderCreateWithoutProductInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema),z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductDetailCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ProductDetailCreateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductDetailCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => ProductDetailWhereUniqueInputSchema).optional()
}).strict();

export const TrademarkCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.TrademarkCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => TrademarkCreateWithoutProductInputSchema),z.lazy(() => TrademarkUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TrademarkCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => TrademarkWhereUniqueInputSchema).optional()
}).strict();

export const ImageProductUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ImageProductUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ImageProductCreateWithoutProductInputSchema),z.lazy(() => ImageProductCreateWithoutProductInputSchema).array(),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageProductCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CartUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.CartUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutProductInputSchema),z.lazy(() => CartCreateWithoutProductInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutProductInputSchema),z.lazy(() => CartCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.OrderUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutProductInputSchema),z.lazy(() => OrderCreateWithoutProductInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema),z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailUncheckedCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ProductDetailCreateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductDetailCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => ProductDetailWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumstatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumstatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => statusSchema).optional()
}).strict();

export const ImageProductUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ImageProductUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageProductCreateWithoutProductInputSchema),z.lazy(() => ImageProductCreateWithoutProductInputSchema).array(),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageProductUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ImageProductUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageProductCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageProductUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ImageProductUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageProductUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ImageProductUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageProductScalarWhereInputSchema),z.lazy(() => ImageProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UnitUpdateOneWithoutProductNestedInputSchema: z.ZodType<Prisma.UnitUpdateOneWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => UnitUpsertWithoutProductInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnitUpdateWithoutProductInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneWithoutProductNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutProductInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutProductInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateWithoutProductInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export const CartUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.CartUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutProductInputSchema),z.lazy(() => CartCreateWithoutProductInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutProductInputSchema),z.lazy(() => CartCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CartUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => CartUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CartUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => CartUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CartUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => CartUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CartScalarWhereInputSchema),z.lazy(() => CartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrderUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.OrderUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutProductInputSchema),z.lazy(() => OrderCreateWithoutProductInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema),z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductDetailUpdateOneWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductDetailUpdateOneWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductDetailCreateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductDetailCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => ProductDetailUpsertWithoutProductInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProductDetailWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductDetailUpdateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export const TrademarkUpdateOneWithoutProductNestedInputSchema: z.ZodType<Prisma.TrademarkUpdateOneWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => TrademarkCreateWithoutProductInputSchema),z.lazy(() => TrademarkUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TrademarkCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => TrademarkUpsertWithoutProductInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => TrademarkWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TrademarkUpdateWithoutProductInputSchema),z.lazy(() => TrademarkUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export const ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ImageProductUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageProductCreateWithoutProductInputSchema),z.lazy(() => ImageProductCreateWithoutProductInputSchema).array(),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => ImageProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageProductUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ImageProductUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageProductCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageProductWhereUniqueInputSchema),z.lazy(() => ImageProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageProductUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ImageProductUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageProductUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ImageProductUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageProductScalarWhereInputSchema),z.lazy(() => ImageProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CartUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.CartUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => CartCreateWithoutProductInputSchema),z.lazy(() => CartCreateWithoutProductInputSchema).array(),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CartCreateOrConnectWithoutProductInputSchema),z.lazy(() => CartCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CartUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => CartUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CartCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CartWhereUniqueInputSchema),z.lazy(() => CartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CartUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => CartUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CartUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => CartUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CartScalarWhereInputSchema),z.lazy(() => CartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutProductInputSchema),z.lazy(() => OrderCreateWithoutProductInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema),z.lazy(() => OrderCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductDetailUncheckedUpdateOneWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductDetailCreateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductDetailCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => ProductDetailUpsertWithoutProductInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProductDetailWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductDetailUpdateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export const ProductCreateNestedOneWithoutProduct_detailInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutProduct_detailInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutProduct_detailInputSchema),z.lazy(() => ProductUncheckedCreateWithoutProduct_detailInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutProduct_detailInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const ProductUpdateOneRequiredWithoutProduct_detailNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutProduct_detailNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutProduct_detailInputSchema),z.lazy(() => ProductUncheckedCreateWithoutProduct_detailInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutProduct_detailInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutProduct_detailInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithoutProduct_detailInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutProduct_detailInputSchema) ]).optional(),
}).strict();

export const ProductCreateNestedOneWithoutImageInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutImageInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutImageInputSchema),z.lazy(() => ProductUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutImageInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const ProductUpdateOneWithoutImageNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneWithoutImageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutImageInputSchema),z.lazy(() => ProductUncheckedCreateWithoutImageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutImageInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutImageInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithoutImageInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutImageInputSchema) ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductCreateWithoutCategoryInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductCreateWithoutCategoryInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductCreateWithoutCategoryInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductCreateWithoutCategoryInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCartInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCartInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCartInputSchema),z.lazy(() => UserUncheckedCreateWithoutCartInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCartInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProductCreateNestedOneWithoutCartInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutCartInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCartInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCartInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCartInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCartNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCartNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCartInputSchema),z.lazy(() => UserUncheckedCreateWithoutCartInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCartInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCartInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCartInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCartInputSchema) ]).optional(),
}).strict();

export const ProductUpdateOneRequiredWithoutCartNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutCartNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCartInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCartInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCartInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutCartInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithoutCartInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCartInputSchema) ]).optional(),
}).strict();

export const AddressCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.AddressCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutOrderInputSchema),z.lazy(() => AddressUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AddressCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => AddressWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProductCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOrderInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const StatusOrderCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.StatusOrderCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => StatusOrderCreateWithoutOrderInputSchema),z.lazy(() => StatusOrderUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatusOrderCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => StatusOrderWhereUniqueInputSchema).optional()
}).strict();

export const PaymentMethodCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentMethodCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => PaymentMethodWhereUniqueInputSchema).optional()
}).strict();

export const PaymentMethodUncheckedCreateNestedOneWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedCreateNestedOneWithoutOrderInput> = z.object({
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentMethodCreateOrConnectWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => PaymentMethodWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const AddressUpdateOneRequiredWithoutOrderNestedInputSchema: z.ZodType<Prisma.AddressUpdateOneRequiredWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => AddressCreateWithoutOrderInputSchema),z.lazy(() => AddressUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AddressCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => AddressUpsertWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => AddressWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AddressUpdateWithoutOrderInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutOrderNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutOrderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict();

export const ProductUpdateOneRequiredWithoutOrderNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOrderInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithoutOrderInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict();

export const StatusOrderUpdateOneRequiredWithoutOrderNestedInputSchema: z.ZodType<Prisma.StatusOrderUpdateOneRequiredWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => StatusOrderCreateWithoutOrderInputSchema),z.lazy(() => StatusOrderUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatusOrderCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => StatusOrderUpsertWithoutOrderInputSchema).optional(),
  connect: z.lazy(() => StatusOrderWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StatusOrderUpdateWithoutOrderInputSchema),z.lazy(() => StatusOrderUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUpdateOneWithoutOrderNestedInputSchema: z.ZodType<Prisma.PaymentMethodUpdateOneWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentMethodCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => PaymentMethodUpsertWithoutOrderInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PaymentMethodWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentMethodUpdateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUncheckedUpdateOneWithoutOrderNestedInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedUpdateOneWithoutOrderNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutOrderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentMethodCreateOrConnectWithoutOrderInputSchema).optional(),
  upsert: z.lazy(() => PaymentMethodUpsertWithoutOrderInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PaymentMethodWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentMethodUpdateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedUpdateWithoutOrderInputSchema) ]).optional(),
}).strict();

export const OrderCreateNestedManyWithoutStatusInputSchema: z.ZodType<Prisma.OrderCreateNestedManyWithoutStatusInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutStatusInputSchema),z.lazy(() => OrderCreateWithoutStatusInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema),z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyStatusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedCreateNestedManyWithoutStatusInputSchema: z.ZodType<Prisma.OrderUncheckedCreateNestedManyWithoutStatusInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutStatusInputSchema),z.lazy(() => OrderCreateWithoutStatusInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema),z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyStatusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrderUpdateManyWithoutStatusNestedInputSchema: z.ZodType<Prisma.OrderUpdateManyWithoutStatusNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutStatusInputSchema),z.lazy(() => OrderCreateWithoutStatusInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema),z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyStatusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutStatusInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutStatusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrderUncheckedUpdateManyWithoutStatusNestedInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyWithoutStatusNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutStatusInputSchema),z.lazy(() => OrderCreateWithoutStatusInputSchema).array(),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema),z.lazy(() => OrderCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrderUpsertWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => OrderUpsertWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrderCreateManyStatusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrderWhereUniqueInputSchema),z.lazy(() => OrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => OrderUpdateWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrderUpdateManyWithWhereWithoutStatusInputSchema),z.lazy(() => OrderUpdateManyWithWhereWithoutStatusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutTrademarkInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutTrademarkInputSchema),z.lazy(() => ProductCreateWithoutTrademarkInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema),z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyTrademarkInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutTrademarkInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutTrademarkInputSchema),z.lazy(() => ProductCreateWithoutTrademarkInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema),z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyTrademarkInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutTrademarkNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutTrademarkNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutTrademarkInputSchema),z.lazy(() => ProductCreateWithoutTrademarkInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema),z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutTrademarkInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutTrademarkInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyTrademarkInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutTrademarkInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutTrademarkInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutTrademarkInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutTrademarkInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutTrademarkNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutTrademarkNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutTrademarkInputSchema),z.lazy(() => ProductCreateWithoutTrademarkInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema),z.lazy(() => ProductCreateOrConnectWithoutTrademarkInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutTrademarkInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutTrademarkInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyTrademarkInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutTrademarkInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutTrademarkInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutTrademarkInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutTrademarkInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrderCreateNestedOneWithoutPayment_methodInputSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutPayment_methodInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutPayment_methodInputSchema),z.lazy(() => OrderUncheckedCreateWithoutPayment_methodInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutPayment_methodInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional()
}).strict();

export const EnumPaymentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPaymentStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PaymentStatusSchema).optional()
}).strict();

export const OrderUpdateOneWithoutPayment_methodNestedInputSchema: z.ZodType<Prisma.OrderUpdateOneWithoutPayment_methodNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutPayment_methodInputSchema),z.lazy(() => OrderUncheckedCreateWithoutPayment_methodInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutPayment_methodInputSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutPayment_methodInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrderUpdateWithoutPayment_methodInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutPayment_methodInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumUserTypeFilterSchema: z.ZodType<Prisma.NestedEnumUserTypeFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumUserTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTypeFilterSchema).optional()
}).strict();

export const NestedEnumAddressTypeFilterSchema: z.ZodType<Prisma.NestedEnumAddressTypeFilter> = z.object({
  equals: z.lazy(() => AddressTypeSchema).optional(),
  in: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => NestedEnumAddressTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAddressTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAddressTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AddressTypeSchema).optional(),
  in: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AddressTypeSchema).array(),z.lazy(() => AddressTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => NestedEnumAddressTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAddressTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAddressTypeFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumstatusFilterSchema: z.ZodType<Prisma.NestedEnumstatusFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedEnumstatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumstatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => statusSchema).array(),z.lazy(() => statusSchema) ]).optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstatusFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumPaymentStatusFilterSchema: z.ZodType<Prisma.NestedEnumPaymentStatusFilter> = z.object({
  equals: z.lazy(() => PaymentStatusSchema).optional(),
  in: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => NestedEnumPaymentStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPaymentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPaymentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PaymentStatusSchema).optional(),
  in: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => PaymentStatusSchema).array(),z.lazy(() => PaymentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => NestedEnumPaymentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PasswordResetCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordResetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AddressCreateWithoutUserInputSchema: z.ZodType<Prisma.AddressCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province: z.lazy(() => ProvinceCreateNestedOneWithoutAddressInputSchema).optional(),
  district: z.lazy(() => DistrictCreateNestedOneWithoutAddressInputSchema).optional(),
  ward: z.lazy(() => WardCreateNestedOneWithoutAddressInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AddressUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AddressCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AddressCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AddressCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AddressCreateManyUserInputSchema),z.lazy(() => AddressCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CartCreateWithoutUserInputSchema: z.ZodType<Prisma.CartCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutCartInputSchema)
}).strict();

export const CartUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CartUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  product_id: z.string(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CartCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CartCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CartCreateWithoutUserInputSchema),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CartCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CartCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CartCreateManyUserInputSchema),z.lazy(() => CartCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrderCreateWithoutUserInputSchema: z.ZodType<Prisma.OrderCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  address: z.lazy(() => AddressCreateNestedOneWithoutOrderInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderInputSchema),
  status: z.lazy(() => StatusOrderCreateNestedOneWithoutOrderInputSchema),
  payment_method: z.lazy(() => PaymentMethodCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string(),
  payment_method: z.lazy(() => PaymentMethodUncheckedCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutUserInputSchema),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const OrderCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.OrderCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OrderCreateManyUserInputSchema),z.lazy(() => OrderCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PasswordResetUpsertWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => PasswordResetUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PasswordResetUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AddressUpdateWithoutUserInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AddressCreateWithoutUserInputSchema),z.lazy(() => AddressUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AddressUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AddressUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateWithoutUserInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AddressUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AddressUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AddressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateManyMutationInputSchema),z.lazy(() => AddressUncheckedUpdateManyWithoutAddressInputSchema) ]),
}).strict();

export const AddressScalarWhereInputSchema: z.ZodType<Prisma.AddressScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AddressScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AddressScalarWhereInputSchema),z.lazy(() => AddressScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address_detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type_address: z.union([ z.lazy(() => EnumAddressTypeFilterSchema),z.lazy(() => AddressTypeSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  province_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  district_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ward_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CartUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CartUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CartWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CartUpdateWithoutUserInputSchema),z.lazy(() => CartUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CartCreateWithoutUserInputSchema),z.lazy(() => CartUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CartUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CartUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CartWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CartUpdateWithoutUserInputSchema),z.lazy(() => CartUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CartUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CartUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CartScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CartUpdateManyMutationInputSchema),z.lazy(() => CartUncheckedUpdateManyWithoutCartInputSchema) ]),
}).strict();

export const CartScalarWhereInputSchema: z.ZodType<Prisma.CartScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CartScalarWhereInputSchema),z.lazy(() => CartScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CartScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CartScalarWhereInputSchema),z.lazy(() => CartScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const OrderUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.OrderUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OrderUpdateWithoutUserInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutUserInputSchema),z.lazy(() => OrderUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const OrderUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.OrderUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateWithoutUserInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const OrderUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.OrderUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => OrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateManyMutationInputSchema),z.lazy(() => OrderUncheckedUpdateManyWithoutOrderInputSchema) ]),
}).strict();

export const OrderScalarWhereInputSchema: z.ZodType<Prisma.OrderScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderScalarWhereInputSchema),z.lazy(() => OrderScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  address_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_paid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status_order_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserCreateWithoutPassword_resetInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPassword_resetInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPassword_resetInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]),
}).strict();

export const UserUpsertWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUpsertWithoutPassword_resetInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPassword_resetInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]),
}).strict();

export const UserUpdateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUpdateWithoutPassword_resetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPassword_resetInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProvinceCreateWithoutAddressInputSchema: z.ZodType<Prisma.ProvinceCreateWithoutAddressInput> = z.object({
  province_id: z.string().cuid().optional(),
  name: z.string(),
  districts: z.lazy(() => DistrictCreateNestedManyWithoutProvinceInputSchema).optional()
}).strict();

export const ProvinceUncheckedCreateWithoutAddressInputSchema: z.ZodType<Prisma.ProvinceUncheckedCreateWithoutAddressInput> = z.object({
  province_id: z.string().cuid().optional(),
  name: z.string(),
  districts: z.lazy(() => DistrictUncheckedCreateNestedManyWithoutProvinceInputSchema).optional()
}).strict();

export const ProvinceCreateOrConnectWithoutAddressInputSchema: z.ZodType<Prisma.ProvinceCreateOrConnectWithoutAddressInput> = z.object({
  where: z.lazy(() => ProvinceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProvinceCreateWithoutAddressInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const DistrictCreateWithoutAddressInputSchema: z.ZodType<Prisma.DistrictCreateWithoutAddressInput> = z.object({
  district_id: z.string().cuid().optional(),
  name: z.string(),
  Province: z.lazy(() => ProvinceCreateNestedOneWithoutDistrictsInputSchema).optional(),
  ward: z.lazy(() => WardCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictUncheckedCreateWithoutAddressInputSchema: z.ZodType<Prisma.DistrictUncheckedCreateWithoutAddressInput> = z.object({
  district_id: z.string().cuid().optional(),
  province_id: z.string(),
  name: z.string(),
  ward: z.lazy(() => WardUncheckedCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictCreateOrConnectWithoutAddressInputSchema: z.ZodType<Prisma.DistrictCreateOrConnectWithoutAddressInput> = z.object({
  where: z.lazy(() => DistrictWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DistrictCreateWithoutAddressInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const WardCreateWithoutAddressInputSchema: z.ZodType<Prisma.WardCreateWithoutAddressInput> = z.object({
  ward_id: z.string().cuid().optional(),
  name: z.string(),
  district: z.lazy(() => DistrictCreateNestedOneWithoutWardInputSchema).optional()
}).strict();

export const WardUncheckedCreateWithoutAddressInputSchema: z.ZodType<Prisma.WardUncheckedCreateWithoutAddressInput> = z.object({
  ward_id: z.string().cuid().optional(),
  district_id: z.string(),
  name: z.string()
}).strict();

export const WardCreateOrConnectWithoutAddressInputSchema: z.ZodType<Prisma.WardCreateOrConnectWithoutAddressInput> = z.object({
  where: z.lazy(() => WardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WardCreateWithoutAddressInputSchema),z.lazy(() => WardUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const UserCreateWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateWithoutAddressInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAddressInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAddressInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const OrderCreateWithoutAddressInputSchema: z.ZodType<Prisma.OrderCreateWithoutAddressInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutOrderInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderInputSchema),
  status: z.lazy(() => StatusOrderCreateNestedOneWithoutOrderInputSchema),
  payment_method: z.lazy(() => PaymentMethodCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderUncheckedCreateWithoutAddressInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutAddressInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string(),
  payment_method: z.lazy(() => PaymentMethodUncheckedCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderCreateOrConnectWithoutAddressInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutAddressInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const OrderCreateManyAddressInputEnvelopeSchema: z.ZodType<Prisma.OrderCreateManyAddressInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OrderCreateManyAddressInputSchema),z.lazy(() => OrderCreateManyAddressInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProvinceUpsertWithoutAddressInputSchema: z.ZodType<Prisma.ProvinceUpsertWithoutAddressInput> = z.object({
  update: z.union([ z.lazy(() => ProvinceUpdateWithoutAddressInputSchema),z.lazy(() => ProvinceUncheckedUpdateWithoutAddressInputSchema) ]),
  create: z.union([ z.lazy(() => ProvinceCreateWithoutAddressInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const ProvinceUpdateWithoutAddressInputSchema: z.ZodType<Prisma.ProvinceUpdateWithoutAddressInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  districts: z.lazy(() => DistrictUpdateManyWithoutProvinceNestedInputSchema).optional()
}).strict();

export const ProvinceUncheckedUpdateWithoutAddressInputSchema: z.ZodType<Prisma.ProvinceUncheckedUpdateWithoutAddressInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  districts: z.lazy(() => DistrictUncheckedUpdateManyWithoutProvinceNestedInputSchema).optional()
}).strict();

export const DistrictUpsertWithoutAddressInputSchema: z.ZodType<Prisma.DistrictUpsertWithoutAddressInput> = z.object({
  update: z.union([ z.lazy(() => DistrictUpdateWithoutAddressInputSchema),z.lazy(() => DistrictUncheckedUpdateWithoutAddressInputSchema) ]),
  create: z.union([ z.lazy(() => DistrictCreateWithoutAddressInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const DistrictUpdateWithoutAddressInputSchema: z.ZodType<Prisma.DistrictUpdateWithoutAddressInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Province: z.lazy(() => ProvinceUpdateOneWithoutDistrictsNestedInputSchema).optional(),
  ward: z.lazy(() => WardUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const DistrictUncheckedUpdateWithoutAddressInputSchema: z.ZodType<Prisma.DistrictUncheckedUpdateWithoutAddressInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward: z.lazy(() => WardUncheckedUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const WardUpsertWithoutAddressInputSchema: z.ZodType<Prisma.WardUpsertWithoutAddressInput> = z.object({
  update: z.union([ z.lazy(() => WardUpdateWithoutAddressInputSchema),z.lazy(() => WardUncheckedUpdateWithoutAddressInputSchema) ]),
  create: z.union([ z.lazy(() => WardCreateWithoutAddressInputSchema),z.lazy(() => WardUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const WardUpdateWithoutAddressInputSchema: z.ZodType<Prisma.WardUpdateWithoutAddressInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district: z.lazy(() => DistrictUpdateOneWithoutWardNestedInputSchema).optional()
}).strict();

export const WardUncheckedUpdateWithoutAddressInputSchema: z.ZodType<Prisma.WardUncheckedUpdateWithoutAddressInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutAddressInputSchema: z.ZodType<Prisma.UserUpsertWithoutAddressInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAddressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAddressInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const UserUpdateWithoutAddressInputSchema: z.ZodType<Prisma.UserUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const OrderUpsertWithWhereUniqueWithoutAddressInputSchema: z.ZodType<Prisma.OrderUpsertWithWhereUniqueWithoutAddressInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OrderUpdateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutAddressInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const OrderUpdateWithWhereUniqueWithoutAddressInputSchema: z.ZodType<Prisma.OrderUpdateWithWhereUniqueWithoutAddressInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateWithoutAddressInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutAddressInputSchema) ]),
}).strict();

export const OrderUpdateManyWithWhereWithoutAddressInputSchema: z.ZodType<Prisma.OrderUpdateManyWithWhereWithoutAddressInput> = z.object({
  where: z.lazy(() => OrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateManyMutationInputSchema),z.lazy(() => OrderUncheckedUpdateManyWithoutOrderInputSchema) ]),
}).strict();

export const ProvinceCreateWithoutDistrictsInputSchema: z.ZodType<Prisma.ProvinceCreateWithoutDistrictsInput> = z.object({
  province_id: z.string().cuid().optional(),
  name: z.string(),
  address: z.lazy(() => AddressCreateNestedManyWithoutProvinceInputSchema).optional()
}).strict();

export const ProvinceUncheckedCreateWithoutDistrictsInputSchema: z.ZodType<Prisma.ProvinceUncheckedCreateWithoutDistrictsInput> = z.object({
  province_id: z.string().cuid().optional(),
  name: z.string(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutProvinceInputSchema).optional()
}).strict();

export const ProvinceCreateOrConnectWithoutDistrictsInputSchema: z.ZodType<Prisma.ProvinceCreateOrConnectWithoutDistrictsInput> = z.object({
  where: z.lazy(() => ProvinceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProvinceCreateWithoutDistrictsInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutDistrictsInputSchema) ]),
}).strict();

export const WardCreateWithoutDistrictInputSchema: z.ZodType<Prisma.WardCreateWithoutDistrictInput> = z.object({
  ward_id: z.string().cuid().optional(),
  name: z.string(),
  address: z.lazy(() => AddressCreateNestedManyWithoutWardInputSchema).optional()
}).strict();

export const WardUncheckedCreateWithoutDistrictInputSchema: z.ZodType<Prisma.WardUncheckedCreateWithoutDistrictInput> = z.object({
  ward_id: z.string().cuid().optional(),
  name: z.string(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutWardInputSchema).optional()
}).strict();

export const WardCreateOrConnectWithoutDistrictInputSchema: z.ZodType<Prisma.WardCreateOrConnectWithoutDistrictInput> = z.object({
  where: z.lazy(() => WardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WardCreateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema) ]),
}).strict();

export const WardCreateManyDistrictInputEnvelopeSchema: z.ZodType<Prisma.WardCreateManyDistrictInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WardCreateManyDistrictInputSchema),z.lazy(() => WardCreateManyDistrictInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AddressCreateWithoutDistrictInputSchema: z.ZodType<Prisma.AddressCreateWithoutDistrictInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province: z.lazy(() => ProvinceCreateNestedOneWithoutAddressInputSchema).optional(),
  ward: z.lazy(() => WardCreateNestedOneWithoutAddressInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddressInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressUncheckedCreateWithoutDistrictInputSchema: z.ZodType<Prisma.AddressUncheckedCreateWithoutDistrictInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  ward_id: z.string(),
  userId: z.string().optional().nullable(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressCreateOrConnectWithoutDistrictInputSchema: z.ZodType<Prisma.AddressCreateOrConnectWithoutDistrictInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AddressCreateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema) ]),
}).strict();

export const AddressCreateManyDistrictInputEnvelopeSchema: z.ZodType<Prisma.AddressCreateManyDistrictInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AddressCreateManyDistrictInputSchema),z.lazy(() => AddressCreateManyDistrictInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProvinceUpsertWithoutDistrictsInputSchema: z.ZodType<Prisma.ProvinceUpsertWithoutDistrictsInput> = z.object({
  update: z.union([ z.lazy(() => ProvinceUpdateWithoutDistrictsInputSchema),z.lazy(() => ProvinceUncheckedUpdateWithoutDistrictsInputSchema) ]),
  create: z.union([ z.lazy(() => ProvinceCreateWithoutDistrictsInputSchema),z.lazy(() => ProvinceUncheckedCreateWithoutDistrictsInputSchema) ]),
}).strict();

export const ProvinceUpdateWithoutDistrictsInputSchema: z.ZodType<Prisma.ProvinceUpdateWithoutDistrictsInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutProvinceNestedInputSchema).optional()
}).strict();

export const ProvinceUncheckedUpdateWithoutDistrictsInputSchema: z.ZodType<Prisma.ProvinceUncheckedUpdateWithoutDistrictsInput> = z.object({
  province_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutProvinceNestedInputSchema).optional()
}).strict();

export const WardUpsertWithWhereUniqueWithoutDistrictInputSchema: z.ZodType<Prisma.WardUpsertWithWhereUniqueWithoutDistrictInput> = z.object({
  where: z.lazy(() => WardWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WardUpdateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedUpdateWithoutDistrictInputSchema) ]),
  create: z.union([ z.lazy(() => WardCreateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedCreateWithoutDistrictInputSchema) ]),
}).strict();

export const WardUpdateWithWhereUniqueWithoutDistrictInputSchema: z.ZodType<Prisma.WardUpdateWithWhereUniqueWithoutDistrictInput> = z.object({
  where: z.lazy(() => WardWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WardUpdateWithoutDistrictInputSchema),z.lazy(() => WardUncheckedUpdateWithoutDistrictInputSchema) ]),
}).strict();

export const WardUpdateManyWithWhereWithoutDistrictInputSchema: z.ZodType<Prisma.WardUpdateManyWithWhereWithoutDistrictInput> = z.object({
  where: z.lazy(() => WardScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WardUpdateManyMutationInputSchema),z.lazy(() => WardUncheckedUpdateManyWithoutWardInputSchema) ]),
}).strict();

export const WardScalarWhereInputSchema: z.ZodType<Prisma.WardScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WardScalarWhereInputSchema),z.lazy(() => WardScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WardScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WardScalarWhereInputSchema),z.lazy(() => WardScalarWhereInputSchema).array() ]).optional(),
  ward_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  district_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AddressUpsertWithWhereUniqueWithoutDistrictInputSchema: z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutDistrictInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AddressUpdateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutDistrictInputSchema) ]),
  create: z.union([ z.lazy(() => AddressCreateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedCreateWithoutDistrictInputSchema) ]),
}).strict();

export const AddressUpdateWithWhereUniqueWithoutDistrictInputSchema: z.ZodType<Prisma.AddressUpdateWithWhereUniqueWithoutDistrictInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateWithoutDistrictInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutDistrictInputSchema) ]),
}).strict();

export const AddressUpdateManyWithWhereWithoutDistrictInputSchema: z.ZodType<Prisma.AddressUpdateManyWithWhereWithoutDistrictInput> = z.object({
  where: z.lazy(() => AddressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateManyMutationInputSchema),z.lazy(() => AddressUncheckedUpdateManyWithoutAddressInputSchema) ]),
}).strict();

export const DistrictCreateWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictCreateWithoutProvinceInput> = z.object({
  district_id: z.string().cuid().optional(),
  name: z.string(),
  ward: z.lazy(() => WardCreateNestedManyWithoutDistrictInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictUncheckedCreateWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictUncheckedCreateWithoutProvinceInput> = z.object({
  district_id: z.string().cuid().optional(),
  name: z.string(),
  ward: z.lazy(() => WardUncheckedCreateNestedManyWithoutDistrictInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictCreateOrConnectWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictCreateOrConnectWithoutProvinceInput> = z.object({
  where: z.lazy(() => DistrictWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DistrictCreateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema) ]),
}).strict();

export const DistrictCreateManyProvinceInputEnvelopeSchema: z.ZodType<Prisma.DistrictCreateManyProvinceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DistrictCreateManyProvinceInputSchema),z.lazy(() => DistrictCreateManyProvinceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AddressCreateWithoutProvinceInputSchema: z.ZodType<Prisma.AddressCreateWithoutProvinceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  district: z.lazy(() => DistrictCreateNestedOneWithoutAddressInputSchema).optional(),
  ward: z.lazy(() => WardCreateNestedOneWithoutAddressInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddressInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressUncheckedCreateWithoutProvinceInputSchema: z.ZodType<Prisma.AddressUncheckedCreateWithoutProvinceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string().optional().nullable(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressCreateOrConnectWithoutProvinceInputSchema: z.ZodType<Prisma.AddressCreateOrConnectWithoutProvinceInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AddressCreateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema) ]),
}).strict();

export const AddressCreateManyProvinceInputEnvelopeSchema: z.ZodType<Prisma.AddressCreateManyProvinceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AddressCreateManyProvinceInputSchema),z.lazy(() => AddressCreateManyProvinceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DistrictUpsertWithWhereUniqueWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictUpsertWithWhereUniqueWithoutProvinceInput> = z.object({
  where: z.lazy(() => DistrictWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DistrictUpdateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedUpdateWithoutProvinceInputSchema) ]),
  create: z.union([ z.lazy(() => DistrictCreateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutProvinceInputSchema) ]),
}).strict();

export const DistrictUpdateWithWhereUniqueWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictUpdateWithWhereUniqueWithoutProvinceInput> = z.object({
  where: z.lazy(() => DistrictWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DistrictUpdateWithoutProvinceInputSchema),z.lazy(() => DistrictUncheckedUpdateWithoutProvinceInputSchema) ]),
}).strict();

export const DistrictUpdateManyWithWhereWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictUpdateManyWithWhereWithoutProvinceInput> = z.object({
  where: z.lazy(() => DistrictScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DistrictUpdateManyMutationInputSchema),z.lazy(() => DistrictUncheckedUpdateManyWithoutDistrictsInputSchema) ]),
}).strict();

export const DistrictScalarWhereInputSchema: z.ZodType<Prisma.DistrictScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DistrictScalarWhereInputSchema),z.lazy(() => DistrictScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DistrictScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DistrictScalarWhereInputSchema),z.lazy(() => DistrictScalarWhereInputSchema).array() ]).optional(),
  district_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  province_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AddressUpsertWithWhereUniqueWithoutProvinceInputSchema: z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutProvinceInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AddressUpdateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutProvinceInputSchema) ]),
  create: z.union([ z.lazy(() => AddressCreateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedCreateWithoutProvinceInputSchema) ]),
}).strict();

export const AddressUpdateWithWhereUniqueWithoutProvinceInputSchema: z.ZodType<Prisma.AddressUpdateWithWhereUniqueWithoutProvinceInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateWithoutProvinceInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutProvinceInputSchema) ]),
}).strict();

export const AddressUpdateManyWithWhereWithoutProvinceInputSchema: z.ZodType<Prisma.AddressUpdateManyWithWhereWithoutProvinceInput> = z.object({
  where: z.lazy(() => AddressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateManyMutationInputSchema),z.lazy(() => AddressUncheckedUpdateManyWithoutAddressInputSchema) ]),
}).strict();

export const DistrictCreateWithoutWardInputSchema: z.ZodType<Prisma.DistrictCreateWithoutWardInput> = z.object({
  district_id: z.string().cuid().optional(),
  name: z.string(),
  Province: z.lazy(() => ProvinceCreateNestedOneWithoutDistrictsInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictUncheckedCreateWithoutWardInputSchema: z.ZodType<Prisma.DistrictUncheckedCreateWithoutWardInput> = z.object({
  district_id: z.string().cuid().optional(),
  province_id: z.string(),
  name: z.string(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutDistrictInputSchema).optional()
}).strict();

export const DistrictCreateOrConnectWithoutWardInputSchema: z.ZodType<Prisma.DistrictCreateOrConnectWithoutWardInput> = z.object({
  where: z.lazy(() => DistrictWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DistrictCreateWithoutWardInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutWardInputSchema) ]),
}).strict();

export const AddressCreateWithoutWardInputSchema: z.ZodType<Prisma.AddressCreateWithoutWardInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province: z.lazy(() => ProvinceCreateNestedOneWithoutAddressInputSchema).optional(),
  district: z.lazy(() => DistrictCreateNestedOneWithoutAddressInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddressInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressUncheckedCreateWithoutWardInputSchema: z.ZodType<Prisma.AddressUncheckedCreateWithoutWardInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  district_id: z.string(),
  userId: z.string().optional().nullable(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const AddressCreateOrConnectWithoutWardInputSchema: z.ZodType<Prisma.AddressCreateOrConnectWithoutWardInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AddressCreateWithoutWardInputSchema),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema) ]),
}).strict();

export const AddressCreateManyWardInputEnvelopeSchema: z.ZodType<Prisma.AddressCreateManyWardInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AddressCreateManyWardInputSchema),z.lazy(() => AddressCreateManyWardInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DistrictUpsertWithoutWardInputSchema: z.ZodType<Prisma.DistrictUpsertWithoutWardInput> = z.object({
  update: z.union([ z.lazy(() => DistrictUpdateWithoutWardInputSchema),z.lazy(() => DistrictUncheckedUpdateWithoutWardInputSchema) ]),
  create: z.union([ z.lazy(() => DistrictCreateWithoutWardInputSchema),z.lazy(() => DistrictUncheckedCreateWithoutWardInputSchema) ]),
}).strict();

export const DistrictUpdateWithoutWardInputSchema: z.ZodType<Prisma.DistrictUpdateWithoutWardInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Province: z.lazy(() => ProvinceUpdateOneWithoutDistrictsNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const DistrictUncheckedUpdateWithoutWardInputSchema: z.ZodType<Prisma.DistrictUncheckedUpdateWithoutWardInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const AddressUpsertWithWhereUniqueWithoutWardInputSchema: z.ZodType<Prisma.AddressUpsertWithWhereUniqueWithoutWardInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AddressUpdateWithoutWardInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutWardInputSchema) ]),
  create: z.union([ z.lazy(() => AddressCreateWithoutWardInputSchema),z.lazy(() => AddressUncheckedCreateWithoutWardInputSchema) ]),
}).strict();

export const AddressUpdateWithWhereUniqueWithoutWardInputSchema: z.ZodType<Prisma.AddressUpdateWithWhereUniqueWithoutWardInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateWithoutWardInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutWardInputSchema) ]),
}).strict();

export const AddressUpdateManyWithWhereWithoutWardInputSchema: z.ZodType<Prisma.AddressUpdateManyWithWhereWithoutWardInput> = z.object({
  where: z.lazy(() => AddressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateManyMutationInputSchema),z.lazy(() => AddressUncheckedUpdateManyWithoutAddressInputSchema) ]),
}).strict();

export const ProductCreateWithoutUnitInputSchema: z.ZodType<Prisma.ProductCreateWithoutUnitInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductCreateNestedManyWithoutProductInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailCreateNestedOneWithoutProductInputSchema).optional(),
  trademark: z.lazy(() => TrademarkCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutUnitInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutUnitInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutUnitInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const ProductCreateManyUnitInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyUnitInputSchema),z.lazy(() => ProductCreateManyUnitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductUpsertWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUnitInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUnitInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  unit_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expired_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  trademark_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ImageProductCreateWithoutProductInputSchema: z.ZodType<Prisma.ImageProductCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ImageProductUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ImageProductUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ImageProductCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ImageProductCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => ImageProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageProductCreateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ImageProductCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.ImageProductCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageProductCreateManyProductInputSchema),z.lazy(() => ImageProductCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UnitCreateWithoutProductInputSchema: z.ZodType<Prisma.UnitCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UnitUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.UnitUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UnitCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.UnitCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => UnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const CategoryCreateWithoutProductInputSchema: z.ZodType<Prisma.CategoryCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutProductInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const CartCreateWithoutProductInputSchema: z.ZodType<Prisma.CartCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCartInputSchema)
}).strict();

export const CartUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.CartUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CartCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.CartCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => CartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CartCreateWithoutProductInputSchema),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const CartCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.CartCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CartCreateManyProductInputSchema),z.lazy(() => CartCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrderCreateWithoutProductInputSchema: z.ZodType<Prisma.OrderCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  address: z.lazy(() => AddressCreateNestedOneWithoutOrderInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutOrderInputSchema),
  status: z.lazy(() => StatusOrderCreateNestedOneWithoutOrderInputSchema),
  payment_method: z.lazy(() => PaymentMethodCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string(),
  payment_method: z.lazy(() => PaymentMethodUncheckedCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutProductInputSchema),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const OrderCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.OrderCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OrderCreateManyProductInputSchema),z.lazy(() => OrderCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductDetailCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  description: z.string(),
  short_description: z.string(),
  ingredient: z.string(),
  how_to_use: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductDetailUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  description: z.string(),
  short_description: z.string(),
  ingredient: z.string(),
  how_to_use: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductDetailCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => ProductDetailWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductDetailCreateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const TrademarkCreateWithoutProductInputSchema: z.ZodType<Prisma.TrademarkCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  image: z.string(),
  country: z.string(),
  introduce: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TrademarkUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.TrademarkUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  image: z.string(),
  country: z.string(),
  introduce: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TrademarkCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.TrademarkCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => TrademarkWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TrademarkCreateWithoutProductInputSchema),z.lazy(() => TrademarkUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ImageProductUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ImageProductUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ImageProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageProductUpdateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => ImageProductCreateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ImageProductUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ImageProductUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ImageProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageProductUpdateWithoutProductInputSchema),z.lazy(() => ImageProductUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const ImageProductUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.ImageProductUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => ImageProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageProductUpdateManyMutationInputSchema),z.lazy(() => ImageProductUncheckedUpdateManyWithoutImageInputSchema) ]),
}).strict();

export const ImageProductScalarWhereInputSchema: z.ZodType<Prisma.ImageProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageProductScalarWhereInputSchema),z.lazy(() => ImageProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageProductScalarWhereInputSchema),z.lazy(() => ImageProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UnitUpsertWithoutProductInputSchema: z.ZodType<Prisma.UnitUpsertWithoutProductInput> = z.object({
  update: z.union([ z.lazy(() => UnitUpdateWithoutProductInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const UnitUpdateWithoutProductInputSchema: z.ZodType<Prisma.UnitUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUpsertWithoutProductInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutProductInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutProductInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutProductInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutProductInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CartUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.CartUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => CartWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CartUpdateWithoutProductInputSchema),z.lazy(() => CartUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => CartCreateWithoutProductInputSchema),z.lazy(() => CartUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const CartUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.CartUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => CartWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CartUpdateWithoutProductInputSchema),z.lazy(() => CartUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const CartUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.CartUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => CartScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CartUpdateManyMutationInputSchema),z.lazy(() => CartUncheckedUpdateManyWithoutCartInputSchema) ]),
}).strict();

export const OrderUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.OrderUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OrderUpdateWithoutProductInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutProductInputSchema),z.lazy(() => OrderUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const OrderUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.OrderUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateWithoutProductInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const OrderUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.OrderUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => OrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateManyMutationInputSchema),z.lazy(() => OrderUncheckedUpdateManyWithoutOrderInputSchema) ]),
}).strict();

export const ProductDetailUpsertWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailUpsertWithoutProductInput> = z.object({
  update: z.union([ z.lazy(() => ProductDetailUpdateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => ProductDetailCreateWithoutProductInputSchema),z.lazy(() => ProductDetailUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ProductDetailUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  how_to_use: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductDetailUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductDetailUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  how_to_use: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TrademarkUpsertWithoutProductInputSchema: z.ZodType<Prisma.TrademarkUpsertWithoutProductInput> = z.object({
  update: z.union([ z.lazy(() => TrademarkUpdateWithoutProductInputSchema),z.lazy(() => TrademarkUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => TrademarkCreateWithoutProductInputSchema),z.lazy(() => TrademarkUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const TrademarkUpdateWithoutProductInputSchema: z.ZodType<Prisma.TrademarkUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introduce: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TrademarkUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.TrademarkUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  introduce: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCreateWithoutProduct_detailInputSchema: z.ZodType<Prisma.ProductCreateWithoutProduct_detailInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductCreateNestedManyWithoutProductInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutProductInputSchema).optional(),
  trademark: z.lazy(() => TrademarkCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutProduct_detailInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutProduct_detailInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutProduct_detailInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutProduct_detailInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutProduct_detailInputSchema),z.lazy(() => ProductUncheckedCreateWithoutProduct_detailInputSchema) ]),
}).strict();

export const ProductUpsertWithoutProduct_detailInputSchema: z.ZodType<Prisma.ProductUpsertWithoutProduct_detailInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutProduct_detailInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutProduct_detailInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutProduct_detailInputSchema),z.lazy(() => ProductUncheckedCreateWithoutProduct_detailInputSchema) ]),
}).strict();

export const ProductUpdateWithoutProduct_detailInputSchema: z.ZodType<Prisma.ProductUpdateWithoutProduct_detailInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUpdateManyWithoutProductNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutProductNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutProductNestedInputSchema).optional(),
  trademark: z.lazy(() => TrademarkUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutProduct_detailInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutProduct_detailInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductCreateWithoutImageInputSchema: z.ZodType<Prisma.ProductCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailCreateNestedOneWithoutProductInputSchema).optional(),
  trademark: z.lazy(() => TrademarkCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutImageInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutImageInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutImageInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutImageInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutImageInputSchema),z.lazy(() => ProductUncheckedCreateWithoutImageInputSchema) ]),
}).strict();

export const ProductUpsertWithoutImageInputSchema: z.ZodType<Prisma.ProductUpsertWithoutImageInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutImageInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutImageInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutImageInputSchema),z.lazy(() => ProductUncheckedCreateWithoutImageInputSchema) ]),
}).strict();

export const ProductUpdateWithoutImageInputSchema: z.ZodType<Prisma.ProductUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutProductNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUpdateOneWithoutProductNestedInputSchema).optional(),
  trademark: z.lazy(() => TrademarkUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutImageInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ProductCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductCreateNestedManyWithoutProductInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailCreateNestedOneWithoutProductInputSchema).optional(),
  trademark: z.lazy(() => TrademarkCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const ProductCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyCategoryInputSchema),z.lazy(() => ProductCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const UserCreateWithoutCartInputSchema: z.ZodType<Prisma.UserCreateWithoutCartInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCartInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCartInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCartInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCartInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCartInputSchema),z.lazy(() => UserUncheckedCreateWithoutCartInputSchema) ]),
}).strict();

export const ProductCreateWithoutCartInputSchema: z.ZodType<Prisma.ProductCreateWithoutCartInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductCreateNestedManyWithoutProductInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailCreateNestedOneWithoutProductInputSchema).optional(),
  trademark: z.lazy(() => TrademarkCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutCartInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutCartInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutCartInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCartInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutCartInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCartInputSchema) ]),
}).strict();

export const UserUpsertWithoutCartInputSchema: z.ZodType<Prisma.UserUpsertWithoutCartInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCartInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCartInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCartInputSchema),z.lazy(() => UserUncheckedCreateWithoutCartInputSchema) ]),
}).strict();

export const UserUpdateWithoutCartInputSchema: z.ZodType<Prisma.UserUpdateWithoutCartInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCartInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCartInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProductUpsertWithoutCartInputSchema: z.ZodType<Prisma.ProductUpsertWithoutCartInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutCartInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCartInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutCartInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCartInputSchema) ]),
}).strict();

export const ProductUpdateWithoutCartInputSchema: z.ZodType<Prisma.ProductUpdateWithoutCartInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUpdateManyWithoutProductNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutProductNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUpdateOneWithoutProductNestedInputSchema).optional(),
  trademark: z.lazy(() => TrademarkUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutCartInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutCartInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const AddressCreateWithoutOrderInputSchema: z.ZodType<Prisma.AddressCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province: z.lazy(() => ProvinceCreateNestedOneWithoutAddressInputSchema).optional(),
  district: z.lazy(() => DistrictCreateNestedOneWithoutAddressInputSchema).optional(),
  ward: z.lazy(() => WardCreateNestedOneWithoutAddressInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAddressInputSchema).optional()
}).strict();

export const AddressUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.AddressUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const AddressCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.AddressCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => AddressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AddressCreateWithoutOrderInputSchema),z.lazy(() => AddressUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const UserCreateWithoutOrderInputSchema: z.ZodType<Prisma.UserCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sex: z.string().optional().nullable(),
  password: z.string(),
  date_of_birth: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => UserTypeSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const ProductCreateWithoutOrderInputSchema: z.ZodType<Prisma.ProductCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductCreateNestedManyWithoutProductInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailCreateNestedOneWithoutProductInputSchema).optional(),
  trademark: z.lazy(() => TrademarkCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutOrderInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const StatusOrderCreateWithoutOrderInputSchema: z.ZodType<Prisma.StatusOrderCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StatusOrderUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.StatusOrderUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StatusOrderCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.StatusOrderCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => StatusOrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StatusOrderCreateWithoutOrderInputSchema),z.lazy(() => StatusOrderUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const PaymentMethodCreateWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  payment_source: z.string(),
  order_payment_id: z.string().optional().nullable(),
  payment_id: z.string().optional().nullable(),
  payer_id: z.string(),
  status: z.lazy(() => PaymentStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PaymentMethodUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().cuid().optional(),
  payment_source: z.string(),
  order_payment_id: z.string().optional().nullable(),
  payment_id: z.string().optional().nullable(),
  payer_id: z.string(),
  status: z.lazy(() => PaymentStatusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PaymentMethodCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => PaymentMethodWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const AddressUpsertWithoutOrderInputSchema: z.ZodType<Prisma.AddressUpsertWithoutOrderInput> = z.object({
  update: z.union([ z.lazy(() => AddressUpdateWithoutOrderInputSchema),z.lazy(() => AddressUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => AddressCreateWithoutOrderInputSchema),z.lazy(() => AddressUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const AddressUpdateWithoutOrderInputSchema: z.ZodType<Prisma.AddressUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province: z.lazy(() => ProvinceUpdateOneWithoutAddressNestedInputSchema).optional(),
  district: z.lazy(() => DistrictUpdateOneWithoutAddressNestedInputSchema).optional(),
  ward: z.lazy(() => WardUpdateOneWithoutAddressNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutOrderInputSchema: z.ZodType<Prisma.UserUpsertWithoutOrderInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutOrderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutOrderInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const UserUpdateWithoutOrderInputSchema: z.ZodType<Prisma.UserUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sex: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProductUpsertWithoutOrderInputSchema: z.ZodType<Prisma.ProductUpsertWithoutOrderInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutOrderInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutOrderInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const ProductUpdateWithoutOrderInputSchema: z.ZodType<Prisma.ProductUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUpdateManyWithoutProductNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutProductNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUpdateOneWithoutProductNestedInputSchema).optional(),
  trademark: z.lazy(() => TrademarkUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const StatusOrderUpsertWithoutOrderInputSchema: z.ZodType<Prisma.StatusOrderUpsertWithoutOrderInput> = z.object({
  update: z.union([ z.lazy(() => StatusOrderUpdateWithoutOrderInputSchema),z.lazy(() => StatusOrderUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => StatusOrderCreateWithoutOrderInputSchema),z.lazy(() => StatusOrderUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const StatusOrderUpdateWithoutOrderInputSchema: z.ZodType<Prisma.StatusOrderUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatusOrderUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.StatusOrderUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUpsertWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodUpsertWithoutOrderInput> = z.object({
  update: z.union([ z.lazy(() => PaymentMethodUpdateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutOrderInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export const PaymentMethodUpdateWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUncheckedUpdateWithoutOrderInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedUpdateWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_source: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order_payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrderCreateWithoutStatusInputSchema: z.ZodType<Prisma.OrderCreateWithoutStatusInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  address: z.lazy(() => AddressCreateNestedOneWithoutOrderInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutOrderInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderInputSchema),
  payment_method: z.lazy(() => PaymentMethodCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderUncheckedCreateWithoutStatusInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutStatusInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  payment_method: z.lazy(() => PaymentMethodUncheckedCreateNestedOneWithoutOrderInputSchema).optional()
}).strict();

export const OrderCreateOrConnectWithoutStatusInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutStatusInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema) ]),
}).strict();

export const OrderCreateManyStatusInputEnvelopeSchema: z.ZodType<Prisma.OrderCreateManyStatusInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OrderCreateManyStatusInputSchema),z.lazy(() => OrderCreateManyStatusInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrderUpsertWithWhereUniqueWithoutStatusInputSchema: z.ZodType<Prisma.OrderUpsertWithWhereUniqueWithoutStatusInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OrderUpdateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutStatusInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedCreateWithoutStatusInputSchema) ]),
}).strict();

export const OrderUpdateWithWhereUniqueWithoutStatusInputSchema: z.ZodType<Prisma.OrderUpdateWithWhereUniqueWithoutStatusInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateWithoutStatusInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutStatusInputSchema) ]),
}).strict();

export const OrderUpdateManyWithWhereWithoutStatusInputSchema: z.ZodType<Prisma.OrderUpdateManyWithWhereWithoutStatusInput> = z.object({
  where: z.lazy(() => OrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateManyMutationInputSchema),z.lazy(() => OrderUncheckedUpdateManyWithoutOrderInputSchema) ]),
}).strict();

export const ProductCreateWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductCreateWithoutTrademarkInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductCreateNestedManyWithoutProductInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutTrademarkInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  image: z.lazy(() => ImageProductUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedCreateNestedOneWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutTrademarkInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema) ]),
}).strict();

export const ProductCreateManyTrademarkInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyTrademarkInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyTrademarkInputSchema),z.lazy(() => ProductCreateManyTrademarkInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductUpsertWithWhereUniqueWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutTrademarkInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutTrademarkInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedCreateWithoutTrademarkInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutTrademarkInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutTrademarkInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutTrademarkInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutTrademarkInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const OrderCreateWithoutPayment_methodInputSchema: z.ZodType<Prisma.OrderCreateWithoutPayment_methodInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  address: z.lazy(() => AddressCreateNestedOneWithoutOrderInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutOrderInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderInputSchema),
  status: z.lazy(() => StatusOrderCreateNestedOneWithoutOrderInputSchema)
}).strict();

export const OrderUncheckedCreateWithoutPayment_methodInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutPayment_methodInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string()
}).strict();

export const OrderCreateOrConnectWithoutPayment_methodInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutPayment_methodInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutPayment_methodInputSchema),z.lazy(() => OrderUncheckedCreateWithoutPayment_methodInputSchema) ]),
}).strict();

export const OrderUpsertWithoutPayment_methodInputSchema: z.ZodType<Prisma.OrderUpsertWithoutPayment_methodInput> = z.object({
  update: z.union([ z.lazy(() => OrderUpdateWithoutPayment_methodInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutPayment_methodInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutPayment_methodInputSchema),z.lazy(() => OrderUncheckedCreateWithoutPayment_methodInputSchema) ]),
}).strict();

export const OrderUpdateWithoutPayment_methodInputSchema: z.ZodType<Prisma.OrderUpdateWithoutPayment_methodInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  status: z.lazy(() => StatusOrderUpdateOneRequiredWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderUncheckedUpdateWithoutPayment_methodInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutPayment_methodInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status_order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const AddressCreateManyUserInputSchema: z.ZodType<Prisma.AddressCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  district_id: z.string(),
  ward_id: z.string()
}).strict();

export const CartCreateManyUserInputSchema: z.ZodType<Prisma.CartCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  product_id: z.string(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OrderCreateManyUserInputSchema: z.ZodType<Prisma.OrderCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressUpdateWithoutUserInputSchema: z.ZodType<Prisma.AddressUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province: z.lazy(() => ProvinceUpdateOneWithoutAddressNestedInputSchema).optional(),
  district: z.lazy(() => DistrictUpdateOneWithoutAddressNestedInputSchema).optional(),
  ward: z.lazy(() => WardUpdateOneWithoutAddressNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateManyWithoutAddressInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateManyWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CartUpdateWithoutUserInputSchema: z.ZodType<Prisma.CartUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutCartNestedInputSchema).optional()
}).strict();

export const CartUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CartUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CartUncheckedUpdateManyWithoutCartInputSchema: z.ZodType<Prisma.CartUncheckedUpdateManyWithoutCartInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrderUpdateWithoutUserInputSchema: z.ZodType<Prisma.OrderUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  status: z.lazy(() => StatusOrderUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  payment_method: z.lazy(() => PaymentMethodUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status_order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_method: z.lazy(() => PaymentMethodUncheckedUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderUncheckedUpdateManyWithoutOrderInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyWithoutOrderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status_order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrderCreateManyAddressInputSchema: z.ZodType<Prisma.OrderCreateManyAddressInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string()
}).strict();

export const OrderUpdateWithoutAddressInputSchema: z.ZodType<Prisma.OrderUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  status: z.lazy(() => StatusOrderUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  payment_method: z.lazy(() => PaymentMethodUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderUncheckedUpdateWithoutAddressInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status_order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_method: z.lazy(() => PaymentMethodUncheckedUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const WardCreateManyDistrictInputSchema: z.ZodType<Prisma.WardCreateManyDistrictInput> = z.object({
  ward_id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const AddressCreateManyDistrictInputSchema: z.ZodType<Prisma.AddressCreateManyDistrictInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  ward_id: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const WardUpdateWithoutDistrictInputSchema: z.ZodType<Prisma.WardUpdateWithoutDistrictInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutWardNestedInputSchema).optional()
}).strict();

export const WardUncheckedUpdateWithoutDistrictInputSchema: z.ZodType<Prisma.WardUncheckedUpdateWithoutDistrictInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutWardNestedInputSchema).optional()
}).strict();

export const WardUncheckedUpdateManyWithoutWardInputSchema: z.ZodType<Prisma.WardUncheckedUpdateManyWithoutWardInput> = z.object({
  ward_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressUpdateWithoutDistrictInputSchema: z.ZodType<Prisma.AddressUpdateWithoutDistrictInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province: z.lazy(() => ProvinceUpdateOneWithoutAddressNestedInputSchema).optional(),
  ward: z.lazy(() => WardUpdateOneWithoutAddressNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAddressNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateWithoutDistrictInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateWithoutDistrictInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const DistrictCreateManyProvinceInputSchema: z.ZodType<Prisma.DistrictCreateManyProvinceInput> = z.object({
  district_id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const AddressCreateManyProvinceInputSchema: z.ZodType<Prisma.AddressCreateManyProvinceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  district_id: z.string(),
  ward_id: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const DistrictUpdateWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictUpdateWithoutProvinceInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward: z.lazy(() => WardUpdateManyWithoutDistrictNestedInputSchema).optional(),
  address: z.lazy(() => AddressUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const DistrictUncheckedUpdateWithoutProvinceInputSchema: z.ZodType<Prisma.DistrictUncheckedUpdateWithoutProvinceInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward: z.lazy(() => WardUncheckedUpdateManyWithoutDistrictNestedInputSchema).optional(),
  address: z.lazy(() => AddressUncheckedUpdateManyWithoutDistrictNestedInputSchema).optional()
}).strict();

export const DistrictUncheckedUpdateManyWithoutDistrictsInputSchema: z.ZodType<Prisma.DistrictUncheckedUpdateManyWithoutDistrictsInput> = z.object({
  district_id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AddressUpdateWithoutProvinceInputSchema: z.ZodType<Prisma.AddressUpdateWithoutProvinceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  district: z.lazy(() => DistrictUpdateOneWithoutAddressNestedInputSchema).optional(),
  ward: z.lazy(() => WardUpdateOneWithoutAddressNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAddressNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateWithoutProvinceInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateWithoutProvinceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressCreateManyWardInputSchema: z.ZodType<Prisma.AddressCreateManyWardInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phone_number: z.string(),
  address_detail: z.string(),
  type_address: z.lazy(() => AddressTypeSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  province_id: z.string(),
  district_id: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const AddressUpdateWithoutWardInputSchema: z.ZodType<Prisma.AddressUpdateWithoutWardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province: z.lazy(() => ProvinceUpdateOneWithoutAddressNestedInputSchema).optional(),
  district: z.lazy(() => DistrictUpdateOneWithoutAddressNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAddressNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const AddressUncheckedUpdateWithoutWardInputSchema: z.ZodType<Prisma.AddressUncheckedUpdateWithoutWardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address_detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type_address: z.union([ z.lazy(() => AddressTypeSchema),z.lazy(() => EnumAddressTypeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  province_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  district_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const ProductCreateManyUnitInputSchema: z.ZodType<Prisma.ProductCreateManyUnitInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductUpdateWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUpdateManyWithoutProductNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUpdateOneWithoutProductNestedInputSchema).optional(),
  trademark: z.lazy(() => TrademarkUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutUnitInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageProductCreateManyProductInputSchema: z.ZodType<Prisma.ImageProductCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CartCreateManyProductInputSchema: z.ZodType<Prisma.CartCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OrderCreateManyProductInputSchema: z.ZodType<Prisma.OrderCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status_order_id: z.string()
}).strict();

export const ImageProductUpdateWithoutProductInputSchema: z.ZodType<Prisma.ImageProductUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageProductUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ImageProductUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageProductUncheckedUpdateManyWithoutImageInputSchema: z.ZodType<Prisma.ImageProductUncheckedUpdateManyWithoutImageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CartUpdateWithoutProductInputSchema: z.ZodType<Prisma.CartUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCartNestedInputSchema).optional()
}).strict();

export const CartUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.CartUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrderUpdateWithoutProductInputSchema: z.ZodType<Prisma.OrderUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  status: z.lazy(() => StatusOrderUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  payment_method: z.lazy(() => PaymentMethodUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status_order_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment_method: z.lazy(() => PaymentMethodUncheckedUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const ProductCreateManyCategoryInputSchema: z.ZodType<Prisma.ProductCreateManyCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  trademark_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUpdateManyWithoutProductNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUpdateOneWithoutProductNestedInputSchema).optional(),
  trademark: z.lazy(() => TrademarkUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trademark_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const OrderCreateManyStatusInputSchema: z.ZodType<Prisma.OrderCreateManyStatusInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number().int(),
  address_id: z.string(),
  is_paid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OrderUpdateWithoutStatusInputSchema: z.ZodType<Prisma.OrderUpdateWithoutStatusInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.lazy(() => AddressUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  payment_method: z.lazy(() => PaymentMethodUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const OrderUncheckedUpdateWithoutStatusInputSchema: z.ZodType<Prisma.OrderUncheckedUpdateWithoutStatusInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  product_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  payment_method: z.lazy(() => PaymentMethodUncheckedUpdateOneWithoutOrderNestedInputSchema).optional()
}).strict();

export const ProductCreateManyTrademarkInputSchema: z.ZodType<Prisma.ProductCreateManyTrademarkInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  status: z.lazy(() => statusSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductUpdateWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductUpdateWithoutTrademarkInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUpdateManyWithoutProductNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutProductNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutTrademarkInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutTrademarkInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.lazy(() => ImageProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  order: z.lazy(() => OrderUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  product_detail: z.lazy(() => ProductDetailUncheckedUpdateOneWithoutProductNestedInputSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const PasswordResetFindFirstArgsSchema: z.ZodType<Prisma.PasswordResetFindFirstArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetScalarFieldEnumSchema,PasswordResetScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PasswordResetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetFindFirstOrThrowArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetScalarFieldEnumSchema,PasswordResetScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PasswordResetFindManyArgsSchema: z.ZodType<Prisma.PasswordResetFindManyArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetScalarFieldEnumSchema,PasswordResetScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PasswordResetAggregateArgsSchema: z.ZodType<Prisma.PasswordResetAggregateArgs> = z.object({
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PasswordResetGroupByArgsSchema: z.ZodType<Prisma.PasswordResetGroupByArgs> = z.object({
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithAggregationInputSchema.array(),PasswordResetOrderByWithAggregationInputSchema ]).optional(),
  by: PasswordResetScalarFieldEnumSchema.array(),
  having: PasswordResetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PasswordResetFindUniqueArgsSchema: z.ZodType<Prisma.PasswordResetFindUniqueArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const PasswordResetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetFindUniqueOrThrowArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const AddressFindFirstArgsSchema: z.ZodType<Prisma.AddressFindFirstArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AddressScalarFieldEnumSchema,AddressScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AddressFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AddressFindFirstOrThrowArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AddressScalarFieldEnumSchema,AddressScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AddressFindManyArgsSchema: z.ZodType<Prisma.AddressFindManyArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AddressScalarFieldEnumSchema,AddressScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AddressAggregateArgsSchema: z.ZodType<Prisma.AddressAggregateArgs> = z.object({
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithRelationInputSchema.array(),AddressOrderByWithRelationInputSchema ]).optional(),
  cursor: AddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AddressGroupByArgsSchema: z.ZodType<Prisma.AddressGroupByArgs> = z.object({
  where: AddressWhereInputSchema.optional(),
  orderBy: z.union([ AddressOrderByWithAggregationInputSchema.array(),AddressOrderByWithAggregationInputSchema ]).optional(),
  by: AddressScalarFieldEnumSchema.array(),
  having: AddressScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AddressFindUniqueArgsSchema: z.ZodType<Prisma.AddressFindUniqueArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
}).strict()

export const AddressFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AddressFindUniqueOrThrowArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
}).strict()

export const DistrictFindFirstArgsSchema: z.ZodType<Prisma.DistrictFindFirstArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  where: DistrictWhereInputSchema.optional(),
  orderBy: z.union([ DistrictOrderByWithRelationInputSchema.array(),DistrictOrderByWithRelationInputSchema ]).optional(),
  cursor: DistrictWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DistrictScalarFieldEnumSchema,DistrictScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DistrictFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DistrictFindFirstOrThrowArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  where: DistrictWhereInputSchema.optional(),
  orderBy: z.union([ DistrictOrderByWithRelationInputSchema.array(),DistrictOrderByWithRelationInputSchema ]).optional(),
  cursor: DistrictWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DistrictScalarFieldEnumSchema,DistrictScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DistrictFindManyArgsSchema: z.ZodType<Prisma.DistrictFindManyArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  where: DistrictWhereInputSchema.optional(),
  orderBy: z.union([ DistrictOrderByWithRelationInputSchema.array(),DistrictOrderByWithRelationInputSchema ]).optional(),
  cursor: DistrictWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DistrictScalarFieldEnumSchema,DistrictScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DistrictAggregateArgsSchema: z.ZodType<Prisma.DistrictAggregateArgs> = z.object({
  where: DistrictWhereInputSchema.optional(),
  orderBy: z.union([ DistrictOrderByWithRelationInputSchema.array(),DistrictOrderByWithRelationInputSchema ]).optional(),
  cursor: DistrictWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DistrictGroupByArgsSchema: z.ZodType<Prisma.DistrictGroupByArgs> = z.object({
  where: DistrictWhereInputSchema.optional(),
  orderBy: z.union([ DistrictOrderByWithAggregationInputSchema.array(),DistrictOrderByWithAggregationInputSchema ]).optional(),
  by: DistrictScalarFieldEnumSchema.array(),
  having: DistrictScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DistrictFindUniqueArgsSchema: z.ZodType<Prisma.DistrictFindUniqueArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  where: DistrictWhereUniqueInputSchema,
}).strict()

export const DistrictFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DistrictFindUniqueOrThrowArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  where: DistrictWhereUniqueInputSchema,
}).strict()

export const ProvinceFindFirstArgsSchema: z.ZodType<Prisma.ProvinceFindFirstArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  where: ProvinceWhereInputSchema.optional(),
  orderBy: z.union([ ProvinceOrderByWithRelationInputSchema.array(),ProvinceOrderByWithRelationInputSchema ]).optional(),
  cursor: ProvinceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProvinceScalarFieldEnumSchema,ProvinceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProvinceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProvinceFindFirstOrThrowArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  where: ProvinceWhereInputSchema.optional(),
  orderBy: z.union([ ProvinceOrderByWithRelationInputSchema.array(),ProvinceOrderByWithRelationInputSchema ]).optional(),
  cursor: ProvinceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProvinceScalarFieldEnumSchema,ProvinceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProvinceFindManyArgsSchema: z.ZodType<Prisma.ProvinceFindManyArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  where: ProvinceWhereInputSchema.optional(),
  orderBy: z.union([ ProvinceOrderByWithRelationInputSchema.array(),ProvinceOrderByWithRelationInputSchema ]).optional(),
  cursor: ProvinceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProvinceScalarFieldEnumSchema,ProvinceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProvinceAggregateArgsSchema: z.ZodType<Prisma.ProvinceAggregateArgs> = z.object({
  where: ProvinceWhereInputSchema.optional(),
  orderBy: z.union([ ProvinceOrderByWithRelationInputSchema.array(),ProvinceOrderByWithRelationInputSchema ]).optional(),
  cursor: ProvinceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProvinceGroupByArgsSchema: z.ZodType<Prisma.ProvinceGroupByArgs> = z.object({
  where: ProvinceWhereInputSchema.optional(),
  orderBy: z.union([ ProvinceOrderByWithAggregationInputSchema.array(),ProvinceOrderByWithAggregationInputSchema ]).optional(),
  by: ProvinceScalarFieldEnumSchema.array(),
  having: ProvinceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProvinceFindUniqueArgsSchema: z.ZodType<Prisma.ProvinceFindUniqueArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  where: ProvinceWhereUniqueInputSchema,
}).strict()

export const ProvinceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProvinceFindUniqueOrThrowArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  where: ProvinceWhereUniqueInputSchema,
}).strict()

export const WardFindFirstArgsSchema: z.ZodType<Prisma.WardFindFirstArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  where: WardWhereInputSchema.optional(),
  orderBy: z.union([ WardOrderByWithRelationInputSchema.array(),WardOrderByWithRelationInputSchema ]).optional(),
  cursor: WardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WardScalarFieldEnumSchema,WardScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const WardFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WardFindFirstOrThrowArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  where: WardWhereInputSchema.optional(),
  orderBy: z.union([ WardOrderByWithRelationInputSchema.array(),WardOrderByWithRelationInputSchema ]).optional(),
  cursor: WardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WardScalarFieldEnumSchema,WardScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const WardFindManyArgsSchema: z.ZodType<Prisma.WardFindManyArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  where: WardWhereInputSchema.optional(),
  orderBy: z.union([ WardOrderByWithRelationInputSchema.array(),WardOrderByWithRelationInputSchema ]).optional(),
  cursor: WardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WardScalarFieldEnumSchema,WardScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const WardAggregateArgsSchema: z.ZodType<Prisma.WardAggregateArgs> = z.object({
  where: WardWhereInputSchema.optional(),
  orderBy: z.union([ WardOrderByWithRelationInputSchema.array(),WardOrderByWithRelationInputSchema ]).optional(),
  cursor: WardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const WardGroupByArgsSchema: z.ZodType<Prisma.WardGroupByArgs> = z.object({
  where: WardWhereInputSchema.optional(),
  orderBy: z.union([ WardOrderByWithAggregationInputSchema.array(),WardOrderByWithAggregationInputSchema ]).optional(),
  by: WardScalarFieldEnumSchema.array(),
  having: WardScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const WardFindUniqueArgsSchema: z.ZodType<Prisma.WardFindUniqueArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  where: WardWhereUniqueInputSchema,
}).strict()

export const WardFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WardFindUniqueOrThrowArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  where: WardWhereUniqueInputSchema,
}).strict()

export const UnitFindFirstArgsSchema: z.ZodType<Prisma.UnitFindFirstArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnitScalarFieldEnumSchema,UnitScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UnitFindFirstOrThrowArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnitScalarFieldEnumSchema,UnitScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UnitFindManyArgsSchema: z.ZodType<Prisma.UnitFindManyArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnitScalarFieldEnumSchema,UnitScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UnitAggregateArgsSchema: z.ZodType<Prisma.UnitAggregateArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UnitGroupByArgsSchema: z.ZodType<Prisma.UnitGroupByArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithAggregationInputSchema.array(),UnitOrderByWithAggregationInputSchema ]).optional(),
  by: UnitScalarFieldEnumSchema.array(),
  having: UnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UnitFindUniqueArgsSchema: z.ZodType<Prisma.UnitFindUniqueArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const UnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UnitFindUniqueOrThrowArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithAggregationInputSchema.array(),ProductOrderByWithAggregationInputSchema ]).optional(),
  by: ProductScalarFieldEnumSchema.array(),
  having: ProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductDetailFindFirstArgsSchema: z.ZodType<Prisma.ProductDetailFindFirstArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  where: ProductDetailWhereInputSchema.optional(),
  orderBy: z.union([ ProductDetailOrderByWithRelationInputSchema.array(),ProductDetailOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductDetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductDetailScalarFieldEnumSchema,ProductDetailScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductDetailFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductDetailFindFirstOrThrowArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  where: ProductDetailWhereInputSchema.optional(),
  orderBy: z.union([ ProductDetailOrderByWithRelationInputSchema.array(),ProductDetailOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductDetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductDetailScalarFieldEnumSchema,ProductDetailScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductDetailFindManyArgsSchema: z.ZodType<Prisma.ProductDetailFindManyArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  where: ProductDetailWhereInputSchema.optional(),
  orderBy: z.union([ ProductDetailOrderByWithRelationInputSchema.array(),ProductDetailOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductDetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductDetailScalarFieldEnumSchema,ProductDetailScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductDetailAggregateArgsSchema: z.ZodType<Prisma.ProductDetailAggregateArgs> = z.object({
  where: ProductDetailWhereInputSchema.optional(),
  orderBy: z.union([ ProductDetailOrderByWithRelationInputSchema.array(),ProductDetailOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductDetailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductDetailGroupByArgsSchema: z.ZodType<Prisma.ProductDetailGroupByArgs> = z.object({
  where: ProductDetailWhereInputSchema.optional(),
  orderBy: z.union([ ProductDetailOrderByWithAggregationInputSchema.array(),ProductDetailOrderByWithAggregationInputSchema ]).optional(),
  by: ProductDetailScalarFieldEnumSchema.array(),
  having: ProductDetailScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductDetailFindUniqueArgsSchema: z.ZodType<Prisma.ProductDetailFindUniqueArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  where: ProductDetailWhereUniqueInputSchema,
}).strict()

export const ProductDetailFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductDetailFindUniqueOrThrowArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  where: ProductDetailWhereUniqueInputSchema,
}).strict()

export const ImageProductFindFirstArgsSchema: z.ZodType<Prisma.ImageProductFindFirstArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  where: ImageProductWhereInputSchema.optional(),
  orderBy: z.union([ ImageProductOrderByWithRelationInputSchema.array(),ImageProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageProductScalarFieldEnumSchema,ImageProductScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ImageProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ImageProductFindFirstOrThrowArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  where: ImageProductWhereInputSchema.optional(),
  orderBy: z.union([ ImageProductOrderByWithRelationInputSchema.array(),ImageProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageProductScalarFieldEnumSchema,ImageProductScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ImageProductFindManyArgsSchema: z.ZodType<Prisma.ImageProductFindManyArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  where: ImageProductWhereInputSchema.optional(),
  orderBy: z.union([ ImageProductOrderByWithRelationInputSchema.array(),ImageProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageProductScalarFieldEnumSchema,ImageProductScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ImageProductAggregateArgsSchema: z.ZodType<Prisma.ImageProductAggregateArgs> = z.object({
  where: ImageProductWhereInputSchema.optional(),
  orderBy: z.union([ ImageProductOrderByWithRelationInputSchema.array(),ImageProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ImageProductGroupByArgsSchema: z.ZodType<Prisma.ImageProductGroupByArgs> = z.object({
  where: ImageProductWhereInputSchema.optional(),
  orderBy: z.union([ ImageProductOrderByWithAggregationInputSchema.array(),ImageProductOrderByWithAggregationInputSchema ]).optional(),
  by: ImageProductScalarFieldEnumSchema.array(),
  having: ImageProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ImageProductFindUniqueArgsSchema: z.ZodType<Prisma.ImageProductFindUniqueArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  where: ImageProductWhereUniqueInputSchema,
}).strict()

export const ImageProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ImageProductFindUniqueOrThrowArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  where: ImageProductWhereUniqueInputSchema,
}).strict()

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict()

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict()

export const CartFindFirstArgsSchema: z.ZodType<Prisma.CartFindFirstArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  where: CartWhereInputSchema.optional(),
  orderBy: z.union([ CartOrderByWithRelationInputSchema.array(),CartOrderByWithRelationInputSchema ]).optional(),
  cursor: CartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CartScalarFieldEnumSchema,CartScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CartFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CartFindFirstOrThrowArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  where: CartWhereInputSchema.optional(),
  orderBy: z.union([ CartOrderByWithRelationInputSchema.array(),CartOrderByWithRelationInputSchema ]).optional(),
  cursor: CartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CartScalarFieldEnumSchema,CartScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CartFindManyArgsSchema: z.ZodType<Prisma.CartFindManyArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  where: CartWhereInputSchema.optional(),
  orderBy: z.union([ CartOrderByWithRelationInputSchema.array(),CartOrderByWithRelationInputSchema ]).optional(),
  cursor: CartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CartScalarFieldEnumSchema,CartScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CartAggregateArgsSchema: z.ZodType<Prisma.CartAggregateArgs> = z.object({
  where: CartWhereInputSchema.optional(),
  orderBy: z.union([ CartOrderByWithRelationInputSchema.array(),CartOrderByWithRelationInputSchema ]).optional(),
  cursor: CartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CartGroupByArgsSchema: z.ZodType<Prisma.CartGroupByArgs> = z.object({
  where: CartWhereInputSchema.optional(),
  orderBy: z.union([ CartOrderByWithAggregationInputSchema.array(),CartOrderByWithAggregationInputSchema ]).optional(),
  by: CartScalarFieldEnumSchema.array(),
  having: CartScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CartFindUniqueArgsSchema: z.ZodType<Prisma.CartFindUniqueArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  where: CartWhereUniqueInputSchema,
}).strict()

export const CartFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CartFindUniqueOrThrowArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  where: CartWhereUniqueInputSchema,
}).strict()

export const OrderFindFirstArgsSchema: z.ZodType<Prisma.OrderFindFirstArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrderScalarFieldEnumSchema,OrderScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const OrderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrderFindFirstOrThrowArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrderScalarFieldEnumSchema,OrderScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const OrderFindManyArgsSchema: z.ZodType<Prisma.OrderFindManyArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrderScalarFieldEnumSchema,OrderScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const OrderAggregateArgsSchema: z.ZodType<Prisma.OrderAggregateArgs> = z.object({
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const OrderGroupByArgsSchema: z.ZodType<Prisma.OrderGroupByArgs> = z.object({
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithAggregationInputSchema.array(),OrderOrderByWithAggregationInputSchema ]).optional(),
  by: OrderScalarFieldEnumSchema.array(),
  having: OrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const OrderFindUniqueArgsSchema: z.ZodType<Prisma.OrderFindUniqueArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
}).strict()

export const OrderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrderFindUniqueOrThrowArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
}).strict()

export const StatusOrderFindFirstArgsSchema: z.ZodType<Prisma.StatusOrderFindFirstArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  where: StatusOrderWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderOrderByWithRelationInputSchema.array(),StatusOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusOrderScalarFieldEnumSchema,StatusOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StatusOrderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StatusOrderFindFirstOrThrowArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  where: StatusOrderWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderOrderByWithRelationInputSchema.array(),StatusOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusOrderScalarFieldEnumSchema,StatusOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StatusOrderFindManyArgsSchema: z.ZodType<Prisma.StatusOrderFindManyArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  where: StatusOrderWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderOrderByWithRelationInputSchema.array(),StatusOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusOrderScalarFieldEnumSchema,StatusOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StatusOrderAggregateArgsSchema: z.ZodType<Prisma.StatusOrderAggregateArgs> = z.object({
  where: StatusOrderWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderOrderByWithRelationInputSchema.array(),StatusOrderOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StatusOrderGroupByArgsSchema: z.ZodType<Prisma.StatusOrderGroupByArgs> = z.object({
  where: StatusOrderWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderOrderByWithAggregationInputSchema.array(),StatusOrderOrderByWithAggregationInputSchema ]).optional(),
  by: StatusOrderScalarFieldEnumSchema.array(),
  having: StatusOrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StatusOrderFindUniqueArgsSchema: z.ZodType<Prisma.StatusOrderFindUniqueArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  where: StatusOrderWhereUniqueInputSchema,
}).strict()

export const StatusOrderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StatusOrderFindUniqueOrThrowArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  where: StatusOrderWhereUniqueInputSchema,
}).strict()

export const TrademarkFindFirstArgsSchema: z.ZodType<Prisma.TrademarkFindFirstArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  where: TrademarkWhereInputSchema.optional(),
  orderBy: z.union([ TrademarkOrderByWithRelationInputSchema.array(),TrademarkOrderByWithRelationInputSchema ]).optional(),
  cursor: TrademarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrademarkScalarFieldEnumSchema,TrademarkScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TrademarkFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TrademarkFindFirstOrThrowArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  where: TrademarkWhereInputSchema.optional(),
  orderBy: z.union([ TrademarkOrderByWithRelationInputSchema.array(),TrademarkOrderByWithRelationInputSchema ]).optional(),
  cursor: TrademarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrademarkScalarFieldEnumSchema,TrademarkScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TrademarkFindManyArgsSchema: z.ZodType<Prisma.TrademarkFindManyArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  where: TrademarkWhereInputSchema.optional(),
  orderBy: z.union([ TrademarkOrderByWithRelationInputSchema.array(),TrademarkOrderByWithRelationInputSchema ]).optional(),
  cursor: TrademarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrademarkScalarFieldEnumSchema,TrademarkScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TrademarkAggregateArgsSchema: z.ZodType<Prisma.TrademarkAggregateArgs> = z.object({
  where: TrademarkWhereInputSchema.optional(),
  orderBy: z.union([ TrademarkOrderByWithRelationInputSchema.array(),TrademarkOrderByWithRelationInputSchema ]).optional(),
  cursor: TrademarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TrademarkGroupByArgsSchema: z.ZodType<Prisma.TrademarkGroupByArgs> = z.object({
  where: TrademarkWhereInputSchema.optional(),
  orderBy: z.union([ TrademarkOrderByWithAggregationInputSchema.array(),TrademarkOrderByWithAggregationInputSchema ]).optional(),
  by: TrademarkScalarFieldEnumSchema.array(),
  having: TrademarkScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TrademarkFindUniqueArgsSchema: z.ZodType<Prisma.TrademarkFindUniqueArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  where: TrademarkWhereUniqueInputSchema,
}).strict()

export const TrademarkFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TrademarkFindUniqueOrThrowArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  where: TrademarkWhereUniqueInputSchema,
}).strict()

export const PaymentMethodFindFirstArgsSchema: z.ZodType<Prisma.PaymentMethodFindFirstArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentMethodScalarFieldEnumSchema,PaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PaymentMethodFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PaymentMethodFindFirstOrThrowArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentMethodScalarFieldEnumSchema,PaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PaymentMethodFindManyArgsSchema: z.ZodType<Prisma.PaymentMethodFindManyArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentMethodScalarFieldEnumSchema,PaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PaymentMethodAggregateArgsSchema: z.ZodType<Prisma.PaymentMethodAggregateArgs> = z.object({
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PaymentMethodGroupByArgsSchema: z.ZodType<Prisma.PaymentMethodGroupByArgs> = z.object({
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithAggregationInputSchema.array(),PaymentMethodOrderByWithAggregationInputSchema ]).optional(),
  by: PaymentMethodScalarFieldEnumSchema.array(),
  having: PaymentMethodScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PaymentMethodFindUniqueArgsSchema: z.ZodType<Prisma.PaymentMethodFindUniqueArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict()

export const PaymentMethodFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PaymentMethodFindUniqueOrThrowArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const PasswordResetCreateArgsSchema: z.ZodType<Prisma.PasswordResetCreateArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  data: z.union([ PasswordResetCreateInputSchema,PasswordResetUncheckedCreateInputSchema ]),
}).strict()

export const PasswordResetUpsertArgsSchema: z.ZodType<Prisma.PasswordResetUpsertArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
  create: z.union([ PasswordResetCreateInputSchema,PasswordResetUncheckedCreateInputSchema ]),
  update: z.union([ PasswordResetUpdateInputSchema,PasswordResetUncheckedUpdateInputSchema ]),
}).strict()

export const PasswordResetCreateManyArgsSchema: z.ZodType<Prisma.PasswordResetCreateManyArgs> = z.object({
  data: z.union([ PasswordResetCreateManyInputSchema,PasswordResetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PasswordResetDeleteArgsSchema: z.ZodType<Prisma.PasswordResetDeleteArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const PasswordResetUpdateArgsSchema: z.ZodType<Prisma.PasswordResetUpdateArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  data: z.union([ PasswordResetUpdateInputSchema,PasswordResetUncheckedUpdateInputSchema ]),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const PasswordResetUpdateManyArgsSchema: z.ZodType<Prisma.PasswordResetUpdateManyArgs> = z.object({
  data: z.union([ PasswordResetUpdateManyMutationInputSchema,PasswordResetUncheckedUpdateManyInputSchema ]),
  where: PasswordResetWhereInputSchema.optional(),
}).strict()

export const PasswordResetDeleteManyArgsSchema: z.ZodType<Prisma.PasswordResetDeleteManyArgs> = z.object({
  where: PasswordResetWhereInputSchema.optional(),
}).strict()

export const AddressCreateArgsSchema: z.ZodType<Prisma.AddressCreateArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  data: z.union([ AddressCreateInputSchema,AddressUncheckedCreateInputSchema ]),
}).strict()

export const AddressUpsertArgsSchema: z.ZodType<Prisma.AddressUpsertArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
  create: z.union([ AddressCreateInputSchema,AddressUncheckedCreateInputSchema ]),
  update: z.union([ AddressUpdateInputSchema,AddressUncheckedUpdateInputSchema ]),
}).strict()

export const AddressCreateManyArgsSchema: z.ZodType<Prisma.AddressCreateManyArgs> = z.object({
  data: z.union([ AddressCreateManyInputSchema,AddressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AddressDeleteArgsSchema: z.ZodType<Prisma.AddressDeleteArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  where: AddressWhereUniqueInputSchema,
}).strict()

export const AddressUpdateArgsSchema: z.ZodType<Prisma.AddressUpdateArgs> = z.object({
  select: AddressSelectSchema.optional(),
  include: AddressIncludeSchema.optional(),
  data: z.union([ AddressUpdateInputSchema,AddressUncheckedUpdateInputSchema ]),
  where: AddressWhereUniqueInputSchema,
}).strict()

export const AddressUpdateManyArgsSchema: z.ZodType<Prisma.AddressUpdateManyArgs> = z.object({
  data: z.union([ AddressUpdateManyMutationInputSchema,AddressUncheckedUpdateManyInputSchema ]),
  where: AddressWhereInputSchema.optional(),
}).strict()

export const AddressDeleteManyArgsSchema: z.ZodType<Prisma.AddressDeleteManyArgs> = z.object({
  where: AddressWhereInputSchema.optional(),
}).strict()

export const DistrictCreateArgsSchema: z.ZodType<Prisma.DistrictCreateArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  data: z.union([ DistrictCreateInputSchema,DistrictUncheckedCreateInputSchema ]),
}).strict()

export const DistrictUpsertArgsSchema: z.ZodType<Prisma.DistrictUpsertArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  where: DistrictWhereUniqueInputSchema,
  create: z.union([ DistrictCreateInputSchema,DistrictUncheckedCreateInputSchema ]),
  update: z.union([ DistrictUpdateInputSchema,DistrictUncheckedUpdateInputSchema ]),
}).strict()

export const DistrictCreateManyArgsSchema: z.ZodType<Prisma.DistrictCreateManyArgs> = z.object({
  data: z.union([ DistrictCreateManyInputSchema,DistrictCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DistrictDeleteArgsSchema: z.ZodType<Prisma.DistrictDeleteArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  where: DistrictWhereUniqueInputSchema,
}).strict()

export const DistrictUpdateArgsSchema: z.ZodType<Prisma.DistrictUpdateArgs> = z.object({
  select: DistrictSelectSchema.optional(),
  include: DistrictIncludeSchema.optional(),
  data: z.union([ DistrictUpdateInputSchema,DistrictUncheckedUpdateInputSchema ]),
  where: DistrictWhereUniqueInputSchema,
}).strict()

export const DistrictUpdateManyArgsSchema: z.ZodType<Prisma.DistrictUpdateManyArgs> = z.object({
  data: z.union([ DistrictUpdateManyMutationInputSchema,DistrictUncheckedUpdateManyInputSchema ]),
  where: DistrictWhereInputSchema.optional(),
}).strict()

export const DistrictDeleteManyArgsSchema: z.ZodType<Prisma.DistrictDeleteManyArgs> = z.object({
  where: DistrictWhereInputSchema.optional(),
}).strict()

export const ProvinceCreateArgsSchema: z.ZodType<Prisma.ProvinceCreateArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  data: z.union([ ProvinceCreateInputSchema,ProvinceUncheckedCreateInputSchema ]),
}).strict()

export const ProvinceUpsertArgsSchema: z.ZodType<Prisma.ProvinceUpsertArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  where: ProvinceWhereUniqueInputSchema,
  create: z.union([ ProvinceCreateInputSchema,ProvinceUncheckedCreateInputSchema ]),
  update: z.union([ ProvinceUpdateInputSchema,ProvinceUncheckedUpdateInputSchema ]),
}).strict()

export const ProvinceCreateManyArgsSchema: z.ZodType<Prisma.ProvinceCreateManyArgs> = z.object({
  data: z.union([ ProvinceCreateManyInputSchema,ProvinceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProvinceDeleteArgsSchema: z.ZodType<Prisma.ProvinceDeleteArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  where: ProvinceWhereUniqueInputSchema,
}).strict()

export const ProvinceUpdateArgsSchema: z.ZodType<Prisma.ProvinceUpdateArgs> = z.object({
  select: ProvinceSelectSchema.optional(),
  include: ProvinceIncludeSchema.optional(),
  data: z.union([ ProvinceUpdateInputSchema,ProvinceUncheckedUpdateInputSchema ]),
  where: ProvinceWhereUniqueInputSchema,
}).strict()

export const ProvinceUpdateManyArgsSchema: z.ZodType<Prisma.ProvinceUpdateManyArgs> = z.object({
  data: z.union([ ProvinceUpdateManyMutationInputSchema,ProvinceUncheckedUpdateManyInputSchema ]),
  where: ProvinceWhereInputSchema.optional(),
}).strict()

export const ProvinceDeleteManyArgsSchema: z.ZodType<Prisma.ProvinceDeleteManyArgs> = z.object({
  where: ProvinceWhereInputSchema.optional(),
}).strict()

export const WardCreateArgsSchema: z.ZodType<Prisma.WardCreateArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  data: z.union([ WardCreateInputSchema,WardUncheckedCreateInputSchema ]),
}).strict()

export const WardUpsertArgsSchema: z.ZodType<Prisma.WardUpsertArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  where: WardWhereUniqueInputSchema,
  create: z.union([ WardCreateInputSchema,WardUncheckedCreateInputSchema ]),
  update: z.union([ WardUpdateInputSchema,WardUncheckedUpdateInputSchema ]),
}).strict()

export const WardCreateManyArgsSchema: z.ZodType<Prisma.WardCreateManyArgs> = z.object({
  data: z.union([ WardCreateManyInputSchema,WardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const WardDeleteArgsSchema: z.ZodType<Prisma.WardDeleteArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  where: WardWhereUniqueInputSchema,
}).strict()

export const WardUpdateArgsSchema: z.ZodType<Prisma.WardUpdateArgs> = z.object({
  select: WardSelectSchema.optional(),
  include: WardIncludeSchema.optional(),
  data: z.union([ WardUpdateInputSchema,WardUncheckedUpdateInputSchema ]),
  where: WardWhereUniqueInputSchema,
}).strict()

export const WardUpdateManyArgsSchema: z.ZodType<Prisma.WardUpdateManyArgs> = z.object({
  data: z.union([ WardUpdateManyMutationInputSchema,WardUncheckedUpdateManyInputSchema ]),
  where: WardWhereInputSchema.optional(),
}).strict()

export const WardDeleteManyArgsSchema: z.ZodType<Prisma.WardDeleteManyArgs> = z.object({
  where: WardWhereInputSchema.optional(),
}).strict()

export const UnitCreateArgsSchema: z.ZodType<Prisma.UnitCreateArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  data: z.union([ UnitCreateInputSchema,UnitUncheckedCreateInputSchema ]),
}).strict()

export const UnitUpsertArgsSchema: z.ZodType<Prisma.UnitUpsertArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
  create: z.union([ UnitCreateInputSchema,UnitUncheckedCreateInputSchema ]),
  update: z.union([ UnitUpdateInputSchema,UnitUncheckedUpdateInputSchema ]),
}).strict()

export const UnitCreateManyArgsSchema: z.ZodType<Prisma.UnitCreateManyArgs> = z.object({
  data: z.union([ UnitCreateManyInputSchema,UnitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UnitDeleteArgsSchema: z.ZodType<Prisma.UnitDeleteArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const UnitUpdateArgsSchema: z.ZodType<Prisma.UnitUpdateArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  data: z.union([ UnitUpdateInputSchema,UnitUncheckedUpdateInputSchema ]),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const UnitUpdateManyArgsSchema: z.ZodType<Prisma.UnitUpdateManyArgs> = z.object({
  data: z.union([ UnitUpdateManyMutationInputSchema,UnitUncheckedUpdateManyInputSchema ]),
  where: UnitWhereInputSchema.optional(),
}).strict()

export const UnitDeleteManyArgsSchema: z.ZodType<Prisma.UnitDeleteManyArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
}).strict()

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
}).strict()

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
  create: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
  update: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
}).strict()

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema,ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
  where: ProductWhereUniqueInputSchema,
}).strict()

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema,ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(),
}).strict()

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
}).strict()

export const ProductDetailCreateArgsSchema: z.ZodType<Prisma.ProductDetailCreateArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  data: z.union([ ProductDetailCreateInputSchema,ProductDetailUncheckedCreateInputSchema ]),
}).strict()

export const ProductDetailUpsertArgsSchema: z.ZodType<Prisma.ProductDetailUpsertArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  where: ProductDetailWhereUniqueInputSchema,
  create: z.union([ ProductDetailCreateInputSchema,ProductDetailUncheckedCreateInputSchema ]),
  update: z.union([ ProductDetailUpdateInputSchema,ProductDetailUncheckedUpdateInputSchema ]),
}).strict()

export const ProductDetailCreateManyArgsSchema: z.ZodType<Prisma.ProductDetailCreateManyArgs> = z.object({
  data: z.union([ ProductDetailCreateManyInputSchema,ProductDetailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProductDetailDeleteArgsSchema: z.ZodType<Prisma.ProductDetailDeleteArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  where: ProductDetailWhereUniqueInputSchema,
}).strict()

export const ProductDetailUpdateArgsSchema: z.ZodType<Prisma.ProductDetailUpdateArgs> = z.object({
  select: ProductDetailSelectSchema.optional(),
  include: ProductDetailIncludeSchema.optional(),
  data: z.union([ ProductDetailUpdateInputSchema,ProductDetailUncheckedUpdateInputSchema ]),
  where: ProductDetailWhereUniqueInputSchema,
}).strict()

export const ProductDetailUpdateManyArgsSchema: z.ZodType<Prisma.ProductDetailUpdateManyArgs> = z.object({
  data: z.union([ ProductDetailUpdateManyMutationInputSchema,ProductDetailUncheckedUpdateManyInputSchema ]),
  where: ProductDetailWhereInputSchema.optional(),
}).strict()

export const ProductDetailDeleteManyArgsSchema: z.ZodType<Prisma.ProductDetailDeleteManyArgs> = z.object({
  where: ProductDetailWhereInputSchema.optional(),
}).strict()

export const ImageProductCreateArgsSchema: z.ZodType<Prisma.ImageProductCreateArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  data: z.union([ ImageProductCreateInputSchema,ImageProductUncheckedCreateInputSchema ]),
}).strict()

export const ImageProductUpsertArgsSchema: z.ZodType<Prisma.ImageProductUpsertArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  where: ImageProductWhereUniqueInputSchema,
  create: z.union([ ImageProductCreateInputSchema,ImageProductUncheckedCreateInputSchema ]),
  update: z.union([ ImageProductUpdateInputSchema,ImageProductUncheckedUpdateInputSchema ]),
}).strict()

export const ImageProductCreateManyArgsSchema: z.ZodType<Prisma.ImageProductCreateManyArgs> = z.object({
  data: z.union([ ImageProductCreateManyInputSchema,ImageProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ImageProductDeleteArgsSchema: z.ZodType<Prisma.ImageProductDeleteArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  where: ImageProductWhereUniqueInputSchema,
}).strict()

export const ImageProductUpdateArgsSchema: z.ZodType<Prisma.ImageProductUpdateArgs> = z.object({
  select: ImageProductSelectSchema.optional(),
  include: ImageProductIncludeSchema.optional(),
  data: z.union([ ImageProductUpdateInputSchema,ImageProductUncheckedUpdateInputSchema ]),
  where: ImageProductWhereUniqueInputSchema,
}).strict()

export const ImageProductUpdateManyArgsSchema: z.ZodType<Prisma.ImageProductUpdateManyArgs> = z.object({
  data: z.union([ ImageProductUpdateManyMutationInputSchema,ImageProductUncheckedUpdateManyInputSchema ]),
  where: ImageProductWhereInputSchema.optional(),
}).strict()

export const ImageProductDeleteManyArgsSchema: z.ZodType<Prisma.ImageProductDeleteManyArgs> = z.object({
  where: ImageProductWhereInputSchema.optional(),
}).strict()

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict()

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict()

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict()

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict()

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict()

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
}).strict()

export const CartCreateArgsSchema: z.ZodType<Prisma.CartCreateArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  data: z.union([ CartCreateInputSchema,CartUncheckedCreateInputSchema ]),
}).strict()

export const CartUpsertArgsSchema: z.ZodType<Prisma.CartUpsertArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  where: CartWhereUniqueInputSchema,
  create: z.union([ CartCreateInputSchema,CartUncheckedCreateInputSchema ]),
  update: z.union([ CartUpdateInputSchema,CartUncheckedUpdateInputSchema ]),
}).strict()

export const CartCreateManyArgsSchema: z.ZodType<Prisma.CartCreateManyArgs> = z.object({
  data: z.union([ CartCreateManyInputSchema,CartCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CartDeleteArgsSchema: z.ZodType<Prisma.CartDeleteArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  where: CartWhereUniqueInputSchema,
}).strict()

export const CartUpdateArgsSchema: z.ZodType<Prisma.CartUpdateArgs> = z.object({
  select: CartSelectSchema.optional(),
  include: CartIncludeSchema.optional(),
  data: z.union([ CartUpdateInputSchema,CartUncheckedUpdateInputSchema ]),
  where: CartWhereUniqueInputSchema,
}).strict()

export const CartUpdateManyArgsSchema: z.ZodType<Prisma.CartUpdateManyArgs> = z.object({
  data: z.union([ CartUpdateManyMutationInputSchema,CartUncheckedUpdateManyInputSchema ]),
  where: CartWhereInputSchema.optional(),
}).strict()

export const CartDeleteManyArgsSchema: z.ZodType<Prisma.CartDeleteManyArgs> = z.object({
  where: CartWhereInputSchema.optional(),
}).strict()

export const OrderCreateArgsSchema: z.ZodType<Prisma.OrderCreateArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  data: z.union([ OrderCreateInputSchema,OrderUncheckedCreateInputSchema ]),
}).strict()

export const OrderUpsertArgsSchema: z.ZodType<Prisma.OrderUpsertArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
  create: z.union([ OrderCreateInputSchema,OrderUncheckedCreateInputSchema ]),
  update: z.union([ OrderUpdateInputSchema,OrderUncheckedUpdateInputSchema ]),
}).strict()

export const OrderCreateManyArgsSchema: z.ZodType<Prisma.OrderCreateManyArgs> = z.object({
  data: z.union([ OrderCreateManyInputSchema,OrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const OrderDeleteArgsSchema: z.ZodType<Prisma.OrderDeleteArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  where: OrderWhereUniqueInputSchema,
}).strict()

export const OrderUpdateArgsSchema: z.ZodType<Prisma.OrderUpdateArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: OrderIncludeSchema.optional(),
  data: z.union([ OrderUpdateInputSchema,OrderUncheckedUpdateInputSchema ]),
  where: OrderWhereUniqueInputSchema,
}).strict()

export const OrderUpdateManyArgsSchema: z.ZodType<Prisma.OrderUpdateManyArgs> = z.object({
  data: z.union([ OrderUpdateManyMutationInputSchema,OrderUncheckedUpdateManyInputSchema ]),
  where: OrderWhereInputSchema.optional(),
}).strict()

export const OrderDeleteManyArgsSchema: z.ZodType<Prisma.OrderDeleteManyArgs> = z.object({
  where: OrderWhereInputSchema.optional(),
}).strict()

export const StatusOrderCreateArgsSchema: z.ZodType<Prisma.StatusOrderCreateArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  data: z.union([ StatusOrderCreateInputSchema,StatusOrderUncheckedCreateInputSchema ]),
}).strict()

export const StatusOrderUpsertArgsSchema: z.ZodType<Prisma.StatusOrderUpsertArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  where: StatusOrderWhereUniqueInputSchema,
  create: z.union([ StatusOrderCreateInputSchema,StatusOrderUncheckedCreateInputSchema ]),
  update: z.union([ StatusOrderUpdateInputSchema,StatusOrderUncheckedUpdateInputSchema ]),
}).strict()

export const StatusOrderCreateManyArgsSchema: z.ZodType<Prisma.StatusOrderCreateManyArgs> = z.object({
  data: z.union([ StatusOrderCreateManyInputSchema,StatusOrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const StatusOrderDeleteArgsSchema: z.ZodType<Prisma.StatusOrderDeleteArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  where: StatusOrderWhereUniqueInputSchema,
}).strict()

export const StatusOrderUpdateArgsSchema: z.ZodType<Prisma.StatusOrderUpdateArgs> = z.object({
  select: StatusOrderSelectSchema.optional(),
  include: StatusOrderIncludeSchema.optional(),
  data: z.union([ StatusOrderUpdateInputSchema,StatusOrderUncheckedUpdateInputSchema ]),
  where: StatusOrderWhereUniqueInputSchema,
}).strict()

export const StatusOrderUpdateManyArgsSchema: z.ZodType<Prisma.StatusOrderUpdateManyArgs> = z.object({
  data: z.union([ StatusOrderUpdateManyMutationInputSchema,StatusOrderUncheckedUpdateManyInputSchema ]),
  where: StatusOrderWhereInputSchema.optional(),
}).strict()

export const StatusOrderDeleteManyArgsSchema: z.ZodType<Prisma.StatusOrderDeleteManyArgs> = z.object({
  where: StatusOrderWhereInputSchema.optional(),
}).strict()

export const TrademarkCreateArgsSchema: z.ZodType<Prisma.TrademarkCreateArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  data: z.union([ TrademarkCreateInputSchema,TrademarkUncheckedCreateInputSchema ]),
}).strict()

export const TrademarkUpsertArgsSchema: z.ZodType<Prisma.TrademarkUpsertArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  where: TrademarkWhereUniqueInputSchema,
  create: z.union([ TrademarkCreateInputSchema,TrademarkUncheckedCreateInputSchema ]),
  update: z.union([ TrademarkUpdateInputSchema,TrademarkUncheckedUpdateInputSchema ]),
}).strict()

export const TrademarkCreateManyArgsSchema: z.ZodType<Prisma.TrademarkCreateManyArgs> = z.object({
  data: z.union([ TrademarkCreateManyInputSchema,TrademarkCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TrademarkDeleteArgsSchema: z.ZodType<Prisma.TrademarkDeleteArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  where: TrademarkWhereUniqueInputSchema,
}).strict()

export const TrademarkUpdateArgsSchema: z.ZodType<Prisma.TrademarkUpdateArgs> = z.object({
  select: TrademarkSelectSchema.optional(),
  include: TrademarkIncludeSchema.optional(),
  data: z.union([ TrademarkUpdateInputSchema,TrademarkUncheckedUpdateInputSchema ]),
  where: TrademarkWhereUniqueInputSchema,
}).strict()

export const TrademarkUpdateManyArgsSchema: z.ZodType<Prisma.TrademarkUpdateManyArgs> = z.object({
  data: z.union([ TrademarkUpdateManyMutationInputSchema,TrademarkUncheckedUpdateManyInputSchema ]),
  where: TrademarkWhereInputSchema.optional(),
}).strict()

export const TrademarkDeleteManyArgsSchema: z.ZodType<Prisma.TrademarkDeleteManyArgs> = z.object({
  where: TrademarkWhereInputSchema.optional(),
}).strict()

export const PaymentMethodCreateArgsSchema: z.ZodType<Prisma.PaymentMethodCreateArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  data: z.union([ PaymentMethodCreateInputSchema,PaymentMethodUncheckedCreateInputSchema ]),
}).strict()

export const PaymentMethodUpsertArgsSchema: z.ZodType<Prisma.PaymentMethodUpsertArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
  create: z.union([ PaymentMethodCreateInputSchema,PaymentMethodUncheckedCreateInputSchema ]),
  update: z.union([ PaymentMethodUpdateInputSchema,PaymentMethodUncheckedUpdateInputSchema ]),
}).strict()

export const PaymentMethodCreateManyArgsSchema: z.ZodType<Prisma.PaymentMethodCreateManyArgs> = z.object({
  data: z.union([ PaymentMethodCreateManyInputSchema,PaymentMethodCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PaymentMethodDeleteArgsSchema: z.ZodType<Prisma.PaymentMethodDeleteArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict()

export const PaymentMethodUpdateArgsSchema: z.ZodType<Prisma.PaymentMethodUpdateArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  data: z.union([ PaymentMethodUpdateInputSchema,PaymentMethodUncheckedUpdateInputSchema ]),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict()

export const PaymentMethodUpdateManyArgsSchema: z.ZodType<Prisma.PaymentMethodUpdateManyArgs> = z.object({
  data: z.union([ PaymentMethodUpdateManyMutationInputSchema,PaymentMethodUncheckedUpdateManyInputSchema ]),
  where: PaymentMethodWhereInputSchema.optional(),
}).strict()

export const PaymentMethodDeleteManyArgsSchema: z.ZodType<Prisma.PaymentMethodDeleteManyArgs> = z.object({
  where: PaymentMethodWhereInputSchema.optional(),
}).strict()