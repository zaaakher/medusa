"use client"

import * as React from "react"

import { DropdownMenu } from "@/components/dropdown-menu"
import { DescendingSorting } from "@medusajs/icons"
import { IconButton } from "../../../components/icon-button"
import { useDataTableContext } from "../context/use-data-table-context"

const DataTableSortingMenu = () => {
  const { instance } = useDataTableContext()

  const sortableColumns = instance
    .getAllColumns()
    .filter((column) => column.getCanSort())

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton size="small">
          <DescendingSorting />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="bottom" align="end">
        <DropdownMenu.RadioGroup>
          {sortableColumns.map((column) => (
            <DropdownMenu.RadioItem value={column.id} key={column.id}>
              {column.id}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup>
          <DropdownMenu.RadioItem value="asc">Ascending</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="desc">
            Descending
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

export { DataTableSortingMenu }
