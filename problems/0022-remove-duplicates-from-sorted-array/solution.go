package removeduplicatesfromsortedarray

// RemoveDuplicatesFromSortedArray — задача 22. Remove Duplicates From Sorted Array
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/
//
// TODO: реализовать решение.
func RemoveDuplicatesFromSortedArray(nums []int) int {
	pS := 0
	pF := 0
	for pF < len(nums) {
		if nums[pS] != nums[pF] {
			pS++
			nums[pS], nums[pF] = nums[pF], nums[pS]
		}
		pF++
	}
	return pS + 1
}
