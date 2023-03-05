import Link from 'next/link'
import React from 'react'
import { FooterComponent } from '~/components/Footer/FooterMenu'

function Footer() {
 return (
  <footer className="mt-20 w-full bg-white py-5">
   <div className="m-auto flex min-w-[1200px] max-w-[1400px] justify-between p-4">
    <div>
     <Link
      href="/"
      className="inline-block bg-gradient-to-r from-yellow-300 via-blue-600 to-rose-800 bg-clip-text text-3xl font-extrabold tracking-widest text-transparent"
     >
      hightbit
     </Link>
    </div>
    <div className="ml-16 flex flex-1 flex-col text-sm">
     <div className="flex-1 text-[#333]">
      <span className='bg-white font-normal after:pl-2 after:text-[#ddd] after:content-["|"] [&:not(first)]:after:pr-2'>
       고객센터
      </span>
      <span className='bg-white font-normal after:pl-2 after:text-[#ddd] after:content-["|"] [&:not(first)]:after:pr-2'>
       02-1588-9323
      </span>
      <span className="bg-white font-normal">서울시 서초동 반포대로</span>
     </div>
     <div className="text-[#999]">Copyright © 2017 - 2023 Highbit Inc. All rights reserved.</div>
    </div>
    <div className="flex flex-row gap-64 text-sm text-[#666]">
     <FooterComponent.Group title="회사">
      <FooterComponent.Item href="/">회사소개</FooterComponent.Item>
      <FooterComponent.Item href="/">공지사항</FooterComponent.Item>
      <FooterComponent.Item href="/">이용약관</FooterComponent.Item>
      <FooterComponent.Item href="/">투자자보호센터</FooterComponent.Item>
     </FooterComponent.Group>

     <FooterComponent.Group title="고객지원">
      <FooterComponent.Item href="/">자주하는 질문(FAQ)</FooterComponent.Item>
      <FooterComponent.Item href="/">카카오톡 문의(24시간)</FooterComponent.Item>
      <FooterComponent.Item href="/">1:1 문의하기</FooterComponent.Item>
      <FooterComponent.Item href="/">거래 이용 안내</FooterComponent.Item>
      <FooterComponent.Item href="/">입출금 이용 안내</FooterComponent.Item>
     </FooterComponent.Group>
    </div>
   </div>
  </footer>
 )
}

export default Footer
