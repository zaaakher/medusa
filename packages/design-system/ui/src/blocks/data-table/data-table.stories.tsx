import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Container } from "@/components/container"
import { PencilSquare, Trash } from "@medusajs/icons"
import { ColumnFilter, RowSelectionState } from "@tanstack/react-table"
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
  id: string
  name: string
  email: string
  age: number
  birthday: Date
  relationshipStatus: "single" | "married" | "divorced" | "widowed"
}

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

const data: Person[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 20,
    birthday: new Date("1990-01-01"),
    relationshipStatus: "single",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    age: 25,
    birthday: new Date("1995-04-01"),
    relationshipStatus: "married",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john.smith@example.com",
    age: 30,
    birthday: new Date("1990-05-01"),
    relationshipStatus: "divorced",
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 35,
    birthday: new Date("1995-06-01"),
    relationshipStatus: "widowed",
  },
  {
    id: "5",
    name: "Mike Doe",
    email: "mike.doe@example.com",
    age: 40,
    birthday: new Date("1990-07-01"),
    relationshipStatus: "single",
  },
  {
    id: "6",
    name: "Emily Smith",
    email: "emily.smith@example.com",
    age: 45,
    birthday: new Date("1995-08-01"),
    relationshipStatus: "married",
  },
  {
    id: "7",
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
  filters,
}: {
  q?: string
  order?: { id: string; desc: boolean } | null
  filters?: Record<string, ColumnFilter>
}) => {
  return React.useMemo(() => {
    let results = [...data] // Create a copy to avoid mutating original data

    // Apply free text search
    if (q) {
      results = results.filter((person) =>
        person.name.toLowerCase().includes(q.toLowerCase())
      )
    }

    // Apply filters
    if (filters && Object.keys(filters).length > 0) {
      results = results.filter((person) => {
        return Object.entries(filters).every(([key, filter]) => {
          if (!filter.value) return true

          const value = person[key as keyof Person]

          if (value instanceof Date && filter.value instanceof Date) {
            return value.getTime() === filter.value.getTime()
          }

          if (Array.isArray(filter.value)) {
            return filter.value.includes(value)
          }

          return filter.value === value
        })
      })
    }

    // Apply sorting
    if (order) {
      const key = order.id as keyof Person
      const desc = order.desc

      results.sort((a, b) => {
        const aVal = a[key]
        const bVal = b[key]

        if (aVal instanceof Date && bVal instanceof Date) {
          return desc
            ? bVal.getTime() - aVal.getTime()
            : aVal.getTime() - bVal.getTime()
        }

        if (aVal < bVal) return desc ? 1 : -1
        if (aVal > bVal) return desc ? -1 : 1
        return 0
      })
    }

    return {
      data: results,
      count: results.length,
    }
  }, [q, order, filters]) // Add filters to dependencies
}

const columnHelper = createDataTableColumnHelper<Person>()

const columns = [
  columnHelper.select(),
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
  columnHelper.accessor("relationshipStatus", {
    header: "Relationship Status",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.relationshipStatus.charAt(0).toUpperCase() +
            row.original.relationshipStatus.slice(1)}
        </div>
      )
    },
    enableSorting: true,
    sortAscLabel: "A-Z",
    sortDescLabel: "Z-A",
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
  filterHelper.accessor("relationshipStatus", {
    label: "Relationship Status",
    type: "select",
    options: [
      { label: "Single", value: "single" },
      { label: "Married", value: "married" },
      { label: "Divorced", value: "divorced" },
      { label: "Widowed", value: "widowed" },
    ],
  }),
]

const KitchenSinkDemo = () => {
  const [search, setSearch] = React.useState("")
  const debouncedSearch = useDebouncedValue(search, 300)

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<DataTableSortingState | null>(
    null
  )
  const [filtering, setFiltering] = React.useState<
    Record<string, ColumnFilter>
  >({})

  const { data, count } = usePeople({
    q: debouncedSearch,
    order: sorting,
    filters: filtering,
  })

  const table = useDataTable({
    data,
    columns,
    count,
    isLoading: true,
    getRowId: (row) => row.id,
    filters,
    search: {
      state: search,
      onSearchChange: setSearch,
    },
    filtering: {
      state: filtering,
      onFilteringChange: setFiltering,
    },
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
              <DataTable.Search placeholder="Search" autoFocus />
              <DataTable.FilterMenu tooltip="Filter" />
              <DataTable.SortingMenu tooltip="Sort" />
              <Button size="small" variant="secondary">
                Create
              </Button>
            </div>
          </DataTable.Toolbar>
          <DataTable.Table
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
          <DataTable.Pagination />
        </DataTable>
      </Container>
    </TooltipProvider>
  )
}

export const KitchenSink: Story = {
  render: () => <KitchenSinkDemo />,
}
