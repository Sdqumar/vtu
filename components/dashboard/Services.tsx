
import Image from "next/image"


const services = [
    {
        name: 'Airtime TopUp',
        img: 'airtime'
    },
    {
        name: 'Buy Data',
        img: 'data'
    },

    {
        name: 'Cable Subscription',
        img: 'cable'
    },
    {
        name: 'Electricity Bills',
        img: 'utility'
    },
    {
        name: 'Education',
        img: 'education'
    },
    {
        name: 'Bonus to wallet',
        img: 'fund'
    },
    {
        name: 'My Referrals',
        img: 'referral'
    },
]



export default function Services() {
    return (
        <section className="flex flex-wrap mx-auto">
            {
                services.map(item => (
                    <div className="shadow-xl bg-white p-10 m-3 transition-all hover:shadow-2xl cursor-pointer hover:text-primary">
                        <Image src={`/${item.img}.png`} priority={true} width={120} height={100} />
                        <h4 className="font-medium text-center ">{item.name}</h4>
                    </div>
                ))
            }
        </section>
    )
}