import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'

import Footer from '~/components/Footer/Footer'
import GlobalNav from '~/components/GlobalNav/GlobalNav'
import ReactQueryProvider from '~/components/ReactQueryProiver/ReactQueryProvider'
import ReduxProvider from '~/components/ReduxProvider/ReduxProvider'
import Modals from '~/components/ui/Modals/Modals'
import { authOptions } from '~/pages/api/auth/[...nextauth]'

import SessionProvider from '~/components/SessionProvier'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
 const session = await getServerSession(authOptions)
 return (
  <html lang="ko-KR">
   {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
   <head />
   <body className={inter.className}>
    <ReduxProvider>
     <SessionProvider session={session}>
      <ReactQueryProvider>
       <div className="flex min-h-screen w-full min-w-[1400px] flex-col">
        <GlobalNav />
        <main className="m-auto flex-auto px-4 pt-[68px]">{children}</main>
        <Footer />
       </div>
       <Modals />
      </ReactQueryProvider>
     </SessionProvider>
    </ReduxProvider>
   </body>
  </html>
 )
}
