import { grey } from '@/libs/config/colors'
import { UpdateUser, UpdateUserSchema } from '@/libs/schema/user.schema'
import { DatePickerYear, Input } from '@/libs/shared/Form'
import { LayoutAccount } from '@/libs/shared/Layout'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import AvatarDefault from 'public/assets/imgs/avatar-default.png'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

const Account = () => {
  const { t } = useTranslation('account')
  const { data } = api.user.byId.useQuery()
  const { mutate: mutateImage } = api.user.updateImage.useMutation()
  const { mutate: mutateInfo } = api.user.update.useMutation()
  const utils = api.useContext()
  const [files, setFiles] = useState<File[]>([])
  const [image, setImage] = useState<string>('')
  const { data: session, update } = useSession()

  const { control, handleSubmit } = useForm<UpdateUser>({
    defaultValues: {
      name: (data?.name as string) || '',
      sex: (data?.sex as string) || '',
      date_of_birth: (data?.date_of_birth as Date) || new Date(),
    },
    values: {
      name: data?.name as string,
      sex: (data?.sex as string) || '',
      date_of_birth: data?.date_of_birth || new Date(),
    },
    resolver: zodResolver(UpdateUserSchema),
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
    },
    multiple: false,
  })

  useEffect(() => {
    if (files && files.length > 0 && files[0]) {
      const url = URL.createObjectURL(files[0])
      setImage(url)
    }
  }, [files])

  const formData = new FormData()

  files.forEach((file) => {
    formData.append('file', file)
  })

  formData.append('upload_preset', 'pharma')

  const mutation = useMutation({
    mutationFn: (url: string) => {
      return fetch(url, {
        method: 'POST',
        body: formData,
      })
    },
  })

  const handleUploadImage = async () => {
    mutation.mutate(`https://api.cloudinary.com/v1_1/dipkauizq/image/upload`, {
      onSuccess: async (res) => {
        const imageData = await res.json()

        mutateImage(
          { image: imageData.url },
          {
            onSuccess: () => {
              enqueueSnackbar(t('update_success'), {
                variant: 'success',
              })
              setImage('')
              update()
            },
            onError: () => {
              enqueueSnackbar(t('update_fail'), {
                variant: 'error',
              })
            },
            onSettled: () => {
              utils.user.invalidate()
            },
          },
        )
      },
      onError: () => {
        enqueueSnackbar(t('update_fail'), {
          variant: 'error',
        })
      },
    })
  }

  const onSubmit = (data: UpdateUser) => {
    mutateInfo(data, {
      onSuccess: () => {
        enqueueSnackbar(t('update_success'), {
          variant: 'success',
        })
      },
      onError: () => {
        enqueueSnackbar(t('update_fail'), {
          variant: 'error',
        })
      },
      onSettled: () => {
        utils.user.invalidate()
      },
    })
  }

  return (
    <LayoutAccount>
      <Stack spacing={2}>
        <Typography variant="h4" textTransform="uppercase" fontWeight={700}>
          {t('change_info_account')}
        </Typography>

        <Stack
          direction="row"
          width={500}
          border="1px dashed"
          justifyContent="center"
          spacing={2}
          padding={2}
        >
          <Stack spacing={3} borderRight="1px dashed" paddingRight={2}>
            <Box
              {...getRootProps({ className: 'dropzone' })}
              border={`1px solid ${grey[300]}`}
              padding={2}
              fontSize={14}
            >
              <input multiple {...getInputProps()} />

              <Image
                src={image ? image : session?.user?.image ? session?.user?.image : AvatarDefault}
                width={image ? 200 : 200}
                height={image ? 200 : 200}
                alt="choose avatar"
                onLoad={() => {
                  URL.revokeObjectURL(image as string)
                }}
              />
            </Box>

            <Button onClick={handleUploadImage} disabled={!image} variant="contained">
              {t('upload_avatar')}
            </Button>
          </Stack>

          <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              control={control}
              name="name"
              label={t('name')}
              placeholder={t('enter_name')}
              required
            />

            <Input
              control={control}
              name="sex"
              label={t('general')}
              placeholder={t('general')}
              required
            />

            <DatePickerYear
              control={control}
              name="date_of_birth"
              label={t('date_of_birth')}
              fullWidth
            />

            <Button variant="contained" type="submit">
              {t('update')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutAccount>
  )
}

export { Account }
