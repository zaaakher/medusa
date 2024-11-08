"use client"

import { Input } from "@/components/input"
import * as React from "react"
import { clx } from "../../../utils/clx"
import { useDataTableContext } from "../context/use-data-table-context"

interface DataTableSearchProps {
  autoFocus?: boolean
  className?: string
  placeholder?: string
}

const DataTableSearch = ({ className, ...props }: DataTableSearchProps) => {
  const { instance } = useDataTableContext()

  return (
    <Input
      size="small"
      type="search"
      value={instance.getSearch()}
      onChange={(e) => instance.onSearchChange(e.target.value)}
      className={clx(
        {
          "pr-[calc(15px+2px+8px)]": instance.isLoading,
        },
        className
      )}
      {...props}
    />
  )
}

export { DataTableSearch }
export type { DataTableSearchProps }
