import type { NextPage } from "next";
import AccountHistory from "../components/dashboard/AcountHistory";
import Services from "../components/dashboard/Services";

const Dashboard: NextPage = () => {
  return (
    <main className="mx-auto max-w-[50rem] ">
      <section className="mt-14  text-center text-3xl font-bold text-gray-800 md:ml-0 md:text-left">
        Hello, Sadeeq Umar
      </section>
      <AccountHistory />
      <Services />
    </main>
  );
};

export default Dashboard;
