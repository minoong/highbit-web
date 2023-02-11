import type { ComponentProps, PropsWithChildren, ReactElement } from 'react'
import Link from 'next/link'
import { Children } from 'react'
import { useMemo } from 'react'

type FooterItemProps = ComponentProps<typeof Link>

type FooterMenuProps = PropsWithChildren<ComponentProps<'dl'>> & {
 title: React.ReactNode
}

function FooterMenuItem(props: FooterItemProps) {
 const { children, className = '', ...rest } = props

 return (
  <Link
   {...rest}
   className={`${className} inline-block ease-in-out after:block after:scale-x-0 after:border-b after:border-b-[#093687]
   after:transition
   after:duration-100
   after:content-['']
   hover:after:scale-x-100
   `}
  >
   {children}
  </Link>
 )
}

function FooterMenuGroup(props: FooterMenuProps) {
 const { title, children, ...rest } = props

 const items = useMemo(
  () => Children.map(children as ReactElement<PropsWithChildren<FooterItemProps>>[], (data) => data),
  [children],
 )

 return (
  <dl {...rest}>
   <dt className="mb-3 font-bold text-[#333]">{title}</dt>
   {items.map((item, index) => (
    <dd key={index} className="w-fit py-1">
     {item}
    </dd>
   ))}
  </dl>
 )
}

FooterMenuItem.displayName = 'FooterMenu.Group'
FooterMenuItem.displayName = 'FooterMenu.Item'

export const FooterComponent = { Group: FooterMenuGroup, Item: FooterMenuItem }
