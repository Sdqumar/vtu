import dynamic from "next/dynamic";
import { useUser } from "../components/context/userContext";

const AccountHistory = dynamic(
  () => import("../components/dashboard/AcountHistory")
);
const Services = dynamic(() => import("../components/dashboard/Services"));

const Dashboard = () => {
  const userContext = useUser();
  const user = userContext?.user!;

  return (
    user && (
      <main className="mx-auto max-w-3xl lg:mx-16 ">
        {user && (
          <section className="mt-14  text-center text-3xl font-bold capitalize text-gray-800 md:ml-0 md:text-left">
            Hello, {user?.name || user?.displayName}
          </section>
        )}
        <AccountHistory />
        <Services />
      </main>
    )
  );
};

export default Dashboard;
