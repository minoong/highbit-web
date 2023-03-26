import React from 'react'
import Modal from '~/components/ui/Modal/Modal'
import { closeModal } from '~/features/modals/ModalsSlice'
import { useAppDispatch } from '~/hooks'

interface Props {
 title: React.ReactNode
 contents: React.ReactNode
 label?: string
 closeLabel?: string
 width?: number
 height?: number
 onConfirmClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<any>
 onCloseClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<any>
}

function ConfirmModal(props: Props) {
 const {
  title,
  contents,
  label = '확인',
  closeLabel = '취소',
  onConfirmClick,
  onCloseClick,
  width = 350,
  height = 180,
 } = props

 const dispatch = useAppDispatch()

 const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  if (onConfirmClick) {
   await onConfirmClick(e)
  }

  dispatch(closeModal({ Component: ConfirmModal }))
 }

 const handleClose = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  if (onCloseClick) {
   await onCloseClick(e)
  }

  dispatch(closeModal({ Component: ConfirmModal }))
 }

 return (
  <Modal
   width={width}
   height={height}
   title={title}
   contents={contents}
   footer={
    <div className="flex w-full justify-end gap-1 text-lg">
     <button
      className="rounded-sm bg-white px-8 text-blue-700/90 ring-1 ring-blue-700/90 hover:brightness-125"
      onClick={handleClose}
     >
      {closeLabel}
     </button>
     <button
      className="rounded-sm bg-blue-700/90 px-8 text-white ring-1 ring-blue-700/90 hover:brightness-125"
      onClick={handleConfirm}
     >
      {label}
     </button>
    </div>
   }
  />
 )
}

export default ConfirmModal
