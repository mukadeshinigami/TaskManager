import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import type { TrpcRouter } from '@taskmanager/backend/src/trpc'
import { QueryClient } from '@tanstack/react-query'

export const trpc = createTRPCReact<TrpcRouter>()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})
