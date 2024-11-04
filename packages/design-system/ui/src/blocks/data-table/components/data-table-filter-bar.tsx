import * as React from "react"
import { DataTableFilter } from "./data-table-filter"

const DataTableFilterBar = () => {
  return (
    <div className="bg-ui-bg-subtle flex items-center border-t px-6 py-2.5">
      <DataTableFilter />
    </div>
  )
}

export { DataTableFilterBar }
