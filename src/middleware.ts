import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { store } from '~/store/store'

export function middleware(req: NextRequest) {
 if (req.nextUrl.pathname.startsWith('/exchange') && !req.nextUrl.search) {
  const reduxStore = store.getState()
  const symbol = reduxStore.marketInfo.selected

  return NextResponse.redirect(new URL(`/exchange/?code=${symbol}`, req.url))
 }

 return NextResponse.next()
}
