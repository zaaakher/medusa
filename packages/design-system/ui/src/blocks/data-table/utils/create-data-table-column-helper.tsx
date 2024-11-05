"use client"

import { createColumnHelper as createColumnHelperTanstack } from "@tanstack/react-table"
import * as React from "react"
import { DataTableActionCell } from "../components/data-table-action-cell"
import {
  DataTableSelectCell,
  DataTableSelectHeader,
} from "../components/data-table-select-cell"
import {
  ActionColumnDef,
  DataTableColumnHelper,
  FilterableColumnDef,
  FilterableColumnDefMeta,
  SelectColumnDef,
  SortableColumnDef,
  SortableColumnDefMeta,
} from "../types"

const createDataTableColumnHelper = <
  TData,
>(): DataTableColumnHelper<TData> => {
  const { accessor: accessorTanstack, display } =
    createColumnHelperTanstack<TData>()

  return {
    accessor: (accessor, column) => {
      const {
        sortLabel,
        sortAscLabel,
        sortDescLabel,
        filter,
        meta,
        enableSorting,
        ...rest
      } = column as any & SortableColumnDef & FilterableColumnDef

      const extendedMeta: SortableColumnDefMeta & FilterableColumnDefMeta = {
        ___sortMetaData: { sortLabel, sortAscLabel, sortDescLabel },
        ___filterMetaData: filter,
        ...(meta || {}),
      }

      return accessorTanstack(accessor, {
        ...rest,
        enableSorting: enableSorting ?? false,
        meta: extendedMeta,
      })
    },
    display,
    action: ({ actions, ...props }: ActionColumnDef<TData>) =>
      display({
        id: "action",
        cell: (ctx) => <DataTableActionCell ctx={ctx} />,
        meta: {
          ___actions: actions,
          ...(props.meta || {}),
        },
        ...props,
      }),
    select: (props: SelectColumnDef<TData>) =>
      display({
        id: "select",
        header: (ctx) => <DataTableSelectHeader ctx={ctx} />,
        cell: props.cell
          ? props.cell
          : (ctx) => <DataTableSelectCell ctx={ctx} />,
        ...props,
      }),
  }
}

const helper = createColumnHelperTanstack()

helper.accessor("name", {
  meta: {},
})

export { createDataTableColumnHelper }
