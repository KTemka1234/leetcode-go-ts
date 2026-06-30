// findTheIndexOfTheFirstOccurrenceInAString — задача 28. Find The Index Of The First Occurrence In A String
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

export function findTheIndexOfTheFirstOccurrenceInAString(haystack: string, needle: string): number {
  let pL = 0;
  let pR = 0;
  let pN = 0;

  while (pR < haystack.length) {
    while (pN < needle.length && pR < haystack.length) {
      if (needle[pN] !== haystack[pR]) {
        pL++;
        pR = pL;
        pN = 0;
        break;
      }
      pR++;
      pN++;
    }
    if (pN == needle.length) {
        return pL;
    }
  }
  
  return -1;
}
