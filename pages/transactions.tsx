import type { NextPage } from 'next'
import { Table } from '../components/global/table'

const Transactions: NextPage = () => {
    return (
        <div className=''>
                <h3 className='my-10 mx-10 text-3xl font-medium'>Transactions</h3>
                
                <main>
                    <Table/>
                </main>
        </div>

    )
}

export default Transactions
