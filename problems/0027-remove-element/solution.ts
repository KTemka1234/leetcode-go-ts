// removeElement — задача 27. Remove Element
// https://leetcode.com/problems/remove-element/

export function removeElement(nums: number[], val: number): number {
  let pS = 0;
  let pF = 0;

  while (pF < nums.length) {
    if (nums[pS] === val && nums[pF] !== val) {
      [nums[pS], nums[pF]] = [nums[pF], nums[pS]];
      pS++;
    } else if (nums[pS] !== val) {
      pS++;
    }
    pF++;
  }

  return pS;
}
