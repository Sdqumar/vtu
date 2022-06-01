import React from "react";
import { DocumentData } from "firebase/firestore";
import { format } from "date-fns";
import { CustomTable } from "./CustomTable";

const TransactionsColumns = [
  {
    Header: "Name",
    accessor: (row: any) => (
      <span className="break-normal">
        {row.description?.toUpperCase().split("-")[0] || row.name}
      </span>
    ),
  },

  {
    Header: "TO",
    accessor: "to",
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
    Header: "New Bal",
    accessor: (row: any) => row?.newBalance?.toLocaleString("en-US"),
  },
  {
    Header: "Old Bal",
    accessor: (row: any) => row?.prevBalance?.toLocaleString("en-US"),
  },

  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Date",
    accessor: (row: { date: any }) =>
      format(row.date.toDate(), "EE, dd MMM hh:mm "),
  },
];
{
  /* eslint-disable react/jsx-key */
}
{
  /* the jsx key is provided in the .get*Props() spreads, but eslint doesn't believe you. I believe you. */
}

export const TransactionsTable = ({
  data: tableData,
}: {
  data: DocumentData[];
}) => <CustomTable COLUMNS={TransactionsColumns} data={tableData} />;
