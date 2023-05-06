import React from 'react'
import Button from '~/components/atoms/Button/Button'
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
    <div className="flex w-full justify-end">
     <div className="flex w-1/2 gap-1">
      <Button variant="outlined" className="basis-1/2 py-1 text-lg font-bold" onClick={handleClose}>
       {closeLabel}
      </Button>
      <Button className="basis-1/2 py-1 text-lg font-bold" onClick={handleConfirm}>
       {label}
      </Button>
     </div>
    </div>
   }
  />
 )
}

export default ConfirmModal
