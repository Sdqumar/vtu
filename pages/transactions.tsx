import type { NextPage } from "next";
import { useUser } from "../components/context/userContext";
import { Table } from "../components/global/table";
import { getFirestore, collection, where, query } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import firebase from "../lib/firebaseConfig";

const Transactions: NextPage = () => {
  const userContext = useUser();
  const user = userContext?.user!;
  const db = getFirestore(firebase);
  const q = query(
    collection(db, "transactions"),
    where("uid", "==", user?.uid)
  );

  const [value, loading] = useCollectionOnce(q);
  const data = value?.docs.map((doc) => doc.data());
  return (
    <div className="">
      <h3 className="my-10 mx-10 text-3xl font-medium">Transactions</h3>

      <main>
        {!loading && data?.length! > 0 && (
          <Table data={data?.sort((a, b) => b.date - a.date)!} />
        )}
      </main>
    </div>
  );
};

export default Transactions;
