package removeduplicatesfromsortedarray

import (
	"reflect"
	"testing"
)

func TestRemoveDuplicatesFromSortedArray(t *testing.T) {
	tests := []struct {
		name string
		nums []int
		want int
	}{
		{"short", []int{1, 1, 2}, 2},
		{"long", []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}, 5},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := RemoveDuplicatesFromSortedArray(tt.nums)
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("RemoveDuplicatesFromSortedArray(%v) = %d, want %d", tt.nums, got, tt.want)
			}
		})
	}
}
