import type { NextPage } from 'next'
import Sidebar from '../components/dashboard/sidebar'
import Form from "../components/Home/form"
import { PriceTable } from '../components/Home/PriceTable'

const Dashboard: NextPage = () => {
  return (
    <div>
        <Sidebar/>

     <section className='text-3xl font-semibold text-gray-800'>
         <span className='text-primary-700'>Hi,</span> Sadeeq
         </section>
    </div>

  )
}

export default Dashboard
