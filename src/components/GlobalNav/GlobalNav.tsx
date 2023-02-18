'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { shallowEqual } from 'react-redux'
import GlobalNavLink from '~/components/GlobalNav/GlobalNavLink'
import { selectedMarketSelector } from '~/features/marketInfo/marketInfoSlice'
import { clear } from '~/features/notice/noticeSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'

function GlobalNav() {
 const pathname = usePathname()
 const dispatch = useAppDispatch()
 const router = useRouter()
 const selectedMarket = useAppSelector(selectedMarketSelector, shallowEqual)

 const handleExchangePageLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault()
  e.stopPropagation()

  router.replace(`/exchange?code=${selectedMarket}`)
 }

 return (
  <header className="fixed z-50 w-full select-none bg-[#093687]">
   <nav className="m-auto flex min-w-[1200px] max-w-[1400px] items-center justify-between p-4">
    <section className="flex items-center">
     <Link
      href="/"
      className="inline-block bg-gradient-to-r from-yellow-300 via-teal-50 to-rose-800 bg-clip-text text-3xl font-extrabold tracking-widest text-transparent"
     >
      hightbit
     </Link>
     <ul className="ml-20 flex items-center space-x-10">
      <li>
       <GlobalNavLink path="/exchange" matched={pathname === '/exchange'} onClick={handleExchangePageLink}>
        거래소
       </GlobalNavLink>
      </li>
      <li>
       <GlobalNavLink path="/balances" matched={pathname === '/balances'}>
        입출금
       </GlobalNavLink>
      </li>
      <li>
       <GlobalNavLink path="/investments/balance" matched={pathname === '/investments/balance'}>
        투자내역
       </GlobalNavLink>
      </li>
      <li>
       <GlobalNavLink
        path="/service_center/notice"
        matched={pathname === '/service_center/notice'}
        onClick={() => dispatch(clear())}
       >
        고객센터
       </GlobalNavLink>
      </li>
     </ul>
    </section>
   </nav>
  </header>
 )
}

export default GlobalNav
