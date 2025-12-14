/**
 * tRPC Configuration & Express Adapter
 *
 * Exports:
 * - trpc: Base tRPC instance for creating procedures and routers
 * - applyTrpcToExpressApp: Middleware function that mounts tRPC routes on Express
 *
 * Usage: Apply middleware to Express app with tRPC router
 */

import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'

import type { TrpcRouter } from './../router/index.js'

export const trpc = initTRPC.create()

export const applyTrpcToExpressApp = (expressApp: Express, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  )
}
