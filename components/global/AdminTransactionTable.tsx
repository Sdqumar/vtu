import { useTable, useFilters, usePagination, Column } from "react-table";
import React, { useMemo, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { format } from "date-fns";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "./Button";
import { useRouter } from "next/router";

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
    accessor: (row: any) => row.description?.toUpperCase(),
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
    Header: "Reference",
    accessor: "request_id",
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
}) => {
  const columns = React.useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useFilters,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <div className="mx-10  mb-8  w-full">
      <Toaster />

      <select
        className="w-32"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <table className="my-4 rounded-md shadow-lg" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className=" pl-2" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className="border-y" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="w-20 py-4 pl-2 text-center text-sm "
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-center ">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className="mx-2 w-24"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className="w-24"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};
