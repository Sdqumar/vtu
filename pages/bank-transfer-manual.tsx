import type { NextPage } from "next";

const BankTransfer: NextPage = () => {
  return (
    <div className="my-14 mx-10 h-fit max-w-[20rem] rounded-xl border py-5 px-5">
      <h3 className="mb-2 text-xl font-bold text-gray-600">Fund with Bank</h3>
      <main>
        <h4 className="my-4 text-xl font-medium">
          Always transfer to the account number below. It will reflect
          automatically and instantly
        </h4>
        <section className="my-4 block rounded-md border p-8 text-2xl font-medium">
          First bank 7609161350
        </section>
        <h6 className="text-md font-medium">
          Charges = 1 % of the amount you transfer
        </h6>
      </main>
    </div>
  );
};

export default BankTransfer;
