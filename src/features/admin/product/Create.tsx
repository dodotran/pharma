import { trueGrey } from '@/libs/config/colors'
import { CreateProduct, createProductSchema } from '@/libs/schema/product.schema'
import { DatePickerYear, Input, Select } from '@/libs/shared/Form'
import { uploadCloundinary } from '@/libs/shared/hooks'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import AddIcon from 'public/assets/imgs/add.png'
import CloseIcon from 'public/assets/svgs/exit.svg'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useForm } from 'react-hook-form'

type CreateProps = {
  open: boolean
  handleClose: () => void
}

const Create: React.FC<CreateProps> = ({ open, handleClose }) => {
  const { t } = useTranslation('product')
  const { mutate, isLoading } = api.product.createProduct.useMutation()
  const { mutate: uploadImage } = api.product.uploadImage.useMutation()
  const { data: CategoryData } = api.category.get.useQuery()
  const { data: UnitData } = api.unit.get.useQuery()
  const { data: TradeMarkData } = api.trademark.get.useQuery()
  const utils = api.useContext()

  const CategoryMapper = CategoryData?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const UnitMapper = UnitData?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const TradeMarkMapper = TradeMarkData?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const status = [
    {
      label: 'Đang bán',
      value: 'DANG_BAN',
    },
    {
      label: 'Hết hàng',
      value: 'HET_HANG',
    },
    {
      label: 'Dừng bán',
      value: 'DUNG_BAN',
    },
    {
      label: 'Đến hiệu thuốc',
      value: 'DEN_HIEU_THUOC',
    },
  ]

  const { control, handleSubmit, reset } = useForm<CreateProduct>({
    defaultValues: {
      category_id: '',
      name: '',
      price: '',
      quantity: '',
      unit_id: '',
      status: 'DANG_BAN',
      expired_date: new Date(),
      description: '',
      ingredient: '',
      how_to_use: '',
      short_description: '',
      trademark_id: '',
    },
    resolver: zodResolver(createProductSchema),
  })

  const [files, setFiles] = useState<File[]>([])
  const [imageList, setImageList] = useState<string[]>([])

  useEffect(() => {
    if (files && files.length > 0) {
      files.forEach((file) => {
        const url = URL.createObjectURL(file)
        setImageList((prev) => [...prev, url])
      })
    }
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
    },
  })

  const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
    mutate(data, {
      onSuccess: async (data) => {
        for (let i = 0; i < files.length; i++) {
          const res = await uploadCloundinary(files[i])
          uploadImage({ product_id: data.id, url: res.url })
        }
      },
      onError: (err) => {
        const error = String(err.message)
        const description = t(error, { ns: 'common' })
        enqueueSnackbar(t(`${description}`), {
          variant: 'error',
        })
      },
      onSettled: () => {
        utils.product.invalidate()
        handleClose()
        reset()
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
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack width="50%" spacing={2}>
              <Input
                control={control}
                name="name"
                label={t('name') as string}
                fullWidth
                placeholder={t('enter_name_product') as string}
                required
              />

              <Input
                control={control}
                name="price"
                label={t('price') as string}
                fullWidth
                placeholder={t('enter_price') as string}
                required
              />

              <Select
                control={control}
                name="unit_id"
                label={t('unit') as string}
                fullWidth
                options={UnitMapper || []}
                required
              />

              <Input
                control={control}
                name="quantity"
                label={t('quantity') as string}
                fullWidth
                placeholder={t('enter_quantity') as string}
                required
              />

              <Select
                control={control}
                name="category_id"
                label={t('category') as string}
                fullWidth
                options={CategoryMapper || []}
                required
              />

              <Select
                control={control}
                name="status"
                label={t('status') as string}
                fullWidth
                options={status || []}
              />

              <Select
                control={control}
                name="trademark_id"
                label={t('trademark') as string}
                fullWidth
                options={TradeMarkMapper || []}
              />
            </Stack>

            <Stack alignItems="center" justifyContent="center" width="100%">
              <Stack direction="row" {...getRootProps({ className: 'dropzone' })}>
                <input multiple {...getInputProps()} />

                <AvatarWhenEdit>
                  <Camera>
                    <Image
                      src={imageList[0] ? imageList[0] : AddIcon}
                      width={imageList[0] ? 200 : 30}
                      height={imageList[0] ? 200 : 30}
                      alt="choose avatar"
                      onLoad={() => {
                        URL.revokeObjectURL(imageList[0] as string)
                      }}
                    />
                  </Camera>
                </AvatarWhenEdit>

                <AvatarWhenEdit>
                  <Camera>
                    <Image
                      src={imageList[1] ? imageList[1] : AddIcon}
                      width={imageList[1] ? 200 : 30}
                      height={imageList[1] ? 200 : 30}
                      alt="choose avatar"
                      onLoad={() => {
                        URL.revokeObjectURL(imageList[1] as string)
                      }}
                    />
                  </Camera>
                </AvatarWhenEdit>
              </Stack>

              <Stack direction="row">
                <AvatarWhenEdit>
                  <Camera>
                    <Image
                      src={imageList[2] ? imageList[2] : AddIcon}
                      width={imageList[2] ? 200 : 30}
                      height={imageList[2] ? 200 : 30}
                      alt="choose avatar"
                      onLoad={() => {
                        URL.revokeObjectURL(imageList[2] as string)
                      }}
                    />
                  </Camera>
                </AvatarWhenEdit>

                <AvatarWhenEdit>
                  <Camera>
                    <Image
                      src={imageList[3] ? imageList[3] : AddIcon}
                      width={imageList[3] ? 200 : 30}
                      height={imageList[3] ? 200 : 30}
                      alt="choose avatar"
                      onLoad={() => {
                        URL.revokeObjectURL(imageList[3] as string)
                      }}
                    />
                  </Camera>
                </AvatarWhenEdit>
              </Stack>
            </Stack>
          </Stack>

          <DatePickerYear name="expired_date" control={control} label={t('expired_date')} />

          <Stack spacing={2}>
            <Divider>
              <Typography>{t('detail_pharmaceutical')}</Typography>
            </Divider>

            <Input
              control={control}
              name="description"
              label={t('description') as string}
              fullWidth
              placeholder={t('enter_description') as string}
              multiline
              minRows={6}
            />

            <Input
              control={control}
              name="short_description"
              label={t('short_description') as string}
              fullWidth
              placeholder={t('enter_short_description') as string}
            />

            <Input
              control={control}
              name="ingredient"
              label={t('ingredient') as string}
              fullWidth
              placeholder={t('enter_ingredient') as string}
            />

            <Input
              control={control}
              name="how_to_use"
              label={t('how_to_use') as string}
              fullWidth
              placeholder={t('enter_how_to_use') as string}
            />
          </Stack>

          <Button variant="contained" type="submit">
            {isLoading && <CircularProgress size={18} sx={{ color: 'base.white', mr: 1 }} />}

            {t('create.submit')}
          </Button>
        </Stack>
      </BoxContainer>
    </Modal>
  )
}

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  boxShadow: theme.shadows[1],
  padding: 20,
  borderRadius: 2,
  background: theme.palette.base.white,
  maxHeight: '90%',
  overflow: 'auto',
}))

const ButtonClose = styled(Button)({
  minWidth: 0,
  paddingTop: 0,
  paddingBottom: 0,
  padding: 0,
})

const AvatarWhenEdit = styled(Box)({
  position: 'relative',
  width: 200,
  height: 200,
  cursor: 'pointer',
  border: '1px dashed ',
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

export { Create }
