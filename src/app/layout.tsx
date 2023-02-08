import GlobalNav from '~/components/GlobalNav/GlobalNav'
import ReactQueryProvider from '~/components/ReactQueryProiver/ReactQueryProvider'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang="ko-KR">
   {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
   <head />
   <body>
    <ReactQueryProvider>
     <div className="flex min-h-screen w-full min-w-[1400px] flex-col bg-slate-600">
      <GlobalNav />
      <main className="flex-auto bg-red-200 px-4 pt-[68px]">{children}</main>
      <footer>footer</footer>
     </div>
    </ReactQueryProvider>
   </body>
  </html>
 )
}
