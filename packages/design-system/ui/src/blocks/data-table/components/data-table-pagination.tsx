"use client"

import * as React from "react"

import { Table } from "@/components/table"

import { useDataTableContext } from "../context/use-data-table-context"

interface DataTablePaginationProps {
  translations?: React.ComponentProps<typeof Table.Pagination>["translations"]
}

const DataTablePagination = ({ translations }: DataTablePaginationProps) => {
  const { instance } = useDataTableContext()

  return (
    <Table.Pagination
      translations={translations}
      className="flex-shrink-0"
      canNextPage={instance.getCanNextPage()}
      canPreviousPage={instance.getCanPreviousPage()}
      pageCount={instance.getPageCount()}
      count={instance.rowCount}
      nextPage={instance.nextPage}
      previousPage={instance.previousPage}
      pageIndex={instance.pageIndex}
      pageSize={instance.pageSize}
    />
  )
}

export { DataTablePagination }
export type { DataTablePaginationProps }
