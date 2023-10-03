import { CreateProductSchemaType, createProductSchema } from '@/libs/schema/product.schema'
import { Input } from '@/libs/shared/Form'
import { LayoutAdmin } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const CreateProductPage = () => {
  const { t } = useTranslation('auth')
  const { mutate, isLoading } = api.product.createProduct.useMutation()

  const { control, handleSubmit } = useForm<CreateProductSchemaType>({
    defaultValues: {
      brand_name_id: '',
      category_id: '',
      name: '',
      price: '',
      quantity: '',
      description: '',
      brand_origin_id: '',
      expiryProduct: '',
      short_description: '',
      unit_id: '',
    },
    resolver: zodResolver(createProductSchema),
  })

  const onSubmit: SubmitHandler<CreateProductSchemaType> = useCallback(
    async (data) => {
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
    <LayoutAdmin title="Product">
      <Stack width="100%" spacing={3} alignItems="center" paddingBottom={3}>
        <Typography textAlign="center" variant="h3">
          {t('change-password.title')}
        </Typography>

        <Typography textAlign="center">{t('change-password.description')}</Typography>

        <Stack component="form" spacing={3} width="80%" onSubmit={handleSubmit(onSubmit)}>
          <Input
            control={control}
            name="name"
            label={t('change-password.old-password') as string}
            fullWidth
            placeholder={t('name') as string}
          />

          <Input
            control={control}
            name="price"
            label={t('change-password.new-password') as string}
            fullWidth
            placeholder={t('price') as string}
            type="number"
          />

          <Input
            control={control}
            name="quantity"
            label={t('change-password.confirm-password') as string}
            fullWidth
            placeholder={t('quantity') as string}
            type="number"
          />

          <Input
            control={control}
            name="description"
            label={t('desc') as string}
            fullWidth
            placeholder={t('change-password.enter-confirm-password') as string}
          />

          <Input
            control={control}
            name="short_description"
            label={t('short') as string}
            fullWidth
            placeholder={t('change-password.enter-confirm-password') as string}
          />

          <Input
            control={control}
            name="unit_id"
            label={t('unit id') as string}
            fullWidth
            placeholder={t('change-password.enter-confirm-password') as string}
          />

          <Input
            control={control}
            name="brand_name_id"
            label={t('brand name') as string}
            fullWidth
            placeholder={t('change-password.enter-confirm-password') as string}
          />

          <Input
            control={control}
            name="category_id"
            label={t('category') as string}
            fullWidth
            placeholder={t('change-password.enter-confirm-password') as string}
          />

          <Input
            control={control}
            name="brand_origin_id"
            label={t('brand origin') as string}
            fullWidth
            placeholder={t('change-password.enter-confirm-password') as string}
          />

          <Input
            control={control}
            name="expiryProduct"
            label={t('category') as string}
            fullWidth
            placeholder={t('change-password.enter-confirm-password') as string}
          />

          <Button variant="contained" type="submit">
            {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

            {t('change-password.submit')}
          </Button>
        </Stack>
      </Stack>
    </LayoutAdmin>
  )
}

export { CreateProductPage }
