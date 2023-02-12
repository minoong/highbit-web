import type { Meta, Story } from '@storybook/react/types-6-0'
import type { PaginationProps } from '~/components/Pagination/Pagination'
import { useEffect, useState } from 'react'
import Pagination from '~/components/Pagination/Pagination'

export default {
 title: 'Components/Pagination',
 component: Pagination,
 decorators: [
  (Story): JSX.Element => (
   <div className="flex items-center justify-center text-center">
    <Story />
   </div>
  ),
 ],
} as Meta

const Template: Story<PaginationProps> = ({
 currentPage = 1,
 layout = 'pagination',
 totalPages = 100,
 ...rest
}): JSX.Element => {
 const [page, setPage] = useState(currentPage)

 const onPageChange = (page: number) => {
  setPage(page)
 }

 useEffect(() => {
  setPage(currentPage)
 }, [currentPage])

 return <Pagination {...rest} currentPage={page} layout={layout} onPageChange={onPageChange} totalPages={totalPages} />
}

export const Default = Template.bind({})
