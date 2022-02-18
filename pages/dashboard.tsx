import type { NextPage } from "next";
import AccountHistory from "../components/dashboard/AcountHistory";
import Services from "../components/dashboard/Services";

const Dashboard: NextPage = () => {
  return (
    <main className="mx-auto max-w-[50rem] ">
      <section className="mt-10  text-3xl  font-bold text-gray-800">
        Hello, Sadeeq Umar
      </section>
      <AccountHistory />
      <Services />
    </main>
  );
};

export default Dashboard;
