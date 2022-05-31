import { useTable, useFilters, usePagination, Column } from "react-table";
import React, { useMemo } from "react";
import { DocumentData } from "firebase/firestore";
import { format } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const COLUMNS = [
  {
    Header: "Name",
    accessor: (row: any) => (
      <span className="break-normal">
        {row.description?.toUpperCase().split("-")[0]}
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

export const TableCustom = ({ data: tableData }: { data: DocumentData[] }) => {
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
    <div className="mb-8  overflow-auto md:mx-10">
      <select
        className="ml-5 w-32"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 20, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <Table {...getTableProps()} className="my-4 rounded-md shadow-lg">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <td
                  {...column.getHeaderProps()}
                  className="bg-primary w-fit py-4 pl-2 text-center text-sm text-white"
                >
                  {column.render("Header")}
                </td>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow className="border-y" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className=" whitespace-nowrap break-normal py-4 px-2 text-center text-sm "
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

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
