'use strict';

var _benchmark = require('benchmark');

var _2 = require('..');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allocate = function allocate(size) {
	return Array(size).fill(0);
};
var inplace_nativesort = function inplace_nativesort(xs) {
	var cmp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
		return a - b;
	};
	return xs.sort(cmp);
};
var random = function random(size) {
	return Math.random() * size | 0;
};

var c = allocate(100).map(function () {
	return random(100);
});
var k = allocate(1000).map(function () {
	return random(1000);
});
var M = allocate(1000000).map(function () {
	return random(1000000);
});

var c_inorder = allocate(100).map(function (_, i) {
	return i;
});
var k_inorder = allocate(1000).map(function (_, i) {
	return i;
});
var M_inorder = allocate(1000000).map(function (_, i) {
	return i;
});

var c_lens = allocate(100).map(function () {
	return { n: random(100) };
});
var k_lens = allocate(1000).map(function () {
	return { n: random(1000) };
});

var make_sort_benchmark = function make_sort_benchmark(name, array, sort) {
	return (0, _benchmark.Benchmark)(name, {
		input: array,
		sort: sort,
		onCycle: function onCycle() {
			this.memory = this.input.slice();
		},
		setup: function setup() {
			this.memory = this.input.slice();
		},
		fn: function fn() {
			this.sort(this.memory);
		},
		onComplete: function onComplete() {
			var stats = this.stats;
			console.log(this.name);
			console.log((stats.mean * 1000).toFixed(4) + ' ms \xB1 ' + stats.rme.toFixed(2) + '%');
		}
	});
};

var impl_c = make_sort_benchmark('impl_c', c, _3.default).run();
var impl_k = make_sort_benchmark('impl_k', k, _3.default).run();
var impl_M = make_sort_benchmark('impl_M', M, _3.default).run();
var impl_c_inorder = make_sort_benchmark('impl_c_inorder', c_inorder, _3.default).run();
var impl_k_inorder = make_sort_benchmark('impl_k_inorder', k_inorder, _3.default).run();
var impl_M_inorder = make_sort_benchmark('impl_M_inorder', M_inorder, _3.default).run();
var impl_c_lens = make_sort_benchmark('impl_c_lens', c_lens, function (xs) {
	return (0, _2.lensort)(xs, function (x) {
		return x.n;
	});
}).run();
var impl_k_lens = make_sort_benchmark('impl_k_lens', k_lens, function (xs) {
	return (0, _2.lensort)(xs, function (x) {
		return x.n;
	});
}).run();

var control_c = make_sort_benchmark('control_c', c, inplace_nativesort).run();
var control_k = make_sort_benchmark('control_k', k, inplace_nativesort).run();
var control_M = make_sort_benchmark('control_M', M, inplace_nativesort).run();
var control_c_inorder = make_sort_benchmark('control_c_inorder', c_inorder, inplace_nativesort).run();
var control_k_inorder = make_sort_benchmark('control_k_inorder', k_inorder, inplace_nativesort).run();
var control_M_inorder = make_sort_benchmark('control_M_inorder', M_inorder, inplace_nativesort).run();
var control_c_lens = make_sort_benchmark('control_c_lens', c_lens, function (xs) {
	return inplace_nativesort(xs, function (a, b) {
		return a.n - b.n;
	});
}).run();
var control_k_lens = make_sort_benchmark('control_k_lens', k_lens, function (xs) {
	return inplace_nativesort(xs, function (a, b) {
		return a.n - b.n;
	});
}).run();