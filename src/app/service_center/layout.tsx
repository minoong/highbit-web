import { FooterComponent } from '~/components/Footer/FooterMenu'

function Layout({ children }: { children: React.ReactNode }) {
 return (
  <div className="m-auto flex w-full gap-3">
   <aside className="h-fit w-[192px] bg-slate-500">
    <div className="bg-slate-800 p-10">
     <h1 className="text-2xl font-bold text-white">고객센터</h1>
    </div>
    <div className="bg-white py-7">
     <FooterComponent.Group title="">
      <FooterComponent.Item href="/service_center/notice" className="pl-7 text-lg">
       공지사항
      </FooterComponent.Item>
      <FooterComponent.Item href="/service_center/notice" className="pl-7 text-lg">
       하이비트소식
      </FooterComponent.Item>
     </FooterComponent.Group>
    </div>
   </aside>
   <aside className="w-[960px] bg-white">{children}</aside>
  </div>
 )
}

export default Layout
