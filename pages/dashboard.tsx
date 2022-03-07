import type { NextPage } from "next";
import { useUser } from "../components/context/userContext";
import AccountHistory from "../components/dashboard/AcountHistory";
import Services from "../components/dashboard/Services";

const Dashboard: NextPage = () => {
  const userContext = useUser();
  const user = userContext?.user;

  return (
    <main className="mx-auto w-full ">
      <section className="mt-14  text-center text-3xl font-bold capitalize text-gray-800 md:ml-0 md:text-left">
        Hello, {user?.name}
      </section>
      <AccountHistory />
      <Services />
    </main>
  );
};

export default Dashboard;
