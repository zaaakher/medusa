import {
  type ColumnSort,
  getCoreRowModel,
  type Row,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type Updater,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

interface DataTableOptions<TData>
  extends Pick<TableOptions<TData>, "data" | "columns" | "getRowId"> {
  rowSelection?: {
    state: RowSelectionState
    onRowSelectionChange: (state: RowSelectionState) => void
  }
  sorting?: {
    state: ColumnSort | null
    onSortingChange: (state: ColumnSort) => void
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
  sorting,
  ...options
}: DataTableOptions<TData>): UseDataTableReturn<TData> => {
  const sortingStateHandler = React.useCallback(
    () =>
      sorting?.onSortingChange
        ? onSortingChangeTransformer(sorting.onSortingChange, sorting.state)
        : undefined,
    [sorting?.onSortingChange, sorting?.state]
  )

  const rowSelectionStateHandler = React.useCallback(
    () =>
      rowSelection?.onRowSelectionChange
        ? onRowSelectionChangeTransformer(
            rowSelection.onRowSelectionChange,
            rowSelection.state
          )
        : undefined,
    [rowSelection?.onRowSelectionChange, rowSelection?.state]
  )

  const instance = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: rowSelection?.state,
      sorting: sorting?.state ? [sorting.state] : undefined,
    },
    onRowSelectionChange: rowSelectionStateHandler(),
    onSortingChange: sortingStateHandler(),
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

function onSortingChangeTransformer(
  onSortingChange: (state: ColumnSort) => void,
  state?: ColumnSort | null
) {
  return (updaterOrValue: Updater<SortingState>) => {
    const value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(state ? [state] : [])
        : updaterOrValue
    const columnSort = value[0]

    onSortingChange(columnSort)
  }
}

function onRowSelectionChangeTransformer(
  onRowSelectionChange: (state: RowSelectionState) => void,
  state?: RowSelectionState
) {
  return (updaterOrValue: Updater<RowSelectionState>) => {
    const value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(state ?? {})
        : updaterOrValue

    onRowSelectionChange(value)
  }
}

export { useDataTable }
export type { DataTableOptions, UseDataTableReturn }
