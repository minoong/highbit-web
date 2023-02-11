import type { ComponentProps, PropsWithChildren, ReactElement } from 'react'
import Link from 'next/link'
import { Children } from 'react'
import { useMemo } from 'react'

type FooterItemProps = ComponentProps<typeof Link>

type FooterMenuProps = PropsWithChildren<ComponentProps<'dl'>> & {
 title: React.ReactNode
}

function FooterMenuItem(props: FooterItemProps) {
 const { children, className = 'hover:underline', ...rest } = props

 return (
  <Link {...rest} className={className}>
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
    <dd key={index} className="py-1">
     {item}
    </dd>
   ))}
  </dl>
 )
}

FooterMenuItem.displayName = 'FooterMenu.Group'
FooterMenuItem.displayName = 'FooterMenu.Item'

export const FooterComponent = { Group: FooterMenuGroup, Item: FooterMenuItem }
