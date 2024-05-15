import { Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { useMemo } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

import { PaginationProps } from './types'

const Pagination = ({
  onNextPage,
  onClickPage,
  pages = 0,
  currentPage = 1,
  onPreviousPage,
}: PaginationProps) => {
  const maxNumOfPagesInPagination = useMemo(() => 5, [])
  const pagesArr = useMemo<(number | null)[]>(() => {
    const roundedPages = Math.round(pages)
    const arrayOfPages = Array.from(Array(roundedPages).keys()).map(
      item => item + 1,
    )

    if (pages < maxNumOfPagesInPagination) return arrayOfPages

    if (pages - currentPage >= maxNumOfPagesInPagination) {
      const left = arrayOfPages.slice(
        Math.min(pages - 2, Math.max(0, currentPage - 2)),
        Math.min(pages - 2, Math.max(2, currentPage)),
      )

      return [...left, null, pages - 1, pages]
    }

    return arrayOfPages.slice(-maxNumOfPagesInPagination)
  }, [currentPage, maxNumOfPagesInPagination, pages])

  return (
    <Flex align='center' gap='2'>
      <Text weight='medium' size='2'>
        Página {currentPage} de {pages}
      </Text>
      <Flex gap='2'>
        <IconButton
          variant='outline'
          onClick={
            onPreviousPage ? () => onPreviousPage(currentPage - 1) : undefined
          }
          disabled={currentPage === 1}
          size='1'
        >
          <GrFormPrevious />
        </IconButton>
        {pagesArr.map(page =>
          page ? (
            <Button
              size='1'
              style={{ cursor: 'pointer' }}
              variant={currentPage === page ? 'solid' : 'outline'}
              onClick={onClickPage ? () => onClickPage(page) : undefined}
              key={page}
            >
              {page}
            </Button>
          ) : (
            <Text key={page}>...</Text>
          ),
        )}
        <IconButton
          variant='outline'
          onClick={onNextPage ? () => onNextPage(currentPage + 1) : undefined}
          size='1'
          disabled={currentPage === pages}
        >
          <GrFormNext />
        </IconButton>
      </Flex>
    </Flex>
  )
}

export default Pagination
