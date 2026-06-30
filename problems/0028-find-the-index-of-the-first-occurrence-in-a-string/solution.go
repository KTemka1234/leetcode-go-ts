package findtheindexofthefirstoccurrenceinastring

// FindTheIndexOfTheFirstOccurrenceInAString — задача 28. Find The Index Of The First Occurrence In A String
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

func FindTheIndexOfTheFirstOccurrenceInAString(haystack string, needle string) int {
	pL := 0
	pR := 0
	pN := 0

	for pR < len(haystack) {
		for pN < len(needle) && pR < len(haystack) {
			if needle[pN] != haystack[pR] {
				pL++
				pR = pL
				pN = 0
				break
			}
			pR++
			pN++
		}
		if pN == len(needle) {
			return pL
		}
	}

	return -1
}
