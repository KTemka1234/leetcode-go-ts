// removeDuplicatesFromSortedArray — задача 22. Remove Duplicates From Sorted Array
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/

export function removeDuplicatesFromSortedArray(nums: number[]): number {
  let pS = 0;
  let pF = 0;

  while (pF < nums.length) {
    if (nums[pS] != nums[pF]) {
      pS++;
      [nums[pS], nums[pF]] = [nums[pF], nums[pS]];
    }
    pF++;
  }
  return pS + 1;
}
