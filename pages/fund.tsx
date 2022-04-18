import type { NextPage } from "next";
import Link from "next/link";

const items = [
  // {
  //   name: "ATM Card",
  //   bg: "bg-green-400",
  //   svg: "M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z",
  // },
  {
    name: "ATM Funding",
    bg: "bg-green-400",
    svg: "M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z",
    viewBox: "0 0 24 24",
  },
  {
    name: "Automated Bank Funding",
    bg: "bg-green-400",
    svg: "M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z",
    viewBox: "0 0 24 24",
  },
  {
    name: "USSD",
    bg: "bg-green-400",
    svg: "M8.072 12.442a.5.5 0 1 0 .99.145L9.148 12h1.24l-.066.442a.5.5 0 1 0 .99.145l.086-.587H12a.5.5 0 0 0 0-1h-.456l.22-1.5h.736a.5.5 0 0 0 0-1h-.59l.137-.93a.5.5 0 0 0-.99-.145L10.9 8.5H9.66l.137-.93a.5.5 0 0 0-.99-.145L8.65 8.5H8a.5.5 0 0 0 0 1h.503l-.22 1.5H7.5a.5.5 0 1 0 0 1h.637l-.065.442zM10.753 9.5l-.22 1.5H9.295l.22-1.5h1.24zM6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
  },
];

const Fund: NextPage = () => {
  return (
    <div className="my-14 mx-10 h-fit max-w-[30rem] rounded-xl border py-10 px-2">
      <h3 className="mx-4 mb-4 text-xl font-medium text-gray-600">
        Fund Wallet
      </h3>

      <section className="flex flex-wrap">
        {items.map((item) => (
          <Link
            href={item.name.replace(/ /g, "-").toLowerCase()}
            passHref
            key={item.name.replace(" ", "_")}
          >
            <a>
              <div className="text-md  m-4  flex w-48 cursor-pointer items-center rounded-md p-3 font-medium text-gray-400 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-15 bg-primary mr-2 h-12 rounded-md p-1 text-white "
                  viewBox={item?.viewBox || "0 0 20 20"}
                  fill="currentColor"
                >
                  <path d={item.svg} />
                </svg>
                <h2 className="w-[7rem]">{item.name}</h2>
              </div>
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Fund;
