import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "../components/context/userContext";
import { TransactionsTable } from "../components/global/TransactionsTable";
import { UserTable } from "../components/global/UsersTable";
import firebase from "../lib/firebaseConfig";
const networks = ["MTN SME", "MTN GIFTING", "AIRTEL", "GLO", "9MOBILE"];
import toast, { Toaster } from "react-hot-toast";
import { getDataNetwork } from "../components/global/utils";

function Admin() {
  const userContext = useUser();
  const user = userContext?.user!;
  const setUser = userContext?.setUser!;

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

  const handleChange = async (network: string) => {
    const available = user?.DataNetworks?.includes(network);

    try {
      const ref = doc(getFirestore(firebase), "networkData", "networks");
      if (available) {
        await updateDoc(ref, {
          networks: arrayRemove(network),
        });
      } else {
        await updateDoc(ref, {
          networks: arrayUnion(network),
        });
      }
      getDataNetwork(user, setUser);
    } catch {
      toast.error("Error!");
    }
  };
  useEffect(() => {
    if (!user?.DataNetworks) getDataNetwork(user, setUser);
  }, []);

  return (
    !loading && (
      <div className="mt-20 ml-5">
        <section>
          <Toaster />

          <h1 className="text-4xl">Welcome {user?.name}</h1>
          <main>
            <div className="m-8">
              <h2 className="mb-4 text-2xl">Data Networks</h2>
              <FormGroup>
                {user.DataNetworks &&
                  networks.map((item) => {
                    return (
                      <FormControlLabel
                        key={item}
                        checked={user!.DataNetworks!.includes(item)}
                        onChange={() => handleChange(item)}
                        control={<Switch defaultChecked />}
                        label={item}
                      />
                    );
                  })}
              </FormGroup>
            </div>
            {transactions && (
              <TransactionsTable
                data={transactions?.sort((a, b) => b.date - a.date)!}
              />
            )}
            {users && <UserTable data={users!} />}
          </main>
        </section>
      </div>
    )
  );
}

export default Admin;
