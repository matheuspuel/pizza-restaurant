export type SortFn<A> = (a: A, b: A) => -1 | 0 | 1

/**
 * Immutable version of the sort function
 */
export const sort = <A>(as: A[], fn: SortFn<A>) => [...as].sort(fn)

export const sortNumber: SortFn<number> = (a, b) =>
  a === b ? 0 : a < b ? -1 : 1

export const sortString: SortFn<string> = (a, b) =>
  a === b ? 0 : a < b ? -1 : 1

export const reverseSort =
  <A>(fn: SortFn<A>): SortFn<A> =>
  (a, b) => {
    const result = fn(a, b)
    return result === -1 ? 1 : result === 1 ? -1 : 0
  }

export const contramapSort =
  <A, B>(getValue: (a: A) => B) =>
  (sortFn: SortFn<B>): SortFn<A> =>
  (a, b) =>
    sortFn(getValue(a), getValue(b))
