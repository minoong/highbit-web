'use client'

import Pagination from '~/components/Pagination/Pagination'
import { moveOffset } from '~/features/notice/noticeSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'
import { useNotice } from '~/hooks/queries/useNotice'
import { Table } from '~/components/Table'

function Notice() {
 const { page } = useAppSelector((state) => state.notice)
 const dispatch = useAppDispatch()
 const { data = [] } = useNotice({
  suspense: true,
  keepPreviousData: true,
 })

 const currentPage = page

 return (
  <div>
   <Table hoverable striped>
    <colgroup>
     <col width={70} />
     <col width={700} />
     <col width="*" />
    </colgroup>
    <Table.Head>
     <Table.HeadCell>#</Table.HeadCell>
     <Table.HeadCell>제목</Table.HeadCell>
     <Table.HeadCell>사용자명</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
     {data?.map((row) => (
      <Table.Row key={row.id}>
       <Table.Cell className="text-right">{row.id}</Table.Cell>
       <Table.Cell>{row.title}</Table.Cell>
       <Table.Cell className="text-right">{row.userId}</Table.Cell>
      </Table.Row>
     ))}
    </Table.Body>
   </Table>
   <Pagination
    currentPage={currentPage}
    totalPages={20}
    onPageChange={(page: number) => dispatch(moveOffset(page))}
    className="m-auto text-center"
   />
  </div>
 )
}

export default Notice
