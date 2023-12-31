import Layout from '@/components/Layout'
import { CarritoProvider } from '@/context/CarritoContext'
import { ProductosContext, ProductosProvider } from '@/context/ProductosContext'
import { UserProvider } from '@/context/UserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (  
    <>
    <CarritoProvider>
      <ProductosProvider>
        <UserProvider>
          <Layout>
           <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ProductosProvider>
    </CarritoProvider>



    </>
  )

}
