package twosum

// TwoSum возвращает индексы двух чисел из nums, дающих в сумме target.
// Решение за один проход с хеш-таблицей: O(n) по времени и памяти.
func TwoSum(nums []int, target int) []int {
	seen := make(map[int]int, len(nums))
	for i, n := range nums {
		if j, ok := seen[target-n]; ok {
			return []int{j, i}
		}
		seen[n] = i
	}
	return nil
}
