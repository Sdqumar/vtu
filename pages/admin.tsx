import { collection, doc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "../components/context/userContext";
import { TransactionsTable } from "../components/global/TransactionsTable";
import { UserTable } from "../components/global/UsersTable";
import firebase from "../lib/firebaseConfig";

function Admin() {
  const userContext = useUser();
  const user = userContext?.user;
  const router = useRouter();
  const isAdmin = user?.isAdmin;
  useEffect(() => {
    if (user && !isAdmin) {
      router.push("/404");
    }
  }, [user]);

  const [value, loading] = useCollection(
    collection(getFirestore(firebase), "users")
  );
  const users = value?.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  let [transactionsVaule] = useCollection(
    collection(getFirestore(firebase), "transactions")
  );
  const transactions = transactionsVaule?.docs.map((doc) => {
    return { ...doc.data(), id: doc.id, date: doc.data().date };
  });
  return (
    !loading && (
      <div className="mt-20 ml-5">
        <section>
          <h1 className="text-4xl">Welcome {user?.name}</h1>
          <main>
            {transactions && (
              <TransactionsTable
                data={transactions?.sort((a, b) => b.date - a.date)!}
              />
            )}
            <UserTable data={users!} />
          </main>
        </section>
      </div>
    )
  );
}

export default Admin;
