import { Layout } from '@/libs/shared/Layout'
import { Product } from '@/libs/shared/components'
import { api } from '@/utils/api'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
// import { PayPalButton } from 'react-paypal-button-v2'

const Home = () => {
  const router = useRouter()

  const { data: productData } = api.product.getAll.useQuery()
  return (
    <Layout>
      {/* <PayPalButton
        amount="12000"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          console.log(data)

          // OPTIONAL: Call your server to save the transaction
          return fetch('/paypal-transaction-complete', {
            method: 'post',
            body: JSON.stringify({
              orderID: data.orderID,
            }),
          })
        }}
        onError={(err) => {
          alert('Transaction error')
        }}
      /> */}
      {productData?.map((item) => (
        <Product
          id={item.id}
          name={item.name}
          price={item.price}
          unitName={item?.unit?.name}
          image={item.image[0]?.url}
          key={item.id}
        />
      ))}
      <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
    </Layout>
  )
}

export { Home }
