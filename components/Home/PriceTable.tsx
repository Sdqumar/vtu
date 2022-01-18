import Image from "next/image"
import { prices } from "./utils"


export const PriceTable = () => {
    return (
        <div className="flex flex-wrap w-full justify-center items-center mt-5 mx-3">
            {
                prices.map(network => {
                    return(
                    <section className="flex mx-3 mb-10 flex-wrap justify-center items-center flex-col shadow-xl p-10 rounded-lg bg-white" key={network.network}>

                        <Image src={network.img } priority={true} height={80} width={85} />
                        <h5 className="text-gray-800 mt-2 font-bold">{network.network}</h5>

                        <table className="mt-5 w-52 ">
                            {network.prices.map((item,index)=>(
                              <tbody key={index}>
                              <tr className="border-b-2" >
                                    <td className="py-3  font-medium">{item.size}</td>
                                    <td className="py-3 font-medium">{item.price}</td>
                                    <td className="py-3 font-medium ">{item.duration}</td>
                                </tr>
                              </tbody>
                            ))}
                        </table>
                    </section>)
                })
            }

        </div>
    )
}