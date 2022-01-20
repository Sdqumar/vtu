import type { NextPage } from 'next'
import Sidebar from '../components/dashboard/sidebar'

const Account: NextPage = () => {
    return (
        <div className='flex'>
            <Sidebar />


            <section className='text-3xl m-10 font-semibold text-gray-800'>
                Account
            </section>

        </div>

    )
}

export default Account
