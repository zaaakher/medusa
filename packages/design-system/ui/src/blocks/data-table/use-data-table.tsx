import {
  ColumnFilter,
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
import {
  DataTableEmptyState,
  DataTableFilter,
  DataTableSortingState,
  FilterOption,
  FilterType,
} from "./types"

interface DataTableOptions<TData>
  extends Pick<TableOptions<TData>, "data" | "columns" | "getRowId"> {
  /**
   * Whether the data for the table is currently being loaded.
   */
  isLoading?: boolean
  /**
   * The filters which the user can apply to the table.
   */
  filters?: DataTableFilter[]
  filtering?: {
    state: Record<string, ColumnFilter>
    onFilteringChange: (state: Record<string, ColumnFilter>) => void
  }
  rowSelection?: {
    state: RowSelectionState
    onRowSelectionChange: (state: RowSelectionState) => void
  }
  sorting?: {
    state: ColumnSort | null
    onSortingChange: (state: ColumnSort) => void
  }
  search?: {
    state: string
    onSearchChange: (state: string) => void
  }
  onRowClick?: (row: Row<TData>) => void
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
  search: string
  onSearchChange: (search: string) => void
  getSorting: () => DataTableSortingState | null
  setSorting: (
    sortingOrUpdater:
      | DataTableSortingState
      | ((prev: DataTableSortingState | null) => DataTableSortingState)
  ) => void
  getFilters: () => DataTableFilter[]
  getFilterOptions: <T extends string | Date>(
    id: string
  ) => FilterOption<T>[] | null
  getFilterType: (id: string) => FilterType | null
  getFiltering: () => Record<string, ColumnFilter>
  addFilter: (filter: ColumnFilter) => void
  removeFilter: (id: string) => void
  clearFilters: () => void
  updateFilter: (filter: ColumnFilter) => void
  emptyState: DataTableEmptyState
  isLoading: boolean
  showSkeleton: boolean
}

const useDataTable = <TData,>({
  count = 0,
  rowSelection,
  sorting,
  filtering,
  onRowClick,
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
      columnFilters: Object.values(filtering?.state ?? {}),
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

  const getFilters = React.useCallback(() => {
    return options.filters ?? []
  }, [options.filters])

  const getFilterOptions = React.useCallback(
    <T extends string | Date>(id: string) => {
      const filter = getFilters().find((filter) => filter.id === id)

      if (!filter || filter.type === "text") {
        return null
      }

      return filter.options as FilterOption<T>[]
    },
    [getFilters]
  )

  const getFilterType = React.useCallback(
    (id: string) => {
      return getFilters().find((filter) => filter.id === id)?.type || null
    },
    [getFilters]
  )

  const getFiltering = React.useCallback(() => {
    const state = instance.getState().columnFilters ?? []
    return Object.fromEntries(state.map((filter) => [filter.id, filter]))
  }, [instance])

  const addFilter = React.useCallback(
    (filter: ColumnFilter) => {
      filtering?.onFilteringChange?.({ ...getFiltering(), [filter.id]: filter })
    },
    [filtering?.onFilteringChange, getFiltering]
  )

  const removeFilter = React.useCallback(
    (id: string) => {
      const currentFilters = getFiltering()
      delete currentFilters[id]
      filtering?.onFilteringChange?.(currentFilters)
    },
    [filtering?.onFilteringChange, getFiltering]
  )

  const clearFilters = React.useCallback(() => {
    filtering?.onFilteringChange?.({})
  }, [filtering?.onFilteringChange])

  const updateFilter = React.useCallback(
    (filter: ColumnFilter) => {
      addFilter(filter)
    },
    [addFilter]
  )

  const rows = instance.getRowModel().rows

  const emptyState = React.useMemo(() => {
    const hasRows = rows.length > 0
    const hasSearch = Boolean(options.search?.state)
    const hasFilters = Object.keys(filtering?.state ?? {}).length > 0

    if (hasRows) {
      return DataTableEmptyState.POPULATED
    }

    if (hasSearch || hasFilters) {
      return DataTableEmptyState.FILTERED_EMPTY
    }

    return DataTableEmptyState.EMPTY
  }, [rows, options.search?.state, filtering?.state])

  const showSkeleton = React.useMemo(() => {
    return options.isLoading === true && rows.length === 0
  }, [options.isLoading, rows])

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
    // Search
    search: options.search?.state ?? "",
    onSearchChange: options.search?.onSearchChange ?? (() => {}),
    // Sorting
    getSorting,
    setSorting,
    // Filtering
    getFilters,
    getFilterOptions,
    getFilterType,
    getFiltering,
    addFilter,
    removeFilter,
    clearFilters,
    updateFilter,
    // Empty State
    emptyState,
    // Loading
    isLoading: options.isLoading ?? false,
    showSkeleton,
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
  onFilteringChange: (state: Record<string, ColumnFilter>) => void,
  state?: Record<string, ColumnFilter>
) {
  return (updaterOrValue: Updater<ColumnFiltersState>) => {
    const value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(Object.values(state ?? {}))
        : updaterOrValue

    const transformedValue = Object.fromEntries(
      value.map((filter) => [filter.id, filter])
    )

    onFilteringChange(transformedValue)
  }
}

export { useDataTable }
export type { DataTableOptions, UseDataTableReturn }
