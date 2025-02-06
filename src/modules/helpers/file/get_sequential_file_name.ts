export function getSequentialFileName(numbers: number[]) {
  if (!numbers || numbers.length === 0) {
    return null
  }

  const sorted = numbers.sort((a, b) => a - b);

  const result: string[] = [];

  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      result.push(start === end ? `${start}` : `${start}-${end}`);
      start = sorted[i];
      end = sorted[i];
    }
  }

  result.push(start === end ? `${start}` : `${start}-${end}`);

  return result.join("_");
}
