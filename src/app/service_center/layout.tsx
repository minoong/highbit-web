function Layout({ children }: { children: React.ReactNode }) {
 return (
  <div className="m-auto flex w-full gap-3">
   <aside className="w-[192px] bg-slate-500">sfd</aside>
   <aside className="w-[960px] bg-white">{children}</aside>
  </div>
 )
}

export default Layout
