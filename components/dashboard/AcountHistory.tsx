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
    <section className="mt-10 flex flex-col">
      <Link href='/fund'>

         <div
        className="py-3 my-4   bg-gray-100 self-end rounded-lg 
          font-medium px-3 flex items-center cursor-pointer hover:bg-green-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1 text-primary "
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

      <div className=" flex  flex-col md:flex-row gap-4 justify-center ">
        {account.map((item) => (
          <div
            className="flex h-[5rem] items-center px-2 justify-center  w-[90vw] md:max-w-[23vw]   border"
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
              <h3 className="text-base uppercase sm:text-sm  text-gray-500 font-medium">
                {item.name}
              </h3>
              <h5 className="text-2xl sm:text-sm  text-gray-700 font-medium">
                ₦{item.amount}
              </h5>
            </div>
          </div>
        ))}
      </div>

   
    </section>
  );
}


