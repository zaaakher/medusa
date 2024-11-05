import type {
  AccessorFn,
  AccessorFnColumnDef,
  AccessorKeyColumnDef,
  CellContext,
  ColumnSort,
  DeepKeys,
  DeepValue,
  DisplayColumnDef,
  IdentifiedColumnDef,
  RowData,
  RowSelectionState,
} from "@tanstack/react-table"

export type OrderByState<TData extends RowData> = {
  [K in keyof TData]?: {
    label: string
    value?: TData[K]
  }
}

type DataTableAction<TData> = {
  label: string
  onClick: (ctx: CellContext<TData, unknown>) => void
  icon?: React.ReactNode
}

export interface ActionColumnDef<TData>
  extends Pick<DisplayColumnDef<TData>, "meta"> {
  actions: DataTableAction<TData>[] |  DataTableAction<TData>[][]
}

type ColumnFilterType = "text" | "select" | "date"

interface ColumnFilter {
  type: ColumnFilterType
}

interface SelectColumnFilter extends ColumnFilter {
  type: "select"
  multiple?: boolean
  value: string
  options: {
    label: string
    value: string
  }[]
}

interface TextColumnFilter extends ColumnFilter {
  type: "text"
  value: string
}

interface SingleDateOption {
  label: string
  value: Date
  type: "single"
}

interface RangeDateOption {
  label: string
  value: {
    from: Date
    to: Date
  }
  type: "range"
}

interface DateColumnFilter extends ColumnFilter {
  type: "date"
  value: Date
  format: "date" | "date-time"
  options: (SingleDateOption | RangeDateOption)[]
}

export interface FilterableColumnDef {
  filter?: SelectColumnFilter | TextColumnFilter | DateColumnFilter
}

export interface SelectColumnDef<TData>
  extends Omit<DisplayColumnDef<TData>, "id" | "header"> {}

export type SortableColumnDef = {
  sortLabel?: string
  sortAscLabel?: string
  sortDescLabel?: string
}

export type FilterableColumnDefMeta = {
  ___filterMetaData?: ColumnFilter
}

export type SortableColumnDefMeta = {
  ___sortMetaData?: SortableColumnDef
}

export type ActionColumnDefMeta<TData> = {
  ___actions?: DataTableAction<TData>[] | DataTableAction<TData>[][]
}

export interface DataTableColumnHelper<TData> {
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
      ? DisplayColumnDef<TData, TValue> & SortableColumnDef & FilterableColumnDef
      : IdentifiedColumnDef<TData, TValue> & SortableColumnDef & FilterableColumnDef
  ) => TAccessor extends AccessorFn<TData>
    ? AccessorFnColumnDef<TData, TValue>
    : AccessorKeyColumnDef<TData, TValue>
  display: (column: DisplayColumnDef<TData>) => DisplayColumnDef<TData, unknown>
  action: (props: ActionColumnDef<TData>) => DisplayColumnDef<TData, unknown>
  select: (props: SelectColumnDef<TData>) => DisplayColumnDef<TData, unknown>
}

export interface DataTableSortingState extends ColumnSort {}
export interface DataTableRowSelectionState extends RowSelectionState {}

type FilterType = "text" | "radio" | "select" | "date"
type FilterOption<T = string> = {
  label: string
  value: T
}

interface BaseFilterProps {
  type: FilterType
  label: string
}

interface TextFilterProps extends BaseFilterProps {
  type: "text"
}

interface RadioFilterProps extends BaseFilterProps {
  type: "radio"
  options: FilterOption[]
}

interface SelectFilterProps extends BaseFilterProps {
  type: "select"
  options: FilterOption[]
}

interface DateFilterProps extends BaseFilterProps {
  type: "date"
  format: "date" | "date-time"
  options: FilterOption<Date>[]
}

export type DataTableFilterProps = TextFilterProps | RadioFilterProps | SelectFilterProps | DateFilterProps

export type DataTableFilter<T extends DataTableFilterProps = DataTableFilterProps> = T & {
  id: string
}