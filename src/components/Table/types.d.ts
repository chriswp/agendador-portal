import { PaginationProps } from '@components/Pagination/types'
import { ColumnDef } from '@tanstack/react-table'

export interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T, string>[]
  pagination?: PaginationProps
}
