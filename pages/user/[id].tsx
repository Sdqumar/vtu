import { collection, getFirestore, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "../../components/context/userContext";
import firebase from "../../lib/firebaseConfig";
import { Table } from "../../components/global/Table";
import { AdminTransactionTable } from "../../components/global/AdminTransactionTable";

function Admin() {
  const userContext = useUser();
  const user = userContext?.user;
  const router = useRouter();
  const id = router.query.id as string;
  const name = router.query.name as string;

  const isAdmin = user?.isAdmin;
  useEffect(() => {
    if (user && !isAdmin) {
      router.push("/404");
    }
  }, [user]);
  const db = getFirestore(firebase);
  const q = query(collection(db, "transactions"), where("uid", "==", id));

  const [value, loading] = useCollection(q);
  const data = value?.docs.map((doc) => {
    return { ...doc.data(), date: doc.data().date, id: doc.id };
  });

  return (
    !loading && (
      <div className="mt-20 ml-5">
        <section>
          <h1 className="mb-4 text-4xl"> {name} Transactions</h1>
          {!loading && data?.length! > 0 && (
            <AdminTransactionTable
              data={data?.sort((a, b) => b.date - a.date)!}
            />
          )}
        </section>
      </div>
    )
  );
}

export default Admin;
