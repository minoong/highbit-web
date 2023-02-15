'use client'

import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const ReactMarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
 ssr: false,
})

interface Props {
 data: string
}

function MarkdownPreview(props: Props) {
 const { data } = props

 return (
  <div className="bg-[#0E1117] p-10">
   <ReactMarkdownPreview source={data} />
  </div>
 )
}

export default MarkdownPreview
