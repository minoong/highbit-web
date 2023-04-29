import type { Metadata } from 'next'
import InteractiveCard from '~/components/InteractiveCard/InteractiveCard'

export const metadata: Metadata = {
 title: 'highbit',
 description: 'highbit',
}

export default function Home() {
 return (
  <div className="m-auto mt-4 grid w-[1410px]">
   <InteractiveCard>
    <div className="text-3xl font-bold text-blue-600">Hello</div>
   </InteractiveCard>
  </div>
 )
}
