export const uploadCloundinary = async (file: File | undefined) => {
  if (!file) return Promise.resolve('No file to upload')

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string)

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  return data
}
