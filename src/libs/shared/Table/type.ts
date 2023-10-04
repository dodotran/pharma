import { Row, RowData, TableOptions } from '@tanstack/react-table'

interface CellInfo<TData extends RowData> {
  row: Row<TData>
}

export interface ColumnsTable<TData extends RowData> {
  accessorKey: keyof TData
  cell: (info: CellInfo<TData>) => React.ReactNode
  header: React.ReactNode
}

export interface ReactTableProps<T extends RowData> extends TableOptions<T> {
  isLoading: boolean
}
