import { XMark } from "@medusajs/icons"
import * as React from "react"
import { DropdownMenu } from "../../../components/dropdown-menu"
import { clx } from "../../../utils/clx"

const DataTableFilter = () => {
  return (
    <div
      className={clx(
        "bg-ui-bg-component shadow-borders-base flex items-center divide-x overflow-hidden rounded-md",
        "[&>*]:txt-compact-small-plus [&>*]:flex [&>*]:items-center [&>*]:justify-center"
      )}
    >
      <div className="text-ui-fg-muted px-2 py-1">Filter</div>
      <DataTableFilterMenu label="Value" />
      <button
        type="button"
        className="text-ui-fg-muted hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg size-7 outline-none"
      >
        <XMark />
      </button>
    </div>
  )
}

interface DataTableFilterMenuProps {
  label: string
}

const DataTableFilterMenu = ({ label }: DataTableFilterMenuProps) => {
  return (
    <DropdownMenu>
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
