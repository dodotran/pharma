import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export type TableSkeletonType = {
  row_number?: number
  col_number?: number
  width?: number | string
}

const TableSkeleton: React.VFC<TableSkeletonType> = ({
  col_number = 9,
  row_number = 10,
  width = '100%',
}) => {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ border: 'none' }}>
      <Table size="small" sx={{ width: width }}>
        <TableHead>
          <TableRow>
            {new Array(col_number).fill(0).map((el, idx) => (
              <TableCell key={idx} size="medium">
                <Skeleton variant="rectangular" height={25} animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {new Array(row_number).fill(0).map((el, idx) => (
            <TableRow key={idx}>
              <TableCell colSpan={col_number} size="medium">
                <Skeleton variant="rectangular" animation="wave" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { TableSkeleton }
