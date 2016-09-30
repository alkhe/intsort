import { expect } from 'chai'
import intsort from '../lib'

let allocate = size => Array(size).fill(0)
let nativesort = x => x.slice().sort((a, b) => a - b)

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
})
