import { useTable, useFilters, usePagination, Column } from "react-table";
import React, { useMemo, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { format } from "date-fns";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "./Button";
import { useRouter } from "next/router";
import { CustomTable } from "./CustomTable";

export const Refund = ({ uid, id }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const refund = async (uid: string, transactionId: string) => {
    setLoading(true);
    await axios({
      method: "post",
      url: "/api/refund",
      data: { uid, transactionId },
    });
    toast.success("Refund Successful!");
    setLoading(false);
    router.reload();
  };

  return (
    <Button
      loading={loading}
      label="Refund"
      disabled={loading}
      onClick={() => refund(uid, id)}
    />
  );
};
const COLUMNS = [
  {
    Header: "Name",
    accessor: (row: any) => row.description?.toUpperCase() || row.name,
  },
  {
    Header: "Date",
    accessor: (row: { date: any }) =>
      format(row.date.toDate(), "EE, dd MMM hh:mm "),
  },

  {
    Header: "TO",
    accessor: "to",
  },

  {
    Header: "Old Bal",
    accessor: (row: any) => row?.prevBalance?.toLocaleString("en-US"),
  },
  {
    Header: "New Bal",
    accessor: (row: any) => row?.newBalance?.toLocaleString("en-US"),
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: (row: { status: string }) => {
      if (row.status === "charge.success") {
        return "Funded";
      }
      return row.status;
    },
  },
  {
    Header: "Action",
    accessor: (row: { uid: string; id: string; status: string }) => {
      const { uid, id, status } = row;
      return status !== "Refunded" && <Refund uid={uid} id={id} />;
    },
  },
];
{
  /* eslint-disable react/jsx-key */
}
{
  /* the jsx key is provided in the .get*Props() spreads, but eslint doesn't believe you. I believe you. */
}

export const AdminTransactionTable = ({
  data: tableData,
}: {
  data: DocumentData[];
}) => <CustomTable COLUMNS={COLUMNS} data={tableData} />;
