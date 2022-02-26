import type { NextPage } from "next";
import { useUser } from "../components/context/userContext";

const BankTransfer: NextPage = () => {
  const userContext = useUser();
  const user = userContext?.user;
  return (
    <div className="mx-4 mt-24 h-fit max-w-[23rem] rounded-xl border py-5 px-5">
      <h3 className="mb-2 text-xl font-bold text-gray-600">Fund with Bank</h3>
      <main>
        <h4 className="my-4 text-xl font-medium">
          Always transfer to the account number below. It will reflect
          automatically and instantly
        </h4>
        <section className="my-4 block rounded-md border p-8 text-2xl font-medium">
          Wema bank {user?.accountNumber}
        </section>
        <h6 className="text-md font-medium">
          Charges = 1 % of the amount you transfer
        </h6>
      </main>
    </div>
  );
};

export default BankTransfer;
