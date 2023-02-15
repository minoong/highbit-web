import MarkdownPreview from '~/components/MarkdownPreview/MarkdownPreview'

async function getData() {
 const res = await fetch('http://localhost:3000/api/hello')

 if (!res.ok) {
  throw new Error('Failed to fetch data')
 }

 return res.json()
}

async function NoticeDetailPage() {
 const data = await getData()

 return (
  <div className="p-11">
   <h1 className="text-3xl font-bold">공지사항</h1>
   <br />
   <MarkdownPreview data={data.body} />
  </div>
 )
}

export default NoticeDetailPage
