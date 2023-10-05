import { CategorySchema, CategorySchemaType } from '@/libs/schema/category.schema'
import { Input } from '@/libs/shared/Form'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'

const FormCreateCategory = () => {
  const { t } = useTranslation('category')
  const { mutate, isLoading } = api.category.create.useMutation()
  const utils = api.useContext()

  const { control, handleSubmit } = useForm<CategorySchemaType>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(CategorySchema),
  })

  const onSubmit: SubmitHandler<CategorySchemaType> = async (data) => {
    console.log(data)
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
        onSettled() {
          utils.category.invalidate()
        },
      },
    )
  }

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

export { FormCreateCategory }
