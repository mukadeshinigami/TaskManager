/**
 * Backend Entry Point
 *
 * Initializes the Express server with:
 * - CORS middleware for cross-origin requests
 * - tRPC middleware for type-safe RPC endpoints
 * - Health check endpoint (/ping)
 *
 * Server runs on http://localhost:3000/
 */

import express from 'express'
import { trpcRouter } from './router/'
import cors from 'cors'

import { applyTrpcToExpressApp } from './lib/trpc'

const expressApp = express()

expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.info('Listening http://localhost:3000/')
})
