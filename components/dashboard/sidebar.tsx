import Image from "next/image"

const nav = [
    {
        icon: '',
        label: 'Dashboard'
    },
    {
        icon: '',
        label: 'Fund Wallet'
    },
    {
        icon: '',
        label: 'Transactions'
    },
    {
        icon: '',
        label: 'Agent'
    },
    {
        icon: '',
        label: 'Referrel'
    },
]

const Sidebar = () => {
    return (
        <main className="w-64 ml-2 border-r">

            <section className="flex bg-primary-700 items-center justify-center w-60 rounded-lg mt-10 py-3 cursor-pointer 
            hover:bg-primary-600
            ">

                <Image src="/avatar.jpg" priority={true} width={40} height={40} className="rounded-full " />

                <h4 className="font-semibold text-lg text-white px-5">Sadeeq Umar</h4>
            </section>

            <section className="my-5">
                {
                    nav.map(item => (
                        <div className="py-2 cursor-pointer flex items-center mx-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            <h3 className="font-medium text-gray-700 text-lg">{item.label}</h3>
                        </div>
                    ))
                }
            </section>

        </main>

    )
}

export default Sidebar