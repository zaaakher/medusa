import * as React from "react"

import { Table } from "@/components/table"
import { flexRender } from "@tanstack/react-table"
import { Text } from "../../../components/text"
import { clx } from "../../../utils/clx"
import { useDataTableContext } from "../context/use-data-table-context"
import { DataTableEmptyState } from "../types"
import { DataTableFilterBar } from "./data-table-filter-bar"
import { DataTableSortingIcon } from "./data-table-sorting-icon"

type EmptyStateContent = {
  heading?: string
  description?: string
  custom?: React.ReactNode
}

type DataTableEmptyStateProps = {
  filtered?: EmptyStateContent
  empty?: EmptyStateContent
}

interface DataTableTableProps {
  emptyState?: DataTableEmptyStateProps
}

const DataTableTable = ({ emptyState }: DataTableTableProps) => {
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)
  const isKeyDown = React.useRef(false)

  const [showStickyBorder, setShowStickyBorder] = React.useState(false)
  const scrollableRef = React.useRef<HTMLDivElement>(null)

  const { instance } = useDataTableContext()

  const pageIndex = instance.pageIndex

  const columns = instance.getAllColumns()

  const hasSelect = columns.find((c) => c.id === "select")
  const hasActions = columns.find((c) => c.id === "action")

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

  const handleHorizontalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft

    if (scrollLeft > 0) {
      setShowStickyBorder(true)
    } else {
      setShowStickyBorder(false)
    }
  }

  React.useEffect(() => {
    scrollableRef.current?.scroll({ top: 0, left: 0 })
  }, [pageIndex])

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden">
      <DataTableFilterBar />
      {instance.emptyState === DataTableEmptyState.POPULATED && (
        <div
          ref={scrollableRef}
          onScroll={handleHorizontalScroll}
          className="min-h-0 w-full flex-1 overflow-auto overscroll-none border-y"
        >
          <Table className="relative isolate w-full">
            <Table.Header
              className="shadow-ui-border-base sticky inset-x-0 top-0 z-[1] w-full border-b-0 border-t-0 shadow-[0_1px_1px_0]"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {instance.getHeaderGroups().map((headerGroup) => (
                <Table.Row
                  key={headerGroup.id}
                  className={clx("border-b-0", {
                    "[&_th:last-of-type]:w-[1%] [&_th:last-of-type]:whitespace-nowrap":
                      hasActions,
                    "[&_th:first-of-type]:w-[1%] [&_th:first-of-type]:whitespace-nowrap":
                      hasSelect,
                  })}
                >
                  {headerGroup.headers.map((header, idx) => {
                    const canSort = header.column.getCanSort()
                    const sortDirection = header.column.getIsSorted()
                    const sortHandler = header.column.getToggleSortingHandler()

                    const isActionHeader = header.id === "action"
                    const isSelectHeader = header.id === "select"
                    const isSpecialHeader = isActionHeader || isSelectHeader

                    const Wrapper = canSort ? "button" : "div"
                    const isFirstColumn = hasSelect ? idx === 1 : idx === 0

                    return (
                      <Table.HeaderCell
                        key={header.id}
                        className={clx("whitespace-nowrap", {
                          "w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]":
                            isSelectHeader,
                          "w-[calc(20px+24px)] min-w-[calc(20px+24px)] max-w-[calc(20px+24px)]":
                            isActionHeader,
                          "after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']":
                            isFirstColumn,
                          "after:bg-ui-border-base":
                            showStickyBorder && isFirstColumn,
                          "bg-ui-bg-subtle sticky":
                            isFirstColumn || isSelectHeader,
                          "left-0": isSelectHeader,
                          "left-[calc(20px+24px+24px)]": isFirstColumn,
                        })}
                        style={
                          !isSpecialHeader
                            ? {
                                width: header.column.columnDef.size,
                                maxWidth: header.column.columnDef.maxSize,
                                minWidth: header.column.columnDef.minSize,
                              }
                            : undefined
                        }
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
            <Table.Body className="border-b-0 border-t-0">
              {instance.getRowModel().rows.map((row) => {
                return (
                  <Table.Row
                    key={row.id}
                    onMouseEnter={() => setHoveredRowId(row.id)}
                    onMouseLeave={() => setHoveredRowId(null)}
                    className="group/row last:border-b-0"
                  >
                    {row.getVisibleCells().map((cell, idx) => {
                      const isSelectCell = cell.column.id === "select"
                      const isActionCell = cell.column.id === "action"
                      const isSpecialCell = isSelectCell || isActionCell

                      const isFirstColumn = hasSelect ? idx === 1 : idx === 0

                      return (
                        <Table.Cell
                          key={cell.id}
                          className={clx("items-stretch whitespace-nowrap", {
                            "w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]":
                              isSelectCell,
                            "w-[calc(20px+24px)] min-w-[calc(20px+24px)] max-w-[calc(20px+24px)]":
                              isActionCell,
                            "bg-ui-bg-base group-hover/row:bg-ui-bg-base-hover transition-fg sticky h-full":
                              isFirstColumn || isSelectCell,
                            "after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']":
                              isFirstColumn,
                            "after:bg-ui-border-base":
                              showStickyBorder && isFirstColumn,
                            "left-0": isSelectCell,
                            "left-[calc(20px+24px+24px)]": isFirstColumn,
                          })}
                          style={
                            !isSpecialCell
                              ? {
                                  width: cell.column.columnDef.size,
                                  maxWidth: cell.column.columnDef.maxSize,
                                  minWidth: cell.column.columnDef.minSize,
                                }
                              : undefined
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Table.Cell>
                      )
                    })}
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      )}
      <DataTableEmptyStateDisplay
        state={instance.emptyState}
        props={emptyState}
      />
    </div>
  )
}

interface DataTableEmptyStateDisplayProps {
  state: DataTableEmptyState
  props?: DataTableEmptyStateProps
}

const DefaultEmptyStateContent = ({
  heading,
  description,
}: EmptyStateContent) => (
  <div className="flex size-full flex-col items-center justify-center gap-2">
    <Text size="base" weight="plus">
      {heading}
    </Text>
    <Text>{description}</Text>
  </div>
)

const DataTableEmptyStateDisplay = ({
  state,
  props,
}: DataTableEmptyStateDisplayProps) => {
  if (state === DataTableEmptyState.POPULATED) {
    return null
  }

  const content =
    state === DataTableEmptyState.EMPTY ? props?.empty : props?.filtered

  return (
    <div className="flex min-h-[250px] w-full flex-col items-center justify-center border-y px-6 py-4">
      {content?.custom ?? (
        <DefaultEmptyStateContent
          heading={content?.heading}
          description={content?.description}
        />
      )}
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
