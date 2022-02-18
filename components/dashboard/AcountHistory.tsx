import Image from "next/image";
import Link from "next/link";

const account = [
  {
    name: "Wallet Balance",
    amount: "1500",
    icon: "dollarGreen",
  },
  {
    name: "TOTAL FUNDING",
    amount: "10000",
    icon: "dollarBlue",
  },
  {
    name: "TOTAL SPENT",
    amount: "8500",
    icon: "dollarRed",
  },
];

export default function AccountHistory() {
  return (
    <section className="mx-10 mt-5 flex flex-col md:mx-0 ">
      <Link href="/fund" passHref>
        <div
          className="my-4 flex   cursor-pointer items-center self-end 
          rounded-lg bg-gray-100 py-3 px-3 font-medium hover:bg-green-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary mr-1 h-5 w-5 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path
              fillRule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
          </svg>
          Add fund
        </div>
      </Link>

      <div className=" flex  flex-col justify-center gap-4 md:flex-row ">
        {account.map((item) => (
          <div
            className="flex h-[5rem] w-[90vw] items-center justify-center  border px-2   md:max-w-[23vw]"
            key={item.name}
          >
            <Image
              src={`/${item.icon}.svg`}
              priority={true}
              width={40}
              height={40}
              className="fill-red-700"
              alt={item.name}
            />

            <div className="ml-8">
              <h3 className="text-base font-medium uppercase  text-gray-500 sm:text-sm">
                {item.name}
              </h3>
              <h5 className="text-2xl font-medium  text-gray-700 sm:text-sm">
                ₦{item.amount}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
