import { clx } from "@/utils/clx"
import * as React from "react"

interface DataTableToolbarProps {
  className?: string
  children?: React.ReactNode
}

const DataTableToolbar = ({ children, className }: DataTableToolbarProps) => {
  return (
    <div className={clx("flex items-center px-6 py-4", className)}>
      {children}
    </div>
  )
}

export { DataTableToolbar }
export type { DataTableToolbarProps }
