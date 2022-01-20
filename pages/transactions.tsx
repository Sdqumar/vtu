import type { NextPage } from 'next'
import Sidebar from '../components/dashboard/sidebar'

const Transactions: NextPage = () => {
    return (
        <div className='flex'>
            <Sidebar />

            <section className='text-3xl m-10 font-semibold text-gray-800'>
                Transactions
            </section>
        </div>

    )
}

export default Transactions
