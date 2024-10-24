import {
  getCoreRowModel,
  OnChangeFn,
  Row,
  RowSelectionState,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table"

interface DataTableOptions<TData>
  extends Pick<TableOptions<TData>, "data" | "columns" | "getRowId"> {
  rowSelection?: {
    state: RowSelectionState
    onRowSelectionChange: OnChangeFn<RowSelectionState>
  }
  onClickRow?: (row: Row<TData>) => void
  count?: number
}

interface UseDataTableReturn<TData>
  extends Pick<
    ReturnType<typeof useReactTable<TData>>,
    | "getHeaderGroups"
    | "getRowModel"
    | "getCanNextPage"
    | "getCanPreviousPage"
    | "nextPage"
    | "previousPage"
    | "getPageCount"
    | "getAllColumns"
  > {
  count: number
  pageIndex: number
  pageSize: number
}

const useDataTable = <TData,>({
  count = 0,
  rowSelection,
  ...options
}: DataTableOptions<TData>): UseDataTableReturn<TData> => {
  const instance = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: rowSelection?.state,
    },
    onRowSelectionChange: rowSelection?.onRowSelectionChange,
    // All data manipulation should be handled manually, likely by a server.
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
  })

  return {
    // Table
    getHeaderGroups: instance.getHeaderGroups,
    getRowModel: instance.getRowModel,
    getAllColumns: instance.getAllColumns,
    // Pagination
    getCanNextPage: instance.getCanNextPage,
    getCanPreviousPage: instance.getCanPreviousPage,
    nextPage: instance.nextPage,
    previousPage: instance.previousPage,
    getPageCount: instance.getPageCount,
    pageIndex: instance.getState().pagination.pageIndex,
    pageSize: instance.getState().pagination.pageSize,
    count,
  }
}

export { useDataTable }
export type { DataTableOptions, UseDataTableReturn }
