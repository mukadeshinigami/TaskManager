/**MOCK
 * Temporary Task Data
 *
 * Generates and exports mock task data for development.
 *
 * Features:
 * - Creates 10 sample tasks with IDs, titles, descriptions, and full text
 * - All tasks default to 'todo' status
 * - Uses lodash for generation of mock data
 *
 * Note: This is temporary data for development. Replace with database queries in production.
 */

import _ from 'lodash'
import type { Task } from '../types/Task/index'

export const tasks: Task[] = _.times(10, (num) => ({
  id: `task-${num + 1}`,
  title: `Task ${num + 1}`,
  description: `This is the short description for task ${num + 1}.`,
  FullText: _.times(5, (i) => `This is line ${i + 1} of the full text for task ${num + 1}.`).join(''),

  status: 'todo',
}))
