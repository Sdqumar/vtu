import type { NextPage } from 'next'
import AccountHistory from '../components/dashboard/AcountHistory'
import Services from '../components/dashboard/Services'
import Sidebar from '../components/dashboard/sidebar'


const Dashboard: NextPage = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='md:ml-10  maxW-[10rem]'>

        <section className='text-3xl  ml-14 mt-3  font-bold text-gray-800'>
          Hello, Sadeeq Umar
        </section>
        <AccountHistory />
        <Services />
      </main>

    </div>

  )
}

export default Dashboard
