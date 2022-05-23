import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import firebase from "../../lib/firebaseConfig";

export default function AccountHistory() {
  const userContext = useUser();
  const user = userContext?.user!;
  const setUser = userContext!.setUser;

  const [value, loading] = useDocument(
    doc(getFirestore(firebase), "users", user.uid)
  );

  useEffect(() => {
    (async () => {
      if (!loading) {
        // @ts-ignore
        const { walletBalance, totalFunded, totalSpent } = value?.data();
        // @ts-ignore
        setUser({ ...user, walletBalance, totalFunded, totalSpent });
      }
    })();
  }, [value]);

  const account = [
    {
      name: "Wallet Balance",
      amount: ("₦" + user?.walletBalance && user?.walletBalance) || 0,
      icon: "dollarGreen",
    },
    {
      name: "TOTAL earnings",
      amount: user?.earnings || 0,
      icon: "dollarBlue",
    },
    {
      name: "TOTAL Refers",
      amount: user?.refers || 0,
      icon: "refers",
    },
  ];

  return (
    <section className="mx-10 mt-5 flex flex-col md:mx-0 ">
      <div className="flex justify-between ">
        <Link href="/admin" passHref>
          <div
            className={`my-4 flex   cursor-pointer items-center self-end 
          rounded-lg bg-gray-100 py-3 px-3 font-medium hover:bg-green-100 ${
            !user.isAdmin && "opacity-0"
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary mr-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Admin
          </div>
        </Link>
        <Link href="/fund" passHref>
          <div
            className=" my-4 flex  cursor-pointer items-center self-end 
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
      </div>

      <div className=" flex  flex-col justify-center gap-4 md:flex-row ">
        {account.map((item) => (
          <div
            className="flex h-[5rem] w-[80vw] items-center justify-center  border px-2   md:max-w-[23vw]"
            key={item.name}
          >
            <Image
              src={`/${item.icon}.svg`}
              priority={true}
              width={35}
              height={40}
              className="fill-red-700"
              alt={item.name}
            />

            <div className="ml-8">
              <h3 className="text-base font-medium uppercase  text-gray-500 sm:text-sm">
                {item.name}
              </h3>
              <h5 className="text-center text-2xl font-medium text-gray-700 sm:text-sm">
                {item.amount.toLocaleString("en-US")}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
