import { XMark } from "@medusajs/icons"
import * as React from "react"
import { DropdownMenu } from "../../../components/dropdown-menu"
import { clx } from "../../../utils/clx"

const DataTableFilter = () => {
  return (
    <div
      className={clx(
        "bg-ui-bg-component shadow-borders-base flex items-center divide-x rounded-md",
        "[&>*]:txt-compact-small-plus [&>*]:flex [&>*]:items-center [&>*]:justify-center"
      )}
    >
      <div className="text-ui-fg-muted px-2 py-1">Filter</div>
      <DataTableFilterMenu label="Value" />
      <button type="button" className="text-ui-fg-muted size-7">
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
      <DropdownMenu.Trigger className="text-ui-fg-subtle px-2 py-1">
        {label}
      </DropdownMenu.Trigger>
    </DropdownMenu>
  )
}

export { DataTableFilter }
