import { XMark } from "@medusajs/icons"
import { ColumnFilter } from "@tanstack/react-table"
import * as React from "react"
import { DropdownMenu } from "../../../components/dropdown-menu"
import { clx } from "../../../utils/clx"
import { useDataTableContext } from "../context/use-data-table-context"

interface DataTableFilterProps {
  filter: ColumnFilter
  label: string
}

const DataTableFilter = ({ filter, label }: DataTableFilterProps) => {
  const { instance } = useDataTableContext()
  const [open, setOpen] = React.useState(filter.value === undefined)

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open && !filter.value) {
        instance.removeFilter(filter.id)
      }

      setOpen(open)
    },
    [instance, filter.id, filter.value]
  )

  const removeFilter = React.useCallback(() => {
    instance.removeFilter(filter.id)
  }, [instance, filter.id])

  return (
    <div
      className={clx(
        "bg-ui-bg-component shadow-borders-base flex items-center divide-x overflow-hidden rounded-md",
        "[&>*]:txt-compact-small-plus [&>*]:flex [&>*]:items-center [&>*]:justify-center"
      )}
    >
      <div className="text-ui-fg-muted px-2 py-1">{label}</div>
      <DataTableFilterMenu
        label="Value"
        open={open}
        onOpenChange={onOpenChange}
      />
      <button
        type="button"
        className="text-ui-fg-muted hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg size-7 outline-none"
        onClick={removeFilter}
      >
        <XMark />
      </button>
    </div>
  )
}

interface DataTableFilterMenuProps {
  label: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DataTableFilterMenu = ({
  label,
  open,
  onOpenChange,
}: DataTableFilterMenuProps) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger className="text-ui-fg-subtle hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg px-2 py-1 outline-none">
        {label}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup>
          <DropdownMenu.RadioItem value="1">Option 1</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="2">Option 2</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="3">Option 3</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

export { DataTableFilter }
