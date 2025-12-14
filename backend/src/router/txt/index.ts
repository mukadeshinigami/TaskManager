/**
 * LIST All Tasks Procedure
 *
 * Endpoint: /trpc/txt
 * Input: None
 * Output: Object with 'tasks' array containing all tasks (with basic fields)
 *
 * Purpose:
 * - Fetch list of all tasks for display in task manager
 * - Returns: id, title, description, status, FullText for each task
 * - Used for initial task list load and filtering by status
 */

import { trpc } from '../../lib/trpc'
import { getAllTasks } from '../../services/taskService'

export const txtTrpcRoute = trpc.procedure.query(() => {
  const tasks = getAllTasks()
  // Return a shallow-selected view to the client
  return {
    tasks: tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      FullText: task.FullText,
    })),
  }
})
