import { useObservable, useSubscription } from 'observable-hooks'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosClose } from 'react-icons/io'
import { debounceTime, distinctUntilChanged, map } from 'rxjs'
import { tickerSearch } from '~/features/tickers/tickersSlice'
import { useAppDispatch } from '~/hooks'

function TickerSearch() {
 const [searchSymbol, setSearchSymbol] = useState<string>('')
 const dispatch = useAppDispatch()

 const value$ = useObservable(
  (inputs$) =>
   inputs$.pipe(
    map(([value]) => value),
    debounceTime(150),
    distinctUntilChanged(),
   ),
  [searchSymbol],
 )

 const handleSearchSybol = (searchSymbol: string) => {
  dispatch(tickerSearch(searchSymbol))
 }

 useSubscription(value$, handleSearchSybol)

 function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
  setSearchSymbol(e.target.value)
 }

 function handleOnkeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Escape') {
   setSearchSymbol('')
  }
 }

 function handleCloseOnClick() {
  setSearchSymbol('')
 }

 return (
  <div className="relative flex w-full items-center border-b bg-white p-1">
   <input
    className="flex-1 border-0 p-1 pr-9 text-xs font-bold text-[#333] outline-none"
    type="text"
    placeholder="코인명/심볼검색"
    value={searchSymbol}
    onChange={handleOnChange}
    onKeyDown={handleOnkeyDown}
   />
   {searchSymbol && (
    <button className="absolute right-[34px]" onClick={handleCloseOnClick}>
     <IoIosClose size={24} />
    </button>
   )}
   <AiOutlineSearch size={24} fill="#1261c4" />
  </div>
 )
}

export default React.memo(TickerSearch)
