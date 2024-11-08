import {
  ColumnFilter,
  ColumnFiltersState,
  type ColumnSort,
  getCoreRowModel,
  PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type Updater,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"
import {
  DataTableCommand,
  DataTableEmptyState,
  DataTableFilter,
  DataTablePaginationState,
  DataTableRowSelectionState,
  DataTableSortingState,
  DateComparisonOperator,
  FilterOption,
  FilterType,
} from "./types"

interface DataTableOptions<TData>
  extends Pick<TableOptions<TData>, "data" | "columns" | "getRowId"> {
  /**
   * The filters which the user can apply to the table.
   */
  filters?: DataTableFilter[]
  /**
   * The commands which the user can apply to selected rows.
   */
  commands?: DataTableCommand[]
  /**
   * Whether the data for the table is currently being loaded.
   */
  isLoading?: boolean
  /**
   * The state and callback for the filtering.
   */
  filtering?: {
    state: Record<string, ColumnFilter>
    onFilteringChange: (state: Record<string, ColumnFilter>) => void
  }
  /**
   * The state and callback for the row selection.
   */
  rowSelection?: {
    state: DataTableRowSelectionState
    onRowSelectionChange: (state: DataTableRowSelectionState) => void
  }
  /**
   * The state and callback for the sorting.
   */
  sorting?: {
    state: DataTableSortingState | null
    onSortingChange: (state: DataTableSortingState) => void
  }
  /**
   * The state and callback for the search, with optional debounce.
   */
  search?: {
    state: string
    onSearchChange: (state: string) => void
    /**
     * Debounce time in milliseconds for the search callback.
     * @default 300
     */
    debounce?: number
  }
  /**
   * The state and callback for the pagination.
   */
  pagination?: {
    state: DataTablePaginationState
    onPaginationChange: (state: DataTablePaginationState) => void
  }
  /**
   * The function to execute when a row is clicked.
   */
  onRowClick?: (row: TData) => void
  /**
   * The total count of rows. When working with pagination, this will be the total
   * number of rows available, not the number of rows currently being displayed.
   */
  rowCount?: number
  /**
   * Whether the page index should be reset the filtering, sorting, or pagination changes.
   *
   * @default true
   */
  autoResetPageIndex?: boolean
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
  getSorting: () => DataTableSortingState | null
  setSorting: (
    sortingOrUpdater:
      | DataTableSortingState
      | ((prev: DataTableSortingState | null) => DataTableSortingState)
  ) => void
  getFilters: () => DataTableFilter[]
  getFilterOptions: <T extends string | string[] | DateComparisonOperator>(
    id: string
  ) => FilterOption<T>[] | null
  getFilterType: (id: string) => FilterType | null
  getFiltering: () => Record<string, ColumnFilter>
  addFilter: (filter: ColumnFilter) => void
  removeFilter: (id: string) => void
  clearFilters: () => void
  updateFilter: (filter: ColumnFilter) => void
  getSearch: () => string
  onSearchChange: (search: string) => void
  getCommands: () => DataTableCommand[]
  getRowSelection: () => DataTableRowSelectionState
  onRowClick?: (row: TData) => void
  emptyState: DataTableEmptyState
  isLoading: boolean
  showSkeleton: boolean
  pageIndex: number
  pageSize: number
  rowCount: number
}

const useDataTable = <TData,>({
  rowCount = 0,
  filters,
  commands,
  rowSelection,
  sorting,
  filtering,
  pagination,
  search,
  onRowClick,
  autoResetPageIndex = true,
  ...options
}: DataTableOptions<TData>): UseDataTableReturn<TData> => {
  const { state: sortingState, onSortingChange } = sorting ?? {}
  const sortingStateHandler = React.useCallback(() => {
    return onSortingChange
      ? onSortingChangeTransformer(onSortingChange, sortingState)
      : undefined
  }, [onSortingChange, sortingState])

  const { state: rowSelectionState, onRowSelectionChange } = rowSelection ?? {}
  const rowSelectionStateHandler = React.useCallback(() => {
    return onRowSelectionChange
      ? onRowSelectionChangeTransformer(onRowSelectionChange, rowSelectionState)
      : undefined
  }, [onRowSelectionChange, rowSelectionState])

  const { state: filteringState, onFilteringChange } = filtering ?? {}
  const filteringStateHandler = React.useCallback(() => {
    return onFilteringChange
      ? onFilteringChangeTransformer(onFilteringChange, filteringState)
      : undefined
  }, [onFilteringChange, filteringState])

  const { state: paginationState, onPaginationChange } = pagination ?? {}
  const paginationStateHandler = React.useCallback(() => {
    return onPaginationChange
      ? onPaginationChangeTransformer(onPaginationChange, paginationState)
      : undefined
  }, [onPaginationChange, paginationState])

  const instance = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: rowSelectionState,
      sorting: sortingState ? [sortingState] : undefined,
      columnFilters: Object.values(filteringState ?? {}),
      pagination: paginationState,
    },
    rowCount,
    onColumnFiltersChange: filteringStateHandler(),
    onRowSelectionChange: rowSelectionStateHandler(),
    onSortingChange: sortingStateHandler(),
    onPaginationChange: paginationStateHandler(),
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
  })

  const autoResetPageIndexHandler = React.useCallback(() => {
    return autoResetPageIndex ? () => instance.setPageIndex(0) : undefined
  }, [autoResetPageIndex, instance])

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

      autoResetPageIndexHandler()?.()
      instance.setSorting([newSorting])
    },
    [instance, autoResetPageIndexHandler]
  )

  const getFilters = React.useCallback(() => {
    return filters ?? []
  }, [filters])

  const getFilterOptions = React.useCallback(
    <T extends string | string[] | DateComparisonOperator>(id: string) => {
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
      autoResetPageIndexHandler()?.()
      onFilteringChange?.({ ...getFiltering(), [filter.id]: filter })
    },
    [onFilteringChange, getFiltering, autoResetPageIndexHandler]
  )

  const removeFilter = React.useCallback(
    (id: string) => {
      const currentFilters = getFiltering()
      delete currentFilters[id]
      autoResetPageIndexHandler()?.()
      onFilteringChange?.(currentFilters)
    },
    [onFilteringChange, getFiltering, autoResetPageIndexHandler]
  )

  const clearFilters = React.useCallback(() => {
    onFilteringChange?.({})
  }, [onFilteringChange])

  const updateFilter = React.useCallback(
    (filter: ColumnFilter) => {
      addFilter(filter)
    },
    [addFilter]
  )

  const { state: searchState, onSearchChange, debounce = 300 } = search ?? {}

  // Local state for immediate UI updates
  const [localSearch, setLocalSearch] = React.useState(searchState ?? "")
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

  // Update local state when prop changes
  React.useEffect(() => {
    setLocalSearch(searchState ?? "")
  }, [searchState])

  const getSearch = React.useCallback(() => {
    return localSearch
  }, [localSearch])

  const debouncedSearchChange = React.useMemo(() => {
    if (!onSearchChange) {
      return undefined
    }

    return (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (debounce <= 0) {
        autoResetPageIndexHandler()?.()
        onSearchChange(value)
        return
      }

      timeoutRef.current = setTimeout(() => {
        autoResetPageIndexHandler()?.()
        onSearchChange(value)
      }, debounce)
    }
  }, [onSearchChange, debounce, autoResetPageIndexHandler])

  // Cleanup timeout
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const onSearchChangeHandler = React.useCallback(
    (search: string) => {
      setLocalSearch(search) // Update local state immediately
      debouncedSearchChange?.(search) // Debounce the callback
    },
    [debouncedSearchChange]
  )

  const getCommands = React.useCallback(() => {
    return commands ?? []
  }, [commands])

  const getRowSelection = React.useCallback(() => {
    return instance.getState().rowSelection
  }, [instance])

  const rows = instance.getRowModel().rows

  const emptyState = React.useMemo(() => {
    const hasRows = rows.length > 0
    const hasSearch = Boolean(searchState)
    const hasFilters = Object.keys(filteringState ?? {}).length > 0

    if (hasRows) {
      return DataTableEmptyState.POPULATED
    }

    if (hasSearch || hasFilters) {
      return DataTableEmptyState.FILTERED_EMPTY
    }

    return DataTableEmptyState.EMPTY
  }, [rows, searchState, filteringState])

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
    rowCount,
    // Search
    getSearch,
    onSearchChange: onSearchChangeHandler,
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
    // Commands
    getCommands,
    getRowSelection,
    // Handlers
    onRowClick,
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

function onPaginationChangeTransformer(
  onPaginationChange: (state: PaginationState) => void,
  state?: PaginationState
) {
  return (updaterOrValue: Updater<PaginationState>) => {
    const value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(state ?? { pageIndex: 0, pageSize: 10 })
        : updaterOrValue

    onPaginationChange(value)
  }
}

export { useDataTable }
export type { DataTableOptions, UseDataTableReturn }
