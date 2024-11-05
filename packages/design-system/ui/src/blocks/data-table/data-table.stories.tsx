import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Container } from "@/components/container"
import { PencilSquare, Trash } from "@medusajs/icons"
import { RowSelectionState } from "@tanstack/react-table"
import { Button } from "../../components/button"
import { Heading } from "../../components/heading"
import { TooltipProvider } from "../../components/tooltip"
import { DataTable } from "./data-table"
import { DataTableSortingState } from "./types"
import { useDataTable } from "./use-data-table"
import { createDataTableColumnHelper } from "./utils/create-data-table-column-helper"
import { createDataTableFilterHelper } from "./utils/create-data-table-filter-helper"

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
  birthday: Date
  relationshipStatus: "single" | "married" | "divorced" | "widowed"
}

const data: Person[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 20,
    birthday: new Date("1990-01-01"),
    relationshipStatus: "single",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    age: 25,
    birthday: new Date("1995-04-01"),
    relationshipStatus: "married",
  },
  {
    name: "John Smith",
    email: "john.smith@example.com",
    age: 30,
    birthday: new Date("1990-05-01"),
    relationshipStatus: "divorced",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 35,
    birthday: new Date("1995-06-01"),
    relationshipStatus: "widowed",
  },
  {
    name: "Mike Doe",
    email: "mike.doe@example.com",
    age: 40,
    birthday: new Date("1990-07-01"),
    relationshipStatus: "single",
  },
  {
    name: "Emily Smith",
    email: "emily.smith@example.com",
    age: 45,
    birthday: new Date("1995-08-01"),
    relationshipStatus: "married",
  },
  {
    name: "Sam Doe",
    email: "sam.doe@example.com",
    age: 50,
    birthday: new Date("1990-09-01"),
    relationshipStatus: "divorced",
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
    enableSorting: true,
    sortAscLabel: "A-Z",
    sortDescLabel: "Z-A",
  }),
  columnHelper.accessor("email", {
    header: "Email",
    enableSorting: true,
    sortAscLabel: "A-Z",
    sortDescLabel: "Z-A",
  }),
  columnHelper.accessor("age", {
    header: "Age",
    enableSorting: true,
    sortAscLabel: "Low to High",
    sortDescLabel: "High to Low",
    sortLabel: "Age",
  }),
  columnHelper.accessor("birthday", {
    header: "Birthday",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.birthday.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )
    },
    enableSorting: true,
    sortAscLabel: "Oldest to Youngest",
    sortDescLabel: "Youngest to Oldest",
  }),
  columnHelper.action({
    actions: [
      [
        {
          label: "Edit",
          onClick: () => {},
          icon: <PencilSquare />,
        },
      ],
      [
        {
          label: "Delete",
          onClick: () => {},
          icon: <Trash />,
        },
      ],
    ],
  }),
]

const filterHelper = createDataTableFilterHelper<Person>()

const filters = [
  filterHelper.accessor("name", {
    label: "Name",
    type: "text",
  }),
  filterHelper.accessor("birthday", {
    label: "Birthday",
    type: "date",
    format: "date",
    options: [
      { label: "Today", value: new Date() },
      { label: "Yesterday", value: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      {
        label: "Last Week",
        value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        label: "Last Month",
        value: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        label: "Last Year",
        value: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      },
    ],
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
  const [sorting, setSorting] = React.useState<DataTableSortingState | null>(
    null
  )

  const { data, count } = usePeople({ q: debouncedSearch, order: sorting })

  const table = useDataTable({
    data,
    columns,
    count,
    filters,
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
    <TooltipProvider>
      <Container className="flex h-full max-h-[500px] flex-col overflow-hidden p-0">
        <DataTable instance={table}>
          <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <Heading>Employees</Heading>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <DataTable.Search
                value={search}
                onValueChange={setSearch}
                placeholder="Search"
                autoFocus
              />
              <DataTable.FilterMenu tooltip="Filter" />
              <DataTable.SortingMenu tooltip="Sort" />
              <Button size="small" variant="secondary">
                Create
              </Button>
            </div>
          </DataTable.Toolbar>
          <DataTable.Table />
          <DataTable.Pagination />
        </DataTable>
      </Container>
    </TooltipProvider>
  )
}

export const Basic: Story = {
  render: () => <BasicDemo />,
}
