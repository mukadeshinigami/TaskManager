/**
 *Main tRPC Router
 *
 *Combines all procedure routes into a single router.
 *
 *Routes:
 *-/trpc/txt: Fetch all tasks (text/listing route)
 *-/trpc/get: Fetch single task details by ID (get/detail route)
 *
 *Exports:
 *-trpcRouter: Complete router instance
 *-TrpcRouter: Type definition for the router (used by frontend)
 */

import { trpc } from './../lib/trpc'
import { getTrpcRoute } from './get/index'
import { txtTrpcRoute } from './txt/index'

export type TrpcRouter = typeof trpcRouter

export const trpcRouter = trpc.router({
  txt: txtTrpcRoute,
  get: getTrpcRoute,
})
