import React from "react";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { CustomTable } from "./CustomTable";

const usersColumns = [
  {
    Header: "Name",
    accessor: (row: any) => (
      <Link href={`user/${row.id}?name=${row.name}`}>
        <a className="cursor-pointer capitalize  text-blue-600">{row.name}</a>
      </Link>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Balance",
    accessor: "walletBalance",
  },
  {
    Header: "User ID",
    accessor: "id",
  },
];
{
  /* eslint-disable react/jsx-key */
}
{
  /* the jsx key is provided in the .get*Props() spreads, but eslint doesn't believe you. I believe you. */
}

export const UserTable = ({ data: tableData }: { data: DocumentData[] }) => (
  <CustomTable COLUMNS={usersColumns} data={tableData} />
);
