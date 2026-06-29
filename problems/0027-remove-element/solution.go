package removeelement

// RemoveElement — задача 27. Remove Element
// https://leetcode.com/problems/remove-element/

func RemoveElement(nums []int, val int) int {
	pS := 0
	pF := 0

	for pF < len(nums) {
		if nums[pS] == val && nums[pF] != val {
			nums[pS], nums[pF] = nums[pF], nums[pS]
			pS++
		} else if nums[pS] != val {
			pS++
		}
		pF++
	}

	return pS
}
