"use client"

import { Input } from "@/components/input"
import * as React from "react"
import { clx } from "../../../utils/clx"

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
  className,
  ...props
}: DataTableSearchProps) => {
  return (
    <Input
      size="small"
      type="search"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={clx("w-full flex-1 md:flex-none", className)}
      {...props}
    />
  )
}

export { DataTableSearch }
export type { DataTableSearchProps }
