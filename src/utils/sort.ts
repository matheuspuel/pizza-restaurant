export type SortFn<A> = (a: A, b: A) => -1 | 0 | 1

/**
 * Immutable version of the sort function
 */
export const sort = <A>(as: A[], fn: SortFn<A>) => [...as].sort(fn)

export const sortNumber: SortFn<number> = (a, b) =>
  a === b ? 0 : a < b ? -1 : 1

export const sortString: SortFn<string> = (a, b) =>
  a === b ? 0 : a < b ? -1 : 1

export const sortBoolean: SortFn<boolean> = (a, b) =>
  a === b ? 0 : a === false ? -1 : 1

export const reverseSort =
  <A>(fn: SortFn<A>): SortFn<A> =>
  (a, b) => {
    const result = fn(a, b)
    return result === -1 ? 1 : result === 1 ? -1 : 0
  }

/**
 * Derive a new sort function from a map function and a simpler sort function
 */
export const contramapSort =
  <A, B>(getValue: (a: A) => B, sortFn: SortFn<B>): SortFn<A> =>
  (a, b) =>
    sortFn(getValue(a), getValue(b))

/**
 * Define alternative sort functions in case the items are equivalent
 */
export const combineSort =
  <A>(...fns: SortFn<A>[]): SortFn<A> =>
  (a: A, b: A) =>
    fns.reduce((acc: -1 | 0 | 1, fn) => (acc === 0 ? fn(a, b) : acc), 0)
