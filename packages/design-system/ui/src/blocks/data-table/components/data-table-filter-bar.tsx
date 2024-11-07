"use client"

import { ColumnFilter } from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/button"
import { useDataTableContext } from "../context/use-data-table-context"
import { DataTableFilter } from "./data-table-filter"

const DataTableFilterBar = () => {
  const { instance } = useDataTableContext()

  const filterState = instance.getFiltering()

  const getFilterLabel = React.useCallback(
    (filter: ColumnFilter) => {
      const filterOptions = instance.getFilters()
      const filterOption = filterOptions.find(
        (option) => option.id === filter.id
      )
      return filterOption?.label ?? filter.id
    },
    [instance]
  )

  const clearFilters = React.useCallback(() => {
    instance.clearFilters()
  }, [instance])

  if (Object.keys(filterState).length === 0) {
    return null
  }

  return (
    <div className="bg-ui-bg-subtle flex w-full flex-nowrap items-center gap-2 overflow-x-auto border-t px-6 py-2 md:flex-wrap">
      {Object.values(filterState).map((filter) => (
        <DataTableFilter
          key={filter.id}
          filter={filter}
          label={getFilterLabel(filter)}
        />
      ))}
      {Object.keys(filterState).length > 0 ? (
        <Button
          variant="transparent"
          size="small"
          className="text-ui-fg-muted hover:text-ui-fg-subtle flex-shrink-0 whitespace-nowrap"
          type="button"
          onClick={clearFilters}
        >
          Clear all
        </Button>
      ) : null}
    </div>
  )
}

export { DataTableFilterBar }
