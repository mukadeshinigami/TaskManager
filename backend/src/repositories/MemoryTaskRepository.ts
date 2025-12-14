/**
 * In-Memory Task Repository
 *
 * Implementation using temporary mock data.
 * Can be replaced with DbTaskRepository for production.
 */

import type { ITaskRepository } from './ITaskRepository'
import type { Task } from '../types/Task/index'
import { tasks } from '../lib/create_temporary_task'

export class MemoryTaskRepository implements ITaskRepository {
  async findAll(): Promise<Task[]> {
    return tasks
  }

  async findById(id: string): Promise<Task | null> {
    const found = tasks.find((t) => t.id === id)
    return found ?? null
  }

  async create(data: Omit<Task, 'id'>): Promise<Task> {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...data,
    }
    tasks.push(newTask)
    return newTask
  }

  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    const task = tasks.find((t) => t.id === id)
    if (!task) {
      return null
      return null
    }

    Object.assign(task, data)
    return task
  }

  async delete(id: string): Promise<boolean> {
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) {
      return false
    }

    tasks.splice(index, 1)
    return true
  }
}
