"use client"

import { Input } from "@/components/input"
import * as React from "react"

interface DataTableSearchProps {
  value: string
  onValueChange: (value: string) => void
  autoFocus?: boolean
  className?: string
  placeholder?: string
}

const DataTableSearch = ({
  value,
  onValueChange,
  ...props
}: DataTableSearchProps) => {
  return (
    <Input
      size="small"
      type="search"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      {...props}
    />
  )
}

export { DataTableSearch }
export type { DataTableSearchProps }
