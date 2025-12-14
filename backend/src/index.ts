/**
 * Backend Entry Point
 *
 * Initializes the Express server with:
 * - CORS middleware for cross-origin requests
 * - tRPC middleware for type-safe RPC endpoints
 * - Health check endpoint (/ping)
 * - Dependency injection setup (repository → service → router)
 *
 * Server runs on http://localhost:3000/
 */

import express from 'express'
import cors from 'cors'

import { applyTrpcToExpressApp } from './lib/trpc'
import { createTrpcRouter } from './router/index'
import { createTaskService } from './services/taskService'
import { MemoryTaskRepository } from './repositories/MemoryTaskRepository'

// Initialize repository, service, and router with dependency injection
const taskRepository = new MemoryTaskRepository()
const taskService = createTaskService(taskRepository)
const trpcRouter = createTrpcRouter(taskService)

const expressApp = express()

expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.info('Listening http://localhost:3000/')
})
