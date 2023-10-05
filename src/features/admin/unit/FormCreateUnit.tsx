import { CategorySchemaType, CategorySchemaUpdate } from '@/libs/schema/category.schema'
import { Input } from '@/libs/shared/Form'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const FormCreateUnit = () => {
  const { t } = useTranslation('category')
  const { mutate, isLoading } = api.unit.create.useMutation()

  const { control, handleSubmit } = useForm<CategorySchemaType>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(CategorySchemaUpdate),
  })

  const onSubmit: SubmitHandler<CategorySchemaType> = useCallback(
    async (data) => {
      mutate(
        { ...data },
        {
          onSuccess: () => {
            enqueueSnackbar(t('success'), {
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
      </Stack>

      <Button variant="contained" type="submit">
        {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

        {t('create')}
      </Button>
    </Stack>
  )
}

export { FormCreateUnit }
