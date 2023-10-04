import { CreateProduct, createProductSchema } from '@/libs/schema/product.schema'
import { Input, Select } from '@/libs/shared/Form'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const FormCreateProduct = () => {
  const { t } = useTranslation('product')
  const { mutate, isLoading } = api.product.createProduct.useMutation()
  const { data: CategoryData } = api.category.get.useQuery()
  const { data: UnitData } = api.unit.get.useQuery()

  const CategoryMapper = CategoryData?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const UnitMapper = UnitData?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const { control, handleSubmit, formState } = useForm<CreateProduct>({
    defaultValues: {
      category_id: '',
      name: '',
      price: 0,
      quantity: 0,
      unit_id: '',
      status: 'DANG_BAN',
    },
    resolver: zodResolver(createProductSchema),
  })

  console.log(formState.errors)
  const onSubmit: SubmitHandler<CreateProduct> = useCallback(
    async (data) => {
      console.log(data)
      mutate(
        { ...data },
        {
          onSuccess: () => {
            enqueueSnackbar(t('change-password.success'), {
              variant: 'success',
            })
          },
          onError: (err) => {
            const error = String(err.message)
            const description = t(error, { ns: 'common' })
            enqueueSnackbar(t(`${description}`), {
              variant: 'error',
            })
          },
        },
      )
    },
    [mutate, t],
  )

  return (
    <Stack width="100%" spacing={3} padding={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Input
          control={control}
          name="name"
          label={t('name-product') as string}
          fullWidth
          placeholder={t('enter-name-product') as string}
          required
        />

        <Input
          control={control}
          name="price"
          label={t('price') as string}
          fullWidth
          placeholder={t('enter-price') as string}
        />

        <Select
          control={control}
          name="unit_id"
          label={t('unit') as string}
          fullWidth
          options={UnitMapper || []}
        />
      </Stack>

      <Stack>
        <Input
          control={control}
          name="quantity"
          label={t('quantity') as string}
          fullWidth
          placeholder={t('enter-quantity') as string}
        />

        <Select
          control={control}
          name="category_id"
          label={t('category') as string}
          fullWidth
          options={CategoryMapper || []}
        />
      </Stack>

      <Button variant="contained" type="submit">
        {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

        {t('create')}
      </Button>
    </Stack>
  )
}

export { FormCreateProduct }
