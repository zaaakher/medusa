"use client"

import * as React from "react"

import { DropdownMenu } from "@/components/dropdown-menu"
import { DescendingSorting } from "@medusajs/icons"
import type { Column } from "@tanstack/react-table"
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
          {sortableColumns.map((column) => {
            return (
              <DropdownMenu.RadioItem value={column.id} key={column.id}>
                {getSortLabel(column)}
              </DropdownMenu.RadioItem>
            )
          })}
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

function getSortLabel(column: Column<any, unknown>) {
  const meta = column.columnDef.meta
  let headerValue: string | undefined = undefined

  if (typeof column.columnDef.header === "string") {
    headerValue = column.columnDef.header
  }

  return meta?.___sortMetaData?.sortLabel ?? headerValue ?? column.id
}

export { DataTableSortingMenu }
