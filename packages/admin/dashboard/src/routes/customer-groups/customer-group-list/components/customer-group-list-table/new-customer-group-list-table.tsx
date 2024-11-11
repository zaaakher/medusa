import { PencilSquare, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import {
  Container,
  createDataTableColumnHelper,
  createDataTableFilterHelper,
} from "@medusajs/ui"
import { keepPreviousData } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { DataTable } from "../../../../../components/data-table"
import { useCustomerGroups } from "../../../../../hooks/api"
import { useDate } from "../../../../../hooks/use-date"
import { useQueryParams } from "../../../../../hooks/use-query-params"

const PAGE_SIZE = 10

export const NewCustomerGroupListTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { q, order, offset, created_at, updated_at } = useQueryParams([
    "q",
    "order",
    "offset",
    "created_at",
    "updated_at",
  ])

  const columns = useColumns()
  const filters = useFilters()

  const { customer_groups, count } = useCustomerGroups(
    {
      q,
      order,
      offset: offset ? parseInt(offset) : undefined,
      limit: PAGE_SIZE,
      created_at: created_at ? JSON.parse(created_at) : undefined,
      updated_at: updated_at ? JSON.parse(updated_at) : undefined,
      fields: "id,name,created_at,updated_at,customers.id",
    },
    {
      placeholderData: keepPreviousData,
    }
  )

  return (
    <Container className="overflow-hidden p-0">
      <DataTable
        data={customer_groups}
        columns={columns}
        filters={filters}
        heading={t("customerGroups.domain")}
        rowCount={count}
        getRowId={(row) => row.id}
        onRowClick={(row) => {
          navigate(`/customer-groups/${row.id}`)
        }}
        emptyState={{
          empty: {
            heading: "No customer groups",
            description: "There are no customer groups to display.",
          },
          filtered: {
            heading: "No results",
            description:
              "No customer groups match the current filter criteria.",
          },
        }}
        pageSize={PAGE_SIZE}
      />
    </Container>
  )
}

const columnHelper = createDataTableColumnHelper<HttpTypes.AdminCustomerGroup>()

const useColumns = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getFullDate } = useDate()

  return useMemo(() => {
    return [
      columnHelper.accessor("name", {
        header: t("fields.name"),
        enableSorting: true,
      }),
      columnHelper.accessor("customers", {
        header: t("customers.domain"),
        cell: ({ row }) => {
          return <span>{row.original.customers?.length ?? 0}</span>
        },
      }),
      columnHelper.accessor("created_at", {
        header: t("fields.createdAt"),
        cell: ({ row }) => {
          return (
            <span>
              {getFullDate({
                date: row.original.created_at,
                includeTime: true,
              })}
            </span>
          )
        },
        enableSorting: true,
      }),
      columnHelper.accessor("updated_at", {
        header: t("fields.updatedAt"),
        cell: ({ row }) => {
          return (
            <span>
              {getFullDate({
                date: row.original.updated_at,
                includeTime: true,
              })}
            </span>
          )
        },
        enableSorting: true,
      }),
      columnHelper.action({
        actions: [
          [
            {
              icon: <PencilSquare />,
              label: t("actions.edit"),
              onClick: (row) => {
                navigate(`/customer-groups/${row.row.original.id}/edit`)
              },
            },
          ],
          [
            {
              icon: <Trash />,
              label: t("actions.delete"),
              onClick: (row) => {
                navigate(`/customer-groups/${row.row.original.id}`)
              },
            },
          ],
        ],
      }),
    ] as ColumnDef<HttpTypes.AdminCustomerGroup>[]
  }, [t, navigate, getFullDate])
}

const filterHelper = createDataTableFilterHelper<HttpTypes.AdminCustomerGroup>()

const useDateFilterOptions = () => {
  const startOfDay = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  return useMemo(() => {
    return [
      {
        label: "Yesterday",
        value: {
          $lt: new Date(
            startOfDay.getTime() - 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      },
      {
        label: "Last 7 days",
        value: {
          $lt: new Date(
            startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      },
      {
        label: "Last 30 days",
        value: {
          $lt: new Date(
            startOfDay.getTime() - 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      },
      {
        label: "Last 90 days",
        value: {
          $lt: new Date(
            startOfDay.getTime() - 90 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      },
    ]
  }, [startOfDay])
}

const useFilters = () => {
  const { t } = useTranslation()
  const dateFilterOptions = useDateFilterOptions()

  return useMemo(() => {
    return [
      filterHelper.accessor("created_at", {
        type: "date",
        label: t("fields.createdAt"),
        format: "date",
        options: dateFilterOptions,
      }),
      filterHelper.accessor("updated_at", {
        type: "date",
        label: t("fields.updatedAt"),
        format: "date",
        options: dateFilterOptions,
      }),
    ]
  }, [t, dateFilterOptions])
}
