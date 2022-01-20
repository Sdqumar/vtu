import Image from "next/image"

const account = [
    {
        name: "Wallet Balance",
        amount: "1500",
        icon: 'dollarGreen'
    },
    {
        name: "TOTAL FUNDING",
        amount: "10000",
        icon: 'dollarBlue'
    },
    {
        name: "TOTAL SPENT",
        amount: "8500",
        icon: 'dollarRed'
    },
]


export default function AccountHistory() {
    return (
        <section className='mt-10 flex flex-col'>

            <div className=' flex flex-wrap '>
                {
                    account.map(item => (
                        <div className='flex py-5 justify-center  w-[23vw] items-center border-r border-t border-b last:border-r-0 '>
                            <Image src={`/${item.icon}.svg`} priority={true} width={40} height={40} className="fill-red-700 " />

                            <div className='ml-8'>
                                <h3 className='text-base uppercase  text-gray-500 font-medium'>{item.name}</h3>
                                <h5 className='text-2xl  text-gray-700 font-medium'>₦{item.amount}</h5>
                            </div>
                        </div>

                    ))
                }


            </div>

            <div className='py-3 my-4 mr-40  bg-gray-100 self-end rounded-lg w-fit 
          font-medium px-3 flex items-center cursor-pointer hover:bg-green-100'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary " viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                </svg>
                Add fund</div>
        </section>
    )
}

// <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor" ><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></svg>