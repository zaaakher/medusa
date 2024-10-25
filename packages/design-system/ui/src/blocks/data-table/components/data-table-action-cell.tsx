"use client"

import * as React from "react"

import { EllipsisHorizontal } from "@medusajs/icons"
import { CellContext } from "@tanstack/react-table"
import { DropdownMenu } from "../../../components/dropdown-menu"
import { IconButton } from "../../../components/icon-button"

type DataTableActionCellProps<TData> = {
  ctx: CellContext<TData, unknown>
}

const DataTableActionCell = <TData,>({
  ctx,
}: DataTableActionCellProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton size="small" variant="transparent">
          <EllipsisHorizontal />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

export { DataTableActionCell }
