// Package golib содержит общие структуры данных, которые часто встречаются
// в задачах LeetCode (связные списки, деревья), и хелперы для их построения
// из срезов — удобно использовать в тестах.
package golib

// ListNode — узел односвязного списка (определение LeetCode).
type ListNode struct {
	Val  int
	Next *ListNode
}

// BuildList строит связный список из среза значений и возвращает его голову.
// Для пустого среза возвращает nil.
func BuildList(values []int) *ListNode {
	dummy := &ListNode{}
	cur := dummy
	for _, v := range values {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return dummy.Next
}

// ListToSlice разворачивает связный список обратно в срез значений.
func ListToSlice(head *ListNode) []int {
	out := []int{}
	for n := head; n != nil; n = n.Next {
		out = append(out, n.Val)
	}
	return out
}

// TreeNode — узел бинарного дерева (определение LeetCode).
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// BuildTree строит бинарное дерево из level-order представления, где nil
// обозначает отсутствующий узел (как в формате ввода LeetCode).
// Пример: []*int{ptr(1), nil, ptr(2), ptr(3)}.
func BuildTree(values []*int) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}
	root := &TreeNode{Val: *values[0]}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]
		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: *values[i]}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: *values[i]}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}
