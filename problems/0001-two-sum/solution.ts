/**
 * Возвращает индексы двух чисел из nums, дающих в сумме target.
 * Один проход с хеш-таблицей: O(n) по времени и памяти.
 */
export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}
