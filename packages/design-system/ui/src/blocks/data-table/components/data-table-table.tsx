import * as React from "react"

import { Table } from "@/components/table"
import { flexRender } from "@tanstack/react-table"
import { clx } from "../../../utils/clx"
import { useDataTableContext } from "../context/use-data-table-context"
import { DataTableFilterBar } from "./data-table-filter-bar"
import { DataTableSortingIcon } from "./data-table-sorting-icon"

const DataTableTable = () => {
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)
  const isKeyDown = React.useRef(false)

  const { instance } = useDataTableContext()

  const columns = instance.getAllColumns()

  const hasSelect = columns.find((c) => c.id === "select")
  const hasActions = columns.find((c) => c.id === "action")

  const colCount = columns.length - (hasSelect ? 1 : 0) - (hasActions ? 1 : 0)
  const colWidth = 100 / colCount

  React.useEffect(() => {
    const onKeyDownHandler = (event: KeyboardEvent) => {
      // If an editable element is focused, we don't want to select a row
      const isEditableElementFocused = getIsEditableElementFocused()

      if (
        event.key.toLowerCase() === "x" &&
        hoveredRowId &&
        !isKeyDown.current &&
        !isEditableElementFocused
      ) {
        isKeyDown.current = true

        const row = instance
          .getRowModel()
          .rows.find((r) => r.id === hoveredRowId)

        if (row && row.getCanSelect()) {
          row.toggleSelected()
        }
      }
    }

    const onKeyUpHandler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "x") {
        isKeyDown.current = false
      }
    }

    document.addEventListener("keydown", onKeyDownHandler)
    document.addEventListener("keyup", onKeyUpHandler)
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler)
      document.removeEventListener("keyup", onKeyUpHandler)
    }
  }, [hoveredRowId, instance])

  return (
    <div className="flex flex-col">
      <DataTableFilterBar />
      <Table className="overflow-auto">
        <Table.Header>
          {instance.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id} className={clx()}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sortDirection = header.column.getIsSorted()
                const sortHandler = header.column.getToggleSortingHandler()

                const isActionHeader = header.id === "action"
                const isSelectHeader = header.id === "select"
                const isSpecialHeader = isActionHeader || isSelectHeader

                const Wrapper = canSort ? "button" : "div"

                return (
                  <Table.HeaderCell
                    key={header.id}
                    style={{
                      width: !isSpecialHeader ? `${colWidth}%` : undefined,
                    }}
                  >
                    <Wrapper
                      type={canSort ? "button" : undefined}
                      onClick={canSort ? sortHandler : undefined}
                      className={clx(
                        "group flex w-fit cursor-default items-center gap-2",
                        {
                          "cursor-pointer": canSort,
                        }
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {canSort && (
                        <DataTableSortingIcon direction={sortDirection} />
                      )}
                    </Wrapper>
                  </Table.HeaderCell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {instance.getRowModel().rows.map((row) => {
            return (
              <Table.Row
                key={row.id}
                onMouseEnter={() => setHoveredRowId(row.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

function getIsEditableElementFocused() {
  const activeElement = !!document ? document.activeElement : null
  const isEditableElementFocused =
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement?.getAttribute("contenteditable") === "true"

  return isEditableElementFocused
}

export { DataTableTable }
