import { trueGrey } from '@/libs/config/colors'
import { TrademarkCreate, TrademarkCreateSchema } from '@/libs/schema/trademark'
import { Input } from '@/libs/shared/Form'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, CircularProgress, Modal, Stack, Typography, styled } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import AddIcon from 'public/assets/imgs/add.png'
import CloseIcon from 'public/assets/svgs/exit.svg'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useForm } from 'react-hook-form'

type CreateProps = {
  open: boolean
  handleClose: () => void
}

const Create: React.FC<CreateProps> = ({ open, handleClose }) => {
  const { t } = useTranslation('trademark')
  const { mutate } = api.trademark.create.useMutation()
  const utils = api.useContext()

  const { control, handleSubmit, reset } = useForm<TrademarkCreate>({
    defaultValues: {
      name: '',
      country: '',
      image: '',
    },
    resolver: zodResolver(TrademarkCreateSchema),
  })

  const [files, setFiles] = useState<File[]>([])
  const [image, setImage] = useState<string>('')

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

  const onSubmit: SubmitHandler<TrademarkCreate> = async (data) => {
    mutation.mutate(`https://api.cloudinary.com/v1_1/dipkauizq/image/upload`, {
      onSuccess: async (res) => {
        const imageData = await res.json()

        mutate(
          { ...data, image: imageData.url },
          {
            onSuccess: () => {
              enqueueSnackbar(t('create.success'), {
                variant: 'success',
              })
              handleClose()
              reset()
            },
            onError: (err) => {
              const error = String(err.message)
              const description = t(error, { ns: 'common' })
              enqueueSnackbar(t(`${description}`), {
                variant: 'error',
              })
            },
            onSettled: () => {
              utils.trademark.invalidate()
            },
          },
        )
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <BoxContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          pb={1}
          borderBottom={`1px solid ${trueGrey[200]}`}
        >
          <Typography fontWeight={700}>{t('create.title')}</Typography>

          <ButtonClose onClick={handleClose}>
            <Image src={CloseIcon} alt="close icon" />
          </ButtonClose>
        </Stack>

        <Stack
          width="100%"
          spacing={3}
          padding={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          justifyContent="center"
        >
          <Stack direction="row" spacing={2}>
            <Stack spacing={2} width="70%">
              <Input
                control={control}
                name="name"
                label={t('name_trademark') as string}
                fullWidth
                placeholder={t('create.enter_name') as string}
                required
              />

              <Input
                control={control}
                name="country"
                label={t('country_trademark') as string}
                fullWidth
                placeholder={t('create.enter_country_trademark') as string}
                required
              />
            </Stack>

            <Box
              width={150}
              height={150}
              border="1px dashed"
              {...getRootProps({ className: 'dropzone' })}
            >
              <input {...getInputProps()} />
              <AvatarWhenEit>
                <Camera>
                  <Image
                    src={image ? image : AddIcon}
                    width={image ? 150 : 30}
                    height={image ? 150 : 30}
                    alt="choose avatar"
                    onLoad={() => {
                      URL.revokeObjectURL(image)
                    }}
                  />
                </Camera>
              </AvatarWhenEit>
            </Box>
          </Stack>

          <Box width="100%">
            <Input
              control={control}
              name="introduce"
              label={t('introduce') as string}
              fullWidth
              placeholder={t('create.enter_introduce') as string}
              required
              multiline
              minRows={10}
            />
          </Box>

          <Button variant="contained" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading && (
              <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />
            )}

            {t('create.title')}
          </Button>
        </Stack>
      </BoxContainer>
    </Modal>
  )
}

export { Create }

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  boxShadow: theme.shadows[1],
  padding: 20,
  borderRadius: 2,
  background: theme.palette.base.white,
  overflow: 'auto',
}))

const ButtonClose = styled(Button)({
  minWidth: 0,
  paddingTop: 0,
  paddingBottom: 0,
  padding: 0,
})

const AvatarWhenEit = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
})

const Camera = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
