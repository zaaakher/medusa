import {
  Button,
  DataTableCommand,
  DataTableEmptyState,
  DataTableFilter,
  Heading,
  DataTable as Primitive,
  useDataTable,
} from "@medusajs/ui"

interface DataTableProps<TData> {
  data?: TData[]
  columns: any
  filters?: DataTableFilter[]
  commands?: DataTableCommand[]
  rowCount?: number
  enablePagination?: boolean
  emptyState?: DataTableEmptyState
}

export const DataTable = <TData,>({
  data = [],
  columns,
  filters,
  commands,
  rowCount = 0,
  enablePagination = true,
}: DataTableProps<TData>) => {
  const instance = useDataTable({
    data,
    columns,
    filters,
    commands,
    rowCount,
  })

  return (
    <Primitive instance={instance}>
      <Primitive.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <Heading>Employees</Heading>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Primitive.Search placeholder="Search" autoFocus />
          <Primitive.FilterMenu tooltip="Filter" />
          <Primitive.SortingMenu tooltip="Sort" />
          <Button size="small" variant="secondary">
            Create
          </Button>
        </div>
      </Primitive.Toolbar>
      <Primitive.Table
        emptyState={{
          empty: {
            heading: "No employees",
            description: "There are no employees to display.",
          },
          filtered: {
            heading: "No results",
            description:
              "No employees match the current filter criteria. Try adjusting your filters.",
          },
        }}
      />
      {enablePagination && <Primitive.Pagination />}
      {commands && commands.length > 0 && (
        <Primitive.CommandBar selectedLabel={(count) => `${count} selected`} />
      )}
    </Primitive>
  )
}
