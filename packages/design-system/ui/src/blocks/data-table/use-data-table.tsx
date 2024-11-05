import {
  ColumnFiltersState,
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
import { DataTableFilter, DataTableSortingState } from "./types"

interface DataTableOptions<TData>
  extends Pick<TableOptions<TData>, "data" | "columns" | "getRowId"> {
  filters?: DataTableFilter[]
  filtering?: {
    state: ColumnFiltersState
    onFilteringChange: (state: ColumnFiltersState) => void
  }
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
  getSorting: () => DataTableSortingState | null
  setSorting: (
    sortingOrUpdater:
      | DataTableSortingState
      | ((prev: DataTableSortingState | null) => DataTableSortingState)
  ) => void
  getFilterOptions: () => DataTableFilter[]
  getFiltering: () => ColumnFiltersState
}

const useDataTable = <TData,>({
  count = 0,
  rowSelection,
  sorting,
  filtering,
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

  const filteringStateHandler = React.useCallback(
    () =>
      filtering?.onFilteringChange
        ? onFilteringChangeTransformer(
            filtering.onFilteringChange,
            filtering.state
          )
        : undefined,
    [filtering?.onFilteringChange, filtering?.state]
  )

  const instance = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: rowSelection?.state,
      sorting: sorting?.state ? [sorting.state] : undefined,
      columnFilters: filtering?.state,
    },
    onColumnFiltersChange: filteringStateHandler(),
    onRowSelectionChange: rowSelectionStateHandler(),
    onSortingChange: sortingStateHandler(),
    // All data manipulation should be handled manually, likely by a server.
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
  })

  const getSorting = React.useCallback(() => {
    return instance.getState().sorting?.[0] ?? null
  }, [instance])

  const setSorting = React.useCallback(
    (
      sortingOrUpdater: ColumnSort | ((prev: ColumnSort | null) => ColumnSort)
    ) => {
      const currentSort = instance.getState().sorting?.[0] ?? null
      const newSorting =
        typeof sortingOrUpdater === "function"
          ? sortingOrUpdater(currentSort)
          : sortingOrUpdater

      instance.setSorting([newSorting])
    },
    [instance]
  )

  const getFilterOptions = React.useCallback(() => {
    return options.filters ?? []
  }, [options.filters])

  const getFiltering = React.useCallback(() => {
    return instance.getState().columnFilters ?? []
  }, [instance])

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
    // Sorting
    getSorting,
    setSorting,
    // Filtering
    getFilterOptions,
    getFiltering,
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

function onFilteringChangeTransformer(
  onFilteringChange: (state: ColumnFiltersState) => void,
  state?: ColumnFiltersState
) {
  return (updaterOrValue: Updater<ColumnFiltersState>) => {
    const value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(state ?? [])
        : updaterOrValue

    onFilteringChange(value)
  }
}

export { useDataTable }
export type { DataTableOptions, UseDataTableReturn }
