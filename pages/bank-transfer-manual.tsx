import type { NextPage } from "next";

const BankTransfer: NextPage = () => {
  return (
    <div className="border rounded-xl h-fit py-5 max-w-[20rem] my-14 mx-10 px-5">
      <h3 className="text-xl mb-2 font-bold text-gray-600">
        Fund with Bank
      </h3>
      <main>
        <h4 className="font-medium my-4 text-xl">
          Always transfer to the account number below. It will reflect
          automatically and instantly
        </h4>
        <section className="block p-8 rounded-md border font-medium my-4 text-2xl">First bank 7609161350</section>
        <h6 className="text-md font-medium">Charges = 1 % of the amount you transfer</h6>
      </main>
    </div>
  );
};

export default BankTransfer;
