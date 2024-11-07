"use client"

import { ColumnFilter } from "@tanstack/react-table"
import * as React from "react"

import { DropdownMenu } from "@/components/dropdown-menu"
import { clx } from "@/utils/clx"
import { XMark } from "@medusajs/icons"
import { useDataTableContext } from "../context/use-data-table-context"
import { FilterOption, FilterType } from "../types"

interface DataTableFilterProps {
  filter: ColumnFilter
  label: string
}

const DataTableFilter = ({ filter, label }: DataTableFilterProps) => {
  const { instance } = useDataTableContext()
  const [open, setOpen] = React.useState(filter.value === undefined)

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      console.log("open", open, filter.value)

      if (
        !open &&
        (!filter.value ||
          (Array.isArray(filter.value) && filter.value.length === 0))
      ) {
        instance.removeFilter(filter.id)
      }

      setOpen(open)
    },
    [instance, filter.id, filter.value]
  )

  const removeFilter = React.useCallback(() => {
    instance.removeFilter(filter.id)
  }, [instance, filter.id])

  const options = instance.getFilterOptions(filter.id)
  const type = instance.getFilterType(filter.id)

  const value = filter.value

  const displayValue = React.useMemo(() => {
    let displayValue: string | string[] | null = null

    if (typeof value === "string") {
      displayValue = options?.find((o) => o.value === value)?.label ?? null
    }

    if (Array.isArray(value)) {
      displayValue =
        value
          .map((v) => options?.find((o) => o.value === v)?.label)
          .join(", ") ?? null
    }

    if (value instanceof Date) {
      displayValue = options?.find((o) => o.value === value)?.label ?? null
    }

    return displayValue
  }, [value, options])

  if (!type) {
    return null
  }

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <div
        className={clx(
          "bg-ui-bg-component flex flex-shrink-0 items-center overflow-hidden rounded-md",
          "[&>*]:txt-compact-small-plus [&>*]:flex [&>*]:items-center [&>*]:justify-center",
          {
            "shadow-borders-base divide-x": displayValue,
            "border border-dashed": !displayValue,
          }
        )}
      >
        {displayValue && (
          <div className="text-ui-fg-muted whitespace-nowrap px-2 py-1">
            {label}
          </div>
        )}
        <DropdownMenu.Trigger
          className={clx(
            "text-ui-fg-subtle hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg whitespace-nowrap px-2 py-1 outline-none",
            {
              "text-ui-fg-muted": !displayValue,
            }
          )}
        >
          {displayValue || label}
        </DropdownMenu.Trigger>

        {displayValue && (
          <button
            type="button"
            className="text-ui-fg-muted hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg size-7 outline-none"
            onClick={removeFilter}
          >
            <XMark />
          </button>
        )}
      </div>
      <DropdownMenu.Content align="center">
        {(() => {
          switch (type) {
            case "select":
              return (
                <DataTableFilterSelectContent
                  filter={filter}
                  options={options as FilterOption<string>[]}
                />
              )
            case "radio":
              return (
                <DataTableFilterRadioContent
                  filter={filter}
                  options={options as FilterOption<string>[]}
                />
              )
            case "date":
              return (
                <DataTableFilterDateContent
                  filter={filter}
                  options={options as FilterOption<Date>[]}
                />
              )
            case "text":
              return <DataTableFilterTextContent filter={filter} />
            default:
              return null
          }
        })()}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

interface DataTableFilterDropdownProps<T = string | Date> {
  filter: ColumnFilter
  options: FilterOption<T>[] | null
  type: FilterType
  open: boolean
  onOpenChange: (open: boolean) => void
}

type DataTableFilterDateContentProps = {
  filter: ColumnFilter
  options: FilterOption<Date>[]
}

const DataTableFilterDateContent = ({
  filter,
  options,
}: DataTableFilterDateContentProps) => {
  return (
    <React.Fragment>
      {options.map((option, idx) => {
        return (
          <DropdownMenu.CheckboxItem key={idx}>
            {option.label}
          </DropdownMenu.CheckboxItem>
        )
      })}
    </React.Fragment>
  )
}

type DataTableFilterTextContentProps = {
  filter: ColumnFilter
}

const DataTableFilterTextContent = ({
  filter,
}: DataTableFilterTextContentProps) => {
  return <DropdownMenu.RadioGroup></DropdownMenu.RadioGroup>
}

type DataTableFilterSelectContentProps = {
  filter: ColumnFilter
  options: FilterOption<string>[]
}

const DataTableFilterSelectContent = ({
  filter,
  options,
}: DataTableFilterSelectContentProps) => {
  const { instance } = useDataTableContext()

  const currentValue = filter.value as string[] | undefined

  const getChecked = React.useCallback(
    (value: string) => {
      return (checked: boolean) => {
        if (!checked) {
          const newValues = currentValue?.filter((v) => v !== value)
          instance.updateFilter({
            ...filter,
            value: newValues,
          })

          return
        }

        instance.updateFilter({
          ...filter,
          value: [...(currentValue ?? []), value],
        })
      }
    },
    [instance, filter]
  )

  return (
    <React.Fragment>
      {options.map((option) => {
        return (
          <DropdownMenu.CheckboxItem
            onSelect={(e) => e.preventDefault()}
            key={option.value}
            checked={currentValue?.includes(option.value)}
            onCheckedChange={getChecked(option.value)}
          >
            {option.label}
          </DropdownMenu.CheckboxItem>
        )
      })}
    </React.Fragment>
  )
}

type DataTableFilterRadioContentProps = {
  filter: ColumnFilter
  options: FilterOption<string>[]
}

const DataTableFilterRadioContent = ({
  filter,
  options,
}: DataTableFilterRadioContentProps) => {
  const { instance } = useDataTableContext()

  const onValueChange = React.useCallback(
    (value: string) => {
      instance.updateFilter({ ...filter, value })
    },
    [instance, filter]
  )

  return (
    <DropdownMenu.RadioGroup
      value={filter.value as string}
      onValueChange={onValueChange}
    >
      {options.map((option) => {
        return (
          <DropdownMenu.RadioItem key={option.value} value={option.value}>
            {option.label}
          </DropdownMenu.RadioItem>
        )
      })}
    </DropdownMenu.RadioGroup>
  )
}

export { DataTableFilter }
