/**
 * Task Service
 *
 * Thin service layer that exposes task-related business functions.
 * This wraps the temporary data source and provides a single place
 * to replace with a real database later.
 */

import { tasks } from '../lib/create_temporary_task'
import type { Task } from '../types/Task/index'

export const getAllTasks = (): Task[] => {
  return tasks
}

export const getTaskById = (id: string): Task | null => {
  const found = tasks.find((t) => t.id === id)
  return found ?? null
}

export default {
  getAllTasks,
  getTaskById,
}
