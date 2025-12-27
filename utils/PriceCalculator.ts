export function calculateTotal(subtotals: number[]): number {
  return subtotals.reduce((sum, value) => sum + value, 0);
}
