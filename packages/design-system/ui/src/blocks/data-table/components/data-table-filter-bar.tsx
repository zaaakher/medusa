import { ColumnFilter } from "@tanstack/react-table"
import * as React from "react"
import { Button } from "../../../components/button"
import { useDataTableContext } from "../context/use-data-table-context"
import { DataTableFilter } from "./data-table-filter"

const DataTableFilterBar = () => {
  const { instance } = useDataTableContext()

  const filterState = instance.getFiltering()

  const getFilterLabel = React.useCallback(
    (filter: ColumnFilter) => {
      const filterOptions = instance.getFilterOptions()
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
    <div className="bg-ui-bg-subtle flex flex-wrap items-center gap-2 border-t px-6 py-2">
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
          className="text-ui-fg-muted hover:text-ui-fg-subtle"
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
