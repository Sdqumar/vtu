import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className='container mx-auto bg-gray-50'> <Component {...pageProps} /> 
  </div>
}

export default MyApp
