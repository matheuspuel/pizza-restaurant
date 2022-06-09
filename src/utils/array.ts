export const rangeArray = (size: number = 0) =>
  Array(size)
    .fill(null)
    .map((v, i) => i)
