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

  const enabledFilters = Object.keys(instance.getFiltering())

  const filterOptions = instance
    .getFilterOptions()
    .filter((filter) => !enabledFilters.includes(filter.id))

  const Wrapper = tooltip ? Tooltip : React.Fragment

  return (
    <DropdownMenu>
      <Wrapper content={tooltip} hidden={filterOptions.length === 0}>
        <DropdownMenu.Trigger asChild disabled={filterOptions.length === 0}>
          <IconButton size="small">
            <Funnel />
          </IconButton>
        </DropdownMenu.Trigger>
      </Wrapper>
      <DropdownMenu.Content side="bottom">
        {filterOptions.map((filter) => (
          <DropdownMenu.Item
            key={filter.id}
            onClick={() => {
              instance.addFilter({ id: filter.id, value: undefined })
            }}
          >
            {filter.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

export { DataTableFilterMenu }
