'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {
 children: React.ReactNode
}

const queryClient = new QueryClient()

function ReactQueryProvider(props: Props) {
 const { children } = props
 return (
  <QueryClientProvider client={queryClient}>
   {children}
   <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
 )
}

export default ReactQueryProvider
