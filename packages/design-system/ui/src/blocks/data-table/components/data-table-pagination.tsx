"use client"

import * as React from "react"

import { Table } from "@/components/table"

import { useDataTableContext } from "../context/use-data-table-context"

const DataTablePagination = () => {
  const { instance } = useDataTableContext()

  return (
    <Table.Pagination
      canNextPage={instance.getCanNextPage()}
      canPreviousPage={instance.getCanPreviousPage()}
      pageCount={instance.getPageCount()}
      count={instance.count}
      nextPage={instance.nextPage}
      previousPage={instance.previousPage}
      pageIndex={instance.pageIndex}
      pageSize={instance.pageSize}
    />
  )
}

export { DataTablePagination }
