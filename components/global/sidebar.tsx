import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { signout } from "../../utils/auth";
import { useUser } from "../context/userContext";
import listenForOutsideClicks from "./clickOutside";

const nav = [
  {
    icon: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z",
    label: "Dashboard",
  },
  {
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    label: "Account",
  },
  {
    icon: "M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z",
    label: "Fund Wallet",
  },
  {
    icon: "M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z",
    label: "Transactions",
  },
  {
    icon: "M16.997 7.002a5 5 0 0 0-9.025-2.967A.75.75 0 0 0 7.748 4H5.25a.75.75 0 0 0-.75.75v5.498A2.75 2.75 0 0 0 7.25 13h.25v-.004h.01a.998.998 0 1 0-.786-1.611A1.25 1.25 0 0 1 6 10.249V10h.748c.38 0 .733-.122 1.02-.328a5 5 0 0 0 9.229-2.67zm-10-.106a5.114 5.114 0 0 0 0 .212v1.141a.25.25 0 0 1-.25.25H6V5.501h.998v1.395zM20 16.246a2.249 2.249 0 0 0-2.25-2.249H6.25A2.249 2.249 0 0 0 4 16.247v.92c0 .571.178 1.129.51 1.595c1.543 2.164 4.065 3.236 7.486 3.236c3.42 0 5.945-1.071 7.49-3.235A2.75 2.75 0 0 0 20 17.166v-.919z",
    label: "Agent",
  },
  {
    icon: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z",
    label: "Referral",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const path = router.pathname.slice(1);

  const isHome = router.pathname === "/";
  const userContext = useUser();
  const user = userContext?.user;
  const handleSignOut = async () => {
    await signout();

    setTimeout(() => {
      userContext?.setUser(null);
      router.push("/");
    }, 1000);
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );

  if (isHome) {
    return null;
  }
  return (
    <div
      className={`fixed z-20 mr-4 h-full ${
        isOpen && "bg-white"
      } transition-all md:relative`}
      ref={menuRef}
    >
      <div className=" cursor-pointer">
        <svg
          className=" m-3 h-8 w-8 md:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={toggle}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>

      <main
        className={` ml-2 block h-[90vh] w-64 border-r md:block ${
          isOpen ? "block " : "hidden  "
        }  `}
      >
        <Link href="/dashboard" passHref>
          <a>
            <section
              className="bg-primary hover:bg-primary mt-10 flex w-60 cursor-pointer items-center justify-center rounded-lg 
            py-3
            "
            >
              <Image
                src="/avatar.jpg"
                priority={true}
                width={40}
                height={40}
                className="rounded-full"
                alt="avatar"
              />

              <div>
                <h4 className="px-5 text-lg font-semibold capitalize text-white">
                  {user?.displayName}
                </h4>
                {user?.walletBalance! > 0 && (
                  <span className="px-5 text-yellow-200">
                    ₦ {user?.walletBalance || ""}
                  </span>
                )}
              </div>
            </section>
          </a>
        </Link>
        <section className="my-6">
          {nav.map((_item) => {
            const isActive =
              path === _item.label.split(" ")[0].toLocaleLowerCase();

            return (
              <Link
                href={`/${_item.label.toLowerCase().split(" ")[0]}`}
                passHref
                key={_item.label}
              >
                <div
                  className={`flex cursor-pointer items-center py-3 px-5 hover:bg-slate-100${
                    isActive && " border-l-primary border-l-4 bg-gray-100"
                  }`}
                >
                  <svg
                    className={`text-primary h-6   w-6 ${
                      !isActive && " text-gray-700"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d={_item.icon} />
                  </svg>

                  <h3
                    className={`text-primary ml-5 text-lg font-medium ${
                      !isActive && "text-gray-700"
                    }`}
                  >
                    <a>{_item.label}</a>
                  </h3>
                </div>
              </Link>
            );
          })}
        </section>

        <button
          className="absolute bottom-14 ml-5 flex w-fit cursor-pointer items-center bg-transparent text-gray-700 hover:text-red-600
        "
          onClick={handleSignOut}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <h3 className="ml-1 text-lg font-medium ">Log Out</h3>
        </button>
      </main>
    </div>
  );
};

export default Sidebar;
