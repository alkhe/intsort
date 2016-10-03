import { expect } from 'chai'
import intsort, { lensort } from '..'

let allocate = size => Array(size).fill(0)
let nativesort = (xs, cmp = (a, b) => a - b) => xs.slice().sort(cmp)

describe('intsort', () => {

	let tiny = [1, 6, 3, 2, 7, 9, 4]
	let tiny_sorted = nativesort(tiny)
	let tiny_result = intsort(tiny)
	
	it('should sort tiny integer arrays', () => {
		expect(tiny_result).to.deep.equal(tiny_sorted)
	})

	it('should not mutate original array', () => {
		expect(tiny_result).to.not.deep.equal(tiny)
	})
	
	let small = allocate(100).map(() => Math.random() * 100 | 0)
	let small_sorted = nativesort(small)
	let small_result = intsort(small)

	it('should sort small integer arrays', () => {
		expect(small_result).to.deep.equal(small_sorted)
	})
	
	let med = allocate(1000).map(() => Math.random() * 1000 | 0)
	let med_sorted = nativesort(med)
	let med_result = intsort(med)

	it('should sort medium integer arrays', () => {
		expect(med_result).to.deep.equal(med_sorted)
	})
	
	let large = allocate(10000).map(() => Math.random() * 10000 | 0)
	let large_sorted = nativesort(large)
	let large_result = intsort(large)

	it('should sort large integer arrays', () => {
		expect(large_result).to.deep.equal(large_sorted)
	})
})

describe('lensort', () => {
	let complex = (n, extra) => ({ n, extra })

	let tiny_complex = [
		[1, 2],
		[3, 6],
		[2, 7],
		[2, 3],
		[3, 1],
		[8, 3]
	].map(args => complex(...args))
	let tiny_complex_sorted = [
		[1, 2],
		[2, 7],
		[2, 3],
		[3, 6],
		[3, 1],
		[8, 3]
	].map(args => complex(...args))	
	let tiny_complex_result = lensort(tiny_complex, x => x.n)

	it('should perform a stable sort', () => {
		expect(tiny_complex_result).to.deep.equal(tiny_complex_sorted)
	})
	
})
