import type {
  AccessorFn,
  AccessorFnColumnDef,
  AccessorKeyColumnDef,
  CellContext,
  DeepKeys,
  DeepValue,
  DisplayColumnDef,
  IdentifiedColumnDef,
  RowData,
} from "@tanstack/react-table"

export type OrderByState<TData extends RowData> = {
  [K in keyof TData]?: {
    label: string
    value?: TData[K]
  }
}

// export type FilterState<TData extends RowData> = {
//   [K in keyof TData]?: {
//     label: string
//     value?: TData[K]
//   }
// }

type DataTableAction<TData> = {
  label: string
  onClick: (ctx: CellContext<TData, unknown>) => void
}

export interface ActionColumnDef<TData>
  extends Omit<DisplayColumnDef<TData>, "id" | "cell" | "header"> {
  actions: DataTableAction<TData>[]
}

export interface SelectColumnDef<TData>
  extends Omit<DisplayColumnDef<TData>, "id" | "header"> {}

export type SortableColumnDef = {
  sortLabel?: string
  sortAscLabel?: string
  sortDescLabel?: string
}

export type DataTableColumnHelper<TData> = {
  accessor: <
    TAccessor extends AccessorFn<TData> | DeepKeys<TData>,
    TValue extends TAccessor extends AccessorFn<TData, infer TReturn>
      ? TReturn
      : TAccessor extends DeepKeys<TData>
      ? DeepValue<TData, TAccessor>
      : never
  >(
    accessor: TAccessor,
    column: TAccessor extends AccessorFn<TData>
      ? DisplayColumnDef<TData, TValue> & SortableColumnDef
      : IdentifiedColumnDef<TData, TValue> & SortableColumnDef
  ) => TAccessor extends AccessorFn<TData>
    ? AccessorFnColumnDef<TData, TValue>
    : AccessorKeyColumnDef<TData, TValue>
  display: (column: DisplayColumnDef<TData>) => DisplayColumnDef<TData, unknown>
  action: (props: ActionColumnDef<TData>) => DisplayColumnDef<TData, unknown>
  select: (props: SelectColumnDef<TData>) => DisplayColumnDef<TData, unknown>
}
