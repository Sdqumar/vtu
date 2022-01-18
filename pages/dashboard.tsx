import type { NextPage } from 'next'
import Sidebar from '../components/dashboard/sidebar'

const Dashboard: NextPage = () => {
  return (
    <div className='flex'>
      <Sidebar />

      {/* <section className='text-3xl font-semibold text-gray-800'>
        <span className='text-primary'>Hi,</span> Sadeeq
      </section> */}

    </div>

  )
}

export default Dashboard
