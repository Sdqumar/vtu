import type { NextPage } from 'next'
import Sidebar from '../components/dashboard/sidebar'

const Refferal: NextPage = () => {
    return (
        <div className='flex'>
            <Sidebar />

            <section className='text-3xl m-10 font-semibold text-gray-800'>
                Refferal
            </section>


        </div>

    )
}

export default Refferal
