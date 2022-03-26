import type { NextPage } from "next";
import { useQuery } from "react-query";
import { useUser } from "../components/context/userContext";
import { Table } from "../components/global/table";
import { getTransactions } from "../utils/transactions";

const Transactions: NextPage = () => {
  const userContext = useUser();
  const user = userContext?.user!;
  const { data, isLoading, isRefetching } = useQuery(
    "transactions",
    () => getTransactions(user.uid!),
    {
      staleTime: Infinity,
      refetchOnMount: "always",
    }
  );

  return (
    <div className="">
      <h3 className="my-10 mx-10 text-3xl font-medium">Transactions</h3>

      <main>{!isLoading && data?.length! > 0 && <Table data={data!} />}</main>
    </div>
  );
};

export default Transactions;
