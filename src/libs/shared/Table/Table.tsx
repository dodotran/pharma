import { base } from '@/libs/config/colors'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { RowData } from '@tanstack/table-core'
import { ReactElement } from 'react'
import { TableSkeleton } from './TableSkeleton'
import { ReactTableProps } from './type'

function ReactTable<T extends RowData>(
  props: Omit<ReactTableProps<T>, 'getCoreRowModel'>,
): ReactElement {
  const { columns, data, isLoading } = props

  const instance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading && !data?.length) {
    return <TableSkeleton />
  }

  return (
    <Box mr={2}>
      <Table>
        <TableHead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  <Typography variant="subtitle2" fontWeight={700} color={base.black}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {instance.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {cell.column.id === 'action' ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <Typography
                        variant="subtitle2"
                        maxWidth={250}
                        textOverflow="ellipsis"
                        overflow="hidden"
                        color={base.black}
                        sx={{ wordWrap: 'break-word' }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Typography>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export { ReactTable }
