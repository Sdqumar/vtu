import type { NextPage } from 'next'
import AccountHistory from '../components/dashboard/AcountHistory'
import Services from '../components/dashboard/Services'


const Dashboard: NextPage = () => {
  return (
      <main className='max-w-[50rem] mx-auto '>
        <section className='text-3xl  mt-10  font-bold text-gray-800'>
          Hello, Sadeeq Umar
        </section>
        <AccountHistory />
        <Services />
      </main>
  )
}

export default Dashboard
