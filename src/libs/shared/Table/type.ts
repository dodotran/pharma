import { Row, RowData, TableOptions } from '@tanstack/react-table'

interface CellInfo<TData extends RowData> {
  row: Row<TData>
}

export interface ColumnsTable {
  accessorKey: unknown
  cell?: (info: CellInfo<unknown>) => React.ReactNode
  header: React.ReactNode
}

export interface ReactTableProps<T extends RowData> extends TableOptions<T> {
  isLoading: boolean
}
