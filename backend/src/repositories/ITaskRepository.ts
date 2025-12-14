/**
 * Task Repository Interface
 *
 * Defines contract for task data access layer.
 * Implementations can use in-memory storage, database, or external APIs.
 */

import type { Task } from '../types/Task/index'

export type ITaskRepository = {
  /**
   * Get all tasks
   */
  findAll(): Promise<Task[]>

  /**
   * Get task by ID
   * @param id - Task ID
   * @returns Task if found, null otherwise
   */
  findById(id: string): Promise<Task | null>

  /**
   * Create new task (for future use)
   */
  create?(data: Omit<Task, 'id'>): Promise<Task>

  /**
   * Update task (for future use)
   */
  update?(id: string, data: Partial<Task>): Promise<Task | null>

  /**
   * Delete task (for future use)
   */
  delete?(id: string): Promise<boolean>
}
