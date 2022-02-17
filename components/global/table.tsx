import { useTable, useFilters, usePagination, Column } from "react-table";
import React, { useMemo } from "react";
type data = {
  name: string;
  date: string;
  amount: string;
  number: string;
  status: string;
}[];
const tableData: data = [
  {
    name: "Wallet Fund",
    date: "Thu Dec 23 2021 , 22:43:51",
    number: "08143104693",
    amount: "500",
    status: "Delivered",
  },
  {
    name: "Wallet Fund",
    date: "Thu Dec 23 2021 , 22:43:51",
    number: "08143104693",
    amount: "500",
    status: "Delivered",
  },
  {
    name: "Wallet Fund",
    date: "Thu Dec 23 2021 , 22:43:51",
    number: "08143104693",
    amount: "500",
    status: "Delivered",
  },
  {
    name: "Wallet Fund",
    date: "Thu Dec 23 2021 , 22:43:51",
    number: "08143104693",
    amount: "500",
    status: "Delivered",
  },
];

const COLUMNS: Column<{
  name: string;
  date: string;
  amount: string;
  number: string;
  status: string;
}>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Date",
    accessor: "date",
  },

  {
    Header: "Number",
    accessor: "number",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

export const Table = () => {
  // const columns = useMemo(() => COLUMNS, []);
  const columns = React.useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
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
      columns,
      data,
    },
    useFilters,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <div className="mx-10   w-full ">
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
      <table className="my-4 shadow-lg rounded-md" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="py-4" {...column.getHeaderProps()}>
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
                    <td className="px-10 py-8" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-center items-center ">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className="w-24 mx-2"
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
