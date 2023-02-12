import type { ReactEventHandler, ReactNode } from 'react'

export type PaginationButtonProps = {
 active?: boolean
 children?: ReactNode
 onClick?: ReactEventHandler<HTMLButtonElement>
 className?: string
 rounded?: 'rounded-l-lg' | 'rounded-r-lg'
}

function PaginationButton(props: PaginationButtonProps) {
 const { active, children, onClick, className = '', rounded = '' } = props

 return (
  <button
   type="button"
   className={`w-12 select-none border border-gray-300 bg-white py-2 leading-tight transition duration-150
   ${rounded}
   ${
    active
     ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
     : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
   } ${className}`}
   onClick={onClick}
  >
   {children}
  </button>
 )
}

export default PaginationButton
