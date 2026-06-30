package findtheindexofthefirstoccurrenceinastring

import (
	"reflect"
	"testing"
)

func TestFindTheIndexOfTheFirstOccurrenceInAString(t *testing.T) {
	tests := []struct {
		name     string
		haystack string
		needle   string
		want     int
	}{
		{"empty", "", "sad", -1},
		{"single-negative", "s", "as", -1},
		{"single-positive", "s", "s", 0},
		{"case1", "sadbutsad", "sad", 0},
		{"case2", "leetcode", "leeto", -1},
		{"case3", "hello", "ll", 2},
		{"case4", "mississippi", "issip", 4},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := FindTheIndexOfTheFirstOccurrenceInAString(tt.haystack, tt.needle)
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("RemoveDuplicatesFromSortedArray(%s, %s) = %d, want %d", tt.haystack, tt.needle, got, tt.want)
			}
		})
	}
}
