import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Container } from "@/components/container"
import { RowSelectionState } from "@tanstack/react-table"
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

const usePeople = ({ q }: { q?: string }) => {
  return React.useMemo(() => {
    return {
      data: data.filter((person) =>
        person.name.toLowerCase().includes(q?.toLowerCase() ?? "")
      ),
      count: data.length,
    }
  }, [q])
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
  }),
  columnHelper.accessor("age", {
    header: "Age",
    enableSorting: true,
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

  const { data, count } = usePeople({ q: debouncedSearch })

  const table = useDataTable({
    data,
    columns,
    count,
    rowSelection: {
      state: rowSelection,
      onRowSelectionChange: setRowSelection,
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
