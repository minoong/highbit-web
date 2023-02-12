import type { PaginationButtonProps } from '~/components/Pagination/PaginationButton'
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import PaginationButton from '~/components/Pagination/PaginationButton'
import { range } from '~/utils/range'

export type PaginationProps = PropsWithChildren<Pagination>

interface Pagination extends ComponentProps<'nav'> {
 currentPage: number
 layout?: 'navigation' | 'pagination' | 'table'
 onPageChange: (page: number) => void
 showIcons?: boolean
 totalPages: number
 previousLabel?: string
 nextLabel?: string
 renderPaginationButton?: (props: PaginationButtonProps) => ReactNode
}

function Pagination(props: PaginationProps) {
 const {
  currentPage,
  layout = 'pagination',
  onPageChange,
  totalPages,
  previousLabel = '이전',
  nextLabel = '다음',
  className,
  renderPaginationButton = (props) => <PaginationButton {...props} />,
  ...rest
 } = props

 const firstPage = Math.max(1, currentPage - 3)
 const lastPage = Math.min(currentPage + 3, totalPages)

 const goToNextPage = (): void => {
  onPageChange(Math.min(currentPage + 1, totalPages))
 }

 const goToPreviousPage = (): void => {
  onPageChange(Math.max(currentPage - 1, 1))
 }

 return (
  <nav {...rest} className={className}>
   <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
    <li>
     {renderPaginationButton({
      onClick: goToPreviousPage,
      children: <>{previousLabel}</>,
      rounded: 'rounded-l-lg',
     })}
    </li>
    {layout === 'pagination' &&
     range(firstPage, lastPage).map(
      (page: number): JSX.Element => (
       <li aria-current={page === currentPage ? 'page' : undefined} key={page}>
        {renderPaginationButton({
         active: page === currentPage,
         onClick: () => onPageChange(page),
         children: page,
        })}
       </li>
      ),
     )}
    <li>
     {renderPaginationButton({
      onClick: goToNextPage,
      children: <>{nextLabel}</>,
      rounded: 'rounded-r-lg',
     })}
    </li>
   </ul>
  </nav>
 )
}

export default Pagination
