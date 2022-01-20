import type { NextPage } from 'next'
import Sidebar from '../components/dashboard/sidebar'

const Fund: NextPage = () => {
    return (
        <div className='flex'>
            <Sidebar />


            <section className='text-3xl m-10 font-semibold text-gray-800'>
                Fund Wallet
            </section>

        </div>

    )
}

export default Fund
