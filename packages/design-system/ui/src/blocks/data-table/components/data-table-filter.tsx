"use client"

import { XMark } from "@medusajs/icons"
import * as React from "react"

import { Popover } from "@/components/popover"
import { clx } from "@/utils/clx"

import { Checkbox } from "../../../components/checkbox"
import { DatePicker } from "../../../components/date-picker"
import { Label } from "../../../components/label"
import { RadioGroup } from "../../../components/radio-group"
import { useDataTableContext } from "../context/use-data-table-context"
import {
  DataTableDateComparisonOperator,
  DateFilterProps,
  FilterOption,
} from "../types"
import { isDateComparisonOperator } from "../utils/is-date-comparison-operator"

interface DataTableFilterProps {
  id: string
  filter: unknown
}

const DEFAULT_FORMAT_DATE_VALUE = (d: Date) =>
  d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
const DEFAULT_RANGE_OPTION_LABEL = "Custom"
const DEFAULT_RANGE_OPTION_START_LABEL = "Starting"
const DEFAULT_RANGE_OPTION_END_LABEL = "Ending"

const DataTableFilter = ({ id, filter }: DataTableFilterProps) => {
  const { instance } = useDataTableContext()
  const [open, setOpen] = React.useState(filter === undefined)
  const [isCustom, setIsCustom] = React.useState(false)

  console.log("filter with id:", id, "is rerendering")

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      if (
        !open &&
        (!filter || (Array.isArray(filter) && filter.length === 0))
      ) {
        instance.removeFilter(id)
      }

      setOpen(open)
    },
    [instance, id, filter]
  )

  const removeFilter = React.useCallback(() => {
    instance.removeFilter(id)
  }, [instance, id])

  const meta = instance.getFilterMeta(id)
  const { type, options, label, ...rest } = meta ?? {}

  const displayValue = React.useMemo(() => {
    let displayValue: string | null = null

    if (Array.isArray(filter)) {
      displayValue =
        filter
          .map((v) => options?.find((o) => o.value === v)?.label)
          .join(", ") ?? null
    }

    if (isDateComparisonOperator(filter)) {
      displayValue =
        options?.find((o) => {
          if (!isDateComparisonOperator(o.value)) {
            return false
          }

          return (
            !isCustom &&
            (filter.$gte === o.value.$gte || (!filter.$gte && !o.value.$gte)) &&
            (filter.$lte === o.value.$lte || (!filter.$lte && !o.value.$lte)) &&
            (filter.$gt === o.value.$gt || (!filter.$gt && !o.value.$gt)) &&
            (filter.$lt === o.value.$lt || (!filter.$lt && !o.value.$lt))
          )
        })?.label ?? null

      if (!displayValue && isDateFilterProps(meta)) {
        const formatDateValue = meta.formatDateValue
          ? meta.formatDateValue
          : DEFAULT_FORMAT_DATE_VALUE

        if (filter.$gte && !filter.$lte) {
          displayValue = `${
            meta.rangeOptionStartLabel || DEFAULT_RANGE_OPTION_START_LABEL
          } ${formatDateValue(new Date(filter.$gte))}`
        }

        if (filter.$lte && !filter.$gte) {
          displayValue = `${
            meta.rangeOptionEndLabel || DEFAULT_RANGE_OPTION_END_LABEL
          } ${formatDateValue(new Date(filter.$lte))}`
        }

        if (filter.$gte && filter.$lte) {
          displayValue = `${formatDateValue(
            new Date(filter.$gte)
          )} - ${formatDateValue(new Date(filter.$lte))}`
        }
      }
    }

    return displayValue
  }, [filter, options])

  if (!meta) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal>
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
            {label || id}
          </div>
        )}
        <Popover.Trigger
          className={clx(
            "text-ui-fg-subtle hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg whitespace-nowrap px-2 py-1 outline-none",
            {
              "text-ui-fg-muted": !displayValue,
            }
          )}
        >
          {displayValue || label || id}
        </Popover.Trigger>

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
      <Popover.Content align="center">
        {(() => {
          switch (type) {
            case "select":
              return (
                <DataTableFilterSelectContent
                  id={id}
                  filter={filter}
                  options={options as FilterOption<string>[]}
                />
              )
            case "radio":
              return (
                <DataTableFilterRadioContent
                  id={id}
                  filter={filter}
                  options={options as FilterOption<string>[]}
                />
              )
            case "date":
              return (
                <DataTableFilterDateContent
                  id={id}
                  filter={filter}
                  options={
                    options as FilterOption<DataTableDateComparisonOperator>[]
                  }
                  setIsCustom={setIsCustom}
                  {...rest}
                />
              )
            default:
              return null
          }
        })()}
      </Popover.Content>
    </Popover>
  )
}

type DataTableFilterDateContentProps = {
  id: string
  filter: unknown
  options: FilterOption<DataTableDateComparisonOperator>[]
  setIsCustom: (isCustom: boolean) => void
} & Pick<
  DateFilterProps,
  | "format"
  | "rangeOptionLabel"
  | "disableRangeOption"
  | "rangeOptionStartLabel"
  | "rangeOptionEndLabel"
>

function getIsCustomOptionSelected(
  options: FilterOption<DataTableDateComparisonOperator>[],
  value: DataTableDateComparisonOperator | undefined
) {
  if (!value) {
    return false
  }

  const stringifiedValue = JSON.stringify(value)
  const stringifiedOptions = options.map((option) =>
    JSON.stringify(option.value)
  )

  if (stringifiedOptions.includes(stringifiedValue)) {
    return false
  }

  return !!value.$gte || !!value.$lte
}

const CUSTOM_RANGE_OPTION_VALUE = "__custom__range__option__"

const DataTableFilterDateContent = ({
  id,
  filter,
  options,
  format = "date",
  rangeOptionLabel = DEFAULT_RANGE_OPTION_LABEL,
  rangeOptionStartLabel = DEFAULT_RANGE_OPTION_START_LABEL,
  rangeOptionEndLabel = DEFAULT_RANGE_OPTION_END_LABEL,
  disableRangeOption = false,
  setIsCustom,
}: DataTableFilterDateContentProps) => {
  const currentValue = filter as DataTableDateComparisonOperator | undefined
  const { instance } = useDataTableContext()

  const [showCustom, setShowCustom] = React.useState(
    getIsCustomOptionSelected(options, currentValue)
  )

  React.useEffect(() => {
    setIsCustom(showCustom)
  }, [showCustom])

  const selectedValue = React.useMemo(() => {
    if (!currentValue || showCustom) {
      return undefined
    }

    return JSON.stringify(currentValue)
  }, [currentValue, showCustom])

  const onValueChange = React.useCallback(
    (valueStr: string) => {
      setShowCustom(false)

      const value = JSON.parse(valueStr) as DataTableDateComparisonOperator
      instance.updateFilter({ id, value })
    },
    [instance, id]
  )

  const onSelectCustom = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      setShowCustom(true)
      instance.updateFilter({ id, value: undefined })
    },
    [instance, id]
  )

  const onCustomValueChange = React.useCallback(
    (input: "$gte" | "$lte", value: Date | null) => {
      const newCurrentValue = { ...currentValue }
      newCurrentValue[input] = value ? value.toISOString() : undefined
      instance.updateFilter({ id, value: newCurrentValue })
    },
    [instance, id]
  )

  const granularity = format === "date-time" ? "minute" : "day"

  const maxDate = currentValue?.$lte
    ? granularity === "minute"
      ? new Date(currentValue.$lte)
      : new Date(new Date(currentValue.$lte).setHours(23, 59, 59, 999))
    : undefined

  const minDate = currentValue?.$gte
    ? granularity === "minute"
      ? new Date(currentValue.$gte)
      : new Date(new Date(currentValue.$gte).setHours(0, 0, 0, 0))
    : undefined

  return (
    <React.Fragment>
      <RadioGroup value={selectedValue} onValueChange={onValueChange}>
        {options.map((option, idx) => {
          return (
            <div
              key={idx}
              className="txt-compact-small hover:bg-ui-bg-base-hover focus-within:bg-ui-bg-base-hover transition-fg flex items-center gap-2 px-2 py-1"
            >
              <RadioGroup.Item
                id={`radio-${idx}`}
                value={JSON.stringify(option.value)}
              />
              <label htmlFor={`radio-${idx}`}>{option.label}</label>
            </div>
          )
        })}
        {!disableRangeOption && (
          <div className="txt-compact-small flex items-center gap-2">
            <RadioGroup.Item value={CUSTOM_RANGE_OPTION_VALUE} />
            <label>{rangeOptionLabel}</label>
          </div>
        )}
      </RadioGroup>
      {!disableRangeOption && showCustom && (
        <React.Fragment>
          <div className="bg-ui-bg-base-subtle h-[1px] w-full" />
          <div className="flex flex-col gap-2 px-2 pb-3 pt-1">
            <div className="flex flex-col gap-1">
              <Label id="custom-start-date-label" size="xsmall" weight="plus">
                {rangeOptionStartLabel}
              </Label>
              <DatePicker
                aria-labelledby="custom-start-date-label"
                granularity={granularity}
                maxValue={maxDate}
                onFocus={(e) => console.log("DatePicker focus:", e)}
                onBlur={(e) => {
                  console.log("DatePicker blur:", e)
                  console.log("Related target:", e.relatedTarget)
                }}
                value={currentValue?.$gte ? new Date(currentValue.$gte) : null}
                onChange={(value) => onCustomValueChange("$gte", value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label id="custom-end-date-label" size="xsmall" weight="plus">
                {rangeOptionEndLabel}
              </Label>
              <DatePicker
                aria-labelledby="custom-end-date-label"
                granularity={granularity}
                minValue={minDate}
                value={currentValue?.$lte ? new Date(currentValue.$lte) : null}
                onChange={(value) => onCustomValueChange("$lte", value)}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

type DataTableFilterSelectContentProps = {
  id: string
  filter: unknown
  options: FilterOption<string>[]
}

const DataTableFilterSelectContent = ({
  id,
  filter,
  options,
}: DataTableFilterSelectContentProps) => {
  const { instance } = useDataTableContext()

  const currentValue = filter as string[] | undefined

  const getChecked = React.useCallback(
    (value: string) => {
      return (checked: boolean) => {
        if (!checked) {
          const newValues = currentValue?.filter((v) => v !== value)
          instance.updateFilter({
            id,
            value: newValues,
          })

          return
        }

        instance.updateFilter({
          id,
          value: [...(currentValue ?? []), value],
        })
      }
    },
    [instance, id]
  )

  return (
    <React.Fragment>
      {options.map((option) => {
        return (
          <Checkbox
            onSelect={(e) => e.preventDefault()}
            key={option.value}
            checked={currentValue?.includes(option.value)}
            onCheckedChange={getChecked(option.value)}
          >
            {option.label}
          </Checkbox>
        )
      })}
    </React.Fragment>
  )
}

type DataTableFilterRadioContentProps = {
  id: string
  filter: unknown
  options: FilterOption<string>[]
}

const DataTableFilterRadioContent = ({
  id,
  filter,
  options,
}: DataTableFilterRadioContentProps) => {
  const { instance } = useDataTableContext()

  const onValueChange = React.useCallback(
    (value: string) => {
      instance.updateFilter({ id, value })
    },
    [instance, id]
  )

  return (
    <RadioGroup value={filter as string} onValueChange={onValueChange}>
      {options.map((option) => {
        return (
          <RadioGroup.Item key={option.value} value={option.value}>
            {option.label}
          </RadioGroup.Item>
        )
      })}
    </RadioGroup>
  )
}

function isDateFilterProps(props?: unknown | null): props is DateFilterProps {
  if (!props) {
    return false
  }

  return (props as DateFilterProps).type === "date"
}

export { DataTableFilter }
export type { DataTableFilterProps }
