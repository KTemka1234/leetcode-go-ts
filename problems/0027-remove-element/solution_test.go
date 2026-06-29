package removeelement

import (
	"reflect"
	"testing"
)

func TestRemoveElement(t *testing.T) {
	tests := []struct {
		name string
		nums []int
		val  int
		want int
	}{
		{"empty", []int{}, 3, 0},
		{"single-negative", []int{0}, 3, 1},
		{"single-positive", []int{3}, 3, 0},
		{"short", []int{3, 2, 2, 3}, 3, 2},
		{"long", []int{0, 1, 2, 2, 3, 0, 4, 2}, 2, 5},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := RemoveElement(tt.nums, tt.val)
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("RemoveDuplicatesFromSortedArray(%v, %d) = %d, want %d", tt.nums, tt.val, got, tt.want)
			}
		})
	}
}
