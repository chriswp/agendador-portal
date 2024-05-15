import Pagination from '../Pagination'
import { Box, Flex, IconButton, Table as RadixTable } from '@radix-ui/themes'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { TableProps } from './types'

const Table = <T,>({ data, columns, pagination }: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>()
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Box width='100%'>
      <RadixTable.Root>
        <RadixTable.Header>
          {table.getHeaderGroups().map(headerGroup => (
            <RadixTable.Row key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <RadixTable.ColumnHeaderCell key={header.id}>
                  <Flex align='center' gap={'2'}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanSort() && (
                      <IconButton
                        style={{ cursor: 'pointer' }}
                        variant={'ghost'}
                        size='1'
                        color={header.column.getIsSorted() ? 'blue' : 'gray'}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {{
                          asc: <FaSortUp />,
                          desc: <FaSortDown />,
                        }[header.column.getIsSorted() as string] ?? <FaSort />}
                      </IconButton>
                    )}
                  </Flex>
                </RadixTable.ColumnHeaderCell>
              ))}
            </RadixTable.Row>
          ))}
        </RadixTable.Header>

        <RadixTable.Body>
          {table.getRowModel().rows.map(row => (
            <RadixTable.Row key={row.id}>
              {row.getVisibleCells().map(cell => (
                <RadixTable.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </RadixTable.Cell>
              ))}
            </RadixTable.Row>
          ))}
        </RadixTable.Body>
      </RadixTable.Root>
      {pagination && (
        <Flex width='100%' my='4' justify='end'>
          <Pagination {...pagination} />
        </Flex>
      )}
    </Box>
  )
}

export default Table
