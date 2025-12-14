/**
 * Task Service
 *
 * Business logic layer for task operations.
 * Accepts repository via dependency injection.
 * All methods are async to support both memory and database implementations.
 */

import type { ITaskRepository } from '../repositories/ITaskRepository'
import type { Task } from '../types/Task/index'

export const createTaskService = (repository: ITaskRepository) => ({
  /**
   * Get all tasks
   */
  getAllTasks: async (): Promise<Task[]> => {
    return repository.findAll()
  },

  /**
   * Get task by ID
   */
  getTaskById: async (id: string): Promise<Task | null> => {
    return repository.findById(id)
  },

  /**
   * Create new task
   */
  createTask: async (data: Omit<Task, 'id'>): Promise<Task> => {
    if (!repository.create) {
      throw new Error('Repository does not support create operation')
    }
    // Prevent duplicate titles (case-insensitive)
    const all = await repository.findAll()
    const exists = all.some((t) => String(t.title).trim().toLowerCase() === String(data.title).trim().toLowerCase())
    if (exists) {
      const err: any = new Error('Task title already exists')
      err.code = 'DUPLICATE_TITLE'
      throw err
    }

    return repository.create(data)
  },

  /**
   * Update task
   */
  updateTask: async (id: string, data: Partial<Task>): Promise<Task | null> => {
    if (!repository.update) {
      throw new Error('Repository does not support update operation')
    }
    return repository.update(id, data)
  },

  /**
   * Delete task
   */
  deleteTask: async (id: string): Promise<boolean> => {
    if (!repository.delete) {
      throw new Error('Repository does not support delete operation')
    }
    return repository.delete(id)
  },
})

export type TaskService = ReturnType<typeof createTaskService>
