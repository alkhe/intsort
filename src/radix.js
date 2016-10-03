// O(w) operation
function binary_digits(n) {
	var digits = 0
	while (n > 0) {
		n >>= 1
		digits++
	}
	return digits
}

// O(n) operation, constant time amortized
function array_max(xs) {
	var max = xs[0]
	for (var i = 1; i < xs.length; i++) {
		var n = xs[i]
		if (max < n) {
			max = n
		}
	}
	return max
}

function digit_sort([i0, i1], bitmask) {
	var o0 = []
	var o1 = []
	for (var i = 0; i < i0.length; i++) {
		((bitmask & i0[i]) === 0 ? o0 : o1).push(i0[i])
    }
	for (var i = 0; i < i1.length; i++) {
		((bitmask & i1[i]) === 0 ? o0 : o1).push(i1[i])
    }
	return [o0, o1]
}

export default function(xs) {
	var digits = binary_digits(array_max(xs))
	xs = [xs, []]
	for (var i = 0, bitmask = 1; i < digits; i++, bitmask <<= 1) {
		xs = digit_sort(xs, bitmask)
	}
	return xs[0].concat(xs[1])
}

// O(n) operation, constant time amortized
function array_max_lens(xs, lens) {
	var max = lens(xs[0])
	for (var i = 1; i < xs.length; i++) {
		var n = lens(xs[i])
		if (max < n) {
			max = n
		}
	}
	return max
}

function digit_sort_lens([i0, i1], bitmask, lens) {
	var o0 = []
	var o1 = []
	for (var i = 0; i < i0.length; i++) {
		((bitmask & lens(i0[i])) === 0 ? o0 : o1).push(i0[i])
    }
	for (var i = 0; i < i1.length; i++) {
		((bitmask & lens(i1[i])) === 0 ? o0 : o1).push(i1[i])
    }
	return [o0, o1]
}

export let lensort = function(xs, lens = x => x) {
	var digits = binary_digits(array_max_lens(xs, lens))
	xs = [xs, []]
	for (var i = 0, bitmask = 1; i < digits; i++, bitmask <<= 1) {
		xs = digit_sort_lens(xs, bitmask, lens)
	}
	return xs[0].concat(xs[1])
}
