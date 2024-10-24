import { RowData } from "@tanstack/react-table"

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
