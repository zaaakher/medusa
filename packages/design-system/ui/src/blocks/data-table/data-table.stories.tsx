import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Container } from "@/components/container"
import { ColumnSort, RowSelectionState } from "@tanstack/react-table"
import { Heading } from "../../components/heading"
import { DataTable } from "./data-table"
import { useDataTable } from "./use-data-table"
import { createDataTableColumnHelper } from "./utils/create-data-table-column-helper"

const meta: Meta<typeof DataTable> = {
  title: "Blocks/DataTable",
  component: DataTable,
}

export default meta

type Story = StoryObj<typeof DataTable>

type Person = {
  name: string
  email: string
  age: number
}

const data: Person[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 20,
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    age: 25,
  },
  {
    name: "John Smith",
    email: "john.smith@example.com",
    age: 30,
  },
]

const usePeople = ({
  q,
  order,
}: {
  q?: string
  order?: { id: string; desc: boolean } | null
}) => {
  return React.useMemo(() => {
    const filteredData = data.filter((person) =>
      person.name.toLowerCase().includes(q?.toLowerCase() ?? "")
    )

    if (!order) {
      return {
        data: filteredData,
        count: filteredData.length,
      }
    }

    const key = order.id as keyof Person
    const desc = order.desc

    const sortedData = filteredData.sort((a, b) => {
      if (a[key] < b[key]) return desc ? 1 : -1
      if (a[key] > b[key]) return order.desc ? -1 : 1
      return 0
    })

    return {
      data: sortedData,
      count: sortedData.length,
    }
  }, [q, order])
}

const columnHelper = createDataTableColumnHelper<Person>()

const columns = [
  columnHelper.select({}),
  columnHelper.accessor("name", {
    header: "Name",
    enableSorting: false,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    enableSorting: true,
    sortAscLabel: "A-Z",
    sortDescLabel: "Z-A",
    // sortLabel: "Email",
  }),
  columnHelper.accessor("age", {
    header: "Age",
    enableSorting: true,
    sortAscLabel: "Low to High",
    sortDescLabel: "High to Low",
    sortLabel: "Age",
  }),
  columnHelper.action({
    actions: [],
  }),
]

const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value])

  return debouncedValue
}

const BasicDemo = () => {
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search, 300)

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<ColumnSort | null>(null)

  const { data, count } = usePeople({ q: debouncedSearch, order: sorting })

  const table = useDataTable({
    data,
    columns,
    count,
    rowSelection: {
      state: rowSelection,
      onRowSelectionChange: setRowSelection,
    },
    sorting: {
      state: sorting,
      onSortingChange: setSorting,
    },
  })

  return (
    <Container className="overflow-hidden p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar className="flex items-center justify-between">
          <Heading>Employees</Heading>
          <div className="flex items-center gap-2">
            <DataTable.Search
              value={search}
              onValueChange={setSearch}
              placeholder="Search"
              autoFocus
            />
            <DataTable.FilterMenu />
            <DataTable.SortingMenu />
          </div>
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  )
}

export const Basic: Story = {
  render: () => <BasicDemo />,
}
