/**
 * GET Task Details Procedure
 *
 * Endpoint: /trpc/get
 * Input: Task ID (string)
 * Output: Task object with id, title, description, FullText, and status
 *
 * Purpose:
 * - Fetch detailed information for a single task by ID
 * - Includes full text content (loaded on-demand from frontend)
 * - Returns null if task not found
 *
 * TODO: Add authentication/permission checks in context before returning FullText
 */

import { z } from 'zod'

import { trpc } from '../../lib/trpc'
import type { TaskService } from '../../services/taskService'

export const createGetRoute = (taskService: TaskService) =>
  trpc.procedure.input(z.string()).query(async ({ input /*, ctx */ }) => {
    // TODO: check ctx for auth/permissions before returning FullText
    const task = await taskService.getTaskById(input)
    if (!task) {
      return null
    }
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      FullText: task.FullText,
      status: task.status,
    }
  })
