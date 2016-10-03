import { Benchmark } from 'benchmark'
import intsort, { lensort } from '..'

let allocate = size => Array(size).fill(0)
let inplace_nativesort = (xs, cmp = (a, b) => a - b) => xs.sort(cmp)
let random = size => Math.random() * size | 0

let c = allocate(100).map(() => random(100))
let k = allocate(1000).map(() => random(1000))
let M = allocate(1000000).map(() => random(1000000))

let c_inorder = allocate(100).map((_, i) => i)
let k_inorder = allocate(1000).map((_, i) => i)
let M_inorder = allocate(1000000).map((_, i) => i)

let c_lens = allocate(100).map(() => ({ n: random(100) }))
let k_lens = allocate(1000).map(() => ({ n: random(1000) }))

let make_sort_benchmark = (name, array, sort) =>
	Benchmark(name, {
		input: array,
		sort,
		onCycle() {
			this.memory = this.input.slice()
		},
		setup() {
			this.memory = this.input.slice()
		},
		fn() {
			this.sort(this.memory)
		},
		onComplete() {
			let stats = this.stats
			console.log(this.name)
			console.log(`${ (stats.mean * 1000).toFixed(4) } ms ± ${ (stats.rme).toFixed(2) }%`)
		}
	})


let impl_c = make_sort_benchmark('impl_c', c, intsort).run()
let impl_k = make_sort_benchmark('impl_k', k, intsort).run()
let impl_M = make_sort_benchmark('impl_M', M, intsort).run()
let impl_c_inorder = make_sort_benchmark('impl_c_inorder', c_inorder, intsort).run()
let impl_k_inorder = make_sort_benchmark('impl_k_inorder', k_inorder, intsort).run()
let impl_M_inorder = make_sort_benchmark('impl_M_inorder', M_inorder, intsort).run()
let impl_c_lens = make_sort_benchmark('impl_c_lens', c_lens, xs => lensort(xs, x => x.n)).run()
let impl_k_lens = make_sort_benchmark('impl_k_lens', k_lens, xs => lensort(xs, x => x.n)).run()

let control_c = make_sort_benchmark('control_c', c, inplace_nativesort).run()
let control_k =	make_sort_benchmark('control_k', k, inplace_nativesort).run()
let control_M = make_sort_benchmark('control_M', M, inplace_nativesort).run()
let control_c_inorder = make_sort_benchmark('control_c_inorder', c_inorder, inplace_nativesort).run()
let control_k_inorder = make_sort_benchmark('control_k_inorder', k_inorder, inplace_nativesort).run()
let control_M_inorder = make_sort_benchmark('control_M_inorder', M_inorder, inplace_nativesort).run()
let control_c_lens = make_sort_benchmark('control_c_lens', c_lens, xs => inplace_nativesort(xs, (a, b) => a.n - b.n)).run()
let control_k_lens = make_sort_benchmark('control_k_lens', k_lens, xs => inplace_nativesort(xs, (a, b) => a.n - b.n)).run()

