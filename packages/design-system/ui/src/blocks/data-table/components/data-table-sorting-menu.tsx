"use client"

import * as React from "react"

import { DropdownMenu } from "@/components/dropdown-menu"
import { ArrowDownMini, ArrowUpMini, DescendingSorting } from "@medusajs/icons"
import type { Column } from "@tanstack/react-table"
import { IconButton } from "../../../components/icon-button"
import { Tooltip } from "../../../components/tooltip"
import { useDataTableContext } from "../context/use-data-table-context"
import { SortableColumnDefMeta } from "../types"

interface DataTableSortingMenuProps {
  tooltip?: string
}

const DataTableSortingMenu = ({ tooltip }: DataTableSortingMenuProps) => {
  const { instance } = useDataTableContext()

  const sortableColumns = instance
    .getAllColumns()
    .filter((column) => column.getCanSort())

  const sorting = instance.getSorting()

  const selectedColumn = React.useMemo(() => {
    return sortableColumns.find((column) => column.id === sorting?.id)
  }, [sortableColumns, sorting])

  const setKey = React.useCallback(
    (key: string) => {
      instance.setSorting((prev) => ({ id: key, desc: prev?.desc ?? false }))
    },
    [instance]
  )

  const setDesc = React.useCallback(
    (desc: string) => {
      instance.setSorting((prev) => ({
        id: prev?.id ?? "",
        desc: desc === "true",
      }))
    },
    [instance]
  )

  if (!sortableColumns.length) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "No sortable columns found. If you intended to sort the table, you need to set the `enableSorting` option to `true` on at least one column."
      )
    }

    return null
  }

  const Wrapper = tooltip ? Tooltip : React.Fragment

  return (
    <DropdownMenu>
      <Wrapper content={tooltip}>
        <DropdownMenu.Trigger asChild>
          <IconButton size="small">
            <DescendingSorting />
          </IconButton>
        </DropdownMenu.Trigger>
      </Wrapper>
      <DropdownMenu.Content side="bottom">
        <DropdownMenu.RadioGroup value={sorting?.id} onValueChange={setKey}>
          {sortableColumns.map((column) => {
            return (
              <DropdownMenu.RadioItem
                onSelect={(e) => e.preventDefault()}
                value={column.id}
                key={column.id}
              >
                {getSortLabel(column)}
              </DropdownMenu.RadioItem>
            )
          })}
        </DropdownMenu.RadioGroup>
        {sorting && (
          <React.Fragment>
            <DropdownMenu.Separator />
            <DropdownMenu.RadioGroup
              value={sorting?.desc ? "true" : "false"}
              onValueChange={setDesc}
            >
              <DropdownMenu.RadioItem
                onSelect={(e) => e.preventDefault()}
                value="false"
                className="flex items-center gap-2"
              >
                <ArrowUpMini className="text-ui-fg-subtle" />
                {getSortDescriptor("asc", selectedColumn)}
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem
                onSelect={(e) => e.preventDefault()}
                value="true"
                className="flex items-center gap-2"
              >
                <ArrowDownMini className="text-ui-fg-subtle" />
                {getSortDescriptor("desc", selectedColumn)}
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </React.Fragment>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

function getSortLabel(column: Column<any, unknown>) {
  const meta = column.columnDef.meta as SortableColumnDefMeta | undefined
  let headerValue: string | undefined = undefined

  if (typeof column.columnDef.header === "string") {
    headerValue = column.columnDef.header
  }

  return meta?.___sortMetaData?.sortLabel ?? headerValue ?? column.id
}

function getSortDescriptor(
  direction: "asc" | "desc",
  column?: Column<any, unknown>
) {
  if (!column) {
    return null
  }

  const meta = column.columnDef.meta as SortableColumnDefMeta | undefined

  switch (direction) {
    case "asc":
      return meta?.___sortMetaData?.sortAscLabel ?? "A-Z"
    case "desc":
      return meta?.___sortMetaData?.sortDescLabel ?? "Z-A"
  }
}

export { DataTableSortingMenu }
