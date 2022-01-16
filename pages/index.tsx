import type { NextPage } from 'next'
import Form from "../components/Home/form"

const Home: NextPage = () => {
  return (
    <div>

      <main className='flex  gap-20 justify-center items-center'>
        <div className='w-[30rem]'>
          <h1 className='text-6xl mb-4 font-semibold text-primary-900'>Welcome to VTU</h1>
          <h2 className=' font-medium text-lg text-gray-600'>The best VTU top up plateform to get your Data on any network available, Airtime,Pay bills & Airtime Swap</h2>
        </div>
        <Form />
      </main>
      <section className='flex mt-5 justify-center items-center'>
        <div className='flex  flex-col justify-center items-center'>
        <h2 className='text-3xl font-medium'>Pricing</h2>
        <h5 className='text-gray-500 font-medium'>Check our Pricing</h5>
        </div>
      </section>
    </div>

  )
}

export default Home
