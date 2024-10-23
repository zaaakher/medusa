import { TableOptions, useReactTable } from "@tanstack/react-table"

const useDataTable = <TData,>(options: TableOptions<TData>) => {
  const instance = useReactTable(options)

  return instance
}

export { useDataTable }
