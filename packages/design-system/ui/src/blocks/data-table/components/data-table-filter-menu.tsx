import * as React from "react"

import { Funnel } from "@medusajs/icons"
import { DropdownMenu } from "../../../components/dropdown-menu"
import { IconButton } from "../../../components/icon-button"
import { Tooltip } from "../../../components/tooltip"
import { useDataTableContext } from "../context/use-data-table-context"

export interface DataTableFilterMenuProps {
  tooltip?: string
}

const DataTableFilterMenu = ({ tooltip }: DataTableFilterMenuProps) => {
  const { instance } = useDataTableContext()

  const Wrapper = tooltip ? Tooltip : React.Fragment

  return (
    <DropdownMenu>
      <Wrapper content={tooltip}>
        <DropdownMenu.Trigger asChild>
          <IconButton size="small">
            <Funnel />
          </IconButton>
        </DropdownMenu.Trigger>
      </Wrapper>
      <DropdownMenu.Content side="bottom">
        {instance.getFilterOptions().map((filter) => (
          <DropdownMenu.Item key={filter.id}>{filter.label}</DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

export { DataTableFilterMenu }
