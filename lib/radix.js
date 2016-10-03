"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (xs) {
	var digits = binary_digits(array_max(xs));
	xs = [xs, []];
	for (var i = 0, bitmask = 1; i < digits; i++, bitmask <<= 1) {
		xs = digit_sort(xs, bitmask);
	}
	return xs[0].concat(xs[1]);
};

// O(w) operation
function binary_digits(n) {
	var digits = 0;
	while (n > 0) {
		n >>= 1;
		digits++;
	}
	return digits;
}

// O(n) operation, constant time amortized
function array_max(xs) {
	var max = xs[0];
	for (var i = 1; i < xs.length; i++) {
		var n = xs[i];
		if (max < n) {
			max = n;
		}
	}
	return max;
}

function digit_sort(_ref, bitmask) {
	var _ref2 = _slicedToArray(_ref, 2);

	var i0 = _ref2[0];
	var i1 = _ref2[1];

	var o0 = [];
	var o1 = [];
	for (var i = 0; i < i0.length; i++) {
		((bitmask & i0[i]) === 0 ? o0 : o1).push(i0[i]);
	}
	for (var i = 0; i < i1.length; i++) {
		((bitmask & i1[i]) === 0 ? o0 : o1).push(i1[i]);
	}
	return [o0, o1];
}

// O(n) operation, constant time amortized
function array_max_lens(xs, lens) {
	var max = lens(xs[0]);
	for (var i = 1; i < xs.length; i++) {
		var n = lens(xs[i]);
		if (max < n) {
			max = n;
		}
	}
	return max;
}

function digit_sort_lens(_ref3, bitmask, lens) {
	var _ref4 = _slicedToArray(_ref3, 2);

	var i0 = _ref4[0];
	var i1 = _ref4[1];

	var o0 = [];
	var o1 = [];
	for (var i = 0; i < i0.length; i++) {
		((bitmask & lens(i0[i])) === 0 ? o0 : o1).push(i0[i]);
	}
	for (var i = 0; i < i1.length; i++) {
		((bitmask & lens(i1[i])) === 0 ? o0 : o1).push(i1[i]);
	}
	return [o0, o1];
}

var lensort = exports.lensort = function lensort(xs) {
	var lens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
		return x;
	};

	var digits = binary_digits(array_max_lens(xs, lens));
	xs = [xs, []];
	for (var i = 0, bitmask = 1; i < digits; i++, bitmask <<= 1) {
		xs = digit_sort_lens(xs, bitmask, lens);
	}
	return xs[0].concat(xs[1]);
};