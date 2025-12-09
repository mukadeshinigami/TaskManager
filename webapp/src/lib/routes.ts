/**
 * Creates a map of route parameter strings from the keys of the provided object.
 *
 * @template T - A record type whose keys represent route parameter names. The value type is ignored
 *   by this function (commonly a boolean flag), so `T` is constrained to Record<string, boolean>
 *   to reflect expected usage.
 *
 * @param object - An object whose string keys will be transformed into route parameter segments.
 *   Only the keys are used; the associated boolean values are ignored.
 *
 * @returns A record with the same keys as `object` (typed as `keyof T`) where each value is the
 *   corresponding route parameter string prefixed with `:` (e.g. `{ id: ':id' }`).
 *
 * @remarks
 * - The function iterates over `Object.keys(object)` at runtime, so only string-keyed properties
 *   are considered; symbol keys are omitted.
 * - The returned type is asserted to `Record<keyof T, string>` to reflect the input keys in the
 *   type system, but the runtime representation is built from `string[]` keys.
 * - Useful for generating route parameter templates from a compile-time-known shape.
 *
 * @example
 * // Given: const params = getRouteParams({ id: true, page: false })
 * // Returns: { id: ':id', page: ':page' }
 *
 * @example
 * // Empty input:
 * // getRouteParams({}) -> {}
 */
const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const ViewTaskPageRoutes = getRouteParams({ id: true })
export type ViewTaskPageRoutesParams = typeof ViewTaskPageRoutes

export const TaskManagerRoutes = () => '/'

export const TaskMiniPageRoutes = ({ id }: ViewTaskPageRoutesParams) => `/task/${id}`
export const TodoPageRoutes = () => `/todo`
export const EditingTaskPageRoutes = ({ id }: ViewTaskPageRoutesParams) => `/edit/${id}`
