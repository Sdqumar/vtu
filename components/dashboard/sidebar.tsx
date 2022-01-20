import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { nav } from "./utils"


const Sidebar = () => {
    const router = useRouter()
    const path = router.pathname.slice(1)

    return (
        <main className="w-64 ml-2 border-r h-[90vh] relative">

            <section className="flex bg-primary items-center justify-center w-60 rounded-lg mt-10 py-3 cursor-pointer 
            hover:bg-primary
            ">

                <Image src="/avatar.jpg" priority={true} width={40} height={40} className="rounded-full " />

                <div>
                    <h4 className="font-semibold text-lg text-white px-5">Sadeeq Umar</h4>
                    <span className="  text-yellow-200 px-5">₦1,500</span>
                </div>
            </section>

            <section className="my-6">
                {
                    nav.map(_item => {

                        const isActive = path === _item.label.split(" ")[0].toLocaleLowerCase()

                        return (
                            <Link
                                href={`/${_item.label.toLowerCase().split(" ")[0]}`}
                                passHref
                                key={_item.label}
                            >
                                <div className={`py-3 cursor-pointer flex items-center px-5 hover:bg-slate-100
                                ${isActive && " bg-gray-100 border-l-4 border-l-primary"}`} >

                                    <svg className={`h-6 w-6   text-primary ${!isActive && " text-gray-700"}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path d={_item.icon} />
                                    </svg>

                                    <h3 className={`font-medium text-primary ml-5 text-lg ${!isActive && "text-gray-700"}`}>
                                        <a>{_item.label}</a>

                                    </h3>
                                </div>
                            </Link>
                        )
                    })
                }
            </section>

            <section className="flex items-center ml-5 absolute bottom-1 cursor-pointer hover:text-red-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <h3 className="font-medium  text-lg ml-1 ">Log Out</h3>
            </section>

        </main>

    )
}

export default Sidebar