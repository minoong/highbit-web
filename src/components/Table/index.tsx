import { TableComponent } from '~/components/Table/Table'
import { TableBody } from '~/components/Table/TableBody'
import { TableCell } from '~/components/Table/TableCell'
import { TableHead } from '~/components/Table/TableHead'
import { TableHeadCell } from '~/components/Table/TableHeadCell'
import { TableRow } from '~/components/Table/TableRow'

export const Table = Object.assign(TableComponent, {
 Head: TableHead,
 Body: TableBody,
 Row: TableRow,
 Cell: TableCell,
 HeadCell: TableHeadCell,
})
