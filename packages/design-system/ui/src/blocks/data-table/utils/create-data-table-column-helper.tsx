"use client"

import {
  AccessorColumnDef as AccessorColumnDefTanstack,
  CellContext,
  createColumnHelper as createColumnHelperTanstack,
  DisplayColumnDef,
} from "@tanstack/react-table"
import * as React from "react"
import {
  DataTableSelectCell,
  DataTableSelectHeader,
} from "../components/data-table-select-cell"

type DataTableAction<TData> = {
  label: string
  onClick: (ctx: CellContext<TData, unknown>) => void
}

interface ActionColumnDef<TData>
  extends Omit<DisplayColumnDef<TData>, "id" | "cell" | "header"> {
  actions: DataTableAction<TData>[]
}
interface SelectColumnDef<TData>
  extends Omit<DisplayColumnDef<TData>, "id" | "header"> {}
interface AccessorColumnDef<TData>
  extends Omit<AccessorColumnDefTanstack<TData>, "id"> {}

const createDataTableColumnHelper = <TData,>() => {
  const { accessor, display } = createColumnHelperTanstack<TData>()

  return {
    accessor,
    display,
    action: (props: ActionColumnDef<TData>) =>
      display({
        id: "action",
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

export { createDataTableColumnHelper }
