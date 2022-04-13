import Image from "next/image";
import { prices } from "./utils";

export const PriceTable = () => {
  return (
    <div className="mt-5 flex w-full flex-wrap items-center justify-center">
      {prices.map((network, index) => {
        return (
          <section
            className="mx-3 mb-10 flex flex-col flex-wrap items-center justify-center rounded-lg bg-white p-10 shadow-xl"
            key={network.network}
          >
            <Image
              src={network.img}
              priority={true}
              height={80}
              width={85}
              alt={network.network}
            />
            <h5 className="mt-2 font-bold text-gray-800">{network.network}</h5>

            <table className="mt-5 w-52 ">
              {network.prices.map(
                (item, index) =>
                  index < 6 && (
                    <tbody key={index}>
                      <tr className="border-b-2">
                        <td className="py-3  font-medium">{item.size}</td>
                        <td className="py-3 font-medium">{item.price}</td>
                        <td className="py-3 font-medium ">{item.duration}</td>
                      </tr>
                    </tbody>
                  )
              )}
            </table>
          </section>
        );
      })}
    </div>
  );
};
