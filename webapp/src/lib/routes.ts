const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const ViewTaskPageRoutes = getRouteParams({ id: true })
export type ViewTaskPageRoutesParams = typeof ViewTaskPageRoutes

export const TaskManagerRoutes = () => '/'

export const TaskMiniPageRoutes = ({ id }: ViewTaskPageRoutesParams) => `/task/${id}`
export const TodoPageRoutes = () => `/todo`
export const EditingTaskPageRoutes = ({ id }: ViewTaskPageRoutesParams) => `/edit/${id}`
