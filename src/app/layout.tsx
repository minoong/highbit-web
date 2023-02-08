import GlobalNav from '~/components/GlobalNav/GlobalNav'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang="ko">
   {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
   <head />
   <body>
    <div className="flex min-h-screen w-full min-w-[1400px] flex-col bg-slate-600">
     <GlobalNav />
     <main className="flex-auto bg-red-200 px-4 pt-[68px]">{children}</main>
     <footer>footer</footer>
    </div>
   </body>
  </html>
 )
}
