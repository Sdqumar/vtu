import type { NextPage } from "next";
import Form from "../components/Home/form";
import { PriceTable } from "../components/Home/PriceTable";

const Home: NextPage = () => {
  return (
    <div className="mx-auto font-semibold bg-gradient-to-r from-green-400 to-primary w-full">
      <main className="flex flex-wrap gap-16 mx-5 justify-center md:justify-between min-h-[24rem] mt-10 md:mt-24 items-start " >
        <div className="mx-auto">
          <h1 className="text-6xl mb-4 font-bold text-white">Buy Data.</h1>
          <h1 className="text-6xl mb-4 font-bold  text-white">Buy Airtime.</h1>
          <h1 className="text-6xl mb-4 font-bold  text-white">PayBills.</h1>
          <h1 className="text-5xl mb-4 font-normal text-white">Securely.</h1>
        </div>
        <Form />
      </main>

      <section className="flex mt-5 flex-col justify-center items-center">
        <h2 className="text-3xl font-medium text-gray-800">Pricing</h2>
        <h5 className="text-white font-medium">Check our Pricing</h5>
      </section>

        <PriceTable />
    </div>
  );
};

export default Home;
