'use client'

import type { TickerSortType } from '~/features/tickers/tickersSlice'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { tickerSort } from '~/features/tickers/tickersSlice'
import { useAppDispatch, useAppSelector } from '~/hooks'

const sortImages = {
 default: '/images/ico_sort_default.png',
 desc: '/images/ico_sort_down.png',
 asc: '/images/ico_sort_up.png',
}

function TickerSort() {
 const search = useSearchParams()
 const path = usePathname()
 const sortType = useAppSelector((state) => state.tickers.sort)
 const dispatch = useAppDispatch()

 const handleSort = (sort: TickerSortType) => {
  dispatch(tickerSort(sort))
 }

 return (
  <div className="flex h-[30px] w-[400px] max-w-[400px] cursor-default flex-wrap items-center bg-white text-center text-xs text-[#666666]">
   <div className="flex w-[146px] items-center justify-center gap-1">
    <div>한글명</div>
    <div className="h-[10px] w-[7px]">
     <Image src={'/images/ico_swap.png'} alt="한글명" width={7} height={10} priority />
    </div>
   </div>
   <div className="flex w-[88px] items-center justify-center gap-1">
    <Link
     href={`${path}?code=${search?.get('code')}`}
     onClick={() => handleSort(sortType === 'tradePriceDesc' ? 'tradePriceAsc' : 'tradePriceDesc')}
    >
     현재가
     <Image
      src={
       sortType === 'tradePriceDesc'
        ? sortImages.desc
        : sortType === 'tradePriceAsc'
        ? sortImages.asc
        : sortImages.default
      }
      alt="현재가"
      width={5}
      height={10}
      priority
      className="ml-1 inline-block"
     />
    </Link>
   </div>
   <div className="flex w-[78px] items-center justify-center gap-1">
    <Link
     href={`${path}?code=${search?.get('code')}`}
     onClick={() => handleSort(sortType === 'changeRateDesc' ? 'changeRateAsc' : 'changeRateDesc')}
    >
     전일대비
     <Image
      src={
       sortType === 'changeRateDesc'
        ? sortImages.desc
        : sortType === 'changeRateAsc'
        ? sortImages.asc
        : sortImages.default
      }
      alt="전일대비"
      width={5}
      height={10}
      priority
      className="ml-1 inline-block"
     />
    </Link>
   </div>
   <div className="flex w-[88px] items-center justify-center gap-1">
    <Link
     href={`${path}?code=${search?.get('code')}`}
     onClick={() => handleSort(sortType === 'tradePrice24hDesc' ? 'tradePrice24hAsc' : 'tradePrice24hDesc')}
    >
     거래대금
     <Image
      src={
       sortType === 'tradePrice24hDesc'
        ? sortImages.desc
        : sortType === 'tradePrice24hAsc'
        ? sortImages.asc
        : sortImages.default
      }
      alt="거래대금"
      width={5}
      height={10}
      priority
      className="ml-1 inline-block"
     />
    </Link>
   </div>
  </div>
 )
}

export default React.memo(TickerSort)
