// O(w) operation
let binary_digits = n => {
	let digits = 0
	while (n > 0) {
		n = n >> 1
		digits++
	}
	return digits
}

// O(n) operation, constant time amortized
let array_max = xs => {
	let max = xs[0]
	for (let i = 1; i < xs.length; i++) {
		let el = xs[i]
		if (max < el) {
			max = el
		}
	}
	return max
}

let radix_sort = xs => {
	let digits = binary_digits(array_max(xs))
	xs = [xs, []]
	for (let i = 0; i < digits; i++) {
		xs = digit_sort(xs, i)
	}
	return xs[0].concat(xs[1])
}

let digit_sort = ([i0, i1], digit) => {
	let o0 = []
	let o1 = []
	let bitmask = 1 << digit
	for (let i = 0; i < i0.length; i++) {
		((bitmask & i0[i]) === 0 ? o0 : o1).push(i0[i])
    }
	for (let i = 0; i < i1.length; i++) {
		((bitmask & i1[i]) === 0 ? o0 : o1).push(i1[i])
    }
	return [o0, o1]
}

export default radix_sort
