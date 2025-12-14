/**
 * UPDATE Task Procedure
 *
 * Endpoint: /trpc/update
 * Input: { id, data } where data is partial Task
 * Output: Updated Task or null
 */

import { z } from 'zod'
import { trpc } from '../../lib/trpc'
import type { TaskService } from '../../services/taskService'
import type { Task } from '../../types/Task/index'

const updateDataSchema = z
  .object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().optional().nullable(),
    FullText: z.string().optional().nullable(),
    status: z.enum(['todo', 'progress', 'review', 'done']).optional(),
  })
  .partial()

export const createUpdateRoute = (taskService: TaskService) =>
  trpc.procedure.input(z.object({ id: z.string(), data: updateDataSchema })).mutation(async ({ input }) => {
    // sanitize incoming data: convert explicit nulls to undefined so they match Partial<Task>
    const raw = input.data as Record<string, unknown>
    const sanitized: Partial<Task> = {}

    if ('title' in raw) {
      sanitized.title = (raw.title as string) ?? undefined
    }
    if ('description' in raw) {
      sanitized.description = raw.description === null ? undefined : (raw.description as string | undefined)
    }
    if ('FullText' in raw) {
      sanitized.FullText = raw.FullText === null ? undefined : (raw.FullText as string | undefined)
    }
    if ('status' in raw) {
      sanitized.status = raw.status as Task['status'] | undefined
    }

    const updated = await taskService.updateTask(input.id, sanitized)
    return updated
  })
