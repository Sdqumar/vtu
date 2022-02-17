import type { NextPage } from 'next'
import Form from "../components/Home/form"
import { PriceTable } from '../components/Home/PriceTable'

const Home: NextPage = () => {
  return (
    <div className='m-auto'>
      <main className='flex flex-wrap gap-16 mx-5  justify-center items-center'>
        <div className='w-[30rem] text-center'>
          <h1 className='text-6xl mb-4 font-semibold text-primary'>Welcome to VTU</h1>
          <h2 className=' font-medium text-lg text-gray-600'>The best VTU top up plateform to get your Data on any network available, Airtime,Pay bills & Airtime Swap</h2>
        </div>
        <Form />
      </main>

      <section className='flex mt-5 flex-col justify-center items-center'>
        <h2 className='text-3xl font-medium text-gray-800'>Pricing</h2>
        <h5 className='text-gray-500 font-medium'>Check our Pricing</h5>
      </section>

      <section>
        <PriceTable />
      </section>
    </div>

  )
}

export default Home
