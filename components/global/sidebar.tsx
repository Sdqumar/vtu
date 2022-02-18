import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { nav } from "./utils";

const Sidebar = () => {
  const router = useRouter();
  const path = router.pathname.slice(1);
  const [showNav, setShowNav] = useState(false);
  const isHome = router.pathname === "/";

  const handleClick = () => {
    showNav ? setShowNav(false) : setShowNav(true);
  };
  if (isHome) {
    return null;
  }
  return (
    <div
      className={`${
        showNav && "bg-white"
      }  fixed z-10 mr-4 transition-all md:relative`}
    >
      <div className="cursor-pointer ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="m-3 h-8 w-8 md:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleClick}
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
        className={`w-64  ${
          showNav ? "block" : "hidden"
        }  ml-2 h-[90vh] border-r md:block  `}
      >
        <Link href="/dashboard" passHref>
          <a>
            <section
              className="mt-10 flex w-60 cursor-pointer items-center justify-center rounded-lg bg-primary py-3 
            hover:bg-primary
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
                <h4 className="px-5 text-lg font-semibold text-white">
                  Sadeeq Umar
                </h4>
                <span className="px-5 text-yellow-200">₦1,500</span>
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
                  className={`flex cursor-pointer items-center py-3 px-5 hover:bg-slate-100
                                ${
                                  isActive &&
                                  " border-l-4 border-l-primary bg-gray-100"
                                }`}
                >
                  <svg
                    className={`h-6 w-6   text-primary ${
                      !isActive && " text-gray-700"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d={_item.icon} />
                  </svg>

                  <h3
                    className={`ml-5 text-lg font-medium text-primary ${
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

        <section className="absolute bottom-1 ml-5 flex cursor-pointer items-center hover:text-red-600">
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
          <h3 className="ml-1  text-lg font-medium ">Log Out</h3>
        </section>
      </main>
    </div>
  );
};

export default Sidebar;
