export interface PaginationProps {
  pages?: number
  onNextPage?: (page: number) => void
  onPreviousPage?: (page: number) => void
  onClickPage?: (page: number) => void
  onChangeRowsPerPage?: (page: number) => void
  currentPage?: number
}
