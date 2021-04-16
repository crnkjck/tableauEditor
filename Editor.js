(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return $elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}





// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && $elm$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Editor$None = {$: 'None'};
var $author$project$Tableau$Open = {$: 'Open'};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Config$BasicFol = {$: 'BasicFol'};
var $author$project$Config$BasicPropositional = {$: 'BasicPropositional'};
var $author$project$Config$FullFol = {$: 'FullFol'};
var $author$project$Config$Propositional = {$: 'Propositional'};
var $author$project$Config$PropositionalWithEquality = {$: 'PropositionalWithEquality'};
var $author$project$Config$default = $author$project$Config$BasicPropositional;
var $author$project$Config$fromString = function (str) {
	switch (str) {
		case 'Basic propositional':
			return $author$project$Config$BasicPropositional;
		case 'Propositional':
			return $author$project$Config$Propositional;
		case 'Propositional with equality':
			return $author$project$Config$PropositionalWithEquality;
		case 'Basic FOL':
			return $author$project$Config$BasicFol;
		case 'Full FOL':
			return $author$project$Config$FullFol;
		default:
			return $author$project$Config$default;
	}
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Helpers$Exporting$Json$Decode$config = A2(
	$elm$json$Json$Decode$map,
	$author$project$Config$fromString,
	A2($elm$json$Json$Decode$field, 'config', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$Tableau$Closed = F2(
	function (a, b) {
		return {$: 'Closed', a: a, b: b};
	});
var $author$project$Tableau$Tableau = F2(
	function (node, ext) {
		return {ext: ext, node: node};
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Tableau$Binary = F3(
	function (a, b, c) {
		return {$: 'Binary', a: a, b: b, c: c};
	});
var $author$project$Tableau$Unary = F2(
	function (a, b) {
		return {$: 'Unary', a: a, b: b};
	});
var $author$project$Tableau$UnaryWithSubst = F3(
	function (a, b, c) {
		return {$: 'UnaryWithSubst', a: a, b: b, c: c};
	});
var $author$project$Zipper$up = function (_v0) {
	var t = _v0.a;
	var bs = _v0.b;
	if (bs.b) {
		switch (bs.a.$) {
			case 'UnaryCrumb':
				var _v2 = bs.a;
				var extType = _v2.a;
				var n = _v2.b;
				var bss = bs.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						n,
						A2($author$project$Tableau$Unary, extType, t)),
					bss);
			case 'UnaryCrumbWithSubst':
				var _v3 = bs.a;
				var extType = _v3.a;
				var n = _v3.b;
				var subst = _v3.c;
				var bss = bs.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						n,
						A3($author$project$Tableau$UnaryWithSubst, extType, t, subst)),
					bss);
			case 'BinaryLeftCrumb':
				var _v4 = bs.a;
				var extType = _v4.a;
				var n = _v4.b;
				var rt = _v4.c;
				var bss = bs.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						n,
						A3($author$project$Tableau$Binary, extType, t, rt)),
					bss);
			default:
				var _v5 = bs.a;
				var extType = _v5.a;
				var n = _v5.b;
				var lt = _v5.c;
				var bss = bs.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						n,
						A3($author$project$Tableau$Binary, extType, lt, t)),
					bss);
		}
	} else {
		return _Utils_Tuple2(t, bs);
	}
};
var $author$project$Zipper$findAbove = F2(
	function (ref, _v0) {
		var tableau = _v0.a;
		var bs = _v0.b;
		var node = tableau.node;
		if (_Utils_eq(node.id, ref)) {
			return $elm$core$Maybe$Just(0);
		} else {
			if (bs.b) {
				var a = bs.a;
				var bbs = bs.b;
				return A2(
					$elm$core$Maybe$map,
					$elm$core$Basics$add(1),
					A2(
						$author$project$Zipper$findAbove,
						ref,
						$author$project$Zipper$up(
							_Utils_Tuple2(tableau, bs))));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}
	});
var $elm$core$String$trim = _String_trim;
var $author$project$Zipper$getRef = F2(
	function (z, ref) {
		return {
			str: ref,
			up: A2(
				$elm$core$Maybe$andThen,
				function (a) {
					return A2($author$project$Zipper$findAbove, a, z);
				},
				$elm$core$String$toInt(
					$elm$core$String$trim(ref)))
		};
	});
var $author$project$Zipper$modifyNode = F2(
	function (f, _v0) {
		var tableau = _v0.a;
		var bs = _v0.b;
		return _Utils_Tuple2(
			f(tableau),
			bs);
	});
var $author$project$Zipper$modifyRef = F2(
	function (refs, z) {
		return A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				var node = tableau.node;
				return _Utils_update(
					tableau,
					{
						node: _Utils_update(
							node,
							{references: refs})
					});
			},
			z);
	});
var $author$project$Tableau$strRefsToList = function (str) {
	return $elm$core$String$isEmpty(str) ? _List_Nil : A2($elm$core$String$split, ',', str);
};
var $author$project$Zipper$setRefs = F2(
	function (_new, z) {
		return A2(
			$author$project$Zipper$modifyRef,
			A2(
				$elm$core$List$map,
				$author$project$Zipper$getRef(z),
				$author$project$Tableau$strRefsToList(_new)),
			z);
	});
var $author$project$Zipper$zTableau = function (_v0) {
	var t = _v0.a;
	var bs = _v0.b;
	return t;
};
var $author$project$Zipper$zNode = function (z) {
	return $author$project$Zipper$zTableau(z).node;
};
var $author$project$Helpers$Exporting$Json$Decode$reRef = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (t) {
			var _v0 = t.ext;
			if (_v0.$ === 'Closed') {
				var r1 = _v0.a;
				var r2 = _v0.b;
				return A2(
					$author$project$Tableau$Tableau,
					t.node,
					A2(
						$author$project$Tableau$Closed,
						A2($author$project$Zipper$getRef, z, r1.str),
						A2($author$project$Zipper$getRef, z, r2.str)));
			} else {
				return t;
			}
		},
		A2(
			$author$project$Zipper$setRefs,
			A2(
				$elm$core$String$join,
				',',
				A2(
					$elm$core$List$map,
					function ($) {
						return $.str;
					},
					$author$project$Zipper$zNode(z).references)),
			z));
};
var $author$project$Zipper$UnaryCrumb = F2(
	function (a, b) {
		return {$: 'UnaryCrumb', a: a, b: b};
	});
var $author$project$Zipper$UnaryCrumbWithSubst = F3(
	function (a, b, c) {
		return {$: 'UnaryCrumbWithSubst', a: a, b: b, c: c};
	});
var $author$project$Zipper$down = function (_v0) {
	var t = _v0.a;
	var bs = _v0.b;
	var _v1 = t.ext;
	switch (_v1.$) {
		case 'Unary':
			var extType = _v1.a;
			var subT = _v1.b;
			return _Utils_Tuple2(
				subT,
				A2(
					$elm$core$List$cons,
					A2($author$project$Zipper$UnaryCrumb, extType, t.node),
					bs));
		case 'UnaryWithSubst':
			var extType = _v1.a;
			var subT = _v1.b;
			var subst = _v1.c;
			return _Utils_Tuple2(
				subT,
				A2(
					$elm$core$List$cons,
					A3($author$project$Zipper$UnaryCrumbWithSubst, extType, t.node, subst),
					bs));
		default:
			return _Utils_Tuple2(t, bs);
	}
};
var $author$project$Zipper$BinaryLeftCrumb = F3(
	function (a, b, c) {
		return {$: 'BinaryLeftCrumb', a: a, b: b, c: c};
	});
var $author$project$Zipper$left = function (_v0) {
	var t = _v0.a;
	var bs = _v0.b;
	var _v1 = t.ext;
	if (_v1.$ === 'Binary') {
		var extType = _v1.a;
		var lt = _v1.b;
		var rt = _v1.c;
		return _Utils_Tuple2(
			lt,
			A2(
				$elm$core$List$cons,
				A3($author$project$Zipper$BinaryLeftCrumb, extType, t.node, rt),
				bs));
	} else {
		return _Utils_Tuple2(t, bs);
	}
};
var $author$project$Zipper$BinaryRightCrumb = F3(
	function (a, b, c) {
		return {$: 'BinaryRightCrumb', a: a, b: b, c: c};
	});
var $author$project$Zipper$right = function (_v0) {
	var t = _v0.a;
	var bs = _v0.b;
	var _v1 = t.ext;
	if (_v1.$ === 'Binary') {
		var extType = _v1.a;
		var lt = _v1.b;
		var rt = _v1.c;
		return _Utils_Tuple2(
			rt,
			A2(
				$elm$core$List$cons,
				A3($author$project$Zipper$BinaryRightCrumb, extType, t.node, lt),
				bs));
	} else {
		return _Utils_Tuple2(t, bs);
	}
};
var $author$project$Zipper$zWalkPost = F2(
	function (f, z) {
		var t = z.a;
		var bs = z.b;
		var _v0 = t.ext;
		switch (_v0.$) {
			case 'Open':
				return f(z);
			case 'Closed':
				return f(z);
			case 'Binary':
				return f(
					$author$project$Zipper$up(
						A2(
							$author$project$Zipper$zWalkPost,
							f,
							$author$project$Zipper$right(
								$author$project$Zipper$up(
									A2(
										$author$project$Zipper$zWalkPost,
										f,
										$author$project$Zipper$left(z)))))));
			default:
				return f(
					$author$project$Zipper$up(
						A2(
							$author$project$Zipper$zWalkPost,
							f,
							$author$project$Zipper$down(z))));
		}
	});
var $author$project$Zipper$zipper = function (t) {
	return _Utils_Tuple2(t, _List_Nil);
};
var $author$project$Helpers$Exporting$Json$Decode$reRefTableau = function (t) {
	return $author$project$Zipper$zTableau(
		A2(
			$author$project$Zipper$zWalkPost,
			$author$project$Helpers$Exporting$Json$Decode$reRef,
			$author$project$Zipper$zipper(t)));
};
var $author$project$Tableau$Alpha = {$: 'Alpha'};
var $author$project$Tableau$Beta = {$: 'Beta'};
var $author$project$Tableau$Cut = {$: 'Cut'};
var $author$project$Tableau$DS = {$: 'DS'};
var $author$project$Tableau$Delta = {$: 'Delta'};
var $author$project$Tableau$DeltaStar = {$: 'DeltaStar'};
var $author$project$Tableau$ECDF = {$: 'ECDF'};
var $author$project$Tableau$ECDT = {$: 'ECDT'};
var $author$project$Tableau$ESFF = {$: 'ESFF'};
var $author$project$Tableau$ESFT = {$: 'ESFT'};
var $author$project$Tableau$ESTF = {$: 'ESTF'};
var $author$project$Tableau$ESTT = {$: 'ESTT'};
var $author$project$Tableau$Gamma = {$: 'Gamma'};
var $author$project$Tableau$GammaStar = {$: 'GammaStar'};
var $author$project$Tableau$HS = {$: 'HS'};
var $author$project$Tableau$Leibnitz = {$: 'Leibnitz'};
var $author$project$Tableau$MP = {$: 'MP'};
var $author$project$Tableau$MT = {$: 'MT'};
var $author$project$Tableau$NCS = {$: 'NCS'};
var $author$project$Tableau$Refl = {$: 'Refl'};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $author$project$Helpers$Exporting$Json$Decode$mkRef = function (str) {
	return {str: str, up: $elm$core$Maybe$Nothing};
};
var $author$project$Helpers$Exporting$Json$Decode$ref = A2($elm$json$Json$Decode$map, $author$project$Helpers$Exporting$Json$Decode$mkRef, $elm$json$Json$Decode$string);
var $author$project$Helpers$Exporting$Json$Decode$closedRefs = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$index, 0, $author$project$Helpers$Exporting$Json$Decode$ref),
	A2($elm$json$Json$Decode$index, 1, $author$project$Helpers$Exporting$Json$Decode$ref));
var $author$project$Tableau$Node = F5(
	function (id, value, references, formula, gui) {
		return {formula: formula, gui: gui, id: id, references: references, value: value};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F = function (a) {
	return {$: 'F', a: a};
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T = function (a) {
	return {$: 'T', a: a};
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Conj = F2(
	function (a, b) {
		return {$: 'Conj', a: a, b: b};
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Disj = F2(
	function (a, b) {
		return {$: 'Disj', a: a, b: b};
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Equiv = F2(
	function (a, b) {
		return {$: 'Equiv', a: a, b: b};
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Exists = F2(
	function (a, b) {
		return {$: 'Exists', a: a, b: b};
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll = F2(
	function (a, b) {
		return {$: 'ForAll', a: a, b: b};
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Impl = F2(
	function (a, b) {
		return {$: 'Impl', a: a, b: b};
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Neg = function (a) {
	return {$: 'Neg', a: a};
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom = F2(
	function (a, b) {
		return {$: 'PredAtom', a: a, b: b};
	});
var $elm$parser$Parser$Forbidden = {$: 'Forbidden'};
var $FMFI_UK_1_AIN_412$elm_formula$Term$Fun = F2(
	function (a, b) {
		return {$: 'Fun', a: a, b: b};
	});
var $FMFI_UK_1_AIN_412$elm_formula$Term$Var = function (a) {
	return {$: 'Var', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$isLetter = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$isIdentChar = function (_char) {
	return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$isLetter(_char) || ($elm$core$Char$isDigit(_char) || _Utils_eq(
		_char,
		_Utils_chr('_')));
};
var $elm$parser$Parser$ExpectingVariable = {$: 'ExpectingVariable'};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {col: col, context: context, indent: indent, offset: offset, row: row, src: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$variable = function (i) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var firstOffset = A3($elm$parser$Parser$Advanced$isSubChar, i.start, s.offset, s.src);
			if (_Utils_eq(firstOffset, -1)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, i.expecting));
			} else {
				var s1 = _Utils_eq(firstOffset, -2) ? A7($elm$parser$Parser$Advanced$varHelp, i.inner, s.offset + 1, s.row + 1, 1, s.src, s.indent, s.context) : A7($elm$parser$Parser$Advanced$varHelp, i.inner, firstOffset, s.row, s.col + 1, s.src, s.indent, s.context);
				var name = A3($elm$core$String$slice, s.offset, s1.offset, s.src);
				return A2($elm$core$Set$member, name, i.reserved) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, i.expecting)) : A3($elm$parser$Parser$Advanced$Good, true, name, s1);
			}
		});
};
var $elm$parser$Parser$variable = function (i) {
	return $elm$parser$Parser$Advanced$variable(
		{expecting: $elm$parser$Parser$ExpectingVariable, inner: i.inner, reserved: i.reserved, start: i.start});
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$identifier = $elm$parser$Parser$variable(
	{inner: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$isIdentChar, reserved: $elm$core$Set$empty, start: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$isLetter});
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$revAlways = F2(
	function (_v0, b) {
		return b;
	});
var $elm$parser$Parser$Advanced$skip = F2(
	function (iParser, kParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$parser$Parser$Advanced$revAlways, iParser, kParser);
	});
var $elm$parser$Parser$Advanced$sequenceEndForbidden = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				$elm$parser$Parser$Advanced$sequenceEndForbidden,
				ender,
				ws,
				parseItem,
				sep,
				A2($elm$core$List$cons, item, revItems));
		};
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$map,
								function (item) {
									return $elm$parser$Parser$Advanced$Loop(
										A2($elm$core$List$cons, item, revItems));
								},
								parseItem))),
						A2(
						$elm$parser$Parser$Advanced$map,
						function (_v0) {
							return $elm$parser$Parser$Advanced$Done(
								$elm$core$List$reverse(revItems));
						},
						ender)
					])));
	});
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$Advanced$sequenceEndMandatory = F4(
	function (ws, parseItem, sep, revItems) {
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$Advanced$map,
					function (item) {
						return $elm$parser$Parser$Advanced$Loop(
							A2($elm$core$List$cons, item, revItems));
					},
					A2(
						$elm$parser$Parser$Advanced$ignorer,
						parseItem,
						A2(
							$elm$parser$Parser$Advanced$ignorer,
							ws,
							A2($elm$parser$Parser$Advanced$ignorer, sep, ws)))),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return $elm$parser$Parser$Advanced$Done(
							$elm$core$List$reverse(revItems));
					},
					$elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var $elm$parser$Parser$Advanced$sequenceEndOptional = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var parseEnd = A2(
			$elm$parser$Parser$Advanced$map,
			function (_v0) {
				return $elm$parser$Parser$Advanced$Done(
					$elm$core$List$reverse(revItems));
			},
			ender);
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							$elm$parser$Parser$Advanced$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$Advanced$map,
										function (item) {
											return $elm$parser$Parser$Advanced$Loop(
												A2($elm$core$List$cons, item, revItems));
										},
										parseItem),
										parseEnd
									])))),
						parseEnd
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEnd = F5(
	function (ender, ws, parseItem, sep, trailing) {
		var chompRest = function (item) {
			switch (trailing.$) {
				case 'Forbidden':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndForbidden, ender, ws, parseItem, sep));
				case 'Optional':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndOptional, ender, ws, parseItem, sep));
				default:
					return A2(
						$elm$parser$Parser$Advanced$ignorer,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$skip,
								sep,
								A2(
									$elm$parser$Parser$Advanced$skip,
									ws,
									A2(
										$elm$parser$Parser$Advanced$loop,
										_List_fromArray(
											[item]),
										A3($elm$parser$Parser$Advanced$sequenceEndMandatory, ws, parseItem, sep))))),
						ender);
			}
		};
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2($elm$parser$Parser$Advanced$andThen, chompRest, parseItem),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return _List_Nil;
					},
					ender)
				]));
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$sequence = function (i) {
	return A2(
		$elm$parser$Parser$Advanced$skip,
		$elm$parser$Parser$Advanced$token(i.start),
		A2(
			$elm$parser$Parser$Advanced$skip,
			i.spaces,
			A5(
				$elm$parser$Parser$Advanced$sequenceEnd,
				$elm$parser$Parser$Advanced$token(i.end),
				i.spaces,
				i.item,
				$elm$parser$Parser$Advanced$token(i.separator),
				i.trailing)));
};
var $elm$parser$Parser$Advanced$Forbidden = {$: 'Forbidden'};
var $elm$parser$Parser$Advanced$Mandatory = {$: 'Mandatory'};
var $elm$parser$Parser$Advanced$Optional = {$: 'Optional'};
var $elm$parser$Parser$toAdvancedTrailing = function (trailing) {
	switch (trailing.$) {
		case 'Forbidden':
			return $elm$parser$Parser$Advanced$Forbidden;
		case 'Optional':
			return $elm$parser$Parser$Advanced$Optional;
		default:
			return $elm$parser$Parser$Advanced$Mandatory;
	}
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$sequence = function (i) {
	return $elm$parser$Parser$Advanced$sequence(
		{
			end: $elm$parser$Parser$toToken(i.end),
			item: i.item,
			separator: $elm$parser$Parser$toToken(i.separator),
			spaces: i.spaces,
			start: $elm$parser$Parser$toToken(i.start),
			trailing: $elm$parser$Parser$toAdvancedTrailing(i.trailing)
		});
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces = $elm$parser$Parser$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || (_Utils_eq(
			c,
			_Utils_chr('\t')) || (_Utils_eq(
			c,
			_Utils_chr('\u000D')) || _Utils_eq(
			c,
			_Utils_chr('\u000D'))));
	});
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
function $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$args() {
	return $elm$parser$Parser$sequence(
		{
			end: ')',
			item: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$term(),
			separator: ',',
			spaces: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces,
			start: '(',
			trailing: $elm$parser$Parser$Forbidden
		});
}
function $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$term() {
	return A2(
		$elm$parser$Parser$andThen,
		function (name) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed(
							function (fargs) {
								return A2($FMFI_UK_1_AIN_412$elm_formula$Term$Fun, name, fargs);
							}),
						$elm$parser$Parser$lazy(
							function (_v0) {
								return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$args();
							})),
						$elm$parser$Parser$succeed(
						$FMFI_UK_1_AIN_412$elm_formula$Term$Var(name))
					]));
		},
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$identifier);
}
try {
	var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$args = $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$args();
	$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$args = function () {
		return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$args;
	};
	var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$term = $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$term();
	$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$term = function () {
		return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$term;
	};
} catch ($) {
	throw 'Some top-level definitions from `Formula.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    args\n  │     ↓\n  │    term\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0.a;
	return $elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 'Bad') {
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _v1.b;
				var s1 = _v1.c;
				return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $FMFI_UK_1_AIN_412$elm_formula$Formula$EqAtom = F2(
	function (a, b) {
		return {$: 'EqAtom', a: a, b: b};
	});
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$oneOfSymbols = function (syms) {
	return $elm$parser$Parser$oneOf(
		A2($elm$core$List$map, $elm$parser$Parser$symbol, syms));
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$eq = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($FMFI_UK_1_AIN_412$elm_formula$Formula$EqAtom),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$ignorer, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$term, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$oneOfSymbols(
					_List_fromArray(
						['≐', '=']))),
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces)),
	$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$term);
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$negEqAtom = F2(
	function (a, b) {
		return $FMFI_UK_1_AIN_412$elm_formula$Formula$Neg(
			A2($FMFI_UK_1_AIN_412$elm_formula$Formula$EqAtom, a, b));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$negEq = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$negEqAtom),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$ignorer, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$term, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$oneOfSymbols(
					_List_fromArray(
						['!=', '/=', '≠']))),
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces)),
	$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$term);
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$binary = F2(
	function (conn, constructor) {
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(constructor),
						$elm$parser$Parser$symbol('(')),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$lazy(
								function (_v10) {
									return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula();
								}),
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$oneOfSymbols(conn)),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces)),
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$lazy(
						function (_v11) {
							return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula();
						}),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$elm$parser$Parser$symbol(')')));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$quantified = F2(
	function (symbols, constructor) {
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(constructor),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$oneOfSymbols(symbols)),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$lazy(
						function (_v0) {
							return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$identifier;
						}),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces)),
			$elm$parser$Parser$lazy(
				function (_v1) {
					return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula();
				}));
	});
function $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$elm$parser$Parser$backtrackable($FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$eq),
				$elm$parser$Parser$backtrackable($FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$negEq),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom),
					A2($elm$parser$Parser$ignorer, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$identifier, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces)),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$args,
							$elm$parser$Parser$succeed(_List_Nil)
						]))),
				$elm$parser$Parser$lazy(
				function (_v2) {
					return A2(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$quantified,
						_List_fromArray(
							['∀', '\\A', '\\forall', '\\a']),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll);
				}),
				$elm$parser$Parser$lazy(
				function (_v3) {
					return A2(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$quantified,
						_List_fromArray(
							['∃', '\\E', '\\exists', '\\e']),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Exists);
				}),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($FMFI_UK_1_AIN_412$elm_formula$Formula$Neg),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$oneOfSymbols(
							_List_fromArray(
								['-', '¬', '~']))),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$elm$parser$Parser$lazy(
					function (_v4) {
						return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula();
					})),
				$elm$parser$Parser$backtrackable(
				$elm$parser$Parser$lazy(
					function (_v5) {
						return A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$binary,
							_List_fromArray(
								['&', '∧', '/\\']),
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Conj);
					})),
				$elm$parser$Parser$backtrackable(
				$elm$parser$Parser$lazy(
					function (_v6) {
						return A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$binary,
							_List_fromArray(
								['|', '∨', '\\/']),
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Disj);
					})),
				$elm$parser$Parser$backtrackable(
				$elm$parser$Parser$lazy(
					function (_v7) {
						return A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$binary,
							_List_fromArray(
								['->', '→']),
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Impl);
					})),
				$elm$parser$Parser$backtrackable(
				$elm$parser$Parser$lazy(
					function (_v8) {
						return A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$binary,
							_List_fromArray(
								['<->', '↔']),
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Equiv);
					})),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$symbol('(')),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$lazy(
							function (_v9) {
								return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula();
							}),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
					$elm$parser$Parser$symbol(')')))
			]));
}
try {
	var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$formula = $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula();
	$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$cyclic$formula = function () {
		return $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$formula;
	};
} catch ($) {
	throw 'Some top-level definitions from `Formula.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    binary\n  │     ↓\n  │    formula\n  │     ↓\n  │    quantified\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				$elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$signedFormula = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T),
						$elm$parser$Parser$keyword('T')),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$formula),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F),
						$elm$parser$Parser$keyword('F')),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$formula)
			])));
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSigned = $elm$parser$Parser$run(
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2($elm$parser$Parser$ignorer, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$signedFormula, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
			$elm$parser$Parser$end)));
var $author$project$Helpers$Exporting$Json$Decode$node = A6(
	$elm$json$Json$Decode$map5,
	$author$project$Tableau$Node,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'references',
		$elm$json$Json$Decode$list($author$project$Helpers$Exporting$Json$Decode$ref)),
	A2(
		$elm$json$Json$Decode$map,
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSigned,
		A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string)),
	$elm$json$Json$Decode$succeed(
		{controlsShown: false}));
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Helpers$Exporting$Json$Decode$closed = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Tableau$Tableau,
	A2($elm$json$Json$Decode$field, 'node', $author$project$Helpers$Exporting$Json$Decode$node),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$Tableau$Closed,
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Tuple$first,
			A2($elm$json$Json$Decode$field, 'closed', $author$project$Helpers$Exporting$Json$Decode$closedRefs)),
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Tuple$second,
			A2($elm$json$Json$Decode$field, 'closed', $author$project$Helpers$Exporting$Json$Decode$closedRefs))));
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(_Utils_Tuple0));
};
var $author$project$Helpers$Exporting$Json$Decode$open = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Tableau$Tableau,
	A2($elm$json$Json$Decode$field, 'node', $author$project$Helpers$Exporting$Json$Decode$node),
	$elm$json$Json$Decode$succeed($author$project$Tableau$Open));
var $author$project$Tableau$Substitution = F2(
	function (str, parsedSubst) {
		return {parsedSubst: parsedSubst, str: str};
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$substPair = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Tuple$pair),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$ignorer, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$identifier, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$oneOfSymbols(
					_List_fromArray(
						['->', '→', '↦']))),
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces)),
	$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$term);
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$substitution = A2(
	$elm$parser$Parser$map,
	$elm$core$Dict$fromList,
	$elm$parser$Parser$sequence(
		{end: '}', item: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$substPair, separator: ',', spaces: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces, start: '{', trailing: $elm$parser$Parser$Forbidden}));
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSubstitution = function (str) {
	return A2(
		$elm$parser$Parser$run,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$ignorer, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$substitution, $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$spaces),
				$elm$parser$Parser$end)),
		'{' + (str + '}'));
};
var $author$project$Helpers$Exporting$Json$Decode$substitution = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Tableau$Substitution,
	A2($elm$json$Json$Decode$field, 'str', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$map,
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSubstitution,
		A2($elm$json$Json$Decode$field, 'str', $elm$json$Json$Decode$string)));
var $author$project$Helpers$Exporting$Json$Decode$binaryRule = function (extType) {
	return A3(
		$elm$json$Json$Decode$map2,
		$author$project$Tableau$Tableau,
		A2($elm$json$Json$Decode$field, 'node', $author$project$Helpers$Exporting$Json$Decode$node),
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Tableau$Binary(extType),
			A2(
				$elm$json$Json$Decode$field,
				'leftChild',
				$elm$json$Json$Decode$lazy(
					function (_v4) {
						return $author$project$Helpers$Exporting$Json$Decode$cyclic$tableau();
					})),
			A2(
				$elm$json$Json$Decode$field,
				'rightChild',
				$elm$json$Json$Decode$lazy(
					function (_v5) {
						return $author$project$Helpers$Exporting$Json$Decode$cyclic$tableau();
					}))));
};
var $author$project$Helpers$Exporting$Json$Decode$tblTypeDecoder = function (typ) {
	switch (typ) {
		case 'open':
			return $author$project$Helpers$Exporting$Json$Decode$open;
		case 'closed':
			return $author$project$Helpers$Exporting$Json$Decode$closed;
		case 'alpha':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$Alpha);
		case 'beta':
			return $author$project$Helpers$Exporting$Json$Decode$binaryRule($author$project$Tableau$Beta);
		case 'gamma':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRuleWithSubst($author$project$Tableau$Gamma);
		case 'delta':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRuleWithSubst($author$project$Tableau$Delta);
		case 'refl':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$Refl);
		case 'leibnitz':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$Leibnitz);
		case 'mp':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$MP);
		case 'mt':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$MT);
		case 'cut':
			return $author$project$Helpers$Exporting$Json$Decode$binaryRule($author$project$Tableau$Cut);
		case 'hs':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$HS);
		case 'ds':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$DS);
		case 'ncs':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$NCS);
		case 'ecdf':
			return $author$project$Helpers$Exporting$Json$Decode$binaryRule($author$project$Tableau$ECDF);
		case 'ecdt':
			return $author$project$Helpers$Exporting$Json$Decode$binaryRule($author$project$Tableau$ECDT);
		case 'esff':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$ESFF);
		case 'esft':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$ESFT);
		case 'estf':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$ESTF);
		case 'estt':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRule($author$project$Tableau$ESTT);
		case 'gammaStar':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRuleWithSubst($author$project$Tableau$GammaStar);
		case 'deltaStar':
			return $author$project$Helpers$Exporting$Json$Decode$unaryRuleWithSubst($author$project$Tableau$DeltaStar);
		default:
			return $elm$json$Json$Decode$fail('\'' + (typ + '\' is not a correct tableau node type'));
	}
};
var $author$project$Helpers$Exporting$Json$Decode$unaryRule = function (extType) {
	return A3(
		$elm$json$Json$Decode$map2,
		$author$project$Tableau$Tableau,
		A2($elm$json$Json$Decode$field, 'node', $author$project$Helpers$Exporting$Json$Decode$node),
		A2(
			$elm$json$Json$Decode$map,
			$author$project$Tableau$Unary(extType),
			A2(
				$elm$json$Json$Decode$field,
				'child',
				$elm$json$Json$Decode$lazy(
					function (_v1) {
						return $author$project$Helpers$Exporting$Json$Decode$cyclic$tableau();
					}))));
};
var $author$project$Helpers$Exporting$Json$Decode$unaryRuleWithSubst = function (extType) {
	return A3(
		$elm$json$Json$Decode$map2,
		$author$project$Tableau$Tableau,
		A2($elm$json$Json$Decode$field, 'node', $author$project$Helpers$Exporting$Json$Decode$node),
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Tableau$UnaryWithSubst(extType),
			A2(
				$elm$json$Json$Decode$field,
				'child',
				$elm$json$Json$Decode$lazy(
					function (_v0) {
						return $author$project$Helpers$Exporting$Json$Decode$cyclic$tableau();
					})),
			A2($elm$json$Json$Decode$field, 'substitution', $author$project$Helpers$Exporting$Json$Decode$substitution)));
};
function $author$project$Helpers$Exporting$Json$Decode$cyclic$tableau() {
	return $elm$json$Json$Decode$lazy(
		function (_v3) {
			return A2(
				$elm$json$Json$Decode$andThen,
				$author$project$Helpers$Exporting$Json$Decode$tblTypeDecoder,
				A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
		});
}
try {
	var $author$project$Helpers$Exporting$Json$Decode$tableau = $author$project$Helpers$Exporting$Json$Decode$cyclic$tableau();
	$author$project$Helpers$Exporting$Json$Decode$cyclic$tableau = function () {
		return $author$project$Helpers$Exporting$Json$Decode$tableau;
	};
} catch ($) {
	throw 'Some top-level definitions from `Helpers.Exporting.Json.Decode` are causing infinite recursion:\n\n  ┌─────┐\n  │    binaryRule\n  │     ↓\n  │    tableau\n  │     ↓\n  │    tblTypeDecoder\n  │     ↓\n  │    unaryRule\n  │     ↓\n  │    unaryRuleWithSubst\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Helpers$Exporting$Json$Decode$decode = function (s) {
	var decodeTableau = A2(
		$elm$core$Basics$composeR,
		$elm$json$Json$Decode$decodeString($author$project$Helpers$Exporting$Json$Decode$tableau),
		$elm$core$Result$map($author$project$Helpers$Exporting$Json$Decode$reRefTableau));
	var decodeConfig = $elm$json$Json$Decode$decodeString($author$project$Helpers$Exporting$Json$Decode$config);
	return _Utils_Tuple2(
		decodeConfig(s),
		decodeTableau(s));
};
var $author$project$Tableau$defGUI = {controlsShown: true};
var $elm_community$undo_redo$UndoList$UndoList = F3(
	function (past, present, future) {
		return {future: future, past: past, present: present};
	});
var $elm_community$undo_redo$UndoList$fresh = function (state) {
	return A3($elm_community$undo_redo$UndoList$UndoList, _List_Nil, state, _List_Nil);
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Editor$init = function (mts) {
	var emptyT = {
		ext: $author$project$Tableau$Open,
		node: {
			formula: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSigned(''),
			gui: $author$project$Tableau$defGUI,
			id: 1,
			references: _List_Nil,
			value: ''
		}
	};
	var _v0 = function () {
		if (mts.$ === 'Nothing') {
			return _Utils_Tuple2($author$project$Config$default, emptyT);
		} else {
			var ts = mts.a;
			return function (_v2) {
				var cfg = _v2.a;
				var t = _v2.b;
				return _Utils_Tuple2(
					A2($elm$core$Result$withDefault, $author$project$Config$default, cfg),
					A2($elm$core$Result$withDefault, emptyT, t));
			}(
				$author$project$Helpers$Exporting$Json$Decode$decode(ts));
		}
	}();
	var initCfg = _v0.a;
	var initT = _v0.b;
	return _Utils_Tuple2(
		$elm_community$undo_redo$UndoList$fresh(
			{config: initCfg, jsonImport: $author$project$Editor$None, tableau: initT}),
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Editor$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Editor$ImportErr = F2(
	function (a, b) {
		return {$: 'ImportErr', a: a, b: b};
	});
var $author$project$Editor$InProgress = function (a) {
	return {$: 'InProgress', a: a};
};
var $author$project$Editor$JsonRead = function (a) {
	return {$: 'JsonRead', a: a};
};
var $author$project$Editor$JsonSelected = function (a) {
	return {$: 'JsonSelected', a: a};
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Editor$cache = _Platform_outgoingPort('cache', $elm$json$Json$Encode$string);
var $author$project$Config$toString = function (config) {
	switch (config.$) {
		case 'BasicPropositional':
			return 'Basic propositional';
		case 'Propositional':
			return 'Propositional';
		case 'PropositionalWithEquality':
			return 'Propositional with equality';
		case 'BasicFol':
			return 'Basic FOL';
		default:
			return 'Full FOL';
	}
};
var $author$project$Helpers$Exporting$Json$Encode$jsonConfig = function (config) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'config',
			$elm$json$Json$Encode$string(
				$author$project$Config$toString(config)))
		]);
};
var $author$project$Tableau$binaryExtTypeJsonStr = function (extType) {
	switch (extType.$) {
		case 'Beta':
			return 'beta';
		case 'Cut':
			return 'cut';
		case 'ECDF':
			return 'ecdf';
		default:
			return 'ecdt';
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Helpers$Exporting$Json$Encode$jsonSubstitution = function (_v0) {
	var str = _v0.str;
	var parsedSubst = _v0.parsedSubst;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'str',
				$elm$json$Json$Encode$string(str))
			]));
};
var $author$project$Helpers$Exporting$Json$Encode$encodeSubstitution = function (s) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'substitution',
			$author$project$Helpers$Exporting$Json$Encode$jsonSubstitution(s))
		]);
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Helpers$Exporting$Json$Encode$jsonRef = function (r) {
	return $elm$json$Json$Encode$string(r.str);
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$Helpers$Exporting$Json$Encode$jsonNode = function (_v0) {
	var id = _v0.id;
	var value = _v0.value;
	var references = _v0.references;
	var gui = _v0.gui;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(id)),
				_Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string(value)),
				_Utils_Tuple2(
				'references',
				A2($elm$json$Json$Encode$list, $author$project$Helpers$Exporting$Json$Encode$jsonRef, references))
			]));
};
var $author$project$Helpers$Exporting$Json$Encode$jsonNodeList = function (n) {
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'node',
			$author$project$Helpers$Exporting$Json$Encode$jsonNode(n))
		]);
};
var $author$project$Tableau$unaryExtTypeJsonStr = function (extType) {
	switch (extType.$) {
		case 'Alpha':
			return 'alpha';
		case 'Refl':
			return 'refl';
		case 'Leibnitz':
			return 'leibnitz';
		case 'MP':
			return 'mp';
		case 'MT':
			return 'mt';
		case 'HS':
			return 'hs';
		case 'DS':
			return 'ds';
		case 'NCS':
			return 'ncs';
		case 'ESFF':
			return 'esff';
		case 'ESFT':
			return 'esft';
		case 'ESTF':
			return 'estf';
		default:
			return 'estt';
	}
};
var $author$project$Tableau$unaryWithSubstExtTypeJsonStr = function (extType) {
	switch (extType.$) {
		case 'Gamma':
			return 'gamma';
		case 'Delta':
			return 'delta';
		case 'GammaStar':
			return 'gammaStar';
		default:
			return 'deltaStar';
	}
};
var $author$project$Helpers$Exporting$Json$Encode$encodeBinaryRule = F4(
	function (tableau, extType, lt, rt) {
		return _Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(extType))
				]),
			_Utils_ap(
				$author$project$Helpers$Exporting$Json$Encode$jsonNodeList(tableau.node),
				_List_fromArray(
					[
						_Utils_Tuple2(
						'leftChild',
						$author$project$Helpers$Exporting$Json$Encode$jsonTableau(lt)),
						_Utils_Tuple2(
						'rightChild',
						$author$project$Helpers$Exporting$Json$Encode$jsonTableau(rt))
					])));
	});
var $author$project$Helpers$Exporting$Json$Encode$encodeUnaryRule = F3(
	function (tableau, extType, subTableau) {
		return _Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(extType))
				]),
			_Utils_ap(
				$author$project$Helpers$Exporting$Json$Encode$jsonNodeList(tableau.node),
				_List_fromArray(
					[
						_Utils_Tuple2(
						'child',
						$author$project$Helpers$Exporting$Json$Encode$jsonTableau(subTableau))
					])));
	});
var $author$project$Helpers$Exporting$Json$Encode$encodeUnaryRuleWithSubst = F4(
	function (tableau, extType, subTableau, subst) {
		return _Utils_ap(
			A3($author$project$Helpers$Exporting$Json$Encode$encodeUnaryRule, tableau, extType, subTableau),
			$author$project$Helpers$Exporting$Json$Encode$encodeSubstitution(subst));
	});
var $author$project$Helpers$Exporting$Json$Encode$jsonTableau = function (t) {
	return $elm$json$Json$Encode$object(
		$author$project$Helpers$Exporting$Json$Encode$jsonTblList(t));
};
var $author$project$Helpers$Exporting$Json$Encode$jsonTblList = function (tableau) {
	var _v0 = tableau.ext;
	switch (_v0.$) {
		case 'Open':
			return _Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('open'))
					]),
				$author$project$Helpers$Exporting$Json$Encode$jsonNodeList(tableau.node));
		case 'Closed':
			var r1 = _v0.a;
			var r2 = _v0.b;
			return _Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('closed'))
					]),
				_Utils_ap(
					$author$project$Helpers$Exporting$Json$Encode$jsonNodeList(tableau.node),
					_List_fromArray(
						[
							_Utils_Tuple2(
							'closed',
							A2(
								$elm$json$Json$Encode$list,
								$author$project$Helpers$Exporting$Json$Encode$jsonRef,
								_List_fromArray(
									[r1, r2])))
						])));
		case 'Unary':
			var extType = _v0.a;
			var t = _v0.b;
			return A3(
				$author$project$Helpers$Exporting$Json$Encode$encodeUnaryRule,
				tableau,
				$author$project$Tableau$unaryExtTypeJsonStr(extType),
				t);
		case 'UnaryWithSubst':
			var extType = _v0.a;
			var t = _v0.b;
			var s = _v0.c;
			return A4(
				$author$project$Helpers$Exporting$Json$Encode$encodeUnaryRuleWithSubst,
				tableau,
				$author$project$Tableau$unaryWithSubstExtTypeJsonStr(extType),
				t,
				s);
		default:
			var extType = _v0.a;
			var lt = _v0.b;
			var rt = _v0.c;
			return A4(
				$author$project$Helpers$Exporting$Json$Encode$encodeBinaryRule,
				tableau,
				$author$project$Tableau$binaryExtTypeJsonStr(extType),
				lt,
				rt);
	}
};
var $author$project$Helpers$Exporting$Json$Encode$jsonTableauAndConfig = F2(
	function (config, t) {
		return $elm$json$Json$Encode$object(
			_Utils_ap(
				$author$project$Helpers$Exporting$Json$Encode$jsonTblList(t),
				$author$project$Helpers$Exporting$Json$Encode$jsonConfig(config)));
	});
var $author$project$Helpers$Exporting$Json$Encode$encode = F3(
	function (ind, config, t) {
		return A2(
			$elm$json$Json$Encode$encode,
			ind,
			A2($author$project$Helpers$Exporting$Json$Encode$jsonTableauAndConfig, config, t)) + '\n';
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$file$File$Select$file = F2(
	function (mimes, toMsg) {
		return A2(
			$elm$core$Task$perform,
			toMsg,
			_File_uploadOne(mimes));
	});
var $elm$file$File$name = _File_name;
var $elm_community$undo_redo$UndoList$new = F2(
	function (event, _v0) {
		var past = _v0.past;
		var present = _v0.present;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			A2($elm$core$List$cons, present, past),
			event,
			_List_Nil);
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Editor$print = _Platform_outgoingPort(
	'print',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $elm_community$undo_redo$UndoList$redo = function (_v0) {
	var past = _v0.past;
	var present = _v0.present;
	var future = _v0.future;
	if (!future.b) {
		return A3($elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = future.a;
		var xs = future.b;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			A2($elm$core$List$cons, present, past),
			x,
			xs);
	}
};
var $author$project$Zipper$changeButtonAppearance = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (tableau) {
			var oldNode = tableau.node;
			var oldGUI = tableau.node.gui;
			var newGUI = _Utils_update(
				oldGUI,
				{controlsShown: !oldGUI.controlsShown});
			var newNode = _Utils_update(
				oldNode,
				{gui: newGUI});
			return _Utils_update(
				tableau,
				{node: newNode});
		},
		z);
};
var $author$project$Tableau$defNode = {
	formula: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSigned(''),
	gui: $author$project$Tableau$defGUI,
	id: 1,
	references: _List_Nil,
	value: ''
};
var $author$project$Tableau$leftSubtree = function (t) {
	var _v0 = t.ext;
	switch (_v0.$) {
		case 'Open':
			return A2($author$project$Tableau$Tableau, $author$project$Tableau$defNode, $author$project$Tableau$Open);
		case 'Closed':
			return A2($author$project$Tableau$Tableau, $author$project$Tableau$defNode, $author$project$Tableau$Open);
		case 'Unary':
			var subT = _v0.b;
			return subT;
		case 'UnaryWithSubst':
			var subT = _v0.b;
			return subT;
		default:
			var leftSubT = _v0.b;
			return leftSubT;
	}
};
var $author$project$Tableau$rightSubtree = function (t) {
	var _v0 = t.ext;
	if (_v0.$ === 'Binary') {
		var rightSubT = _v0.c;
		return rightSubT;
	} else {
		return A2($author$project$Tableau$Tableau, $author$project$Tableau$defNode, $author$project$Tableau$Open);
	}
};
var $author$project$Zipper$changeRule = F2(
	function (extWithType, z) {
		return _Utils_eq(
			$author$project$Zipper$up(z),
			z) ? z : A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				var _v0 = tableau.ext;
				switch (_v0.$) {
					case 'Open':
						return tableau;
					case 'Closed':
						return tableau;
					default:
						var _v1 = A2(
							extWithType,
							$author$project$Tableau$leftSubtree(tableau),
							$author$project$Tableau$rightSubtree(tableau));
						if (_v1.$ === 'Nothing') {
							return tableau;
						} else {
							var extension = _v1.a;
							return A2($author$project$Tableau$Tableau, tableau.node, extension);
						}
				}
			},
			$author$project$Zipper$up(z));
	});
var $author$project$Zipper$changeToBinaryRule = F2(
	function (extType, z) {
		return A2(
			$author$project$Zipper$changeRule,
			F2(
				function (t1, t2) {
					return $elm$core$Maybe$Just(
						A3($author$project$Tableau$Binary, extType, t1, t2));
				}),
			z);
	});
var $author$project$Tableau$isEmpty = function (t) {
	return (t.node.value === '') && _Utils_eq(t.ext, $author$project$Tableau$Open);
};
var $author$project$Zipper$doChangeToUnaryRule = F2(
	function (extWithType, z) {
		return A2(
			$author$project$Zipper$changeRule,
			F2(
				function (lt, rt) {
					return $author$project$Tableau$isEmpty(lt) ? $elm$core$Maybe$Just(
						extWithType(rt)) : ($author$project$Tableau$isEmpty(rt) ? $elm$core$Maybe$Just(
						extWithType(lt)) : $elm$core$Maybe$Nothing);
				}),
			z);
	});
var $author$project$Zipper$changeToUnaryRule = F2(
	function (extType, z) {
		return A2(
			$author$project$Zipper$doChangeToUnaryRule,
			$author$project$Tableau$Unary(extType),
			z);
	});
var $author$project$Tableau$defSubstitution = {
	parsedSubst: $elm$core$Result$Ok(
		$elm$core$Dict$fromList(_List_Nil)),
	str: ''
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Zipper$zSubstitution = function (z) {
	var t = z.a;
	var bs = z.b;
	var _v0 = t.ext;
	if (_v0.$ === 'UnaryWithSubst') {
		var subst = _v0.c;
		return $elm$core$Maybe$Just(subst);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Zipper$changeToUnaryRuleWithSubst = F2(
	function (extType, z) {
		return A2(
			$author$project$Zipper$doChangeToUnaryRule,
			function (t) {
				return A3(
					$author$project$Tableau$UnaryWithSubst,
					extType,
					t,
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Tableau$defSubstitution,
						$author$project$Zipper$zSubstitution(
							$author$project$Zipper$up(z))));
			},
			z);
	});
var $author$project$Zipper$delete = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (tableau) {
			return A2($author$project$Tableau$Tableau, tableau.node, $author$project$Tableau$Open);
		},
		z);
};
var $author$project$Zipper$deleteMe = function (zip) {
	var t = zip.a;
	var fatherbs = zip.b;
	if (_Utils_eq(
		$author$project$Zipper$up(zip),
		zip)) {
		var tableauToKeep = F3(
			function (currentT, leftT, rightT) {
				return (leftT.node.value === '') ? rightT : ((rightT.node.value === '') ? leftT : currentT);
			});
		return A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				var _v0 = tableau.ext;
				switch (_v0.$) {
					case 'Open':
						return A2($author$project$Tableau$Tableau, $author$project$Tableau$defNode, $author$project$Tableau$Open);
					case 'Closed':
						var r1 = _v0.a;
						var r2 = _v0.b;
						return A2($author$project$Tableau$Tableau, $author$project$Tableau$defNode, $author$project$Tableau$Open);
					case 'Binary':
						var lt = _v0.b;
						var rt = _v0.c;
						return A3(tableauToKeep, tableau, lt, rt);
					default:
						return $author$project$Tableau$leftSubtree(tableau);
				}
			},
			zip);
	} else {
		var tryToKeepRightSubT = F3(
			function (currentT, leftT, rightT) {
				return (leftT.node.value === '') ? A2(
					$author$project$Tableau$Tableau,
					currentT.node,
					A2($author$project$Tableau$Unary, $author$project$Tableau$Alpha, rightT)) : currentT;
			});
		var tryToKeepLeftSubT = F3(
			function (currentT, leftT, rightT) {
				return (rightT.node.value === '') ? A2(
					$author$project$Tableau$Tableau,
					currentT.node,
					A2($author$project$Tableau$Unary, $author$project$Tableau$Alpha, leftT)) : currentT;
			});
		var chooseSubTableau = function (childToKeep) {
			return A2(
				$author$project$Zipper$modifyNode,
				function (tableau) {
					return A3(
						childToKeep,
						tableau,
						$author$project$Tableau$leftSubtree(tableau),
						$author$project$Tableau$rightSubtree(tableau));
				},
				$author$project$Zipper$up(zip));
		};
		_v1$2:
		while (true) {
			if (fatherbs.b) {
				switch (fatherbs.a.$) {
					case 'BinaryLeftCrumb':
						var _v2 = fatherbs.a;
						var farherNode = _v2.b;
						var rt = _v2.c;
						var bss = fatherbs.b;
						return chooseSubTableau(tryToKeepRightSubT);
					case 'BinaryRightCrumb':
						var _v3 = fatherbs.a;
						var farherNode = _v3.b;
						var lt = _v3.c;
						var bss = fatherbs.b;
						return chooseSubTableau(tryToKeepLeftSubT);
					default:
						break _v1$2;
				}
			} else {
				break _v1$2;
			}
		}
		return A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				var _v4 = tableau.ext;
				switch (_v4.$) {
					case 'Open':
						return tableau;
					case 'Closed':
						var r1 = _v4.a;
						var r2 = _v4.b;
						return A2($author$project$Tableau$Tableau, tableau.node, $author$project$Tableau$Open);
					case 'Binary':
						return tableau;
					default:
						return A2(
							$author$project$Tableau$Tableau,
							tableau.node,
							$author$project$Tableau$leftSubtree(tableau).ext);
				}
			},
			$author$project$Zipper$up(zip));
	}
};
var $author$project$Zipper$closeControls = function (oldNode) {
	return _Utils_update(
		oldNode,
		{
			gui: {controlsShown: false}
		});
};
var $author$project$Zipper$extendWithRule = F2(
	function (extWithType, z) {
		return A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				return A2(
					$author$project$Tableau$Tableau,
					$author$project$Zipper$closeControls(tableau.node),
					extWithType(
						A2($author$project$Tableau$Tableau, $author$project$Tableau$defNode, tableau.ext)));
			},
			z);
	});
var $author$project$Zipper$extendBinary = F2(
	function (extType, z) {
		return A2(
			$author$project$Zipper$extendWithRule,
			function (t) {
				return A3(
					$author$project$Tableau$Binary,
					extType,
					t,
					A2($author$project$Tableau$Tableau, $author$project$Tableau$defNode, $author$project$Tableau$Open));
			},
			z);
	});
var $author$project$Zipper$extendUnary = F2(
	function (extType, z) {
		return A2(
			$author$project$Zipper$extendWithRule,
			$author$project$Tableau$Unary(extType),
			z);
	});
var $author$project$Zipper$extendUnaryWithSubst = F2(
	function (extType, z) {
		return A2(
			$author$project$Zipper$extendWithRule,
			function (t) {
				return A3($author$project$Tableau$UnaryWithSubst, extType, t, $author$project$Tableau$defSubstitution);
			},
			z);
	});
var $elm$core$Debug$log = _Debug_log;
var $author$project$Tableau$defRef = {str: '', up: $elm$core$Maybe$Nothing};
var $author$project$Zipper$makeClosed = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (tableau) {
			var _v0 = tableau.ext;
			return A2(
				$author$project$Tableau$Tableau,
				tableau.node,
				A2($author$project$Tableau$Closed, $author$project$Tableau$defRef, $author$project$Tableau$defRef));
		},
		z);
};
var $author$project$Zipper$makeOpen = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (tableau) {
			var _v0 = tableau.ext;
			if (_v0.$ === 'Closed') {
				return A2($author$project$Tableau$Tableau, tableau.node, $author$project$Tableau$Open);
			} else {
				return tableau;
			}
		},
		z);
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $FMFI_UK_1_AIN_412$elm_formula$Term$argsToString = function (ts) {
	return '(' + (A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $FMFI_UK_1_AIN_412$elm_formula$Term$toString, ts)) + ')');
};
var $FMFI_UK_1_AIN_412$elm_formula$Term$toString = function (t) {
	if (t.$ === 'Var') {
		var v = t.a;
		return v;
	} else {
		var f = t.a;
		var ts = t.b;
		return _Utils_ap(
			f,
			$FMFI_UK_1_AIN_412$elm_formula$Term$argsToString(ts));
	}
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$atomSpace = function (f) {
	switch (f.$) {
		case 'PredAtom':
			return ' ';
		case 'EqAtom':
			return ' ';
		default:
			return '';
	}
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$binToString = F3(
	function (lf, c, rf) {
		return '(' + ($FMFI_UK_1_AIN_412$elm_formula$Formula$toString(lf) + (c + ($FMFI_UK_1_AIN_412$elm_formula$Formula$toString(rf) + ')')));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$qToString = F3(
	function (q, bv, f) {
		return _Utils_ap(
			q,
			_Utils_ap(
				bv,
				_Utils_ap(
					$FMFI_UK_1_AIN_412$elm_formula$Formula$atomSpace(f),
					$FMFI_UK_1_AIN_412$elm_formula$Formula$toString(f))));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$toString = function (f) {
	switch (f.$) {
		case 'FT':
			return 'True';
		case 'FF':
			return 'False';
		case 'PredAtom':
			if (!f.b.b) {
				var p = f.a;
				return p;
			} else {
				var p = f.a;
				var ts = f.b;
				return _Utils_ap(
					p,
					$FMFI_UK_1_AIN_412$elm_formula$Term$argsToString(ts));
			}
		case 'EqAtom':
			var lt = f.a;
			var rt = f.b;
			return $FMFI_UK_1_AIN_412$elm_formula$Term$toString(lt) + ('≐' + $FMFI_UK_1_AIN_412$elm_formula$Term$toString(rt));
		case 'Neg':
			var sf = f.a;
			return '¬' + $FMFI_UK_1_AIN_412$elm_formula$Formula$toString(sf);
		case 'Conj':
			var lf = f.a;
			var rf = f.b;
			return A3($FMFI_UK_1_AIN_412$elm_formula$Formula$binToString, lf, '∧', rf);
		case 'Disj':
			var lf = f.a;
			var rf = f.b;
			return A3($FMFI_UK_1_AIN_412$elm_formula$Formula$binToString, lf, '∨', rf);
		case 'Impl':
			var lf = f.a;
			var rf = f.b;
			return A3($FMFI_UK_1_AIN_412$elm_formula$Formula$binToString, lf, '→', rf);
		case 'Equiv':
			var lf = f.a;
			var rf = f.b;
			return A3($FMFI_UK_1_AIN_412$elm_formula$Formula$binToString, lf, '↔', rf);
		case 'ForAll':
			var bv = f.a;
			var sf = f.b;
			return A3($FMFI_UK_1_AIN_412$elm_formula$Formula$qToString, '∀', bv, sf);
		default:
			var bv = f.a;
			var sf = f.b;
			return A3($FMFI_UK_1_AIN_412$elm_formula$Formula$qToString, '∃', bv, sf);
	}
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString = function (sf) {
	if (sf.$ === 'T') {
		var f = sf.a;
		return 'T ' + $FMFI_UK_1_AIN_412$elm_formula$Formula$toString(f);
	} else {
		var f = sf.a;
		return 'F ' + $FMFI_UK_1_AIN_412$elm_formula$Formula$toString(f);
	}
};
var $author$project$Zipper$prettify = function (t) {
	var z = $author$project$Zipper$zipper(t);
	var prettifyNode = function (n) {
		var newValue = function () {
			var _v1 = $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSigned(n.value);
			if (_v1.$ === 'Ok') {
				var f = _v1.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(f);
			} else {
				return n.value;
			}
		}();
		return _Utils_update(
			n,
			{value: newValue});
	};
	return $author$project$Zipper$zTableau(
		A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				var _v0 = tableau.ext;
				switch (_v0.$) {
					case 'Unary':
						var extType = _v0.a;
						var subT = _v0.b;
						return A2(
							$author$project$Tableau$Tableau,
							prettifyNode(tableau.node),
							A2(
								$author$project$Tableau$Unary,
								extType,
								$author$project$Zipper$prettify(subT)));
					case 'UnaryWithSubst':
						var extType = _v0.a;
						var subT = _v0.b;
						var subst = _v0.c;
						return A2(
							$author$project$Tableau$Tableau,
							prettifyNode(tableau.node),
							A3(
								$author$project$Tableau$UnaryWithSubst,
								extType,
								$author$project$Zipper$prettify(subT),
								subst));
					case 'Binary':
						var extType = _v0.a;
						var lt = _v0.b;
						var rt = _v0.c;
						return A2(
							$author$project$Tableau$Tableau,
							prettifyNode(tableau.node),
							A3(
								$author$project$Tableau$Binary,
								extType,
								$author$project$Zipper$prettify(lt),
								$author$project$Zipper$prettify(rt)));
					case 'Open':
						return A2(
							$author$project$Tableau$Tableau,
							prettifyNode(tableau.node),
							$author$project$Tableau$Open);
					default:
						var r1 = _v0.a;
						var r2 = _v0.b;
						return A2(
							$author$project$Tableau$Tableau,
							prettifyNode(tableau.node),
							A2($author$project$Tableau$Closed, r1, r2));
				}
			},
			z));
};
var $author$project$Tableau$Ref = F2(
	function (str, up) {
		return {str: str, up: up};
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Zipper$renumberJustInRefWhenDeleting = F2(
	function (ref, lengthOfPathFromFather) {
		var _v0 = ref.up;
		if (_v0.$ === 'Just') {
			if (!_v0.a) {
				return ref;
			} else {
				var x = _v0.a;
				return (_Utils_cmp(x - 1, lengthOfPathFromFather) > -1) ? A2(
					$author$project$Tableau$Ref,
					ref.str,
					$elm$core$Maybe$Just(x - 1)) : ref;
			}
		} else {
			return ref;
		}
	});
var $author$project$Zipper$renumberJustInRefWhenExpanding = F2(
	function (ref, lengthOfPathFromFather) {
		var _v0 = ref.up;
		if (_v0.$ === 'Just') {
			if (!_v0.a) {
				return ref;
			} else {
				var x = _v0.a;
				return (_Utils_cmp(x + 1, lengthOfPathFromFather) > -1) ? A2(
					$author$project$Tableau$Ref,
					ref.str,
					$elm$core$Maybe$Just(x + 1)) : ref;
			}
		} else {
			return ref;
		}
	});
var $author$project$Zipper$renumberJust = F3(
	function (t, f, lengthOfPathFromFather) {
		var func = function (ref) {
			var _v0 = ref.up;
			if (_v0.$ === 'Just') {
				if (!_v0.a) {
					return ref;
				} else {
					var x = _v0.a;
					return A2(f, ref, lengthOfPathFromFather);
				}
			} else {
				return ref;
			}
		};
		var oldReferences = t.node.references;
		var oldNode = t.node;
		var newNode = _Utils_update(
			oldNode,
			{
				references: A2($elm$core$List$map, func, oldReferences)
			});
		var newTableau = _Utils_update(
			t,
			{node: newNode});
		return newTableau;
	});
var $author$project$Zipper$renumberJusts = F3(
	function (tableau, f, lengthOfPathFromFather) {
		var renumberJustsUnary = F2(
			function (extWithType, subT) {
				return A2(
					$author$project$Tableau$Tableau,
					tableau.node,
					extWithType(
						A3(
							$author$project$Zipper$renumberJusts,
							A3($author$project$Zipper$renumberJust, subT, f, lengthOfPathFromFather + 1),
							f,
							lengthOfPathFromFather + 1)));
			});
		var renumberJustsBinary = F3(
			function (extWithType, lt, rt) {
				return A2(
					$author$project$Tableau$Tableau,
					tableau.node,
					A2(
						extWithType,
						A3(
							$author$project$Zipper$renumberJusts,
							A3($author$project$Zipper$renumberJust, lt, f, lengthOfPathFromFather + 1),
							f,
							lengthOfPathFromFather + 1),
						A3(
							$author$project$Zipper$renumberJusts,
							A3($author$project$Zipper$renumberJust, rt, f, lengthOfPathFromFather + 1),
							f,
							lengthOfPathFromFather + 1)));
			});
		var _v0 = tableau.ext;
		switch (_v0.$) {
			case 'Unary':
				var extType = _v0.a;
				var subT = _v0.b;
				return A2(
					renumberJustsUnary,
					$author$project$Tableau$Unary(extType),
					subT);
			case 'UnaryWithSubst':
				var extType = _v0.a;
				var subT = _v0.b;
				var subst = _v0.c;
				return A2(
					renumberJustsUnary,
					function (t) {
						return A3($author$project$Tableau$UnaryWithSubst, extType, t, subst);
					},
					subT);
			case 'Binary':
				var extType = _v0.a;
				var lt = _v0.b;
				var rt = _v0.c;
				return A3(
					renumberJustsBinary,
					$author$project$Tableau$Binary(extType),
					lt,
					rt);
			case 'Open':
				return tableau;
			default:
				var r1 = _v0.a;
				var r2 = _v0.b;
				return A2(
					$author$project$Tableau$Tableau,
					tableau.node,
					A2(
						$author$project$Tableau$Closed,
						A2(f, r1, lengthOfPathFromFather),
						A2(f, r2, lengthOfPathFromFather)));
		}
	});
var $author$project$Zipper$renumberJustInReferences = F2(
	function (f, z) {
		return A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				return A3($author$project$Zipper$renumberJusts, tableau, f, 0);
			},
			z);
	});
var $author$project$Zipper$setPair = F4(
	function (which, ref, r1, r2) {
		if (!which) {
			return _Utils_Tuple2(ref, r2);
		} else {
			return _Utils_Tuple2(r1, ref);
		}
	});
var $author$project$Zipper$setClosed = F3(
	function (which, newRefStr, z) {
		return A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				var _v0 = tableau.ext;
				if (_v0.$ === 'Closed') {
					var r1 = _v0.a;
					var r2 = _v0.b;
					var newRef = A4(
						$author$project$Zipper$setPair,
						which,
						A2($author$project$Zipper$getRef, z, newRefStr),
						r1,
						r2);
					return A2(
						$author$project$Tableau$Tableau,
						tableau.node,
						A2($author$project$Tableau$Closed, newRef.a, newRef.b));
				} else {
					return tableau;
				}
			},
			z);
	});
var $author$project$Zipper$setFormula = function (text) {
	return $author$project$Zipper$modifyNode(
		function (tableau) {
			var node = tableau.node;
			return _Utils_update(
				tableau,
				{
					node: _Utils_update(
						node,
						{
							formula: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSigned(text),
							value: text
						})
				});
		});
};
var $author$project$Zipper$setSubstitution = F2(
	function (text, z) {
		return A2(
			$author$project$Zipper$modifyNode,
			function (tableau) {
				var _v0 = tableau.ext;
				if (_v0.$ === 'UnaryWithSubst') {
					var extType = _v0.a;
					var t = _v0.b;
					var subst = _v0.c;
					return A2(
						$author$project$Tableau$Tableau,
						tableau.node,
						A3(
							$author$project$Tableau$UnaryWithSubst,
							extType,
							t,
							_Utils_update(
								subst,
								{
									parsedSubst: $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSubstitution(text),
									str: text
								})));
				} else {
					return tableau;
				}
			},
			$author$project$Zipper$up(z));
	});
var $author$project$Zipper$switchBetas = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (tableau) {
			var _v0 = tableau.ext;
			if (_v0.$ === 'Binary') {
				var extType = _v0.a;
				var lt = _v0.b;
				var rt = _v0.c;
				return A2(
					$author$project$Tableau$Tableau,
					tableau.node,
					A3($author$project$Tableau$Binary, extType, rt, lt));
			} else {
				return tableau;
			}
		},
		z);
};
var $author$project$Zipper$top = function (_v0) {
	top:
	while (true) {
		var t = _v0.a;
		var bs = _v0.b;
		if (!bs.b) {
			return _Utils_Tuple2(t, bs);
		} else {
			var $temp$_v0 = $author$project$Zipper$up(
				_Utils_Tuple2(t, bs));
			_v0 = $temp$_v0;
			continue top;
		}
	}
};
var $author$project$Editor$top = A2($elm$core$Basics$composeR, $author$project$Zipper$top, $author$project$Zipper$zTableau);
var $author$project$Zipper$above = F2(
	function (n, z) {
		above:
		while (true) {
			if (!n) {
				return z;
			} else {
				var $temp$n = n - 1,
					$temp$z = $author$project$Zipper$up(z);
				n = $temp$n;
				z = $temp$z;
				continue above;
			}
		}
	});
var $author$project$Zipper$getFixedRef = F2(
	function (ref, z) {
		var _v0 = ref.up;
		if (_v0.$ === 'Nothing') {
			return _Utils_update(
				ref,
				{str: ''});
		} else {
			var n = _v0.a;
			return _Utils_update(
				ref,
				{
					str: $elm$core$String$fromInt(
						$author$project$Zipper$zNode(
							A2($author$project$Zipper$above, n, z)).id)
				});
		}
	});
var $author$project$Zipper$fixClosedRefs = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (t) {
			var node = t.node;
			var ext = t.ext;
			if (ext.$ === 'Closed') {
				var ref1 = ext.a;
				var ref2 = ext.b;
				return A2(
					$author$project$Tableau$Tableau,
					node,
					A2(
						$author$project$Tableau$Closed,
						A2($author$project$Zipper$getFixedRef, ref1, z),
						A2($author$project$Zipper$getFixedRef, ref2, z)));
			} else {
				return t;
			}
		},
		z);
};
var $author$project$Zipper$fixNodeRef = function (z) {
	return A2(
		$author$project$Zipper$modifyNode,
		function (tableau) {
			var node = tableau.node;
			return _Utils_update(
				tableau,
				{
					node: _Utils_update(
						node,
						{
							references: A2(
								$elm$core$List$map,
								function (ref) {
									return A2($author$project$Zipper$getFixedRef, ref, z);
								},
								node.references)
						})
				});
		},
		z);
};
var $author$project$Zipper$fixRefs = $author$project$Zipper$zWalkPost(
	A2($elm$core$Basics$composeR, $author$project$Zipper$fixNodeRef, $author$project$Zipper$fixClosedRefs));
var $author$project$Zipper$renumber2 = F2(
	function (tableau, num) {
		var renumberUnary = F2(
			function (extWithType, subT) {
				var node = tableau.node;
				var _v3 = A2($author$project$Zipper$renumber2, subT, num + 1);
				var new_tableau = _v3.a;
				var num1 = _v3.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						_Utils_update(
							node,
							{id: num + 1}),
						extWithType(new_tableau)),
					num1);
			});
		var renumberBinary = F3(
			function (extWithType, lt, rt) {
				var node = tableau.node;
				var _v1 = A2($author$project$Zipper$renumber2, lt, num + 1);
				var new_left = _v1.a;
				var num1 = _v1.b;
				var _v2 = A2($author$project$Zipper$renumber2, rt, num1);
				var new_right = _v2.a;
				var num2 = _v2.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						_Utils_update(
							node,
							{id: num + 1}),
						A2(extWithType, new_left, new_right)),
					num2);
			});
		var _v0 = tableau.ext;
		switch (_v0.$) {
			case 'Open':
				var node = tableau.node;
				var ext = tableau.ext;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						_Utils_update(
							node,
							{id: num + 1}),
						ext),
					num + 1);
			case 'Closed':
				var r1 = _v0.a;
				var r2 = _v0.b;
				var node = tableau.node;
				var ext = tableau.ext;
				return _Utils_Tuple2(
					A2(
						$author$project$Tableau$Tableau,
						_Utils_update(
							node,
							{id: num + 1}),
						ext),
					num + 1);
			case 'Unary':
				var extType = _v0.a;
				var subT = _v0.b;
				return A2(
					renumberUnary,
					$author$project$Tableau$Unary(extType),
					subT);
			case 'UnaryWithSubst':
				var extType = _v0.a;
				var subT = _v0.b;
				var subst = _v0.c;
				return A2(
					renumberUnary,
					function (t) {
						return A3($author$project$Tableau$UnaryWithSubst, extType, t, subst);
					},
					subT);
			default:
				var extType = _v0.a;
				var lt = _v0.b;
				var rt = _v0.c;
				return A3(
					renumberBinary,
					$author$project$Tableau$Binary(extType),
					lt,
					rt);
		}
	});
var $author$project$Zipper$renumber = function (tableau) {
	return $author$project$Zipper$zTableau(
		$author$project$Zipper$top(
			$author$project$Zipper$fixRefs(
				$author$project$Zipper$zipper(
					A2($author$project$Zipper$renumber2, tableau, 0).a))));
};
var $author$project$Editor$topRenumbered = A2($elm$core$Basics$composeR, $author$project$Editor$top, $author$project$Zipper$renumber);
var $author$project$Editor$simpleUpdate = F2(
	function (msg, model) {
		return A2(
			$elm$core$Debug$log,
			'model',
			function () {
				switch (msg.$) {
					case 'ChangeText':
						var z = msg.a;
						var _new = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$top(
									A2($author$project$Zipper$setFormula, _new, z))
							});
					case 'ExpandUnary':
						var extType = msg.a;
						var z = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									A2(
										$author$project$Zipper$renumberJustInReferences,
										$author$project$Zipper$renumberJustInRefWhenExpanding,
										A2($author$project$Zipper$extendUnary, extType, z)))
							});
					case 'ExpandUnaryWithSubst':
						var extType = msg.a;
						var z = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									A2(
										$author$project$Zipper$renumberJustInReferences,
										$author$project$Zipper$renumberJustInRefWhenExpanding,
										A2($author$project$Zipper$extendUnaryWithSubst, extType, z)))
							});
					case 'ExpandBinary':
						var extType = msg.a;
						var z = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									A2(
										$author$project$Zipper$renumberJustInReferences,
										$author$project$Zipper$renumberJustInRefWhenExpanding,
										A2($author$project$Zipper$extendBinary, extType, z)))
							});
					case 'ChangeRef':
						var z = msg.a;
						var _new = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$top(
									A2($author$project$Zipper$setRefs, _new, z))
							});
					case 'Delete':
						var z = msg.a;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									$author$project$Zipper$delete(z))
							});
					case 'DeleteMe':
						var z = msg.a;
						var newZipp = $author$project$Zipper$deleteMe(z);
						return (!_Utils_eq(
							newZipp,
							$author$project$Zipper$up(z))) ? _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									A2(
										$author$project$Zipper$renumberJustInReferences,
										$author$project$Zipper$renumberJustInRefWhenDeleting,
										$author$project$Zipper$deleteMe(z)))
							}) : _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									$author$project$Zipper$deleteMe(z))
							});
					case 'MakeClosed':
						var z = msg.a;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$top(
									$author$project$Zipper$makeClosed(z))
							});
					case 'SetClosed':
						var which = msg.a;
						var z = msg.b;
						var ref = msg.c;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$top(
									A3($author$project$Zipper$setClosed, which, ref, z))
							});
					case 'MakeOpen':
						var z = msg.a;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$top(
									$author$project$Zipper$makeOpen(z))
							});
					case 'ChangeSubst':
						var z = msg.a;
						var newSubst = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$top(
									A2($author$project$Zipper$setSubstitution, newSubst, z))
							});
					case 'SwitchBetas':
						var z = msg.a;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									$author$project$Zipper$switchBetas(z))
							});
					case 'ChangeToUnary':
						var extType = msg.a;
						var z = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									A2($author$project$Zipper$changeToUnaryRule, extType, z))
							});
					case 'ChangeToUnaryWithSubst':
						var extType = msg.a;
						var z = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									A2($author$project$Zipper$changeToUnaryRuleWithSubst, extType, z))
							});
					case 'ChangeToBinary':
						var extType = msg.a;
						var z = msg.b;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$topRenumbered(
									A2($author$project$Zipper$changeToBinaryRule, extType, z))
							});
					case 'ChangeButtonsAppearance':
						var z = msg.a;
						return _Utils_update(
							model,
							{
								tableau: $author$project$Editor$top(
									$author$project$Zipper$changeButtonAppearance(z))
							});
					case 'SetConfig':
						var _new = msg.a;
						return _Utils_update(
							model,
							{config: _new});
					case 'Prettify':
						return _Utils_update(
							model,
							{
								tableau: $author$project$Zipper$prettify(model.tableau)
							});
					case 'JsonSelect':
						return model;
					case 'JsonSelected':
						return model;
					case 'Undo':
						return model;
					case 'Redo':
						return model;
					case 'JsonRead':
						return model;
					case 'Export':
						return model;
					case 'Print':
						return model;
					default:
						return model;
				}
			}());
	});
var $elm$file$File$Download$string = F3(
	function (name, mime, content) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$never,
			A3(_File_download, name, mime, content));
	});
var $elm$file$File$toString = _File_toString;
var $elm_community$undo_redo$UndoList$undo = function (_v0) {
	var past = _v0.past;
	var present = _v0.present;
	var future = _v0.future;
	if (!past.b) {
		return A3($elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = past.a;
		var xs = past.b;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			xs,
			x,
			A2($elm$core$List$cons, present, future));
	}
};
var $author$project$Editor$update = F2(
	function (msg, model) {
		var present = model.present;
		switch (msg.$) {
			case 'JsonSelect':
				return _Utils_Tuple2(
					model,
					A2(
						$elm$file$File$Select$file,
						_List_fromArray(
							['application/json']),
						$author$project$Editor$JsonSelected));
			case 'JsonSelected':
				var file = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							present: _Utils_update(
								present,
								{
									jsonImport: $author$project$Editor$InProgress(
										$elm$file$File$name(file))
								})
						}),
					A2(
						$elm$core$Task$perform,
						$author$project$Editor$JsonRead,
						$elm$file$File$toString(file)));
			case 'JsonRead':
				var contents = msg.a;
				var _v1 = $author$project$Helpers$Exporting$Json$Decode$decode(contents);
				if (_v1.a.$ === 'Ok') {
					if (_v1.b.$ === 'Ok') {
						var cfg = _v1.a.a;
						var t = _v1.b.a;
						return _Utils_Tuple2(
							A2(
								$elm_community$undo_redo$UndoList$new,
								_Utils_update(
									present,
									{config: cfg, jsonImport: $author$project$Editor$None, tableau: t}),
								model),
							$author$project$Editor$cache(contents));
					} else {
						var tErr = _v1.b.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									present: _Utils_update(
										present,
										{
											jsonImport: A2(
												$author$project$Editor$ImportErr,
												'Failed to import tableau',
												_List_fromArray(
													[tErr]))
										})
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					if (_v1.b.$ === 'Ok') {
						var cfgErr = _v1.a.a;
						var t = _v1.b.a;
						return _Utils_Tuple2(
							A2(
								$elm_community$undo_redo$UndoList$new,
								_Utils_update(
									present,
									{
										jsonImport: A2(
											$author$project$Editor$ImportErr,
											'Failed to import rule set configuration. ' + 'Keeping the last one.',
											_List_fromArray(
												[cfgErr])),
										tableau: t
									}),
								model),
							$author$project$Editor$cache(contents));
					} else {
						var cfgErr = _v1.a.a;
						var tErr = _v1.b.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									present: _Utils_update(
										present,
										{
											jsonImport: A2(
												$author$project$Editor$ImportErr,
												'Failed to import tableau and ' + 'rule set configuration',
												_List_fromArray(
													[tErr, cfgErr]))
										})
								}),
							$elm$core$Platform$Cmd$none);
					}
				}
			case 'Export':
				return _Utils_Tuple2(
					model,
					A3(
						$elm$file$File$Download$string,
						'tableau.json',
						'application/json',
						A3($author$project$Helpers$Exporting$Json$Encode$encode, 2, present.config, present.tableau)));
			case 'Undo':
				return _Utils_Tuple2(
					$elm_community$undo_redo$UndoList$undo(
						_Utils_update(
							model,
							{
								present: _Utils_update(
									present,
									{jsonImport: $author$project$Editor$None})
							})),
					$elm$core$Platform$Cmd$none);
			case 'Redo':
				return _Utils_Tuple2(
					$elm_community$undo_redo$UndoList$redo(model),
					$elm$core$Platform$Cmd$none);
			case 'Print':
				return _Utils_Tuple2(
					model,
					$author$project$Editor$print(_Utils_Tuple0));
			case 'Cache':
				return _Utils_Tuple2(
					model,
					$author$project$Editor$cache(
						A3($author$project$Helpers$Exporting$Json$Encode$encode, 0, model.present.config, model.present.tableau)));
			default:
				var presentSansImport = _Utils_update(
					present,
					{jsonImport: $author$project$Editor$None});
				return _Utils_Tuple2(
					A2(
						$elm_community$undo_redo$UndoList$new,
						A2($author$project$Editor$simpleUpdate, msg, presentSansImport),
						_Utils_update(
							model,
							{present: presentSansImport})),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Editor$Prettify = {$: 'Prettify'};
var $author$project$Editor$Print = {$: 'Print'};
var $author$project$Editor$Redo = {$: 'Redo'};
var $author$project$Editor$Undo = {$: 'Undo'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $author$project$Editor$SetConfig = function (a) {
	return {$: 'SetConfig', a: a};
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Editor$menu = F3(
	function (cls, label, content) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('onclick-menu ' + cls),
					$elm$html$Html$Attributes$tabindex(0)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							label,
							$elm$html$Html$text(' ▾')
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('onclick-menu-content')
						]),
					content)
				]));
	});
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Editor$menuItem = F2(
	function (msg, str) {
		return A2(
			$elm$html$Html$li,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(msg)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(str)
						]))
				]));
	});
var $author$project$Editor$configMenu = function (config) {
	var item = function (cfg) {
		return A2(
			$author$project$Editor$menuItem,
			$author$project$Editor$SetConfig(cfg),
			$author$project$Config$toString(cfg));
	};
	return A3(
		$author$project$Editor$menu,
		'change',
		$elm$html$Html$text(
			$author$project$Config$toString(config)),
		_List_fromArray(
			[
				item($author$project$Config$BasicPropositional),
				item($author$project$Config$Propositional),
				item($author$project$Config$PropositionalWithEquality),
				item($author$project$Config$BasicFol),
				item($author$project$Config$FullFol)
			]));
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm_explorations$markdown$Markdown$defaultOptions = {
	defaultHighlighting: $elm$core$Maybe$Nothing,
	githubFlavored: $elm$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: true,
	smartypants: false
};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $elm_explorations$markdown$Markdown$toHtml = $elm_explorations$markdown$Markdown$toHtmlWith($elm_explorations$markdown$Markdown$defaultOptions);
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Helpers$Rules$notesTable = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('half')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Important notes')
				])),
			A2(
			$elm$html$Html$table,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('rulesHelpTable')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Note')
								])),
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Example')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'Each node contains a signed formula, i.e. it must be prefixed by `T` or `F`. ')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'**T** \\forall x P(x)'),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'**F** ∃x ∀y (K(x,q) ∧ G(y,x))')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'Write each premise/assumption and conclusion/goal with no references. Sign premises with `T` and sign conclusions with\u00A0`F`.')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'(**1**) **T** (A → B) [ ]'),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'(**2**) **F** ¬(A ∧ ¬B) [ ]')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'When substituting a\u00A0variable\u00A0_x_ with a term\u00A0_t_, _t_\u00A0must not contain any variable which is bound at any occurrence of\u00A0_x_.')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'**Incorrect** example: '),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'(1) T ∀x ∃**y** P(**x**,y) [ ]'),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'(2) T ∃y P(f(y),y) {x→**f(y)**}\u00A0[1]')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'When applying a\u00A0δ\u00A0rule, substitute the bound variable with **a new** constant/variable, i.e., one which is not free (or, even better, does not occur at all) in any node above the current one.')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'**Incorrect** example: '),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'(1) T L(**p**) [ ]'),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'(2) T ∃x ∀y P(x,y) [ ]'),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'(3) T ∀y P(**p**,y) {x→**p**} [2]')
								]))
						]))
				]))
		]));
var $author$project$Helpers$Rules$fA = A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'A', _List_Nil);
var $author$project$Helpers$Rules$fB = A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'B', _List_Nil);
var $author$project$Helpers$Rules$alphas = _List_fromArray(
	[
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Conj, $author$project$Helpers$Rules$fA, $author$project$Helpers$Rules$fB)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Disj, $author$project$Helpers$Rules$fA, $author$project$Helpers$Rules$fB)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Impl, $author$project$Helpers$Rules$fA, $author$project$Helpers$Rules$fB)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Neg($author$project$Helpers$Rules$fA)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Neg($author$project$Helpers$Rules$fA))
	]);
var $author$project$Helpers$Rules$linearExample = F3(
	function (a, b, c) {
		return A2(
			$elm$html$Html$td,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('formula')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(a),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('alpha')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('formula')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(b),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('alpha')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('formula')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(c)
														]))
												]))
										]))
								]))
						]))
				]));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$neg = function (sf) {
	if (sf.$ === 'T') {
		var f = sf.a;
		return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(f);
	} else {
		var f = sf.a;
		return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(f);
	}
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas = function (sf) {
	if (sf.$ === 'T') {
		switch (sf.a.$) {
			case 'Neg':
				var f = sf.a.a;
				return _List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(f)
					]);
			case 'Conj':
				var _v1 = sf.a;
				var l = _v1.a;
				var r = _v1.b;
				return _List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(l),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(r)
					]);
			case 'Disj':
				var _v2 = sf.a;
				var l = _v2.a;
				var r = _v2.b;
				return _List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(l),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(r)
					]);
			case 'Impl':
				var _v3 = sf.a;
				var l = _v3.a;
				var r = _v3.b;
				return _List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(l),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(r)
					]);
			case 'Equiv':
				var _v4 = sf.a;
				var l = _v4.a;
				var r = _v4.b;
				return _List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
						A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Impl, l, r)),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
						A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Impl, r, l))
					]);
			case 'ForAll':
				var _v5 = sf.a;
				var f = _v5.b;
				return _List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(f)
					]);
			case 'Exists':
				var _v6 = sf.a;
				var f = _v6.b;
				return _List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(f)
					]);
			default:
				return _List_Nil;
		}
	} else {
		var f = sf.a;
		return A2(
			$elm$core$List$map,
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$neg,
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas(
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(f)));
	}
};
var $author$project$Helpers$Rules$renderAlpha = function (a) {
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rule')
			]),
		A2(
			$elm$core$List$cons,
			A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(a))
							]))
					])),
			A2(
				$elm$core$List$map,
				function (f) {
					return A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(f))
									]))
							]));
				},
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas(a))));
};
var $author$project$Config$basicPropositionalRules = _List_fromArray(
	['α', 'β']);
var $author$project$Config$basicQuantifierRules = _List_fromArray(
	['γ', 'δ']);
var $author$project$Config$equalityRules = _List_fromArray(
	['Reflexivity', 'Leibnitz']);
var $author$project$Config$extendedPropositionalRules = _List_fromArray(
	['MP', 'MT', 'DS', 'NCS', 'ESTT', 'ESTF', 'ESFT', 'ESFF']);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $author$project$Config$nonAnalyticPropositionalRules = _List_fromArray(
	['Cut', 'HS', 'ECDT', 'ECDF']);
var $author$project$Config$basicFolRuleSet = $elm$core$Set$fromList(
	_Utils_ap(
		$author$project$Config$basicPropositionalRules,
		_Utils_ap(
			$author$project$Config$extendedPropositionalRules,
			_Utils_ap(
				$author$project$Config$nonAnalyticPropositionalRules,
				_Utils_ap($author$project$Config$equalityRules, $author$project$Config$basicQuantifierRules)))));
var $author$project$Config$basicPropositionalRuleSet = $elm$core$Set$fromList($author$project$Config$basicPropositionalRules);
var $author$project$Config$extendedQuantifierRules = _List_fromArray(
	['γ*', 'δ*']);
var $author$project$Config$fullFolRuleSet = $elm$core$Set$fromList(
	_Utils_ap(
		$author$project$Config$basicPropositionalRules,
		_Utils_ap(
			$author$project$Config$extendedPropositionalRules,
			_Utils_ap(
				$author$project$Config$nonAnalyticPropositionalRules,
				_Utils_ap(
					$author$project$Config$equalityRules,
					_Utils_ap($author$project$Config$basicQuantifierRules, $author$project$Config$extendedQuantifierRules))))));
var $author$project$Config$propositionalRuleSet = $elm$core$Set$fromList(
	_Utils_ap(
		$author$project$Config$basicPropositionalRules,
		_Utils_ap($author$project$Config$extendedPropositionalRules, $author$project$Config$nonAnalyticPropositionalRules)));
var $author$project$Config$propositionalWithEqualityRuleSet = $elm$core$Set$fromList(
	_Utils_ap(
		$author$project$Config$basicPropositionalRules,
		_Utils_ap(
			$author$project$Config$extendedPropositionalRules,
			_Utils_ap($author$project$Config$nonAnalyticPropositionalRules, $author$project$Config$equalityRules))));
var $author$project$Config$getRuleSet = function (config) {
	switch (config.$) {
		case 'BasicPropositional':
			return $author$project$Config$basicPropositionalRuleSet;
		case 'Propositional':
			return $author$project$Config$propositionalRuleSet;
		case 'PropositionalWithEquality':
			return $author$project$Config$propositionalWithEqualityRuleSet;
		case 'BasicFol':
			return $author$project$Config$basicFolRuleSet;
		default:
			return $author$project$Config$fullFolRuleSet;
	}
};
var $author$project$Helpers$Rules$ruleItem = F4(
	function (ruleName, formulas, example, config) {
		return A2(
			$elm$core$Set$member,
			ruleName,
			$author$project$Config$getRuleSet(config)) ? $elm$core$Maybe$Just(
			A2(
				$elm$html$Html$table,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('rulesHelpTable'),
						$elm$html$Html$Attributes$class('ruleBox')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(ruleName)
									])),
								A2(
								$elm$html$Html$th,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Example')
									]))
							])),
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										A2($elm$html$Html$div, _List_Nil, formulas)
									])),
								example
							]))
					]))) : $elm$core$Maybe$Nothing;
	});
var $author$project$Helpers$Rules$alphaItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'α',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderAlpha, $author$project$Helpers$Rules$alphas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T(a∧b) [ ]', '(2) T a [1]', '(3) T b [1]'),
		config);
};
var $author$project$Helpers$Rules$betas = _List_fromArray(
	[
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Conj, $author$project$Helpers$Rules$fA, $author$project$Helpers$Rules$fB)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Disj, $author$project$Helpers$Rules$fA, $author$project$Helpers$Rules$fB)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Impl, $author$project$Helpers$Rules$fA, $author$project$Helpers$Rules$fB))
	]);
var $author$project$Helpers$Rules$binaryExample = F3(
	function (a, b, c) {
		return A2(
			$elm$html$Html$td,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('formula')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(a),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('beta')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('formula')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(b)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('formula')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(c)
										]))
								]))
						]))
				]));
	});
var $elm$html$Html$Attributes$colspan = function (n) {
	return A2(
		_VirtualDom_attribute,
		'colspan',
		$elm$core$String$fromInt(n));
};
var $author$project$Helpers$Rules$renderBeta = function (b) {
	var subfs = $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas(b);
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rule')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$colspan(
								$elm$core$List$length(subfs))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(b))
							]))
					])),
				A2(
				$elm$html$Html$tr,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (f) {
						return A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(f))
								]));
					},
					subfs))
			]));
};
var $author$project$Helpers$Rules$betaItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'β',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderBeta, $author$project$Helpers$Rules$betas),
		A3($author$project$Helpers$Rules$binaryExample, '(1) T(a∨b) [ ]', '(2) T a [1]', '(3) T b [1]'),
		config);
};
var $author$project$Helpers$Rules$cutFormulas = _List_fromArray(
	[
		_Utils_Tuple3('', 'T A', 'F A')
	]);
var $author$project$Helpers$Rules$renderBinary = function (_v0) {
	var f = _v0.a;
	var sf1 = _v0.b;
	var sf2 = _v0.c;
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rule')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('formula')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(f),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('beta')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('formula')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(sf1)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('formula')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(sf2)
									]))
							]))
					]))
			]));
};
var $author$project$Helpers$Rules$cutItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'Cut',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderBinary, $author$project$Helpers$Rules$cutFormulas),
		A3($author$project$Helpers$Rules$binaryExample, '', 'T a [ ]', 'F a [ ]'),
		config);
};
var $author$project$Helpers$Rules$fD = A2(
	$FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom,
	'P',
	_List_fromArray(
		[
			$FMFI_UK_1_AIN_412$elm_formula$Term$Var('x')
		]));
var $author$project$Helpers$Rules$fG = A2(
	$FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom,
	'P',
	_List_fromArray(
		[
			$FMFI_UK_1_AIN_412$elm_formula$Term$Var('x')
		]));
var $author$project$Helpers$Rules$deltas = _List_fromArray(
	[
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll, 'x', $author$project$Helpers$Rules$fG)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Exists, 'x', $author$project$Helpers$Rules$fD))
	]);
var $FMFI_UK_1_AIN_412$elm_formula$Formula$FF = {$: 'FF'};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Helpers$Rules$signedMap = F2(
	function (f, sx) {
		if (sx.$ === 'T') {
			var x = sx.a;
			return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
				f(x));
		} else {
			var x = sx.a;
			return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
				f(x));
		}
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $FMFI_UK_1_AIN_412$elm_formula$Term$freeA = F2(
	function (t, fvs) {
		if (t.$ === 'Var') {
			var x = t.a;
			return A2($elm$core$Set$insert, x, fvs);
		} else {
			var ts = t.b;
			return A3($elm$core$List$foldl, $FMFI_UK_1_AIN_412$elm_formula$Term$freeA, fvs, ts);
		}
	});
var $FMFI_UK_1_AIN_412$elm_formula$Term$free = function (t) {
	return A2($FMFI_UK_1_AIN_412$elm_formula$Term$freeA, t, $elm$core$Set$empty);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (k, _v0) {
					return A2($elm$core$Dict$member, k, t2);
				}),
			t1);
	});
var $elm$core$Set$intersect = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$intersect, dict1, dict2));
	});
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Set$isEmpty = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$isEmpty(dict);
};
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$core$Set$size = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$size(dict);
};
var $FMFI_UK_1_AIN_412$elm_formula$Term$canSubst = F3(
	function (x, t, bound) {
		var strVars = function (xs) {
			return A2($elm$core$String$join, ', ', xs);
		};
		var varsToBe = function (xs) {
			return 'variable' + ((($elm$core$Set$size(xs) === 1) ? '' : 's') + (' ' + (strVars(
				$elm$core$Set$toList(xs)) + (($elm$core$Set$size(xs) === 1) ? ' is' : ' are'))));
		};
		var clashing = A2(
			$elm$core$Set$intersect,
			bound,
			$FMFI_UK_1_AIN_412$elm_formula$Term$free(t));
		return $elm$core$Set$isEmpty(clashing) ? $elm$core$Result$Ok(t) : $elm$core$Result$Err(
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[
						'Cannot substitute',
						$FMFI_UK_1_AIN_412$elm_formula$Term$toString(t),
						'for',
						x + ';',
						varsToBe(clashing),
						'bound'
					])));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Term$mapResult = function (f) {
	return A2(
		$elm$core$List$foldr,
		A2(
			$elm$core$Basics$composeL,
			$elm$core$Result$map2($elm$core$List$cons),
			f),
		$elm$core$Result$Ok(_List_Nil));
};
var $FMFI_UK_1_AIN_412$elm_formula$Term$subst = F3(
	function (σ, bound, tt) {
		var substA = function (t) {
			if (t.$ === 'Var') {
				var x = t.a;
				var _v1 = A2($elm$core$Dict$get, x, σ);
				if (_v1.$ === 'Just') {
					var xt = _v1.a;
					return A3($FMFI_UK_1_AIN_412$elm_formula$Term$canSubst, x, xt, bound);
				} else {
					return $elm$core$Result$Ok(t);
				}
			} else {
				var f = t.a;
				var ts = t.b;
				return A2(
					$elm$core$Result$map,
					$FMFI_UK_1_AIN_412$elm_formula$Term$Fun(f),
					A3($FMFI_UK_1_AIN_412$elm_formula$Term$substs, σ, bound, ts));
			}
		};
		return substA(tt);
	});
var $FMFI_UK_1_AIN_412$elm_formula$Term$substs = F3(
	function (σ, bound, lst) {
		return A2(
			$FMFI_UK_1_AIN_412$elm_formula$Term$mapResult,
			A2($FMFI_UK_1_AIN_412$elm_formula$Term$subst, σ, bound),
			lst);
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$subst = F3(
	function (σ, bound, f) {
		var substA = A2($FMFI_UK_1_AIN_412$elm_formula$Formula$subst, σ, bound);
		switch (f.$) {
			case 'PredAtom':
				var p = f.a;
				var ts = f.b;
				return A2(
					$elm$core$Result$map,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom(p),
					A3($FMFI_UK_1_AIN_412$elm_formula$Term$substs, σ, bound, ts));
			case 'EqAtom':
				var lt = f.a;
				var rt = f.b;
				return A3(
					$elm$core$Result$map2,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$EqAtom,
					A3($FMFI_UK_1_AIN_412$elm_formula$Term$subst, σ, bound, lt),
					A3($FMFI_UK_1_AIN_412$elm_formula$Term$subst, σ, bound, rt));
			case 'ForAll':
				var x = f.a;
				var sf = f.b;
				return A2(
					$elm$core$Result$map,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll(x),
					A3(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$subst,
						A2($elm$core$Dict$remove, x, σ),
						A2($elm$core$Set$insert, x, bound),
						sf));
			case 'Exists':
				var x = f.a;
				var sf = f.b;
				return A2(
					$elm$core$Result$map,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Exists(x),
					A3(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$subst,
						A2($elm$core$Dict$remove, x, σ),
						A2($elm$core$Set$insert, x, bound),
						sf));
			case 'Disj':
				var lf = f.a;
				var rf = f.b;
				return A3(
					$elm$core$Result$map2,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Disj,
					substA(lf),
					substA(rf));
			case 'Conj':
				var lf = f.a;
				var rf = f.b;
				return A3(
					$elm$core$Result$map2,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Conj,
					substA(lf),
					substA(rf));
			case 'Impl':
				var lf = f.a;
				var rf = f.b;
				return A3(
					$elm$core$Result$map2,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Impl,
					substA(lf),
					substA(rf));
			case 'Equiv':
				var lf = f.a;
				var rf = f.b;
				return A3(
					$elm$core$Result$map2,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Equiv,
					substA(lf),
					substA(rf));
			case 'Neg':
				var sf = f.a;
				return A2(
					$elm$core$Result$map,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Neg,
					substA(sf));
			default:
				return $elm$core$Result$Ok(f);
		}
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$substitute = F2(
	function (σ, f) {
		return A3($FMFI_UK_1_AIN_412$elm_formula$Formula$subst, σ, $elm$core$Set$empty, f);
	});
var $author$project$Helpers$Rules$demoSubst = F2(
	function (x, y) {
		return $author$project$Helpers$Rules$signedMap(
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Result$withDefault($FMFI_UK_1_AIN_412$elm_formula$Formula$FF),
				$FMFI_UK_1_AIN_412$elm_formula$Formula$substitute(
					A2(
						$elm$core$Dict$singleton,
						x,
						$FMFI_UK_1_AIN_412$elm_formula$Term$Var(y)))));
	});
var $author$project$Helpers$Rules$renderDelta = function (d) {
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rule')
			]),
		A2(
			$elm$core$List$cons,
			A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(d))
							]))
					])),
			A2(
				$elm$core$List$map,
				function (f) {
					return A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(
											A3($author$project$Helpers$Rules$demoSubst, 'x', 'y', f)))
									]))
							]));
				},
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas(d))));
};
var $author$project$Helpers$Rules$deltaItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'δ',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderDelta, $author$project$Helpers$Rules$deltas),
		A3($author$project$Helpers$Rules$linearExample, '', '(1) F ∀x P(x) [ ]', '(2) F P(z) {x→z} [1]'),
		config);
};
var $elm$html$Html$sub = _VirtualDom_node('sub');
var $author$project$Helpers$Rules$subs = function (txt) {
	return A2(
		$elm$html$Html$sub,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(txt)
			]));
};
var $author$project$Helpers$Rules$renderGammaDeltaStar = function (_v0) {
	var sign = _v0.a;
	var quant = _v0.b;
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rule'),
				$elm$html$Html$Attributes$class('withWhiteSpace')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(sign + (' ' + (quant + 'x'))),
								$author$project$Helpers$Rules$subs('1'),
								$elm$html$Html$text(',...,' + (quant + 'x')),
								$author$project$Helpers$Rules$subs('n'),
								$elm$html$Html$text('A')
							]))
					])),
				A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(sign + ' A{x'),
								$author$project$Helpers$Rules$subs('1'),
								$elm$html$Html$text('→y'),
								$author$project$Helpers$Rules$subs('1'),
								$elm$html$Html$text(',...,x'),
								$author$project$Helpers$Rules$subs('n'),
								$elm$html$Html$text('→y'),
								$author$project$Helpers$Rules$subs('n'),
								$elm$html$Html$text('}')
							]))
					]))
			]));
};
var $author$project$Helpers$Rules$deltaStarItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'δ*',
		A2(
			$elm$core$List$map,
			$author$project$Helpers$Rules$renderGammaDeltaStar,
			_List_fromArray(
				[
					_Utils_Tuple2('F', '∀'),
					_Utils_Tuple2('T', '∃')
				])),
		A3($author$project$Helpers$Rules$linearExample, '', '(1) F ∀x∀y P(x,y) [ ]', '(2) F P(q,z) {x→q, y→z} [1]'),
		config);
};
var $author$project$Helpers$Rules$dsFormulas = _List_fromArray(
	[
		_Utils_Tuple3('T (A∨B)', 'F A', 'T B'),
		_Utils_Tuple3('T (A∨B)', 'F B', 'T A')
	]);
var $author$project$Helpers$Rules$renderUnary = function (_v0) {
	var f1 = _v0.a;
	var f2 = _v0.b;
	var f3 = _v0.c;
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rule'),
				$elm$html$Html$Attributes$class('withWhiteSpace')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(f1 + ('   ' + f2))
							]))
					])),
				A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(f3)
							]))
					]))
			]));
};
var $author$project$Helpers$Rules$dsItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'DS',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$dsFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T(a∨b) [ ]', '(2) F a [ ]', '(3) T b [1,2]'),
		config);
};
var $author$project$Helpers$Rules$ecdfFormulas = _List_fromArray(
	[
		_Utils_Tuple3('F (A↔B)', 'T (A∧¬B)', 'F (A∨¬B)')
	]);
var $author$project$Helpers$Rules$ecdfItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'ECDF',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderBinary, $author$project$Helpers$Rules$ecdfFormulas),
		A3($author$project$Helpers$Rules$binaryExample, '(1) F(a↔b) [ ]', '(2) T (a∧¬b) [1]', '(3) F (a∨¬b) [1]'),
		config);
};
var $author$project$Helpers$Rules$ecdtFormulas = _List_fromArray(
	[
		_Utils_Tuple3('T (A↔B)', 'T (A∧B)', 'F (A∨B)')
	]);
var $author$project$Helpers$Rules$ecdtItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'ECDT',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderBinary, $author$project$Helpers$Rules$ecdtFormulas),
		A3($author$project$Helpers$Rules$binaryExample, '(1) T(a↔b) [ ]', '(2) T(a∧b) [1]', '(3) F (a∨b) [1]'),
		config);
};
var $author$project$Helpers$Rules$esffFormulas = _List_fromArray(
	[
		_Utils_Tuple3('F (A↔B)', 'F A', 'T B'),
		_Utils_Tuple3('F (A↔B)', 'F B', 'T A')
	]);
var $author$project$Helpers$Rules$esffItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'ESFF',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$esffFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) F(a↔b) [ ]', '(2) F b [ ]', '(3) T a [1,2]'),
		config);
};
var $author$project$Helpers$Rules$esftFormulas = _List_fromArray(
	[
		_Utils_Tuple3('F (A↔B)', 'T A', 'F B'),
		_Utils_Tuple3('F (A↔B)', 'T B', 'F A')
	]);
var $author$project$Helpers$Rules$esftItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'ESFT',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$esftFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) F(a↔b) [ ]', '(2) T a [ ]', '(3) F b [1,2]'),
		config);
};
var $author$project$Helpers$Rules$estfFormulas = _List_fromArray(
	[
		_Utils_Tuple3('T (A↔B)', 'F A', 'F B'),
		_Utils_Tuple3('T (A↔B)', 'F B', 'F A')
	]);
var $author$project$Helpers$Rules$estfItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'ESTF',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$estfFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T(a↔b) [ ]', '(2) F a [ ]', '(3) F b [1,2]'),
		config);
};
var $author$project$Helpers$Rules$esttFormulas = _List_fromArray(
	[
		_Utils_Tuple3('T (A↔B)', 'T A', 'T B'),
		_Utils_Tuple3('T (A↔B)', 'T B', 'T A')
	]);
var $author$project$Helpers$Rules$esttItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'ESTT',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$esttFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T(a↔b) [ ]', '(2) T b [ ]', '(3) T a [1,2]'),
		config);
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$Helpers$Rules$gammas = _List_fromArray(
	[
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll, 'x', $author$project$Helpers$Rules$fD)),
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
		A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Exists, 'x', $author$project$Helpers$Rules$fD))
	]);
var $author$project$Helpers$Rules$renderGamma = function (g) {
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rule')
			]),
		A2(
			$elm$core$List$cons,
			A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(g))
							]))
					])),
			A2(
				$elm$core$List$map,
				function (f) {
					return A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString(
											A3($author$project$Helpers$Rules$demoSubst, 'x', 't', f)))
									]))
							]));
				},
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas(g))));
};
var $author$project$Helpers$Rules$gammaItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'γ',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderGamma, $author$project$Helpers$Rules$gammas),
		A3($author$project$Helpers$Rules$linearExample, '', '(1) T ∀x P(x) [ ]', '(2) T P(g(k,y)) {x→g(k,y)} [1]'),
		config);
};
var $author$project$Helpers$Rules$gammaStarItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'γ*',
		A2(
			$elm$core$List$map,
			$author$project$Helpers$Rules$renderGammaDeltaStar,
			_List_fromArray(
				[
					_Utils_Tuple2('T', '∀'),
					_Utils_Tuple2('F', '∃')
				])),
		A3($author$project$Helpers$Rules$linearExample, '', '(1) T ∀x∀y P(x,y) [ ]', '(2) T P(g(k,z), q) {x→g(k,z), y→q} [1]'),
		config);
};
var $author$project$Helpers$Rules$hsFormulas = _List_fromArray(
	[
		_Utils_Tuple3('T (A→B)', 'T (B→C)', 'T (A→C)')
	]);
var $author$project$Helpers$Rules$hsItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'HS',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$hsFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T(a→b) [ ]', '(2) T(b→c) [ ]', '(3) T(a→c) [1,2]'),
		config);
};
var $elm$html$Html$sup = _VirtualDom_node('sup');
var $author$project$Helpers$Rules$sups = function (txt) {
	return A2(
		$elm$html$Html$sup,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(txt)
			]));
};
var $author$project$Helpers$Rules$leibnitzItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'Leibnitz',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$table,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('rule'),
						$elm$html$Html$Attributes$class('withWhiteSpace')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('T t'),
										$author$project$Helpers$Rules$subs('1'),
										$elm$html$Html$text('≐t'),
										$author$project$Helpers$Rules$subs('2'),
										$elm$html$Html$text('  A'),
										$author$project$Helpers$Rules$sups('+'),
										$elm$html$Html$text('{q→t'),
										$author$project$Helpers$Rules$subs('1'),
										$elm$html$Html$text('}')
									]))
							])),
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('   A'),
										$author$project$Helpers$Rules$sups('+'),
										$elm$html$Html$text('{q→t'),
										$author$project$Helpers$Rules$subs('2'),
										$elm$html$Html$text('}')
									]))
							]))
					]))
			]),
		A3($author$project$Helpers$Rules$linearExample, '(1) T x≐f(y) [ ]', '(2) T p(x) [ ]', '(3) T p(f(y)) [1,2]'),
		config);
};
var $author$project$Helpers$Rules$mpFormulas = _List_fromArray(
	[
		_Utils_Tuple3('T (A→B)', 'T A', 'T B')
	]);
var $author$project$Helpers$Rules$modusPonensItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'MP',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$mpFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T(a→b) [ ]', '(2) T a [ ]', '(3) T b [1,2]'),
		config);
};
var $author$project$Helpers$Rules$mtFormulas = _List_fromArray(
	[
		_Utils_Tuple3('T (A→B)', 'F B', 'F A')
	]);
var $author$project$Helpers$Rules$modusTolensItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'MT',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$mtFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T(a→b) [ ]', '(2) F b [ ]', '(3) F a [1,2]'),
		config);
};
var $author$project$Helpers$Rules$ncsFormulas = _List_fromArray(
	[
		_Utils_Tuple3('F (A∧B)', 'T A', 'F B'),
		_Utils_Tuple3('F (A∧B)', 'T B', 'F A')
	]);
var $author$project$Helpers$Rules$ncsItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'NCS',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$ncsFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) F(a∧b) [ ]', '(2) T a [ ]', '(3) F b [1,2]'),
		config);
};
var $author$project$Helpers$Rules$reflexivityFormulas = _List_fromArray(
	[
		_Utils_Tuple3('', '', 'T t≐t')
	]);
var $author$project$Helpers$Rules$reflexivityItem = function (config) {
	return A4(
		$author$project$Helpers$Rules$ruleItem,
		'Reflexivity',
		A2($elm$core$List$map, $author$project$Helpers$Rules$renderUnary, $author$project$Helpers$Rules$reflexivityFormulas),
		A3($author$project$Helpers$Rules$linearExample, '(1) T a≐a [ ]', '', ''),
		config);
};
var $author$project$Helpers$Rules$rulesTable = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rules-container')
			]),
		A2(
			$elm$core$List$filterMap,
			function (a) {
				return a(config);
			},
			_List_fromArray(
				[$author$project$Helpers$Rules$alphaItem, $author$project$Helpers$Rules$betaItem, $author$project$Helpers$Rules$gammaItem, $author$project$Helpers$Rules$deltaItem, $author$project$Helpers$Rules$gammaStarItem, $author$project$Helpers$Rules$deltaStarItem, $author$project$Helpers$Rules$reflexivityItem, $author$project$Helpers$Rules$leibnitzItem, $author$project$Helpers$Rules$modusPonensItem, $author$project$Helpers$Rules$modusTolensItem, $author$project$Helpers$Rules$dsItem, $author$project$Helpers$Rules$ncsItem, $author$project$Helpers$Rules$cutItem, $author$project$Helpers$Rules$hsItem, $author$project$Helpers$Rules$esffItem, $author$project$Helpers$Rules$esftItem, $author$project$Helpers$Rules$estfItem, $author$project$Helpers$Rules$esttItem, $author$project$Helpers$Rules$ecdtItem, $author$project$Helpers$Rules$ecdfItem])));
};
var $elm$html$Html$Attributes$rowspan = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rowspan',
		$elm$core$String$fromInt(n));
};
var $author$project$Helpers$Rules$symbolsTable = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('half')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Propositional and first-order logical symbols')
				])),
			A2(
			$elm$html$Html$table,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('rulesHelpTable')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Logical symbol')
								])),
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Symbols')
								])),
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Restrictions')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Negation')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`-`, `~`, `¬`')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('unary')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Equality')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`=`, `≐`')
								])),
							A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$rowspan(2)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('binary, takes two terms')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Inequality')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`!=`, `/=`, `≠`')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Conjunction')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`&`, `/\\`, `∧`')
								])),
							A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$rowspan(4)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('strictly binary, must be parenthesized')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Disjunction')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`|`, `\\/`, `∨`')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Implication')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`->`, `→`')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Equivalence')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`<->`, `↔`')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Universal quantifier')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`∀`, `\\A`, `\\forall`, `\\a`')
								])),
							A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$rowspan(2)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('takes a variable and a formula')
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Existential quantifier')
								])),
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('symbols')
										]),
									'`∃`, `\\E`, `\\exists`, `\\e`')
								]))
						]))
				]))
		]));
var $author$project$Helpers$Rules$help = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rulesHelp')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Help')
					])),
				$author$project$Helpers$Rules$symbolsTable,
				$author$project$Helpers$Rules$notesTable,
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('full')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Applying rules')
					])),
				$author$project$Helpers$Rules$rulesTable(config)
			]));
};
var $author$project$Editor$Export = {$: 'Export'};
var $author$project$Editor$jsonExportControl = function (t) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('button'),
				$elm$html$Html$Events$onClick($author$project$Editor$Export)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('Export as JSON')
			]));
};
var $author$project$Editor$JsonSelect = {$: 'JsonSelect'};
var $author$project$Editor$jsonImportControl = function (jsonImport) {
	if (jsonImport.$ === 'InProgress') {
		var fname = jsonImport.a;
		return $elm$html$Html$text('Loading tableau from file' + (fname + '…'));
	} else {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('button'),
					$elm$html$Html$Events$onClick($author$project$Editor$JsonSelect)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Import from JSON')
				]));
	}
};
var $elm$html$Html$details = _VirtualDom_node('details');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$html$Html$summary = _VirtualDom_node('summary');
var $author$project$Editor$jsonImportError = function (jsonImport) {
	if (jsonImport.$ === 'ImportErr') {
		var msg = jsonImport.a;
		var ds = jsonImport.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('jsonImportError')
				]),
			$elm$core$List$singleton(
				A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Import error: ' + msg)
								])),
							A2(
							$elm$html$Html$details,
							_List_Nil,
							A2(
								$elm$core$List$cons,
								A2(
									$elm$html$Html$summary,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Error details')
										])),
								A2(
									$elm$core$List$map,
									A2(
										$elm$core$Basics$composeL,
										A2(
											$elm$core$Basics$composeL,
											A2(
												$elm$core$Basics$composeL,
												$elm$html$Html$p(_List_Nil),
												$elm$core$List$singleton),
											$elm$html$Html$text),
										$elm$json$Json$Decode$errorToString),
									ds)))
						]))));
	} else {
		return A2($elm$html$Html$div, _List_Nil, _List_Nil);
	}
};
var $author$project$Errors$errors = function (r) {
	if (r.$ === 'Err') {
		var x = r.a;
		return x;
	} else {
		return _List_Nil;
	}
};
var $author$project$Validation$Common$always2 = F3(
	function (r, _v0, _v1) {
		return r;
	});
var $author$project$Zipper$children = function (z) {
	var _v0 = z;
	var t = _v0.a;
	var bs = _v0.b;
	var _v1 = t.ext;
	switch (_v1.$) {
		case 'Unary':
			return _List_fromArray(
				[
					$author$project$Zipper$down(z)
				]);
		case 'UnaryWithSubst':
			return _List_fromArray(
				[
					$author$project$Zipper$down(z)
				]);
		case 'Binary':
			return _List_fromArray(
				[
					$author$project$Zipper$left(z),
					$author$project$Zipper$right(z)
				]);
		default:
			return _List_Nil;
	}
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $author$project$Validation$Common$Semantics = {$: 'Semantics'};
var $author$project$Validation$Common$semanticsProblem = F2(
	function (z, s) {
		return _List_fromArray(
			[
				{msg: s, typ: $author$project$Validation$Common$Semantics, zip: z}
			]);
	});
var $author$project$Validation$Common$checkFormula = F2(
	function (str, z) {
		return A2(
			$elm$core$Result$mapError,
			function (_v0) {
				return A2($author$project$Validation$Common$semanticsProblem, z, str + ' is invalid.');
			},
			$author$project$Zipper$zNode(z).formula);
	});
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $author$project$Zipper$getReffed = F2(
	function (r, z) {
		return A2(
			$elm$core$Maybe$map,
			function (a) {
				return A2($author$project$Zipper$above, a, z);
			},
			r.up);
	});
var $author$project$Validation$Common$checkReffedFormula = F3(
	function (str, r, z) {
		return A2(
			$elm$core$Result$andThen,
			$author$project$Validation$Common$checkFormula(str + ' referenced formula'),
			A2(
				$elm$core$Result$fromMaybe,
				A2($author$project$Validation$Common$semanticsProblem, z, str + ' reference is invalid.'),
				A2($author$project$Zipper$getReffed, r, z)));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isComplementary = F2(
	function (a, b) {
		var _v0 = _Utils_Tuple2(a, b);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'T') {
				if (_v0.b.$ === 'F') {
					var x = _v0.a.a;
					var y = _v0.b.a;
					return _Utils_eq(x, y);
				} else {
					break _v0$2;
				}
			} else {
				if (_v0.b.$ === 'T') {
					var x = _v0.a.a;
					var y = _v0.b.a;
					return _Utils_eq(x, y);
				} else {
					break _v0$2;
				}
			}
		}
		return false;
	});
var $author$project$Errors$merge2 = F3(
	function (func, ra, rb) {
		var _v0 = _Utils_Tuple2(ra, rb);
		if (_v0.a.$ === 'Ok') {
			if (_v0.b.$ === 'Ok') {
				var a = _v0.a.a;
				var b = _v0.b.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			} else {
				var x = _v0.b.a;
				return $elm$core$Result$Err(x);
			}
		} else {
			if (_v0.b.$ === 'Err') {
				var xa = _v0.a.a;
				var xb = _v0.b.a;
				return $elm$core$Result$Err(
					_Utils_ap(xa, xb));
			} else {
				var x = _v0.a.a;
				return $elm$core$Result$Err(x);
			}
		}
	});
var $author$project$Validation$Common$resultFromBool = F3(
	function (a, x, b) {
		return b ? $elm$core$Result$Ok(a) : $elm$core$Result$Err(x);
	});
var $author$project$Validation$areCloseRefsComplementary = F3(
	function (r1, r2, z) {
		return A2(
			$elm$core$Result$andThen,
			A2(
				$author$project$Validation$Common$resultFromBool,
				z,
				A2($author$project$Validation$Common$semanticsProblem, z, 'Closing formulas are not complementary.')),
			A3(
				$author$project$Errors$merge2,
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isComplementary,
				A3($author$project$Validation$Common$checkReffedFormula, 'First close', r1, z),
				A3($author$project$Validation$Common$checkReffedFormula, 'Second close', r2, z)));
	});
var $author$project$Validation$areCorrectCloseRefs = function (z) {
	var _v0 = $author$project$Zipper$zTableau(z).ext;
	if (_v0.$ === 'Closed') {
		var r1 = _v0.a;
		var r2 = _v0.b;
		return A2(
			$elm$core$Result$map,
			$elm$core$Basics$always(z),
			A3($author$project$Validation$areCloseRefsComplementary, r1, r2, z));
	} else {
		return $elm$core$Result$Ok(z);
	}
};
var $author$project$Tableau$binaryExtTypeToString = function (extType) {
	switch (extType.$) {
		case 'Beta':
			return 'β';
		case 'Cut':
			return 'Cut';
		case 'ECDF':
			return 'ECDF';
		default:
			return 'ECDT';
	}
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Tableau$unaryExtTypeToString = function (extType) {
	switch (extType.$) {
		case 'Alpha':
			return 'α';
		case 'Refl':
			return 'Reflexivity';
		case 'Leibnitz':
			return 'Leibnitz';
		case 'MP':
			return 'MP';
		case 'MT':
			return 'MT';
		case 'HS':
			return 'HS';
		case 'DS':
			return 'DS';
		case 'NCS':
			return 'NCS';
		case 'ESFF':
			return 'ESFF';
		case 'ESFT':
			return 'ESFT';
		case 'ESTF':
			return 'ESTF';
		default:
			return 'ESTT';
	}
};
var $author$project$Tableau$unaryWithSubstExtTypeToString = function (extType) {
	switch (extType.$) {
		case 'Gamma':
			return 'γ';
		case 'Delta':
			return 'δ';
		case 'GammaStar':
			return 'γ*';
		default:
			return 'δ*';
	}
};
var $author$project$Validation$Common$checkPredicate = F3(
	function (pred, x, a) {
		return pred(a) ? $elm$core$Result$Ok(a) : $elm$core$Result$Err(x);
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Beta = {$: 'Beta'};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha = {$: 'Alpha'};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Delta = {$: 'Delta'};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Gamma = {$: 'Gamma'};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$negType = function (t) {
	switch (t.$) {
		case 'Alpha':
			return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Beta;
		case 'Beta':
			return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
		case 'Gamma':
			return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Delta;
		default:
			return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Gamma;
	}
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getType = function (sf) {
	if (sf.$ === 'T') {
		switch (sf.a.$) {
			case 'FF':
				var _v1 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'FT':
				var _v2 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'PredAtom':
				var _v3 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'EqAtom':
				var _v5 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'Neg':
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'Conj':
				var _v7 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'Disj':
				var _v8 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Beta;
			case 'Impl':
				var _v9 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Beta;
			case 'Equiv':
				var _v10 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'ForAll':
				var _v11 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Gamma;
			default:
				var _v12 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Delta;
		}
	} else {
		switch (sf.a.$) {
			case 'PredAtom':
				var _v4 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'EqAtom':
				var _v6 = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			case 'Neg':
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha;
			default:
				var f = sf.a;
				return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$negType(
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getType(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(f)));
		}
	}
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isBeta = function (x) {
	return _Utils_eq(
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Beta,
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getType(x));
};
var $author$project$Validation$Rules$Beta$getBetaChildren = F2(
	function (f, z) {
		return A2(
			$elm$core$Result$map,
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas,
			A3(
				$author$project$Validation$Common$checkPredicate,
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isBeta,
				A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not β'),
				f));
	});
var $author$project$Zipper$zFirstRef = function (z) {
	var _v0 = $author$project$Zipper$zNode(z).references;
	if (_v0.b) {
		var x = _v0.a;
		var xs = _v0.b;
		return x;
	} else {
		return $author$project$Tableau$defRef;
	}
};
var $author$project$Validation$Common$childrenHaveSameRef = F3(
	function (ruleName, _this, other) {
		var getRef = A2(
			$elm$core$Basics$composeR,
			$author$project$Zipper$zFirstRef,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.up;
				},
				$elm$core$Result$fromMaybe(_List_Nil)));
		var ro = getRef(other);
		var rt = getRef(_this);
		return A2(
			$elm$core$Result$andThen,
			A2(
				$author$project$Validation$Common$resultFromBool,
				_this,
				A2($author$project$Validation$Common$semanticsProblem, _this, ruleName + ' references are not the same')),
			A3($author$project$Errors$merge2, $elm$core$Basics$eq, rt, ro));
	});
var $author$project$Validation$Common$Syntax = {$: 'Syntax'};
var $author$project$Validation$Common$syntaxProblem = F2(
	function (z, s) {
		return _List_fromArray(
			[
				{msg: s, typ: $author$project$Validation$Common$Syntax, zip: z}
			]);
	});
var $author$project$Validation$Common$getReffedSignedFormula = F2(
	function (extractRef, z) {
		var _v0 = A2(
			$author$project$Zipper$getReffed,
			extractRef(z),
			z);
		if (_v0.$ === 'Just') {
			var rz = _v0.a;
			var _v1 = $author$project$Zipper$zNode(rz).formula;
			if (_v1.$ === 'Ok') {
				var sf = _v1.a;
				return $elm$core$Result$Ok(sf);
			} else {
				return $elm$core$Result$Err(
					A2($author$project$Validation$Common$syntaxProblem, z, 'reffed formula incorrectly parsed'));
			}
		} else {
			return $elm$core$Result$Err(
				A2($author$project$Validation$Common$semanticsProblem, z, 'no reffed formula'));
		}
	});
var $author$project$Validation$Common$hasNumberOfRefs = F2(
	function (n, z) {
		return _Utils_eq(
			$elm$core$List$length(
				$author$project$Zipper$zNode(z).references),
			n);
	});
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Validation$Common$validate2RefBinary = F4(
	function (ruleName, getChildren, _this, other) {
		var reffed = A2(
			$elm$core$Result$map,
			$elm$core$List$sortBy($FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString),
			A2(
				$elm$core$Result$andThen,
				function (f) {
					return A2(getChildren, f, _this);
				},
				A2(
					$elm$core$Result$andThen,
					function (z) {
						return A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z);
					},
					A2(
						$elm$core$Result$map,
						$elm$core$Basics$always(_this),
						A2(
							$elm$core$Result$andThen,
							A2(
								$author$project$Validation$Common$checkReffedFormula,
								'',
								$author$project$Zipper$zFirstRef(_this)),
							A3(
								$author$project$Validation$Common$checkPredicate,
								$author$project$Validation$Common$hasNumberOfRefs(1),
								A2($author$project$Validation$Common$semanticsProblem, _this, 'Each ' + (ruleName + ' formula must have 1 reference')),
								_this))))));
		var ft = A2($author$project$Validation$Common$checkFormula, 'Formula', _this);
		var fo = A2($author$project$Validation$Common$checkFormula, 'The other ' + (ruleName + ' subformula'), other);
		var children = A2(
			$elm$core$Result$map,
			$elm$core$List$sortBy($FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$toString),
			A3(
				$elm$core$Result$map2,
				$elm$core$List$cons,
				fo,
				A2($elm$core$Result$map, $elm$core$List$singleton, ft)));
		return A3(
			$author$project$Errors$merge2,
			$author$project$Validation$Common$always2(_this),
			A3($author$project$Validation$Common$childrenHaveSameRef, ruleName, _this, other),
			A2(
				$elm$core$Result$andThen,
				A2(
					$author$project$Validation$Common$resultFromBool,
					_this,
					A2($author$project$Validation$Common$semanticsProblem, _this, 'Wrong ' + (ruleName + ' subformulas.'))),
				A3($author$project$Errors$merge2, $elm$core$Basics$eq, children, reffed)));
	});
var $author$project$Validation$Rules$Beta$validate = F2(
	function (_this, other) {
		return A4($author$project$Validation$Common$validate2RefBinary, 'Beta', $author$project$Validation$Rules$Beta$getBetaChildren, _this, other);
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula = function (sf) {
	if (sf.$ === 'T') {
		var f = sf.a;
		return f;
	} else {
		var f = sf.a;
		return f;
	}
};
var $author$project$Validation$Rules$Cut$areUniform = F2(
	function (f1, f2) {
		return _Utils_eq(
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula(f1),
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula(f2));
	});
var $author$project$Validation$Common$haveSameSign = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'T') {
				if (_v0.b.$ === 'T') {
					return true;
				} else {
					break _v0$2;
				}
			} else {
				if (_v0.b.$ === 'F') {
					return true;
				} else {
					break _v0$2;
				}
			}
		}
		return false;
	});
var $author$project$Validation$Rules$Cut$checkStructure = F3(
	function (f1, f2, z) {
		return A2(
			$elm$core$Result$andThen,
			function (_v0) {
				return A3(
					$author$project$Validation$Common$resultFromBool,
					z,
					A2($author$project$Validation$Common$semanticsProblem, z, 'The Cut formulas should differ only in sign'),
					A2($author$project$Validation$Rules$Cut$areUniform, f1, f2));
			},
			A3(
				$author$project$Validation$Common$resultFromBool,
				z,
				A2($author$project$Validation$Common$semanticsProblem, z, 'Both Cut formulas have the same sign'),
				!A2($author$project$Validation$Common$haveSameSign, f1, f2)));
	});
var $elm$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				if (rc.$ === 'Err') {
					var x = rc.a;
					return $elm$core$Result$Err(x);
				} else {
					var c = rc.a;
					return $elm$core$Result$Ok(
						A3(func, a, b, c));
				}
			}
		}
	});
var $author$project$Validation$Rules$Cut$validate = F2(
	function (_this, other) {
		var ft = A2($author$project$Validation$Common$checkFormula, 'Formula', _this);
		var fo = A2($author$project$Validation$Common$checkFormula, 'The other Cut formula', other);
		return A2(
			$elm$core$Result$map,
			$elm$core$Basics$always(_this),
			A2(
				$elm$core$Result$andThen,
				$elm$core$Basics$identity,
				A4(
					$elm$core$Result$map3,
					$author$project$Validation$Rules$Cut$checkStructure,
					ft,
					fo,
					A3(
						$author$project$Validation$Common$checkPredicate,
						$author$project$Validation$Common$hasNumberOfRefs(0),
						A2($author$project$Validation$Common$semanticsProblem, _this, 'Cut rule must have no references'),
						_this))));
	});
var $author$project$Validation$Rules$ECDF$getECDFChildren = F2(
	function (f, z) {
		if ((f.$ === 'F') && (f.a.$ === 'Equiv')) {
			var _v1 = f.a;
			var a = _v1.a;
			var b = _v1.b;
			return $elm$core$Result$Ok(
				_List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
						A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Conj,
							a,
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Neg(b))),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
						A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Disj,
							a,
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Neg(b)))
					]));
		} else {
			return $elm$core$Result$Err(
				A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not ECDF'));
		}
	});
var $author$project$Validation$Rules$ECDF$validate = F2(
	function (_this, other) {
		return A4($author$project$Validation$Common$validate2RefBinary, 'ECDF', $author$project$Validation$Rules$ECDF$getECDFChildren, _this, other);
	});
var $author$project$Validation$Rules$ECDT$getECDTchildren = F2(
	function (f, z) {
		if ((f.$ === 'T') && (f.a.$ === 'Equiv')) {
			var _v1 = f.a;
			var a = _v1.a;
			var b = _v1.b;
			return $elm$core$Result$Ok(
				_List_fromArray(
					[
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
						A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Conj, a, b)),
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
						A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Disj, a, b))
					]));
		} else {
			return $elm$core$Result$Err(
				A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not ECDT'));
		}
	});
var $author$project$Validation$Rules$ECDT$validate = F2(
	function (_this, other) {
		return A4($author$project$Validation$Common$validate2RefBinary, 'ECDT', $author$project$Validation$Rules$ECDT$getECDTchildren, _this, other);
	});
var $author$project$Validation$validateBinary = function (extType) {
	switch (extType.$) {
		case 'Beta':
			return $author$project$Validation$Rules$Beta$validate;
		case 'Cut':
			return $author$project$Validation$Rules$Cut$validate;
		case 'ECDF':
			return $author$project$Validation$Rules$ECDF$validate;
		default:
			return $author$project$Validation$Rules$ECDT$validate;
	}
};
var $author$project$Validation$Common$validateLeft = F2(
	function (validate, z) {
		return A2(
			validate,
			z,
			$author$project$Zipper$right(
				$author$project$Zipper$up(z)));
	});
var $author$project$Validation$Common$validateRight = F2(
	function (validate, z) {
		return A2(
			validate,
			z,
			$author$project$Zipper$left(
				$author$project$Zipper$up(z)));
	});
var $author$project$Validation$validateRule = F3(
	function (rule, validator, config) {
		return A2(
			$elm$core$Set$member,
			rule,
			$author$project$Config$getRuleSet(config)) ? validator : function (z) {
			return $elm$core$Result$Err(
				A2($author$project$Validation$Common$semanticsProblem, z, rule + ' rule is forbidden in current configuration'));
		};
	});
var $author$project$Validation$Common$getReffedId = F2(
	function (extractRef, z) {
		return $elm$core$String$fromInt(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$map,
					A2(
						$elm$core$Basics$composeR,
						$author$project$Zipper$zNode,
						function ($) {
							return $.id;
						}),
					A2(
						$author$project$Zipper$getReffed,
						extractRef(z),
						z))));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isAlpha = function (x) {
	return _Utils_eq(
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Alpha,
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getType(x));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isSubformulaOf = F2(
	function (a, b) {
		return A2(
			$elm$core$List$member,
			a,
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$subformulas(b));
	});
var $author$project$Validation$Rules$Alpha$validate = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$andThen,
			A2(
				$author$project$Validation$Common$checkPredicate,
				function (_v0) {
					var a = _v0.a;
					var b = _v0.b;
					return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isSubformulaOf, a, b);
				},
				A2(
					$author$project$Validation$Common$semanticsProblem,
					z,
					'Is not an α-subformula of (' + (A2($author$project$Validation$Common$getReffedId, $author$project$Zipper$zFirstRef, z) + ').'))),
			A3(
				$elm$core$Result$map2,
				F2(
					function (a, b) {
						return _Utils_Tuple2(a, b);
					}),
				A2($author$project$Validation$Common$checkFormula, 'Formula', z),
				A2(
					$elm$core$Result$andThen,
					A2(
						$author$project$Validation$Common$checkPredicate,
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isAlpha,
						A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not α')),
					A2(
						$elm$core$Result$andThen,
						A2(
							$author$project$Validation$Common$checkReffedFormula,
							'',
							$author$project$Zipper$zFirstRef(z)),
						A3(
							$author$project$Validation$Common$checkPredicate,
							$author$project$Validation$Common$hasNumberOfRefs(1),
							A2($author$project$Validation$Common$semanticsProblem, z, 'α rule must have 1 reference'),
							z))))));
};
var $author$project$Validation$Common$checkFormulas = F5(
	function (err, f1, f2, getNewFormula, z) {
		var newFormula = A2($author$project$Validation$Common$checkFormula, 'Formula', z);
		var correctNewFormula = A2(
			$elm$core$Result$mapError,
			$author$project$Validation$Common$semanticsProblem(z),
			A2(getNewFormula, f1, f2));
		return A2(
			$elm$core$Result$andThen,
			A2(
				$author$project$Validation$Common$resultFromBool,
				z,
				A2($author$project$Validation$Common$semanticsProblem, z, err)),
			A3($elm$core$Result$map2, $elm$core$Basics$eq, newFormula, correctNewFormula));
	});
var $author$project$Validation$Rules$DS$currentFormulaErr = 'Formula was not created using the DS rule';
var $author$project$Validation$Rules$DS$refStructureErr = 'DS rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$DS$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'T') {
				if ((_v0.a.a.$ === 'Disj') && (_v0.b.$ === 'F')) {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(a)) : $elm$core$Result$Err($author$project$Validation$Rules$DS$refStructureErr));
				} else {
					break _v0$2;
				}
			} else {
				if ((_v0.b.$ === 'T') && (_v0.b.a.$ === 'Disj')) {
					var c = _v0.a.a;
					var _v2 = _v0.b.a;
					var a = _v2.a;
					var b = _v2.b;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(a)) : $elm$core$Result$Err($author$project$Validation$Rules$DS$refStructureErr));
				} else {
					break _v0$2;
				}
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$DS$refStructureErr);
	});
var $author$project$Validation$Rules$DS$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$DS$currentFormulaErr, f1, f2, $author$project$Validation$Rules$DS$getNewFormula, z);
	});
var $author$project$Zipper$zSecondRef = function (z) {
	var _v0 = $author$project$Zipper$zNode(z).references;
	if (_v0.b && _v0.b.b) {
		var x0 = _v0.a;
		var _v1 = _v0.b;
		var x1 = _v1.a;
		var xs = _v1.b;
		return x1;
	} else {
		return $author$project$Tableau$defRef;
	}
};
var $author$project$Validation$Common$validate2RefUnary = F3(
	function (ruleName, check, z) {
		return A2(
			$elm$core$Result$map,
			$elm$core$Basics$always(z),
			A2(
				$elm$core$Result$andThen,
				function (_v1) {
					return A3(
						check,
						A2(
							$elm$core$Result$withDefault,
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
								A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'default', _List_Nil)),
							A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z)),
						A2(
							$elm$core$Result$withDefault,
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
								A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'default', _List_Nil)),
							A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zSecondRef, z)),
						z);
				},
				A2(
					$elm$core$Result$andThen,
					function (_v0) {
						return A3(
							$author$project$Validation$Common$checkReffedFormula,
							'second',
							$author$project$Zipper$zSecondRef(z),
							z);
					},
					A2(
						$elm$core$Result$andThen,
						A2(
							$author$project$Validation$Common$checkReffedFormula,
							'first',
							$author$project$Zipper$zFirstRef(z)),
						A3(
							$author$project$Validation$Common$checkPredicate,
							$author$project$Validation$Common$hasNumberOfRefs(2),
							A2($author$project$Validation$Common$semanticsProblem, z, ruleName + ' rule must have 2 references'),
							z)))));
	});
var $author$project$Validation$Rules$DS$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'DS', $author$project$Validation$Rules$DS$check, z);
};
var $author$project$Validation$Rules$ESFF$currentFormulaErr = 'Formula was not created using the ESFF rule';
var $author$project$Validation$Rules$ESFF$refStructureErr = 'ESFF rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$ESFF$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if ((_v0.a.$ === 'F') && (_v0.b.$ === 'F')) {
				if (_v0.a.a.$ === 'Equiv') {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESFF$refStructureErr));
				} else {
					if (_v0.b.a.$ === 'Equiv') {
						var c = _v0.a.a;
						var _v2 = _v0.b.a;
						var a = _v2.a;
						var b = _v2.b;
						return _Utils_eq(c, a) ? $elm$core$Result$Ok(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESFF$refStructureErr));
					} else {
						break _v0$2;
					}
				}
			} else {
				break _v0$2;
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$ESFF$refStructureErr);
	});
var $author$project$Validation$Rules$ESFF$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$ESFF$currentFormulaErr, f1, f2, $author$project$Validation$Rules$ESFF$getNewFormula, z);
	});
var $author$project$Validation$Rules$ESFF$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'ESFF', $author$project$Validation$Rules$ESFF$check, z);
};
var $author$project$Validation$Rules$ESFT$currentFormulaErr = 'Formula was not created using the ESFT rule';
var $author$project$Validation$Rules$ESFT$refStructureErr = 'ESFT rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$ESFT$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'F') {
				if ((_v0.a.a.$ === 'Equiv') && (_v0.b.$ === 'T')) {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESFT$refStructureErr));
				} else {
					break _v0$2;
				}
			} else {
				if ((_v0.b.$ === 'F') && (_v0.b.a.$ === 'Equiv')) {
					var c = _v0.a.a;
					var _v2 = _v0.b.a;
					var a = _v2.a;
					var b = _v2.b;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESFT$refStructureErr));
				} else {
					break _v0$2;
				}
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$ESFT$refStructureErr);
	});
var $author$project$Validation$Rules$ESFT$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$ESFT$currentFormulaErr, f1, f2, $author$project$Validation$Rules$ESFT$getNewFormula, z);
	});
var $author$project$Validation$Rules$ESFT$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'ESFT', $author$project$Validation$Rules$ESFT$check, z);
};
var $author$project$Validation$Rules$ESTF$currentFormulaErr = 'Formula was not created using the ESTF rule';
var $author$project$Validation$Rules$ESTF$refStructureErr = 'ESTF rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$ESTF$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'T') {
				if ((_v0.a.a.$ === 'Equiv') && (_v0.b.$ === 'F')) {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESTF$refStructureErr));
				} else {
					break _v0$2;
				}
			} else {
				if ((_v0.b.$ === 'T') && (_v0.b.a.$ === 'Equiv')) {
					var c = _v0.a.a;
					var _v2 = _v0.b.a;
					var a = _v2.a;
					var b = _v2.b;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESTF$refStructureErr));
				} else {
					break _v0$2;
				}
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$ESTF$refStructureErr);
	});
var $author$project$Validation$Rules$ESTF$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$ESTF$currentFormulaErr, f1, f2, $author$project$Validation$Rules$ESTF$getNewFormula, z);
	});
var $author$project$Validation$Rules$ESTF$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'ESTF', $author$project$Validation$Rules$ESTF$check, z);
};
var $author$project$Validation$Rules$ESTT$currentFormulaErr = 'Formula was not created using the ESTT rule';
var $author$project$Validation$Rules$ESTT$refStructureErr = 'ESTT rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$ESTT$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if ((_v0.a.$ === 'T') && (_v0.b.$ === 'T')) {
				if (_v0.a.a.$ === 'Equiv') {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESTT$refStructureErr));
				} else {
					if (_v0.b.a.$ === 'Equiv') {
						var c = _v0.a.a;
						var _v2 = _v0.b.a;
						var a = _v2.a;
						var b = _v2.b;
						return _Utils_eq(c, a) ? $elm$core$Result$Ok(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ESTT$refStructureErr));
					} else {
						break _v0$2;
					}
				}
			} else {
				break _v0$2;
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$ESTT$refStructureErr);
	});
var $author$project$Validation$Rules$ESTT$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$ESTT$currentFormulaErr, f1, f2, $author$project$Validation$Rules$ESTT$getNewFormula, z);
	});
var $author$project$Validation$Rules$ESTT$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'ESTT', $author$project$Validation$Rules$ESTT$check, z);
};
var $author$project$Validation$Rules$HS$currentFormulaErr = 'Formula was not created using the HS rule';
var $author$project$Validation$Rules$HS$refStructureErr = 'HS rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$HS$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		if ((((_v0.a.$ === 'T') && (_v0.a.a.$ === 'Impl')) && (_v0.b.$ === 'T')) && (_v0.b.a.$ === 'Impl')) {
			var _v1 = _v0.a.a;
			var a = _v1.a;
			var b = _v1.b;
			var _v2 = _v0.b.a;
			var c = _v2.a;
			var d = _v2.b;
			return _Utils_eq(b, c) ? $elm$core$Result$Ok(
				$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
					A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Impl, a, d))) : $elm$core$Result$Err($author$project$Validation$Rules$HS$refStructureErr);
		} else {
			return $elm$core$Result$Err($author$project$Validation$Rules$HS$refStructureErr);
		}
	});
var $author$project$Validation$Rules$HS$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$HS$currentFormulaErr, f1, f2, $author$project$Validation$Rules$HS$getNewFormula, z);
	});
var $author$project$Validation$Rules$HS$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'HS', $author$project$Validation$Rules$HS$check, z);
};
var $author$project$Validation$Rules$Leibnitz$applyFunToSigned = F2(
	function (_function, sf) {
		if (sf.$ === 'T') {
			var formula = sf.a;
			return A2(
				$elm$core$Result$map,
				function (f) {
					return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(f);
				},
				_function(formula));
		} else {
			var formula = sf.a;
			return A2(
				$elm$core$Result$map,
				function (f) {
					return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(f);
				},
				_function(formula));
		}
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Validation$Rules$Leibnitz$mapNotSubstitutableError = F2(
	function (err, z) {
		return A2(
			$author$project$Validation$Common$semanticsProblem,
			z,
			A3($elm$core$String$replace, '[]', '[] in 2nd referenced formula', err));
	});
var $author$project$Validation$Rules$Leibnitz$checkSubst = F4(
	function (σ, replaced, currentF, z) {
		if (replaced.$ === 'Err') {
			var problem = replaced.a;
			return $elm$core$Result$Err(problem);
		} else {
			var repl = replaced.a;
			return A2(
				$elm$core$Result$map,
				$elm$core$Basics$always(z),
				A2(
					$elm$core$Result$andThen,
					A2(
						$author$project$Validation$Common$checkPredicate,
						function (f) {
							return _Utils_eq(f, currentF);
						},
						A2($author$project$Validation$Common$semanticsProblem, z, 'Substitution invalid')),
					A2(
						$elm$core$Result$mapError,
						function (err) {
							return A2($author$project$Validation$Rules$Leibnitz$mapNotSubstitutableError, err, z);
						},
						A2(
							$author$project$Validation$Rules$Leibnitz$applyFunToSigned,
							$FMFI_UK_1_AIN_412$elm_formula$Formula$substitute(σ),
							repl))));
		}
	});
var $author$project$Validation$Rules$Leibnitz$templateVar = $FMFI_UK_1_AIN_412$elm_formula$Term$Var('[]');
var $author$project$Validation$Rules$Leibnitz$commonTermTemplate = F2(
	function (refTerm, currentTerm) {
		if (refTerm.$ === 'Var') {
			var refStr = refTerm.a;
			if (currentTerm.$ === 'Var') {
				var currentStr = currentTerm.a;
				return (!_Utils_eq(refStr, currentStr)) ? $author$project$Validation$Rules$Leibnitz$templateVar : $FMFI_UK_1_AIN_412$elm_formula$Term$Var(refStr);
			} else {
				return $author$project$Validation$Rules$Leibnitz$templateVar;
			}
		} else {
			var refStr = refTerm.a;
			var refTerms = refTerm.b;
			if (currentTerm.$ === 'Fun') {
				var currentStr = currentTerm.a;
				var currentTerms = currentTerm.b;
				return ((!_Utils_eq(refStr, currentStr)) || (!_Utils_eq(
					$elm$core$List$length(refTerms),
					$elm$core$List$length(currentTerms)))) ? $author$project$Validation$Rules$Leibnitz$templateVar : A2(
					$FMFI_UK_1_AIN_412$elm_formula$Term$Fun,
					refStr,
					A2($author$project$Validation$Rules$Leibnitz$commonTermsTemplate, refTerms, currentTerms));
			} else {
				return $author$project$Validation$Rules$Leibnitz$templateVar;
			}
		}
	});
var $author$project$Validation$Rules$Leibnitz$commonTermsTemplate = F2(
	function (refTerms, currentTerms) {
		if (!refTerms.b) {
			if (!currentTerms.b) {
				return _List_Nil;
			} else {
				return A2(
					$elm$core$List$map,
					$elm$core$Basics$always($author$project$Validation$Rules$Leibnitz$templateVar),
					currentTerms);
			}
		} else {
			var refTerm = refTerms.a;
			var rts = refTerms.b;
			if (!currentTerms.b) {
				return A2(
					$elm$core$List$map,
					$elm$core$Basics$always($author$project$Validation$Rules$Leibnitz$templateVar),
					refTerms);
			} else {
				var currentTerm = currentTerms.a;
				var cts = currentTerms.b;
				return A2(
					$elm$core$List$cons,
					A2($author$project$Validation$Rules$Leibnitz$commonTermTemplate, refTerm, currentTerm),
					A2($author$project$Validation$Rules$Leibnitz$commonTermsTemplate, rts, cts));
			}
		}
	});
var $author$project$Validation$Rules$Leibnitz$differentStructureError = $elm$core$Result$Err('The 2nd referenced formula and current formula have different structure');
var $author$project$Validation$Rules$Leibnitz$commonFormulaTemplate = F2(
	function (refF, currentF) {
		switch (refF.$) {
			case 'PredAtom':
				var refStr = refF.a;
				var refTerms = refF.b;
				if (currentF.$ === 'PredAtom') {
					var currentStr = currentF.a;
					var currentTerms = currentF.b;
					return $elm$core$Result$Ok(
						A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom,
							refStr,
							A2($author$project$Validation$Rules$Leibnitz$commonTermsTemplate, refTerms, currentTerms)));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'EqAtom':
				var refLt = refF.a;
				var refRt = refF.b;
				if (currentF.$ === 'EqAtom') {
					var currentLt = currentF.a;
					var currentRt = currentF.b;
					return $elm$core$Result$Ok(
						A2(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$EqAtom,
							A2($author$project$Validation$Rules$Leibnitz$commonTermTemplate, refLt, currentLt),
							A2($author$project$Validation$Rules$Leibnitz$commonTermTemplate, refRt, currentRt)));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'Neg':
				var refSf = refF.a;
				if (currentF.$ === 'Neg') {
					var currentSf = currentF.a;
					return A2(
						$elm$core$Result$map,
						function (f) {
							return $FMFI_UK_1_AIN_412$elm_formula$Formula$Neg(f);
						},
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf, currentSf));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'Conj':
				var refSf1 = refF.a;
				var refSf2 = refF.b;
				if (currentF.$ === 'Conj') {
					var currentSf1 = currentF.a;
					var currentSf2 = currentF.b;
					return A3(
						$elm$core$Result$map2,
						F2(
							function (f1, f2) {
								return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Conj, f1, f2);
							}),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf1, currentSf1),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf2, currentSf2));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'Disj':
				var refSf1 = refF.a;
				var refSf2 = refF.b;
				if (currentF.$ === 'Disj') {
					var currentSf1 = currentF.a;
					var currentSf2 = currentF.b;
					return A3(
						$elm$core$Result$map2,
						F2(
							function (f1, f2) {
								return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Disj, f1, f2);
							}),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf1, currentSf1),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf2, currentSf2));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'Impl':
				var refSf1 = refF.a;
				var refSf2 = refF.b;
				if (currentF.$ === 'Impl') {
					var currentSf1 = currentF.a;
					var currentSf2 = currentF.b;
					return A3(
						$elm$core$Result$map2,
						F2(
							function (f1, f2) {
								return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Impl, f1, f2);
							}),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf1, currentSf1),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf2, currentSf2));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'Equiv':
				var refSf1 = refF.a;
				var refSf2 = refF.b;
				if (currentF.$ === 'Equiv') {
					var currentSf1 = currentF.a;
					var currentSf2 = currentF.b;
					return A3(
						$elm$core$Result$map2,
						F2(
							function (f1, f2) {
								return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Equiv, f1, f2);
							}),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf1, currentSf1),
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf2, currentSf2));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'ForAll':
				var refX = refF.a;
				var refSf = refF.b;
				if (currentF.$ === 'ForAll') {
					var currentX = currentF.a;
					var currentSf = currentF.b;
					return A2(
						$elm$core$Result$map,
						function (f) {
							return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll, refX, f);
						},
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf, currentSf));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			case 'Exists':
				var refX = refF.a;
				var refSf = refF.b;
				if (currentF.$ === 'Exists') {
					var currentX = currentF.a;
					var currentSf = currentF.b;
					return A2(
						$elm$core$Result$map,
						function (f) {
							return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$Exists, refX, f);
						},
						A2($author$project$Validation$Rules$Leibnitz$commonFormulaTemplate, refSf, currentSf));
				} else {
					return $author$project$Validation$Rules$Leibnitz$differentStructureError;
				}
			default:
				return $elm$core$Result$Err('wrong formula type');
		}
	});
var $author$project$Validation$Rules$Leibnitz$differentSignError = $elm$core$Result$Err('The 2nd referenced formula and current formula have different sign');
var $author$project$Validation$Rules$Leibnitz$commonSignedTemplate = F2(
	function (refF, currentF) {
		if (refF.$ === 'T') {
			var f = refF.a;
			if (currentF.$ === 'F') {
				var f1 = currentF.a;
				return $author$project$Validation$Rules$Leibnitz$differentSignError;
			} else {
				var f1 = currentF.a;
				return A2(
					$elm$core$Result$map,
					function (a) {
						return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(a);
					},
					A2(
						$author$project$Validation$Rules$Leibnitz$commonFormulaTemplate,
						f,
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula(currentF)));
			}
		} else {
			var f = refF.a;
			if (currentF.$ === 'F') {
				var f1 = currentF.a;
				return A2(
					$elm$core$Result$map,
					function (a) {
						return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a);
					},
					A2(
						$author$project$Validation$Rules$Leibnitz$commonFormulaTemplate,
						f,
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula(currentF)));
			} else {
				var f1 = currentF.a;
				return $author$project$Validation$Rules$Leibnitz$differentSignError;
			}
		}
	});
var $author$project$Validation$Rules$Leibnitz$leftEqTerm = function (f) {
	if ((f.$ === 'T') && (f.a.$ === 'EqAtom')) {
		var _v1 = f.a;
		var lt = _v1.a;
		var rt = _v1.b;
		return lt;
	} else {
		return A2($FMFI_UK_1_AIN_412$elm_formula$Term$Fun, 'default', _List_Nil);
	}
};
var $author$project$Validation$Rules$Leibnitz$rightEqTerm = function (f) {
	if ((f.$ === 'T') && (f.a.$ === 'EqAtom')) {
		var _v1 = f.a;
		var lt = _v1.a;
		var rt = _v1.b;
		return rt;
	} else {
		return A2($FMFI_UK_1_AIN_412$elm_formula$Term$Fun, 'default', _List_Nil);
	}
};
var $author$project$Validation$Rules$Leibnitz$checkSubsts = F3(
	function (refEq, refF, z) {
		var rt = $author$project$Validation$Rules$Leibnitz$rightEqTerm(refEq);
		var σ2 = $elm$core$Dict$fromList(
			_List_fromArray(
				[
					_Utils_Tuple2('[]', rt)
				]));
		var lt = $author$project$Validation$Rules$Leibnitz$leftEqTerm(refEq);
		var σ1 = $elm$core$Dict$fromList(
			_List_fromArray(
				[
					_Utils_Tuple2('[]', lt)
				]));
		var currentF = A2(
			$elm$core$Result$withDefault,
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
				A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'default', _List_Nil)),
			$author$project$Zipper$zNode(z).formula);
		var replaced = A2(
			$elm$core$Result$mapError,
			function (err) {
				return A2($author$project$Validation$Common$semanticsProblem, z, err);
			},
			A2($author$project$Validation$Rules$Leibnitz$commonSignedTemplate, refF, currentF));
		return A2(
			$elm$core$Result$andThen,
			A3($author$project$Validation$Rules$Leibnitz$checkSubst, σ2, replaced, currentF),
			A4($author$project$Validation$Rules$Leibnitz$checkSubst, σ1, replaced, refF, z));
	});
var $author$project$Validation$Rules$Leibnitz$isEquality = function (f) {
	if ((f.$ === 'T') && (f.a.$ === 'EqAtom')) {
		var _v1 = f.a;
		var lt = _v1.a;
		var rt = _v1.b;
		return true;
	} else {
		return false;
	}
};
var $author$project$Validation$Rules$Leibnitz$validate = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$andThen,
			function (_v1) {
				return A3(
					$author$project$Validation$Rules$Leibnitz$checkSubsts,
					A2(
						$elm$core$Result$withDefault,
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
							A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'default', _List_Nil)),
						A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z)),
					A2(
						$elm$core$Result$withDefault,
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
							A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'default', _List_Nil)),
						A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zSecondRef, z)),
					z);
			},
			A2(
				$elm$core$Result$andThen,
				function (_v0) {
					return A3(
						$author$project$Validation$Common$checkReffedFormula,
						'second',
						$author$project$Zipper$zSecondRef(z),
						z);
				},
				A2(
					$elm$core$Result$andThen,
					A2(
						$author$project$Validation$Common$checkPredicate,
						$author$project$Validation$Rules$Leibnitz$isEquality,
						A2($author$project$Validation$Common$semanticsProblem, z, 'first referenced formula is not equality')),
					A2(
						$elm$core$Result$andThen,
						A2(
							$author$project$Validation$Common$checkReffedFormula,
							'first',
							$author$project$Zipper$zFirstRef(z)),
						A3(
							$author$project$Validation$Common$checkPredicate,
							$author$project$Validation$Common$hasNumberOfRefs(2),
							A2($author$project$Validation$Common$semanticsProblem, z, 'Leibnitz rule must have 2 references'),
							z))))));
};
var $author$project$Validation$Rules$ModusPonens$currentFormulaErr = 'Formula was not created using the MP rule';
var $author$project$Validation$Rules$ModusPonens$refStructureErr = 'MP rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$ModusPonens$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if ((_v0.a.$ === 'T') && (_v0.b.$ === 'T')) {
				if (_v0.a.a.$ === 'Impl') {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(a, c) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : $elm$core$Result$Err($author$project$Validation$Rules$ModusPonens$refStructureErr);
				} else {
					if (_v0.b.a.$ === 'Impl') {
						var c = _v0.a.a;
						var _v2 = _v0.b.a;
						var a = _v2.a;
						var b = _v2.b;
						return _Utils_eq(a, c) ? $elm$core$Result$Ok(
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(b)) : $elm$core$Result$Err($author$project$Validation$Rules$ModusPonens$refStructureErr);
					} else {
						break _v0$2;
					}
				}
			} else {
				break _v0$2;
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$ModusPonens$refStructureErr);
	});
var $author$project$Validation$Rules$ModusPonens$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$ModusPonens$currentFormulaErr, f1, f2, $author$project$Validation$Rules$ModusPonens$getNewFormula, z);
	});
var $author$project$Validation$Rules$ModusPonens$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'MP', $author$project$Validation$Rules$ModusPonens$check, z);
};
var $author$project$Validation$Rules$ModusTolens$currentFormulaErr = 'Formula was not created using the MT rule';
var $author$project$Validation$Rules$ModusTolens$refStructureErr = 'MT rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$ModusTolens$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'T') {
				if ((_v0.a.a.$ === 'Impl') && (_v0.b.$ === 'F')) {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(b, c) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ModusTolens$refStructureErr);
				} else {
					break _v0$2;
				}
			} else {
				if ((_v0.b.$ === 'T') && (_v0.b.a.$ === 'Impl')) {
					var c = _v0.a.a;
					var _v2 = _v0.b.a;
					var a = _v2.a;
					var b = _v2.b;
					return _Utils_eq(b, c) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$ModusTolens$refStructureErr);
				} else {
					break _v0$2;
				}
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$ModusTolens$refStructureErr);
	});
var $author$project$Validation$Rules$ModusTolens$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$ModusTolens$currentFormulaErr, f1, f2, $author$project$Validation$Rules$ModusTolens$getNewFormula, z);
	});
var $author$project$Validation$Rules$ModusTolens$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'MT', $author$project$Validation$Rules$ModusTolens$check, z);
};
var $author$project$Validation$Rules$NCS$currentFormulaErr = 'Formula was not created using the NCS rule';
var $author$project$Validation$Rules$NCS$refStructureErr = 'NCS rule can\'t be used on referenced formulas';
var $author$project$Validation$Rules$NCS$getNewFormula = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'F') {
				if ((_v0.a.a.$ === 'Conj') && (_v0.b.$ === 'T')) {
					var _v1 = _v0.a.a;
					var a = _v1.a;
					var b = _v1.b;
					var c = _v0.b.a;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$NCS$refStructureErr));
				} else {
					break _v0$2;
				}
			} else {
				if ((_v0.b.$ === 'F') && (_v0.b.a.$ === 'Conj')) {
					var c = _v0.a.a;
					var _v2 = _v0.b.a;
					var a = _v2.a;
					var b = _v2.b;
					return _Utils_eq(c, a) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(b)) : (_Utils_eq(c, b) ? $elm$core$Result$Ok(
						$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(a)) : $elm$core$Result$Err($author$project$Validation$Rules$NCS$refStructureErr));
				} else {
					break _v0$2;
				}
			}
		}
		return $elm$core$Result$Err($author$project$Validation$Rules$NCS$refStructureErr);
	});
var $author$project$Validation$Rules$NCS$check = F3(
	function (f1, f2, z) {
		return A5($author$project$Validation$Common$checkFormulas, $author$project$Validation$Rules$NCS$currentFormulaErr, f1, f2, $author$project$Validation$Rules$NCS$getNewFormula, z);
	});
var $author$project$Validation$Rules$NCS$validate = function (z) {
	return A3($author$project$Validation$Common$validate2RefUnary, 'NCS', $author$project$Validation$Rules$NCS$check, z);
};
var $author$project$Validation$Rules$Reflexivity$isRefl = function (z) {
	var _v0 = $author$project$Zipper$zNode(z).formula;
	if (((_v0.$ === 'Ok') && (_v0.a.$ === 'T')) && (_v0.a.a.$ === 'EqAtom')) {
		var _v1 = _v0.a.a;
		var lt = _v1.a;
		var rt = _v1.b;
		return _Utils_eq(lt, rt) ? true : false;
	} else {
		return false;
	}
};
var $author$project$Validation$Rules$Reflexivity$validate = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$andThen,
			A2(
				$author$project$Validation$Common$checkPredicate,
				$author$project$Validation$Rules$Reflexivity$isRefl,
				A2($author$project$Validation$Common$semanticsProblem, z, 'Formula is not reflexivity')),
			A3(
				$author$project$Validation$Common$checkPredicate,
				function (a) {
					return !$elm$core$List$length(
						$author$project$Zipper$zNode(z).references);
				},
				A2($author$project$Validation$Common$semanticsProblem, z, 'Reflexivity rule must have no references'),
				z)));
};
var $author$project$Validation$validateUnary = function (extType) {
	switch (extType.$) {
		case 'Alpha':
			return $author$project$Validation$Rules$Alpha$validate;
		case 'Refl':
			return $author$project$Validation$Rules$Reflexivity$validate;
		case 'Leibnitz':
			return $author$project$Validation$Rules$Leibnitz$validate;
		case 'MP':
			return $author$project$Validation$Rules$ModusPonens$validate;
		case 'MT':
			return $author$project$Validation$Rules$ModusTolens$validate;
		case 'HS':
			return $author$project$Validation$Rules$HS$validate;
		case 'DS':
			return $author$project$Validation$Rules$DS$validate;
		case 'NCS':
			return $author$project$Validation$Rules$NCS$validate;
		case 'ESFF':
			return $author$project$Validation$Rules$ESFF$validate;
		case 'ESFT':
			return $author$project$Validation$Rules$ESFT$validate;
		case 'ESTF':
			return $author$project$Validation$Rules$ESTF$validate;
		default:
			return $author$project$Validation$Rules$ESTT$validate;
	}
};
var $author$project$Validation$Common$areDistinct = F2(
	function (vars, z) {
		return A3(
			$author$project$Validation$Common$resultFromBool,
			z,
			A2($author$project$Validation$Common$semanticsProblem, z, 'Substituted variables must be distinct'),
			_Utils_eq(
				$elm$core$List$length(vars),
				$elm$core$Set$size(
					$elm$core$Set$fromList(vars))));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Validation$Common$varsToBeSubstituted = F3(
	function (vars, n, f) {
		varsToBeSubstituted:
		while (true) {
			if (!n) {
				return vars;
			} else {
				switch (f.$) {
					case 'ForAll':
						var v = f.a;
						var subf = f.b;
						var $temp$vars = A2(
							$elm$core$List$cons,
							$FMFI_UK_1_AIN_412$elm_formula$Term$Var(v),
							vars),
							$temp$n = n - 1,
							$temp$f = subf;
						vars = $temp$vars;
						n = $temp$n;
						f = $temp$f;
						continue varsToBeSubstituted;
					case 'Exists':
						var v = f.a;
						var subf = f.b;
						var $temp$vars = A2(
							$elm$core$List$cons,
							$FMFI_UK_1_AIN_412$elm_formula$Term$Var(v),
							vars),
							$temp$n = n - 1,
							$temp$f = subf;
						vars = $temp$vars;
						n = $temp$n;
						f = $temp$f;
						continue varsToBeSubstituted;
					default:
						return vars;
				}
			}
		}
	});
var $author$project$Validation$Common$getUnsubstitutedVars = F4(
	function (vars, subst, n, f) {
		return A2(
			$elm$core$List$filter,
			function (v) {
				return !A2(
					$elm$core$List$member,
					$FMFI_UK_1_AIN_412$elm_formula$Term$toString(v),
					$elm$core$Dict$keys(subst));
			},
			A3($author$project$Validation$Common$varsToBeSubstituted, vars, n, f));
	});
var $author$project$Validation$Common$countExistQuantifiers = F2(
	function (count, f) {
		countExistQuantifiers:
		while (true) {
			if (f.$ === 'Exists') {
				var x = f.a;
				var subf = f.b;
				var $temp$count = count + 1,
					$temp$f = subf;
				count = $temp$count;
				f = $temp$f;
				continue countExistQuantifiers;
			} else {
				return count;
			}
		}
	});
var $author$project$Validation$Common$countForAllQuantifiers = F2(
	function (count, f) {
		countForAllQuantifiers:
		while (true) {
			if (f.$ === 'ForAll') {
				var x = f.a;
				var subf = f.b;
				var $temp$count = count + 1,
					$temp$f = subf;
				count = $temp$count;
				f = $temp$f;
				continue countForAllQuantifiers;
			} else {
				return count;
			}
		}
	});
var $author$project$Validation$Common$countLeadingQuantifiers = function (f) {
	switch (f.$) {
		case 'ForAll':
			var x = f.a;
			var subf = f.b;
			return A2($author$project$Validation$Common$countForAllQuantifiers, 0, f);
		case 'Exists':
			var x = f.a;
			var subf = f.b;
			return A2($author$project$Validation$Common$countExistQuantifiers, 0, f);
		default:
			return 0;
	}
};
var $author$project$Validation$Common$startWithSameQuant = F2(
	function (f1, f2) {
		var _v0 = _Utils_Tuple2(f1, f2);
		_v0$2:
		while (true) {
			switch (_v0.a.$) {
				case 'ForAll':
					if (_v0.b.$ === 'ForAll') {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return true;
					} else {
						break _v0$2;
					}
				case 'Exists':
					if (_v0.b.$ === 'Exists') {
						var _v3 = _v0.a;
						var _v4 = _v0.b;
						return true;
					} else {
						break _v0$2;
					}
				default:
					break _v0$2;
			}
		}
		return false;
	});
var $author$project$Validation$Common$numOfRemovedQuants = F2(
	function (refF, newF) {
		return (!A2($author$project$Validation$Common$startWithSameQuant, refF, newF)) ? $author$project$Validation$Common$countLeadingQuantifiers(refF) : A2(
			$elm$core$Basics$max,
			0,
			$author$project$Validation$Common$countLeadingQuantifiers(refF) - $author$project$Validation$Common$countLeadingQuantifiers(newF));
	});
var $author$project$Validation$Common$unsubstitutedVars = F2(
	function (subst, z) {
		var refF = A2(
			$elm$core$Result$map,
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula,
			A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z));
		var newF = A2(
			$elm$core$Result$map,
			$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula,
			A2($author$project$Validation$Common$checkFormula, 'Formula', z));
		var removedQuants = A3($elm$core$Result$map2, $author$project$Validation$Common$numOfRemovedQuants, refF, newF);
		return A2(
			$elm$core$Result$withDefault,
			_List_Nil,
			A2(
				$elm$core$Result$andThen,
				function (n) {
					return A2(
						$elm$core$Result$map,
						function (f) {
							return A4($author$project$Validation$Common$getUnsubstitutedVars, _List_Nil, subst, n, f);
						},
						refF);
				},
				removedQuants));
	});
var $author$project$Validation$Common$implicitSubst = F2(
	function (subst, z) {
		return $elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (x) {
					return _Utils_Tuple2(
						$FMFI_UK_1_AIN_412$elm_formula$Term$toString(x),
						x);
				},
				A2($author$project$Validation$Common$unsubstitutedVars, subst, z)));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $author$project$Validation$Common$getParsedSubst = function (z) {
	return function (parsedS) {
		return A2(
			$elm$core$Dict$union,
			parsedS,
			A2($author$project$Validation$Common$implicitSubst, parsedS, z));
	}(
		A2(
			$elm$core$Result$withDefault,
			$elm$core$Dict$fromList(_List_Nil),
			A2(
				$elm$core$Maybe$withDefault,
				$author$project$Tableau$defSubstitution,
				$author$project$Zipper$zSubstitution(
					$author$project$Zipper$up(z))).parsedSubst));
};
var $author$project$Validation$Common$isFunction = function (term) {
	if (term.$ === 'Var') {
		return false;
	} else {
		return true;
	}
};
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas = function (f) {
	switch (f.$) {
		case 'Neg':
			var sf = f.a;
			return _List_fromArray(
				[sf]);
		case 'Disj':
			var lf = f.a;
			var rf = f.b;
			return _List_fromArray(
				[lf, rf]);
		case 'Conj':
			var lf = f.a;
			var rf = f.b;
			return _List_fromArray(
				[lf, rf]);
		case 'Impl':
			var lf = f.a;
			var rf = f.b;
			return _List_fromArray(
				[lf, rf]);
		case 'Equiv':
			var lf = f.a;
			var rf = f.b;
			return _List_fromArray(
				[lf, rf]);
		case 'ForAll':
			var sf = f.b;
			return _List_fromArray(
				[sf]);
		case 'Exists':
			var sf = f.b;
			return _List_fromArray(
				[sf]);
		default:
			return _List_Nil;
	}
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$freeA = F2(
	function (f, fvs) {
		switch (f.$) {
			case 'PredAtom':
				var ts = f.b;
				return A3($elm$core$List$foldl, $FMFI_UK_1_AIN_412$elm_formula$Term$freeA, fvs, ts);
			case 'EqAtom':
				var lt = f.a;
				var rt = f.b;
				return A3(
					$elm$core$List$foldl,
					$FMFI_UK_1_AIN_412$elm_formula$Term$freeA,
					fvs,
					_List_fromArray(
						[lt, rt]));
			case 'ForAll':
				var x = f.a;
				var sf = f.b;
				return A2(
					$elm$core$Set$remove,
					x,
					A2($FMFI_UK_1_AIN_412$elm_formula$Formula$freeA, sf, fvs));
			case 'Exists':
				var x = f.a;
				var sf = f.b;
				return A2(
					$elm$core$Set$remove,
					x,
					A2($FMFI_UK_1_AIN_412$elm_formula$Formula$freeA, sf, fvs));
			default:
				return A3(
					$elm$core$List$foldl,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$freeA,
					fvs,
					$FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas(f));
		}
	});
var $FMFI_UK_1_AIN_412$elm_formula$Formula$free = function (f) {
	return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$freeA, f, $elm$core$Set$empty);
};
var $author$project$Validation$Common$isSimilarAbove = F2(
	function (_var, z) {
		var parsedF = $FMFI_UK_1_AIN_412$elm_formula$Formula$Parser$parseSigned(
			$author$project$Zipper$zNode(z).value);
		if (parsedF.$ === 'Ok') {
			var parsed = parsedF.a;
			return A2(
				$elm$core$Set$member,
				_var,
				$FMFI_UK_1_AIN_412$elm_formula$Formula$free(
					$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula(parsed))) || ((!_Utils_eq(
				$author$project$Zipper$up(z),
				z)) && A2(
				$author$project$Validation$Common$isSimilarAbove,
				_var,
				$author$project$Zipper$up(z)));
		} else {
			return (!_Utils_eq(
				$author$project$Zipper$up(z),
				z)) && A2(
				$author$project$Validation$Common$isSimilarAbove,
				_var,
				$author$project$Zipper$up(z));
		}
	});
var $author$project$Validation$Common$pluralFromList = F3(
	function (singular, plural, lst) {
		if (lst.b && lst.b.b) {
			var _v1 = lst.b;
			return plural;
		} else {
			return singular;
		}
	});
var $author$project$Validation$Common$notVarsErrStr = function (lst) {
	return 'The term' + (A3($author$project$Validation$Common$pluralFromList, ' \'', 's \'', lst) + (A2(
		$elm$core$String$join,
		'\', \'',
		A2($elm$core$List$map, $FMFI_UK_1_AIN_412$elm_formula$Term$toString, lst)) + ('\' must be ' + A3($author$project$Validation$Common$pluralFromList, 'a variable', 'variables', lst))));
};
var $author$project$Validation$Common$similarAboveErrStr = function (lst) {
	return 'The variable' + (A3($author$project$Validation$Common$pluralFromList, ' \'', 's \'', lst) + (A2($elm$core$String$join, ',', lst) + (A3($author$project$Validation$Common$pluralFromList, '\' was', '\' were', lst) + ' located above as free')));
};
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Validation$Common$checkNewVariables = function (z) {
	var parsedS = $author$project$Validation$Common$getParsedSubst(z);
	var terms = $elm$core$Dict$values(parsedS);
	var termsToString = A2($elm$core$List$map, $FMFI_UK_1_AIN_412$elm_formula$Term$toString, terms);
	var _v0 = A2($elm$core$List$filter, $author$project$Validation$Common$isFunction, terms);
	if (!_v0.b) {
		var _v1 = A2(
			$elm$core$List$filter,
			function (_var) {
				return A2(
					$author$project$Validation$Common$isSimilarAbove,
					_var,
					$author$project$Zipper$up(z));
			},
			termsToString);
		if (!_v1.b) {
			return A2($author$project$Validation$Common$areDistinct, termsToString, z);
		} else {
			var vars = _v1;
			return $elm$core$Result$Err(
				A2(
					$author$project$Validation$Common$semanticsProblem,
					z,
					$author$project$Validation$Common$similarAboveErrStr(vars)));
		}
	} else {
		var functions = _v0;
		return $elm$core$Result$Err(
			A2(
				$author$project$Validation$Common$semanticsProblem,
				z,
				$author$project$Validation$Common$notVarsErrStr(functions)));
	}
};
var $author$project$Validation$Common$getTermsToString = function (z) {
	return function (ts) {
		return A2(
			$elm$core$String$join,
			',',
			A2($elm$core$List$map, $FMFI_UK_1_AIN_412$elm_formula$Term$toString, ts));
	}(
		$elm$core$Dict$values(
			$author$project$Validation$Common$getParsedSubst(z)));
};
var $author$project$Validation$Common$getVarsToString = function (z) {
	return A2(
		$elm$core$String$join,
		',',
		$elm$core$Dict$keys(
			$author$project$Validation$Common$getParsedSubst(z)));
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isDelta = function (x) {
	return _Utils_eq(
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Delta,
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getType(x));
};
var $author$project$Validation$Common$isSubstituable = F3(
	function (substitution, _new, original) {
		var trySubs = F2(
			function (s, f) {
				var _v2 = A2($FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, s, f);
				if (_v2.$ === 'Ok') {
					return true;
				} else {
					var msg = _v2.a;
					return false;
				}
			});
		var removeQuantifierAndSubstitute = F2(
			function (s, f) {
				removeQuantifierAndSubstitute:
				while (true) {
					switch (f.$) {
						case 'ForAll':
							var v = f.a;
							var subf = f.b;
							if (A2(
								$elm$core$List$member,
								v,
								$elm$core$Dict$keys(s))) {
								var $temp$s = s,
									$temp$f = subf;
								s = $temp$s;
								f = $temp$f;
								continue removeQuantifierAndSubstitute;
							} else {
								return A2(trySubs, substitution, f);
							}
						case 'Exists':
							var v = f.a;
							var subf = f.b;
							if (A2(
								$elm$core$List$member,
								v,
								$elm$core$Dict$keys(s))) {
								var $temp$s = s,
									$temp$f = subf;
								s = $temp$s;
								f = $temp$f;
								continue removeQuantifierAndSubstitute;
							} else {
								return A2(trySubs, substitution, f);
							}
						default:
							return A2(trySubs, substitution, f);
					}
				}
			});
		var removeSign = F2(
			function (s, sf) {
				if (sf.$ === 'T') {
					var formula = sf.a;
					return A2(removeQuantifierAndSubstitute, s, formula);
				} else {
					var formula = sf.a;
					return A2(removeQuantifierAndSubstitute, s, formula);
				}
			});
		return A2(removeSign, substitution, original);
	});
var $author$project$Validation$Common$numberOfSubstPairs = function (z) {
	return $elm$core$Dict$size(
		$author$project$Validation$Common$getParsedSubst(z));
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$removeQuantifierAndSubstitute = F2(
	function (substitution, original) {
		if ($elm$core$Dict$size(substitution) > 1) {
			return $elm$core$Result$Err('there is more than one substitution pair');
		} else {
			switch (original.$) {
				case 'ForAll':
					var s = original.a;
					var f = original.b;
					return A2(
						$elm$core$List$member,
						s,
						$elm$core$Dict$keys(substitution)) ? A2($FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, substitution, f) : $elm$core$Result$Err('substituted variable isn\'t in substitution');
				case 'Exists':
					var s = original.a;
					var f = original.b;
					return A2(
						$elm$core$List$member,
						s,
						$elm$core$Dict$keys(substitution)) ? A2($FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, substitution, f) : $elm$core$Result$Err('substituted variable isn\'t in substitution');
				default:
					return $elm$core$Result$Err('formula doesn\'t start with quantifier');
			}
		}
	});
var $author$project$Validation$Common$substitutionIsValid = F3(
	function (substitution, _new, original) {
		var checkSubstitution = function (r) {
			if (r.$ === 'Ok') {
				var f = r.a;
				return f;
			} else {
				var msg = r.a;
				return A2($FMFI_UK_1_AIN_412$elm_formula$Formula$PredAtom, 'default', _List_Nil);
			}
		};
		var applyToSigned = F3(
			function (_function, subst, sf) {
				if (sf.$ === 'T') {
					var formula = sf.a;
					return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$T(
						checkSubstitution(
							A2(_function, subst, formula)));
				} else {
					var formula = sf.a;
					return $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$F(
						checkSubstitution(
							A2(_function, subst, formula)));
				}
			});
		return _Utils_eq(
			_new,
			A3(applyToSigned, $FMFI_UK_1_AIN_412$elm_formula$Formula$removeQuantifierAndSubstitute, substitution, original));
	});
var $author$project$Validation$Rules$Delta$validate = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$andThen,
			A2(
				$author$project$Validation$Common$checkPredicate,
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					return A3(
						$author$project$Validation$Common$substitutionIsValid,
						$author$project$Validation$Common$getParsedSubst(z),
						a,
						b);
				},
				A2(
					$author$project$Validation$Common$semanticsProblem,
					z,
					'This isn\'t valid δ-subformula created by substituting \'' + ($author$project$Validation$Common$getTermsToString(z) + ('\' for \'' + ($author$project$Validation$Common$getVarsToString(z) + ('\' from (' + (A2($author$project$Validation$Common$getReffedId, $author$project$Zipper$zFirstRef, z) + ').'))))))),
			A2(
				$elm$core$Result$andThen,
				A2(
					$author$project$Validation$Common$checkPredicate,
					function (_v0) {
						var a = _v0.a;
						var b = _v0.b;
						return A3(
							$author$project$Validation$Common$isSubstituable,
							$author$project$Validation$Common$getParsedSubst(z),
							a,
							b);
					},
					A2(
						$author$project$Validation$Common$semanticsProblem,
						z,
						'This is not substituable. Variable \'' + ($author$project$Validation$Common$getTermsToString(z) + ('\' is bound in referrenced formula (' + (A2($author$project$Validation$Common$getReffedId, $author$project$Zipper$zFirstRef, z) + '). Choose another variable.'))))),
				A3(
					$elm$core$Result$map2,
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}),
					A2($author$project$Validation$Common$checkFormula, 'Formula', z),
					A2(
						$elm$core$Result$andThen,
						function (z1) {
							return A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z1);
						},
						A2(
							$elm$core$Result$andThen,
							$author$project$Validation$Common$checkNewVariables,
							A2(
								$elm$core$Result$andThen,
								A2(
									$author$project$Validation$Common$checkPredicate,
									function (z1) {
										return $author$project$Validation$Common$numberOfSubstPairs(z1) <= 1;
									},
									A2($author$project$Validation$Common$semanticsProblem, z, 'δ rule must be used with at most 1 substitution pair')),
								A2(
									$elm$core$Result$map,
									$elm$core$Basics$always(z),
									A2(
										$elm$core$Result$andThen,
										A2(
											$author$project$Validation$Common$checkPredicate,
											$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isDelta,
											A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not δ')),
										A2(
											$elm$core$Result$andThen,
											A2(
												$author$project$Validation$Common$checkReffedFormula,
												'',
												$author$project$Zipper$zFirstRef(z)),
											A3(
												$author$project$Validation$Common$checkPredicate,
												$author$project$Validation$Common$hasNumberOfRefs(1),
												A2($author$project$Validation$Common$semanticsProblem, z, 'δ rule must have 1 reference'),
												z)))))))))));
};
var $author$project$Validation$Common$forbiddenVarsErrStr = function (lst) {
	return 'The variable' + (A3($author$project$Validation$Common$pluralFromList, ' \'', 's \'', lst) + (A2($elm$core$String$join, ',', lst) + '\' can\'t be substituted for'));
};
var $author$project$Validation$Common$checkSubstitutedVars = F3(
	function (allowedVars, subst, z) {
		var allowed = A2($elm$core$List$map, $FMFI_UK_1_AIN_412$elm_formula$Term$toString, allowedVars);
		var forbidden = A2(
			$elm$core$List$filter,
			function (v) {
				return !A2($elm$core$List$member, v, allowed);
			},
			$elm$core$Dict$keys(subst));
		if (!forbidden.b) {
			return $elm$core$Result$Ok(z);
		} else {
			var lst = forbidden;
			return $elm$core$Result$Err(
				A2(
					$author$project$Validation$Common$semanticsProblem,
					z,
					$author$project$Validation$Common$forbiddenVarsErrStr(lst)));
		}
	});
var $author$project$Validation$Common$removeNQuants = F2(
	function (n, f) {
		removeNQuants:
		while (true) {
			if (!n) {
				return f;
			} else {
				switch (f.$) {
					case 'ForAll':
						var subf = f.b;
						var $temp$n = n - 1,
							$temp$f = subf;
						n = $temp$n;
						f = $temp$f;
						continue removeNQuants;
					case 'Exists':
						var subf = f.b;
						var $temp$n = n - 1,
							$temp$f = subf;
						n = $temp$n;
						f = $temp$f;
						continue removeNQuants;
					default:
						return f;
				}
			}
		}
	});
var $author$project$Validation$Common$unaryWithSubstCheck = F5(
	function (ruleName, refF, newF, subst, z) {
		var referenced = $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula(refF);
		var _new = $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula(newF);
		var removedQuantsCount = A2($author$project$Validation$Common$numOfRemovedQuants, referenced, _new);
		var allowedVars = A3($author$project$Validation$Common$varsToBeSubstituted, _List_Nil, removedQuantsCount, referenced);
		return A2(
			$elm$core$Result$andThen,
			function (_v0) {
				return A2(
					$elm$core$Result$andThen,
					function (b) {
						return A3(
							$author$project$Validation$Common$resultFromBool,
							z,
							A2($author$project$Validation$Common$semanticsProblem, z, 'Formula was not created by using the ' + (ruleName + ' rule')),
							b);
					},
					A2(
						$elm$core$Result$map,
						function (f) {
							return _Utils_eq(f, _new) && A2($author$project$Validation$Common$haveSameSign, refF, newF);
						},
						A2(
							$elm$core$Result$mapError,
							function (str) {
								return A2($author$project$Validation$Common$semanticsProblem, z, str);
							},
							A2(
								$FMFI_UK_1_AIN_412$elm_formula$Formula$substitute,
								subst,
								A2($author$project$Validation$Common$removeNQuants, removedQuantsCount, referenced)))));
			},
			A3($author$project$Validation$Common$checkSubstitutedVars, allowedVars, subst, z));
	});
var $author$project$Validation$Rules$DeltaStar$validate = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$andThen,
			function (_v1) {
				var refF = _v1.a;
				var newF = _v1.b;
				return A5(
					$author$project$Validation$Common$unaryWithSubstCheck,
					'δ*',
					refF,
					newF,
					$author$project$Validation$Common$getParsedSubst(z),
					z);
			},
			A3(
				$elm$core$Result$map2,
				F2(
					function (newF, refF) {
						return _Utils_Tuple2(refF, newF);
					}),
				A2($author$project$Validation$Common$checkFormula, 'Formula', z),
				A2(
					$elm$core$Result$andThen,
					function (z1) {
						return A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z1);
					},
					A2(
						$elm$core$Result$andThen,
						function (_v0) {
							return $author$project$Validation$Common$checkNewVariables(z);
						},
						A2(
							$elm$core$Result$andThen,
							A2(
								$author$project$Validation$Common$checkPredicate,
								$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isDelta,
								A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not δ')),
							A2(
								$elm$core$Result$andThen,
								A2(
									$author$project$Validation$Common$checkReffedFormula,
									'',
									$author$project$Zipper$zFirstRef(z)),
								A3(
									$author$project$Validation$Common$checkPredicate,
									$author$project$Validation$Common$hasNumberOfRefs(1),
									A2($author$project$Validation$Common$semanticsProblem, z, 'δ* rule must have 1 reference'),
									z))))))));
};
var $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isGamma = function (x) {
	return _Utils_eq(
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$Gamma,
		$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getType(x));
};
var $author$project$Validation$Rules$Gamma$validate = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$andThen,
			A2(
				$author$project$Validation$Common$checkPredicate,
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					return A3(
						$author$project$Validation$Common$substitutionIsValid,
						$author$project$Validation$Common$getParsedSubst(z),
						a,
						b);
				},
				A2(
					$author$project$Validation$Common$semanticsProblem,
					z,
					'This isn\'t valid γ-subformula created by substituting \'' + ($author$project$Validation$Common$getTermsToString(z) + ('\' for \'' + ($author$project$Validation$Common$getVarsToString(z) + ('\' from (' + (A2($author$project$Validation$Common$getReffedId, $author$project$Zipper$zFirstRef, z) + ').'))))))),
			A2(
				$elm$core$Result$andThen,
				A2(
					$author$project$Validation$Common$checkPredicate,
					function (_v0) {
						var a = _v0.a;
						var b = _v0.b;
						return A3(
							$author$project$Validation$Common$isSubstituable,
							$author$project$Validation$Common$getParsedSubst(z),
							a,
							b);
					},
					A2(
						$author$project$Validation$Common$semanticsProblem,
						z,
						'This is not substituable. Variable \'' + ($author$project$Validation$Common$getTermsToString(z) + ('\' is bound in referrenced formula (' + (A2($author$project$Validation$Common$getReffedId, $author$project$Zipper$zFirstRef, z) + '). Choose another variable.'))))),
				A3(
					$elm$core$Result$map2,
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}),
					A2($author$project$Validation$Common$checkFormula, 'Formula', z),
					A2(
						$elm$core$Result$andThen,
						function (z1) {
							return A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z1);
						},
						A2(
							$elm$core$Result$andThen,
							A2(
								$author$project$Validation$Common$checkPredicate,
								function (z1) {
									return $author$project$Validation$Common$numberOfSubstPairs(z1) <= 1;
								},
								A2($author$project$Validation$Common$semanticsProblem, z, 'γ rule must be used with at most 1 substitution pair')),
							A2(
								$elm$core$Result$map,
								$elm$core$Basics$always(z),
								A2(
									$elm$core$Result$andThen,
									A2(
										$author$project$Validation$Common$checkPredicate,
										$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isGamma,
										A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not γ')),
									A2(
										$elm$core$Result$andThen,
										A2(
											$author$project$Validation$Common$checkReffedFormula,
											'',
											$author$project$Zipper$zFirstRef(z)),
										A3(
											$author$project$Validation$Common$checkPredicate,
											$author$project$Validation$Common$hasNumberOfRefs(1),
											A2($author$project$Validation$Common$semanticsProblem, z, 'γ rule must have 1 reference'),
											z))))))))));
};
var $author$project$Validation$Rules$GammaStar$validate = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$andThen,
			function (_v1) {
				var refF = _v1.a;
				var newF = _v1.b;
				return A5(
					$author$project$Validation$Common$unaryWithSubstCheck,
					'γ*',
					refF,
					newF,
					$author$project$Validation$Common$getParsedSubst(z),
					z);
			},
			A3(
				$elm$core$Result$map2,
				F2(
					function (newF, refF) {
						return _Utils_Tuple2(refF, newF);
					}),
				A2($author$project$Validation$Common$checkFormula, 'Formula', z),
				A2(
					$elm$core$Result$andThen,
					function (_v0) {
						return A2($author$project$Validation$Common$getReffedSignedFormula, $author$project$Zipper$zFirstRef, z);
					},
					A2(
						$elm$core$Result$andThen,
						A2(
							$author$project$Validation$Common$checkPredicate,
							$FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$isGamma,
							A2($author$project$Validation$Common$semanticsProblem, z, 'Referenced formula is not γ')),
						A2(
							$elm$core$Result$andThen,
							A2(
								$author$project$Validation$Common$checkReffedFormula,
								'',
								$author$project$Zipper$zFirstRef(z)),
							A3(
								$author$project$Validation$Common$checkPredicate,
								$author$project$Validation$Common$hasNumberOfRefs(1),
								A2($author$project$Validation$Common$semanticsProblem, z, 'γ* rule must have 1 reference'),
								z)))))));
};
var $author$project$Validation$validateUnaryWithSubst = function (extType) {
	switch (extType.$) {
		case 'Gamma':
			return $author$project$Validation$Rules$Gamma$validate;
		case 'Delta':
			return $author$project$Validation$Rules$Delta$validate;
		case 'GammaStar':
			return $author$project$Validation$Rules$GammaStar$validate;
		default:
			return $author$project$Validation$Rules$DeltaStar$validate;
	}
};
var $author$project$Validation$isCorrectRule = F2(
	function (config, z) {
		var t = z.a;
		var bs = z.b;
		if (bs.b) {
			switch (bs.a.$) {
				case 'UnaryCrumb':
					if (bs.a.a.$ === 'Alpha') {
						var _v1 = bs.a;
						var _v2 = _v1.a;
						var _v3 = $elm$core$List$isEmpty(t.node.references);
						if (_v3) {
							return $elm$core$Result$Ok(z);
						} else {
							return A4(
								$author$project$Validation$validateRule,
								$author$project$Tableau$unaryExtTypeToString($author$project$Tableau$Alpha),
								$author$project$Validation$validateUnary($author$project$Tableau$Alpha),
								config,
								z);
						}
					} else {
						var _v4 = bs.a;
						var extType = _v4.a;
						return A4(
							$author$project$Validation$validateRule,
							$author$project$Tableau$unaryExtTypeToString(extType),
							$author$project$Validation$validateUnary(extType),
							config,
							z);
					}
				case 'UnaryCrumbWithSubst':
					var _v5 = bs.a;
					var extType = _v5.a;
					return A4(
						$author$project$Validation$validateRule,
						$author$project$Tableau$unaryWithSubstExtTypeToString(extType),
						$author$project$Validation$validateUnaryWithSubst(extType),
						config,
						z);
				case 'BinaryLeftCrumb':
					var _v6 = bs.a;
					var extType = _v6.a;
					return A4(
						$author$project$Validation$validateRule,
						$author$project$Tableau$binaryExtTypeToString(extType),
						$author$project$Validation$Common$validateLeft(
							$author$project$Validation$validateBinary(extType)),
						config,
						z);
				default:
					var _v7 = bs.a;
					var extType = _v7.a;
					return A4(
						$author$project$Validation$validateRule,
						$author$project$Tableau$binaryExtTypeToString(extType),
						$author$project$Validation$Common$validateRight(
							$author$project$Validation$validateBinary(extType)),
						config,
						z);
			}
		} else {
			return $elm$core$Result$Ok(z);
		}
	});
var $author$project$Validation$Common$always4 = F5(
	function (r, _v0, _v1, _v2, _v3) {
		return r;
	});
var $author$project$Validation$isValidCloseRef = F3(
	function (str, r, z) {
		return A2(
			$elm$core$Result$map,
			$elm$core$Basics$always(z),
			A2(
				$elm$core$Result$fromMaybe,
				A2($author$project$Validation$Common$syntaxProblem, z, str + ' reference is invalid.'),
				r.up));
	});
var $author$project$Validation$areValidCloseRefs = function (z) {
	var _v0 = $author$project$Zipper$zTableau(z).ext;
	if (_v0.$ === 'Closed') {
		var r1 = _v0.a;
		var r2 = _v0.b;
		return A3(
			$author$project$Errors$merge2,
			$author$project$Validation$Common$always2(z),
			A3($author$project$Validation$isValidCloseRef, 'First close', r1, z),
			A3($author$project$Validation$isValidCloseRef, 'Second close', r2, z));
	} else {
		return $elm$core$Result$Ok(z);
	}
};
var $author$project$Helpers$Parser$addProblemToProblems = F2(
	function (p, ps) {
		switch (p.$) {
			case 'Expecting':
				var exp = p.a;
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, exp, ps.expecting)
					});
			case 'ExpectingInt':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'an integer', ps.expecting)
					});
			case 'ExpectingHex':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'a hexadecimal number', ps.expecting)
					});
			case 'ExpectingOctal':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'an octal number', ps.expecting)
					});
			case 'ExpectingBinary':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'a binary number', ps.expecting)
					});
			case 'ExpectingFloat':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'a floating point number', ps.expecting)
					});
			case 'ExpectingNumber':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'a number', ps.expecting)
					});
			case 'ExpectingVariable':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'an identifier', ps.expecting)
					});
			case 'ExpectingSymbol':
				var sym = p.a;
				return _Utils_update(
					ps,
					{
						expectingSymbol: A2($elm$core$List$cons, sym, ps.expectingSymbol)
					});
			case 'ExpectingKeyword':
				var kw = p.a;
				return _Utils_update(
					ps,
					{
						expectingKeyword: A2($elm$core$List$cons, kw, ps.expectingKeyword)
					});
			case 'ExpectingEnd':
				return _Utils_update(
					ps,
					{
						expecting: A2($elm$core$List$cons, 'end of input', ps.expecting)
					});
			case 'UnexpectedChar':
				return _Utils_update(
					ps,
					{
						other: A2($elm$core$List$cons, 'unexpected character', ps.other)
					});
			case 'Problem':
				var prob = p.a;
				return _Utils_update(
					ps,
					{
						other: A2($elm$core$List$cons, prob, ps.other)
					});
			default:
				return _Utils_update(
					ps,
					{
						other: A2($elm$core$List$cons, 'bad repeat', ps.other)
					});
		}
	});
var $author$project$Helpers$Parser$noProblems = {expecting: _List_Nil, expectingKeyword: _List_Nil, expectingSymbol: _List_Nil, other: _List_Nil};
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$Helpers$Parser$updateMatrix = F3(
	function (r, c, update) {
		return A2(
			$elm$core$Dict$update,
			r,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Maybe$Just,
					A2($elm$core$Dict$update, c, update)),
				$elm$core$Maybe$withDefault($elm$core$Dict$empty)));
	});
var $author$project$Helpers$Parser$deadEndsToProblemsMatrix = A2(
	$elm$core$List$foldl,
	function (_v0) {
		var row = _v0.row;
		var col = _v0.col;
		var problem = _v0.problem;
		return A3(
			$author$project$Helpers$Parser$updateMatrix,
			row,
			col,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Maybe$Just,
					$author$project$Helpers$Parser$addProblemToProblems(problem)),
				$elm$core$Maybe$withDefault($author$project$Helpers$Parser$noProblems)));
	},
	$elm$core$Dict$empty);
var $author$project$Helpers$Parser$rowToStrings = A2(
	$elm$core$Dict$foldr,
	F3(
		function (c, ps, pstrs) {
			return A2(
				$elm$core$List$cons,
				'column ' + ($elm$core$String$fromInt(c) + (': ' + ps)),
				pstrs);
		}),
	_List_Nil);
var $author$project$Helpers$Parser$matrixToStrings = A2(
	$elm$core$Dict$foldr,
	F3(
		function (r, row, pstrs) {
			return A3(
				$elm$core$List$foldr,
				F2(
					function (s, psts1) {
						return A2(
							$elm$core$List$cons,
							'Row ' + ($elm$core$String$fromInt(r) + (', ' + s)),
							psts1);
					}),
				pstrs,
				$author$project$Helpers$Parser$rowToStrings(row));
		}),
	_List_Nil);
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $author$project$Helpers$Parser$revAlternativesToMaybeString = function (alts) {
	if (!alts.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		if (!alts.b.b) {
			var alt = alts.a;
			return $elm$core$Maybe$Just(alt);
		} else {
			if (!alts.b.b.b) {
				var alt1 = alts.a;
				var _v1 = alts.b;
				var alt2 = _v1.a;
				return $elm$core$Maybe$Just(alt2 + (' or ' + alt1));
			} else {
				var alt1 = alts.a;
				var morealts = alts.b;
				return $elm$core$Maybe$Just(
					A2(
						$elm$core$String$join,
						', ',
						$elm$core$List$reverse(morealts)) + (', or ' + alt1));
			}
		}
	}
};
var $author$project$Helpers$Parser$expectingKindToString = F2(
	function (kind, syms) {
		var _v0 = A2(
			$elm$core$List$map,
			function (sym) {
				return '‘' + (sym + '’');
			},
			$elm$core$Set$toList(
				$elm$core$Set$fromList(syms)));
		if (!_v0.b) {
			return _List_Nil;
		} else {
			if (!_v0.b.b) {
				var qsym = _v0.a;
				return _List_fromArray(
					[kind + (' ' + qsym)]);
			} else {
				var qsyms = _v0;
				return _List_fromArray(
					[
						'one of ' + (kind + ('s ' + A2(
						$elm$core$Maybe$withDefault,
						'',
						$author$project$Helpers$Parser$revAlternativesToMaybeString(qsyms))))
					]);
			}
		}
	});
var $author$project$Helpers$Parser$problemsToString = function (ps) {
	var expectations = $author$project$Helpers$Parser$revAlternativesToMaybeString(
		_Utils_ap(
			$elm$core$List$reverse(ps.expecting),
			_Utils_ap(
				A2($author$project$Helpers$Parser$expectingKindToString, 'keyword', ps.expectingKeyword),
				A2($author$project$Helpers$Parser$expectingKindToString, 'symbol', ps.expectingSymbol))));
	return A2(
		$elm$core$String$join,
		'; ',
		_Utils_ap(
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2(
					$elm$core$Maybe$map,
					function (s) {
						return _List_fromArray(
							['expecting ' + s]);
					},
					expectations)),
			$elm$core$List$reverse(ps.other)));
};
var $author$project$Helpers$Parser$problemsMatrixToStringMatrix = $elm$core$Dict$map(
	F2(
		function (_v0, cd) {
			return A2(
				$elm$core$Dict$map,
				F2(
					function (_v1, ps) {
						return $author$project$Helpers$Parser$problemsToString(ps);
					}),
				cd);
		}));
var $author$project$Helpers$Parser$deadEndsToStrings = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $author$project$Helpers$Parser$matrixToStrings, $author$project$Helpers$Parser$problemsMatrixToStringMatrix),
	$author$project$Helpers$Parser$deadEndsToProblemsMatrix);
var $author$project$Helpers$Parser$deadEndsToString = A2(
	$elm$core$Basics$composeL,
	$elm$core$String$join('.'),
	$author$project$Helpers$Parser$deadEndsToStrings);
var $author$project$Validation$parseProblem = function (z) {
	return A2(
		$elm$core$Basics$composeR,
		$author$project$Helpers$Parser$deadEndsToString,
		$author$project$Validation$Common$syntaxProblem(z));
};
var $author$project$Validation$isValidFormula = function (z) {
	return A2(
		$elm$core$Result$map,
		$elm$core$Basics$always(z),
		A2(
			$elm$core$Result$mapError,
			$author$project$Validation$parseProblem(z),
			$author$project$Zipper$zNode(z).formula));
};
var $author$project$Validation$isValidRef = F3(
	function (str, r, z) {
		return A2(
			$elm$core$Result$map,
			$elm$core$Basics$always(z),
			A2(
				$elm$core$Result$andThen,
				A2(
					$author$project$Validation$Common$checkPredicate,
					function (up) {
						return !(!up);
					},
					A2($author$project$Validation$Common$semanticsProblem, z, str + ' reference is pointing on this formula')),
				A2(
					$elm$core$Result$fromMaybe,
					A2($author$project$Validation$Common$syntaxProblem, z, str + ' reference is invalid.'),
					r.up)));
	});
var $author$project$Validation$isValidNodeRef = function (z) {
	var _v0 = $elm$core$List$length(
		$author$project$Zipper$zNode(z).references);
	switch (_v0) {
		case 0:
			return $elm$core$Result$Ok(z);
		case 1:
			return A3(
				$author$project$Validation$isValidRef,
				'The',
				$author$project$Zipper$zFirstRef(z),
				z);
		case 2:
			return A3(
				$author$project$Errors$merge2,
				$author$project$Validation$Common$always2(z),
				A3(
					$author$project$Validation$isValidRef,
					'The first',
					$author$project$Zipper$zFirstRef(z),
					z),
				A3(
					$author$project$Validation$isValidRef,
					'The second',
					$author$project$Zipper$zSecondRef(z),
					z));
		default:
			return $elm$core$Result$Err(
				A2($author$project$Validation$Common$syntaxProblem, z, 'There are too many references.'));
	}
};
var $author$project$Validation$isValidSubstitution = function (z) {
	if (_Utils_eq(
		$author$project$Zipper$up(z),
		z)) {
		return $elm$core$Result$Ok(z);
	} else {
		var _v0 = $author$project$Zipper$zSubstitution(
			$author$project$Zipper$up(z));
		if (_v0.$ === 'Just') {
			var subst = _v0.a;
			return A2(
				$elm$core$Result$map,
				$elm$core$Basics$always(z),
				A2(
					$elm$core$Result$map,
					function (parsedS) {
						return A2(
							$elm$core$Dict$union,
							parsedS,
							A2($author$project$Validation$Common$implicitSubst, parsedS, z));
					},
					A2(
						$elm$core$Result$mapError,
						function (_v1) {
							return A2($author$project$Validation$Common$syntaxProblem, z, 'Wrong form of substitution');
						},
						subst.parsedSubst)));
		} else {
			return $elm$core$Result$Ok(z);
		}
	}
};
var $elm$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				if (rc.$ === 'Err') {
					var x = rc.a;
					return $elm$core$Result$Err(x);
				} else {
					var c = rc.a;
					if (rd.$ === 'Err') {
						var x = rd.a;
						return $elm$core$Result$Err(x);
					} else {
						var d = rd.a;
						return $elm$core$Result$Ok(
							A4(func, a, b, c, d));
					}
				}
			}
		}
	});
var $author$project$Errors$merge4 = F5(
	function (func, ra, rb, rc, rd) {
		var _v0 = A5($elm$core$Result$map4, func, ra, rb, rc, rd);
		if (_v0.$ === 'Ok') {
			var val = _v0.a;
			return $elm$core$Result$Ok(val);
		} else {
			return $elm$core$Result$Err(
				_Utils_ap(
					$author$project$Errors$errors(ra),
					_Utils_ap(
						$author$project$Errors$errors(rb),
						_Utils_ap(
							$author$project$Errors$errors(rc),
							$author$project$Errors$errors(rd)))));
		}
	});
var $author$project$Validation$isValidNode = function (z) {
	return A5(
		$author$project$Errors$merge4,
		$author$project$Validation$Common$always4(z),
		$author$project$Validation$isValidFormula(z),
		$author$project$Validation$isValidNodeRef(z),
		$author$project$Validation$isValidSubstitution(z),
		$author$project$Validation$areValidCloseRefs(z));
};
var $author$project$Validation$Common$second = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b).b;
	});
var $author$project$Validation$isCorrectNode = F2(
	function (config, z) {
		return A2(
			$elm$core$Result$andThen,
			function (_v0) {
				return A3(
					$author$project$Errors$merge2,
					$author$project$Validation$Common$second,
					A2($author$project$Validation$isCorrectRule, config, z),
					$author$project$Validation$areCorrectCloseRefs(z));
			},
			$author$project$Validation$isValidNode(z));
	});
var $author$project$Validation$isCorrectTableau = F2(
	function (config, z) {
		return A3(
			$author$project$Errors$merge2,
			$author$project$Validation$Common$always2(z),
			A2($author$project$Validation$isCorrectNode, config, z),
			A3(
				$elm$core$List$foldl,
				$author$project$Errors$merge2(
					$author$project$Validation$Common$always2(z)),
				$elm$core$Result$Ok(z),
				A2(
					$elm$core$List$map,
					$author$project$Validation$isCorrectTableau(config),
					$author$project$Zipper$children(z))));
	});
var $author$project$Editor$problemClass = function (_v0) {
	var typ = _v0.typ;
	if (typ.$ === 'Syntax') {
		return 'syntaxProblem';
	} else {
		return 'semanticsProblem';
	}
};
var $author$project$Editor$problemItem = function (pi) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class(
				$author$project$Editor$problemClass(pi))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('('),
				$elm$html$Html$text(
				$elm$core$String$fromInt(
					$author$project$Zipper$zNode(pi.zip).id)),
				$elm$html$Html$text(') '),
				$elm$html$Html$text(pi.msg)
			]));
};
var $author$project$Editor$problemList = function (pl) {
	return A2(
		$elm$html$Html$ul,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('problemList')
			]),
		A2($elm$core$List$map, $author$project$Editor$problemItem, pl));
};
var $author$project$Editor$problems = F2(
	function (config, t) {
		var errors = $author$project$Errors$errors(
			A2(
				$author$project$Validation$isCorrectTableau,
				config,
				$author$project$Zipper$zipper(t)));
		return $elm$core$List$isEmpty(errors) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('problems')
				]),
			_List_Nil) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('problems')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Problems')
						])),
					$author$project$Editor$problemList(errors)
				]));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $author$project$Helpers$Helper$second = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b).b;
	});
var $elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Helpers$Helper$assumptions = function (z) {
	return _Utils_ap(
		A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				$elm$core$List$singleton,
				A3(
					$elm$core$Maybe$map2,
					$author$project$Helpers$Helper$second,
					$elm$core$List$isEmpty(
						$author$project$Zipper$zNode(z).references) ? $elm$core$Maybe$Just(_Utils_Tuple0) : $elm$core$Maybe$Nothing,
					$elm$core$Result$toMaybe(
						$author$project$Zipper$zNode(z).formula)))),
		A2(
			$elm$core$List$concatMap,
			$author$project$Helpers$Helper$assumptions,
			$author$project$Zipper$children(z)));
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $author$project$Helpers$Helper$merge2 = F3(
	function (func, ra, rb) {
		var _v0 = _Utils_Tuple2(ra, rb);
		if (_v0.a.$ === 'Ok') {
			if (_v0.b.$ === 'Ok') {
				var a = _v0.a.a;
				var b = _v0.b.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			} else {
				var x = _v0.b.a;
				return $elm$core$Result$Err(x);
			}
		} else {
			if (_v0.b.$ === 'Err') {
				var xa = _v0.a.a;
				var xb = _v0.b.a;
				return $elm$core$Result$Err(
					_Utils_ap(xa, xb));
			} else {
				var x = _v0.a.a;
				return $elm$core$Result$Err(x);
			}
		}
	});
var $author$project$Helpers$Helper$errors = function (r) {
	if (r.$ === 'Err') {
		var x = r.a;
		return x;
	} else {
		return _List_Nil;
	}
};
var $author$project$Helpers$Helper$merge3 = F4(
	function (func, ra, rb, rc) {
		var _v0 = _Utils_Tuple3(ra, rb, rc);
		if (((_v0.a.$ === 'Ok') && (_v0.b.$ === 'Ok')) && (_v0.c.$ === 'Ok')) {
			var a = _v0.a.a;
			var b = _v0.b.a;
			var c = _v0.c.a;
			return $elm$core$Result$Ok(
				A3(func, a, b, c));
		} else {
			return $elm$core$Result$Err(
				_Utils_ap(
					$author$project$Helpers$Helper$errors(ra),
					_Utils_ap(
						$author$project$Helpers$Helper$errors(rb),
						$author$project$Helpers$Helper$errors(rc))));
		}
	});
var $author$project$Helpers$Helper$isClosed = F2(
	function (config, z) {
		var _v0 = $author$project$Zipper$zTableau(z).ext;
		switch (_v0.$) {
			case 'Unary':
				return A3(
					$author$project$Helpers$Helper$merge2,
					$author$project$Helpers$Helper$second,
					A2($author$project$Validation$isCorrectNode, config, z),
					A2(
						$author$project$Helpers$Helper$isClosed,
						config,
						$author$project$Zipper$down(z)));
			case 'UnaryWithSubst':
				return A3(
					$author$project$Helpers$Helper$merge2,
					$author$project$Helpers$Helper$second,
					A2($author$project$Validation$isCorrectNode, config, z),
					A2(
						$author$project$Helpers$Helper$isClosed,
						config,
						$author$project$Zipper$down(z)));
			case 'Binary':
				return A4(
					$author$project$Helpers$Helper$merge3,
					F3(
						function (_v1, b, c) {
							return b && c;
						}),
					A2($author$project$Validation$isCorrectNode, config, z),
					A2(
						$author$project$Helpers$Helper$isClosed,
						config,
						$author$project$Zipper$left(z)),
					A2(
						$author$project$Helpers$Helper$isClosed,
						config,
						$author$project$Zipper$right(z)));
			case 'Open':
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$always(false),
					A2($author$project$Validation$isCorrectNode, config, z));
			default:
				var r1 = _v0.a;
				var r2 = _v0.b;
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$always(true),
					A2($author$project$Validation$isCorrectNode, config, z));
		}
	});
var $author$project$Editor$textVerdict = F2(
	function (config, t) {
		var _v0 = A2($author$project$Helpers$Helper$isClosed, config, t);
		if (_v0.$ === 'Ok') {
			if (_v0.a) {
				return 'proves';
			} else {
				return 'does not prove';
			}
		} else {
			return 'might be proving (once correct)';
		}
	});
var $author$project$Editor$verdict = F2(
	function (config, t) {
		var ass = $author$project$Helpers$Helper$assumptions(
			$author$project$Zipper$zipper(t));
		var _v0 = A2(
			$elm$core$List$partition,
			function (sf) {
				if (sf.$ === 'T') {
					return true;
				} else {
					return false;
				}
			},
			ass);
		var premises = _v0.a;
		var conclusions = _v0.b;
		return $elm$core$List$isEmpty(ass) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('verdict')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('This tableau doesn\'t prove anything.')
						]))
				])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('verdict')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('This tableau '),
							$elm$html$Html$text(
							A2(
								$author$project$Editor$textVerdict,
								config,
								$author$project$Zipper$zipper(t))),
							$elm$html$Html$text(':')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							A2(
								$elm$core$String$join,
								' , ',
								A2(
									$elm$core$List$map,
									A2($elm$core$Basics$composeR, $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula, $FMFI_UK_1_AIN_412$elm_formula$Formula$toString),
									premises))),
							$elm$html$Html$text(' ⊦ '),
							$elm$html$Html$text(
							A2(
								$elm$core$String$join,
								' , ',
								A2(
									$elm$core$List$map,
									A2($elm$core$Basics$composeR, $FMFI_UK_1_AIN_412$elm_formula$Formula$Signed$getFormula, $FMFI_UK_1_AIN_412$elm_formula$Formula$toString),
									conclusions)))
						]))
				]));
	});
var $author$project$Editor$ChangeSubst = F2(
	function (a, b) {
		return {$: 'ChangeSubst', a: a, b: b};
	});
var $author$project$Editor$Cache = {$: 'Cache'};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Attributes$size = function (n) {
	return A2(
		_VirtualDom_attribute,
		'size',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Editor$autoSizeInput = F2(
	function (val, attrs) {
		return A2(
			$elm$html$Html$input,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$type_('text'),
				A2(
					$elm$core$List$cons,
					$elm$html$Html$Attributes$class('textInput'),
					A2(
						$elm$core$List$cons,
						$elm$html$Html$Attributes$value(val),
						A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$size(
								((($elm$core$String$length(val) * 5) + 9) / 6) | 0),
							A2(
								$elm$core$List$cons,
								$elm$html$Html$Events$onBlur($author$project$Editor$Cache),
								attrs))))),
			_List_Nil);
	});
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $author$project$Helpers$Helper$hasReference = function (z) {
	return $elm$core$List$isEmpty(
		$author$project$Zipper$zNode(z).references) && ($author$project$Zipper$zNode(z).value !== '');
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$small = _VirtualDom_node('small');
var $author$project$Editor$singleNodeProblems = F2(
	function (config, z) {
		var errors = $author$project$Errors$errors(
			A2($author$project$Validation$isCorrectNode, config, z));
		return $elm$core$List$isEmpty(errors) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('nodeProblems')
				]),
			_List_Nil) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('nodeProblems')
				]),
			A2(
				$elm$core$List$map,
				function (pr) {
					return A2(
						$elm$html$Html$small,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('nodeProblemsText')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(pr.msg)
							]));
				},
				errors));
	});
var $author$project$Editor$viewClosed = function (z) {
	return A2($elm$html$Html$div, _List_Nil, _List_Nil);
};
var $author$project$Editor$Delete = function (a) {
	return {$: 'Delete', a: a};
};
var $author$project$Editor$DeleteMe = function (a) {
	return {$: 'DeleteMe', a: a};
};
var $author$project$Editor$ExpandBinary = F2(
	function (a, b) {
		return {$: 'ExpandBinary', a: a, b: b};
	});
var $author$project$Editor$ExpandUnary = F2(
	function (a, b) {
		return {$: 'ExpandUnary', a: a, b: b};
	});
var $author$project$Editor$ExpandUnaryWithSubst = F2(
	function (a, b) {
		return {$: 'ExpandUnaryWithSubst', a: a, b: b};
	});
var $author$project$Editor$MakeClosed = function (a) {
	return {$: 'MakeClosed', a: a};
};
var $author$project$Editor$MakeOpen = function (a) {
	return {$: 'MakeOpen', a: a};
};
var $author$project$Editor$SetClosed = F3(
	function (a, b, c) {
		return {$: 'SetClosed', a: a, b: b, c: c};
	});
var $author$project$Editor$SwitchBetas = function (a) {
	return {$: 'SwitchBetas', a: a};
};
var $frandibar$elm_font_awesome_5$FontAwesome$Icon$Icon = function (a) {
	return {$: 'Icon', a: a};
};
var $frandibar$elm_font_awesome_5$FontAwesome$exchangeAlt = $frandibar$elm_font_awesome_5$FontAwesome$Icon$Icon('exchange-alt');
var $frandibar$elm_font_awesome_5$FontAwesome$Solid = {$: 'Solid'};
var $frandibar$elm_font_awesome_5$FontAwesome$animationClass = function (animation) {
	if (animation.$ === 'Spin') {
		return 'fa-spin';
	} else {
		return 'fa-pulse';
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$borderClass = 'fa-border';
var $frandibar$elm_font_awesome_5$FontAwesome$invertClass = 'fa-inverse';
var $frandibar$elm_font_awesome_5$FontAwesome$pullClass = function (p) {
	if (p.$ === 'Left') {
		return 'fa-pull-left';
	} else {
		return 'fa-pull-right';
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$sizeClass = function (size) {
	switch (size.$) {
		case 'ExtraSmall':
			return 'fa-xs';
		case 'Small':
			return 'fa-sm';
		case 'Large':
			return 'fa-lg';
		default:
			var n = size.a;
			return 'fa-' + ($elm$core$String$fromInt(n) + 'x');
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$widthClass = 'fa-fw';
var $frandibar$elm_font_awesome_5$FontAwesome$className = function (opt) {
	switch (opt.$) {
		case 'Animation':
			var animation = opt.a;
			return _Utils_Tuple2(
				$frandibar$elm_font_awesome_5$FontAwesome$animationClass(animation),
				true);
		case 'HasBorder':
			return _Utils_Tuple2($frandibar$elm_font_awesome_5$FontAwesome$borderClass, true);
		case 'HasFixedWidth':
			return _Utils_Tuple2($frandibar$elm_font_awesome_5$FontAwesome$widthClass, true);
		case 'InvertColor':
			return _Utils_Tuple2($frandibar$elm_font_awesome_5$FontAwesome$invertClass, true);
		case 'Pull':
			var direction = opt.a;
			return _Utils_Tuple2(
				$frandibar$elm_font_awesome_5$FontAwesome$pullClass(direction),
				true);
		case 'Size':
			var size = opt.a;
			return _Utils_Tuple2(
				$frandibar$elm_font_awesome_5$FontAwesome$sizeClass(size),
				true);
		default:
			return _Utils_Tuple2('', false);
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$iconClass = function (iconOrLogo) {
	var root = function () {
		if (iconOrLogo.$ === 'Icon') {
			var name = iconOrLogo.a;
			return name;
		} else {
			var name = iconOrLogo.a;
			return name;
		}
	}();
	return 'fa-' + root;
};
var $frandibar$elm_font_awesome_5$FontAwesome$styleClass = F2(
	function (iconOrLogo, style) {
		if (iconOrLogo.$ === 'Logo') {
			return 'fab';
		} else {
			switch (style.$) {
				case 'Solid':
					return 'fas';
				case 'Regular':
					return 'far';
				default:
					return 'fal';
			}
		}
	});
var $frandibar$elm_font_awesome_5$FontAwesome$classes = F3(
	function (iconUnstyled, style, options) {
		return $elm$html$Html$Attributes$classList(
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					A2($frandibar$elm_font_awesome_5$FontAwesome$styleClass, iconUnstyled, style),
					true),
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						$frandibar$elm_font_awesome_5$FontAwesome$iconClass(iconUnstyled),
						true),
					A2($elm$core$List$map, $frandibar$elm_font_awesome_5$FontAwesome$className, options))));
	});
var $frandibar$elm_font_awesome_5$FontAwesome$Utils$onlyOne = F3(
	function (f, curr, _v0) {
		var found = _v0.a;
		var list = _v0.b;
		var _v1 = _Utils_Tuple2(
			f(curr),
			found);
		if (_v1.a) {
			if (!_v1.b) {
				return _Utils_Tuple2(
					true,
					A2($elm$core$List$cons, curr, list));
			} else {
				return _Utils_Tuple2(found, list);
			}
		} else {
			return _Utils_Tuple2(
				found,
				A2($elm$core$List$cons, curr, list));
		}
	});
var $frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup = F2(
	function (f, list) {
		return A3(
			$elm$core$List$foldr,
			$frandibar$elm_font_awesome_5$FontAwesome$Utils$onlyOne(f),
			_Utils_Tuple2(false, _List_Nil),
			list).b;
	});
var $frandibar$elm_font_awesome_5$FontAwesome$isAnimation = function (option) {
	if (option.$ === 'Animation') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isBorder = function (option) {
	if (option.$ === 'HasBorder') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isHtmlTag = function (option) {
	if (option.$ === 'HtmlTag') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isInvertColor = function (option) {
	if (option.$ === 'InvertColor') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isMask = function (option) {
	if (option.$ === 'Mask') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isPull = function (option) {
	if (option.$ === 'Pull') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isSize = function (option) {
	if (option.$ === 'Size') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isTransform = function (option) {
	if (option.$ === 'Transform') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$isWidth = function (option) {
	if (option.$ === 'HasFixedWidth') {
		return true;
	} else {
		return false;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$filterAttrs = function (options) {
	return A2(
		$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
		$frandibar$elm_font_awesome_5$FontAwesome$isWidth,
		A2(
			$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
			$frandibar$elm_font_awesome_5$FontAwesome$isTransform,
			A2(
				$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
				$frandibar$elm_font_awesome_5$FontAwesome$isSize,
				A2(
					$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
					$frandibar$elm_font_awesome_5$FontAwesome$isPull,
					A2(
						$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
						$frandibar$elm_font_awesome_5$FontAwesome$isMask,
						A2(
							$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
							$frandibar$elm_font_awesome_5$FontAwesome$isInvertColor,
							A2(
								$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
								$frandibar$elm_font_awesome_5$FontAwesome$isHtmlTag,
								A2(
									$frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup,
									$frandibar$elm_font_awesome_5$FontAwesome$isBorder,
									A2($frandibar$elm_font_awesome_5$FontAwesome$Utils$dedup, $frandibar$elm_font_awesome_5$FontAwesome$isAnimation, options)))))))));
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $frandibar$elm_font_awesome_5$FontAwesome$mask = F2(
	function (opt, opts) {
		if (opt.$ === 'Mask') {
			var maskIcon = opt.a;
			var style = opt.b;
			var val = A2($frandibar$elm_font_awesome_5$FontAwesome$styleClass, maskIcon, style) + (' ' + $frandibar$elm_font_awesome_5$FontAwesome$iconClass(maskIcon));
			return A2(
				$elm$core$List$cons,
				A2($elm$html$Html$Attributes$attribute, 'data-fa-mask', val),
				opts);
		} else {
			return opts;
		}
	});
var $frandibar$elm_font_awesome_5$FontAwesome$maskAttr = function (options) {
	return A3($elm$core$List$foldr, $frandibar$elm_font_awesome_5$FontAwesome$mask, _List_Nil, options);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $frandibar$elm_font_awesome_5$FontAwesome$transformVal = function (transformValue) {
	switch (transformValue.$) {
		case 'Grow':
			var n = transformValue.a;
			return 'grow-' + $elm$core$String$fromFloat(n);
		case 'Shrink':
			var n = transformValue.a;
			return 'shrink-' + $elm$core$String$fromFloat(n);
		case 'ShiftDown':
			var n = transformValue.a;
			return 'down-' + $elm$core$String$fromFloat(n);
		case 'ShiftLeft':
			var n = transformValue.a;
			return 'left-' + $elm$core$String$fromFloat(n);
		case 'ShiftRight':
			var n = transformValue.a;
			return 'right-' + $elm$core$String$fromFloat(n);
		case 'ShiftUp':
			var n = transformValue.a;
			return 'up-' + $elm$core$String$fromFloat(n);
		case 'Rotate':
			var n = transformValue.a;
			return 'rotate-' + $elm$core$String$fromFloat(n);
		case 'FlipHorizontal':
			return 'flip-h';
		default:
			return 'flip-v';
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$transform = F2(
	function (opt, opts) {
		if (opt.$ === 'Transform') {
			var transforms = opt.a;
			var val = A2(
				$elm$core$String$join,
				' ',
				A2($elm$core$List$map, $frandibar$elm_font_awesome_5$FontAwesome$transformVal, transforms));
			return A2(
				$elm$core$List$cons,
				A2($elm$html$Html$Attributes$attribute, 'data-fa-transform', val),
				opts);
		} else {
			return opts;
		}
	});
var $frandibar$elm_font_awesome_5$FontAwesome$transformAttr = function (options) {
	return A3($elm$core$List$foldr, $frandibar$elm_font_awesome_5$FontAwesome$transform, _List_Nil, options);
};
var $frandibar$elm_font_awesome_5$FontAwesome$htmlAttrs = F2(
	function (options, htmlAttributes) {
		return _Utils_ap(
			$frandibar$elm_font_awesome_5$FontAwesome$transformAttr(options),
			_Utils_ap(
				$frandibar$elm_font_awesome_5$FontAwesome$maskAttr(options),
				htmlAttributes));
	});
var $frandibar$elm_font_awesome_5$FontAwesome$I = {$: 'I'};
var $frandibar$elm_font_awesome_5$FontAwesome$findTag = F2(
	function (option, previousTag) {
		if (option.$ === 'HtmlTag') {
			var newTag = option.a;
			return newTag;
		} else {
			return previousTag;
		}
	});
var $elm$html$Html$i = _VirtualDom_node('i');
var $frandibar$elm_font_awesome_5$FontAwesome$htmlTag = function (opts) {
	var foundTag = A3($elm$core$List$foldl, $frandibar$elm_font_awesome_5$FontAwesome$findTag, $frandibar$elm_font_awesome_5$FontAwesome$I, opts);
	if (foundTag.$ === 'I') {
		return $elm$html$Html$i;
	} else {
		return $elm$html$Html$span;
	}
};
var $frandibar$elm_font_awesome_5$FontAwesome$iconWithOptions = F4(
	function (iconName, style, options, htmlAttributes) {
		var opts = $frandibar$elm_font_awesome_5$FontAwesome$filterAttrs(options);
		return A3(
			$frandibar$elm_font_awesome_5$FontAwesome$htmlTag,
			opts,
			A2(
				$elm$core$List$cons,
				A3($frandibar$elm_font_awesome_5$FontAwesome$classes, iconName, style, opts),
				A2($frandibar$elm_font_awesome_5$FontAwesome$htmlAttrs, opts, htmlAttributes)),
			_List_Nil);
	});
var $frandibar$elm_font_awesome_5$FontAwesome$icon = function (iconName) {
	return A4($frandibar$elm_font_awesome_5$FontAwesome$iconWithOptions, iconName, $frandibar$elm_font_awesome_5$FontAwesome$Solid, _List_Nil, _List_Nil);
};
var $author$project$Editor$problemsClass = function (pl) {
	if (!pl.b) {
		return '';
	} else {
		var p = pl.a;
		return $author$project$Editor$problemClass(p);
	}
};
var $author$project$Editor$ruleMenu = F8(
	function (unaryMsg, unaryWithSubstMsg, binaryMsg, label, labelPrefix, cls, config, z) {
		var item = F2(
			function (ruleTypeStr, msg) {
				return A2(
					$elm$core$Set$member,
					ruleTypeStr,
					$author$project$Config$getRuleSet(config)) ? $elm$core$Maybe$Just(
					A2($author$project$Editor$menuItem, msg, labelPrefix + (' ' + ruleTypeStr))) : $elm$core$Maybe$Nothing;
			});
		var unaryItem = function (extType) {
			return A2(
				item,
				$author$project$Tableau$unaryExtTypeToString(extType),
				A2(unaryMsg, extType, z));
		};
		var unaryWithSubstItem = function (extType) {
			return A2(
				item,
				$author$project$Tableau$unaryWithSubstExtTypeToString(extType),
				A2(unaryWithSubstMsg, extType, z));
		};
		var binaryItem = function (extType) {
			return A2(
				item,
				$author$project$Tableau$binaryExtTypeToString(extType),
				A2(binaryMsg, extType, z));
		};
		return A3(
			$author$project$Editor$menu,
			cls,
			label,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					unaryItem,
					_List_fromArray(
						[$author$project$Tableau$Alpha])),
				_Utils_ap(
					A2(
						$elm$core$List$filterMap,
						binaryItem,
						_List_fromArray(
							[$author$project$Tableau$Beta])),
					_Utils_ap(
						A2(
							$elm$core$List$filterMap,
							unaryWithSubstItem,
							_List_fromArray(
								[$author$project$Tableau$Gamma, $author$project$Tableau$Delta, $author$project$Tableau$GammaStar, $author$project$Tableau$DeltaStar])),
						_Utils_ap(
							A2(
								$elm$core$List$filterMap,
								unaryItem,
								_List_fromArray(
									[$author$project$Tableau$Refl, $author$project$Tableau$Leibnitz, $author$project$Tableau$MP, $author$project$Tableau$MT, $author$project$Tableau$HS, $author$project$Tableau$DS, $author$project$Tableau$NCS, $author$project$Tableau$ESFF, $author$project$Tableau$ESFT, $author$project$Tableau$ESTF, $author$project$Tableau$ESTT])),
							A2(
								$elm$core$List$filterMap,
								binaryItem,
								_List_fromArray(
									[$author$project$Tableau$Cut, $author$project$Tableau$ECDF, $author$project$Tableau$ECDT])))))));
	});
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Validation$validateRef = F3(
	function (str, r, z) {
		var _v0 = r.up;
		if (_v0.$ === 'Nothing') {
			return A2($author$project$Validation$Common$syntaxProblem, z, str);
		} else {
			return _List_Nil;
		}
	});
var $author$project$Editor$viewControls = F2(
	function (config, z) {
		var t = z.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('expandControls')
				]),
			function () {
				var _v0 = t.ext;
				if (_v0.$ === 'Closed') {
					var r1 = _v0.a;
					var r2 = _v0.b;
					var compl = $author$project$Errors$errors(
						A3($author$project$Validation$areCloseRefsComplementary, r1, r2, z));
					var ref1Cls = $author$project$Editor$problemsClass(
						_Utils_ap(
							A3($author$project$Validation$validateRef, 'Invalid close ref. #1', r1, z),
							compl));
					var ref2Cls = $author$project$Editor$problemsClass(
						_Utils_ap(
							A3($author$project$Validation$validateRef, 'Invalid close ref. #2', r2, z),
							compl));
					return _List_fromArray(
						[
							$elm$html$Html$text('* '),
							A2(
							$author$project$Editor$autoSizeInput,
							r1.str,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('closed ' + ref1Cls),
									$elm$html$Html$Attributes$placeholder('Ref'),
									$elm$html$Html$Events$onInput(
									A2($author$project$Editor$SetClosed, 0, z))
								])),
							$elm$html$Html$text('\u00A0'),
							A2(
							$author$project$Editor$autoSizeInput,
							r2.str,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('closed ' + ref2Cls),
									$elm$html$Html$Attributes$placeholder('Ref'),
									$elm$html$Html$Events$onInput(
									A2($author$project$Editor$SetClosed, 1, z))
								])),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('button'),
									$elm$html$Html$Events$onClick(
									$author$project$Editor$MakeOpen(z))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Open')
								]))
						]);
				} else {
					var switchBetasButton = function () {
						var _v6 = t.ext;
						if (_v6.$ === 'Binary') {
							return A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button'),
										$elm$html$Html$Events$onClick(
										$author$project$Editor$SwitchBetas(z)),
										$elm$html$Html$Attributes$title('Swap branches')
									]),
								_List_fromArray(
									[
										$frandibar$elm_font_awesome_5$FontAwesome$icon($frandibar$elm_font_awesome_5$FontAwesome$exchangeAlt)
									]));
						} else {
							return A2($elm$html$Html$div, _List_Nil, _List_Nil);
						}
					}();
					var deleteMeButton = function () {
						if (!_Utils_eq(
							$author$project$Zipper$up(z),
							z)) {
							var _v1 = $author$project$Zipper$zTableau(
								$author$project$Zipper$up(z)).ext;
							if (_v1.$ === 'Binary') {
								var _v2 = t.node.value;
								if (_v2 === '') {
									var _v3 = t.ext;
									if (_v3.$ === 'Open') {
										return A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick(
													$author$project$Editor$DeleteMe(z))
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Delete node')
												]));
									} else {
										return A2($elm$html$Html$div, _List_Nil, _List_Nil);
									}
								} else {
									return A2($elm$html$Html$div, _List_Nil, _List_Nil);
								}
							} else {
								return A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Editor$DeleteMe(z))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Delete node')
										]));
							}
						} else {
							var _v4 = t.ext;
							_v4$2:
							while (true) {
								switch (_v4.$) {
									case 'Unary':
										if (_v4.a.$ === 'Alpha') {
											var _v5 = _v4.a;
											return A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Events$onClick(
														$author$project$Editor$DeleteMe(z))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Delete node')
													]));
										} else {
											break _v4$2;
										}
									case 'Open':
										return A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick(
													$author$project$Editor$DeleteMe(z))
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Delete node')
												]));
									default:
										break _v4$2;
								}
							}
							return A2($elm$html$Html$div, _List_Nil, _List_Nil);
						}
					}();
					return t.node.gui.controlsShown ? _List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('button'),
									$elm$html$Html$Events$onClick(
									A2($author$project$Editor$ExpandUnary, $author$project$Tableau$Alpha, z))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Add α')
								])),
							A8(
							$author$project$Editor$ruleMenu,
							$author$project$Editor$ExpandUnary,
							$author$project$Editor$ExpandUnaryWithSubst,
							$author$project$Editor$ExpandBinary,
							$elm$html$Html$text('Add'),
							'Add',
							'add',
							config,
							z),
							A3(
							$author$project$Editor$menu,
							'del',
							$elm$html$Html$text('Delete'),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[deleteMeButton])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick(
													$author$project$Editor$Delete(z))
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Delete subtree')
												]))
										]))
								])),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('button'),
									$elm$html$Html$Events$onClick(
									$author$project$Editor$MakeClosed(z))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Close')
								])),
							switchBetasButton
						]) : _List_Nil;
				}
			}());
	});
var $author$project$Editor$ChangeRef = F2(
	function (a, b) {
		return {$: 'ChangeRef', a: a, b: b};
	});
var $author$project$Editor$ChangeText = F2(
	function (a, b) {
		return {$: 'ChangeText', a: a, b: b};
	});
var $author$project$Editor$ChangeToBinary = F2(
	function (a, b) {
		return {$: 'ChangeToBinary', a: a, b: b};
	});
var $author$project$Editor$ChangeToUnary = F2(
	function (a, b) {
		return {$: 'ChangeToUnary', a: a, b: b};
	});
var $author$project$Editor$ChangeToUnaryWithSubst = F2(
	function (a, b) {
		return {$: 'ChangeToUnaryWithSubst', a: a, b: b};
	});
var $author$project$Editor$errorsClass = A2($elm$core$Basics$composeR, $author$project$Errors$errors, $author$project$Editor$problemsClass);
var $author$project$Validation$isCorrectFormula = F2(
	function (config, z) {
		return A2(
			$elm$core$Result$andThen,
			$author$project$Validation$isCorrectRule(config),
			$author$project$Validation$isValidFormula(z));
	});
var $author$project$Helpers$Helper$isPremise = function (z) {
	var _v0 = $author$project$Zipper$zTableau(
		$author$project$Zipper$up(z)).ext;
	if ((_v0.$ === 'Unary') && (_v0.a.$ === 'Alpha')) {
		var _v1 = _v0.a;
		return !$elm$core$List$length(
			$author$project$Zipper$zNode(z).references);
	} else {
		return _Utils_eq(
			$author$project$Zipper$up(z),
			z);
	}
};
var $author$project$Tableau$refsToString = function (lst) {
	return A2(
		$elm$core$String$join,
		',',
		A2(
			$elm$core$List$map,
			function (r) {
				return r.str;
			},
			lst));
};
var $author$project$Validation$validateNodeRef = function (z) {
	var _v0 = $elm$core$List$length(
		$author$project$Zipper$zNode(z).references);
	switch (_v0) {
		case 0:
			return _List_Nil;
		case 1:
			return A3(
				$author$project$Validation$validateRef,
				'Invalid reference',
				$author$project$Zipper$zFirstRef(z),
				z);
		case 2:
			return _Utils_ap(
				A3(
					$author$project$Validation$validateRef,
					'Invalid first reference',
					$author$project$Zipper$zFirstRef(z),
					z),
				A3(
					$author$project$Validation$validateRef,
					'Invalid second reference',
					$author$project$Zipper$zSecondRef(z),
					z));
		default:
			return A2($author$project$Validation$Common$syntaxProblem, z, 'There are too many references.');
	}
};
var $author$project$Editor$ChangeButtonsAppearance = function (a) {
	return {$: 'ChangeButtonsAppearance', a: a};
};
var $frandibar$elm_font_awesome_5$FontAwesome$ellipsisHorizontal = $frandibar$elm_font_awesome_5$FontAwesome$Icon$Icon('ellipsis-h');
var $author$project$Editor$viewButtonsAppearanceControlls = function (z) {
	var _v0 = $author$project$Zipper$zTableau(z).ext;
	if (_v0.$ === 'Closed') {
		return A2($elm$html$Html$div, _List_Nil, _List_Nil);
	} else {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('button'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'active',
							$author$project$Zipper$zTableau(z).node.gui.controlsShown)
						])),
					$elm$html$Html$Events$onClick(
					$author$project$Editor$ChangeButtonsAppearance(z)),
					$elm$html$Html$Attributes$title('Toggle node tools')
				]),
			_List_fromArray(
				[
					$frandibar$elm_font_awesome_5$FontAwesome$icon($frandibar$elm_font_awesome_5$FontAwesome$ellipsisHorizontal)
				]));
	}
};
var $elm$html$Html$var = _VirtualDom_node('var');
var $author$project$Editor$viewRuleType = function (z) {
	if ($author$project$Helpers$Helper$isPremise(z)) {
		return A2(
			$elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$var,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('S')
						])),
					A2(
					$elm$html$Html$sup,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('+')
						]))
				]));
	} else {
		var _v0 = $author$project$Zipper$zTableau(
			$author$project$Zipper$up(z)).ext;
		switch (_v0.$) {
			case 'Open':
				return $elm$html$Html$text('O');
			case 'Closed':
				return $elm$html$Html$text('C');
			case 'Unary':
				var extType = _v0.a;
				return $elm$html$Html$text(
					$author$project$Tableau$unaryExtTypeToString(extType));
			case 'Binary':
				var extType = _v0.a;
				return $elm$html$Html$text(
					$author$project$Tableau$binaryExtTypeToString(extType));
			default:
				var extType = _v0.a;
				return $elm$html$Html$text(
					$author$project$Tableau$unaryWithSubstExtTypeToString(extType));
		}
	}
};
var $author$project$Editor$viewNodeInputs = F3(
	function (additional, config, z) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('inputGroup')
				]),
			A2(
				$elm$core$List$cons,
				$elm$html$Html$text(
					'(' + ($elm$core$String$fromInt(
						$author$project$Zipper$zNode(z).id) + ')')),
				A2(
					$elm$core$List$cons,
					A2(
						$author$project$Editor$autoSizeInput,
						$author$project$Zipper$zNode(z).value,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('textInputFormula', true),
										_Utils_Tuple2(
										'premise',
										$author$project$Helpers$Helper$isPremise(z))
									])),
								$elm$html$Html$Attributes$class(
								$author$project$Editor$errorsClass(
									A2($author$project$Validation$isCorrectFormula, config, z))),
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Events$onInput(
								$author$project$Editor$ChangeText(z))
							])),
					A2(
						$elm$core$List$cons,
						A8(
							$author$project$Editor$ruleMenu,
							$author$project$Editor$ChangeToUnary,
							$author$project$Editor$ChangeToUnaryWithSubst,
							$author$project$Editor$ChangeToBinary,
							$author$project$Editor$viewRuleType(z),
							'Change to',
							'change',
							config,
							z),
						A2(
							$elm$core$List$cons,
							$elm$html$Html$text('['),
							A2(
								$elm$core$List$cons,
								A2(
									$author$project$Editor$autoSizeInput,
									$author$project$Tableau$refsToString(
										$author$project$Zipper$zNode(z).references),
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('textInputReference'),
											$elm$html$Html$Events$onInput(
											$author$project$Editor$ChangeRef(z)),
											$elm$html$Html$Attributes$class(
											$author$project$Editor$problemsClass(
												$author$project$Validation$validateNodeRef(z)))
										])),
								A2(
									$elm$core$List$cons,
									$elm$html$Html$text(']'),
									additional(
										_List_fromArray(
											[
												$author$project$Editor$viewButtonsAppearanceControlls(z)
											])))))))));
	});
var $author$project$Editor$viewOpen = function (z) {
	return A2($elm$html$Html$div, _List_Nil, _List_Nil);
};
var $author$project$Editor$viewBinary = F2(
	function (config, z) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('beta')
				]),
			_List_fromArray(
				[
					A2(
					$author$project$Editor$viewNode,
					config,
					$author$project$Zipper$left(z)),
					A2(
					$author$project$Editor$viewNode,
					config,
					$author$project$Zipper$right(z))
				]));
	});
var $author$project$Editor$viewChildren = F2(
	function (config, z) {
		var _v0 = $author$project$Zipper$zTableau(z).ext;
		switch (_v0.$) {
			case 'Open':
				return $author$project$Editor$viewOpen(z);
			case 'Closed':
				var r1 = _v0.a;
				var r2 = _v0.b;
				return $author$project$Editor$viewClosed(z);
			case 'Unary':
				return A2($author$project$Editor$viewUnary, config, z);
			case 'UnaryWithSubst':
				return A2($author$project$Editor$viewUnaryWithSubst, config, z);
			default:
				return A2($author$project$Editor$viewBinary, config, z);
		}
	});
var $author$project$Editor$viewNode = F2(
	function (config, z) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('formula')
				]),
			_List_fromArray(
				[
					A3($author$project$Editor$viewNodeInputs, $elm$core$Basics$identity, config, z),
					A2($author$project$Editor$singleNodeProblems, config, z),
					A2($author$project$Editor$viewControls, config, z),
					A2($author$project$Editor$viewChildren, config, z)
				]));
	});
var $author$project$Editor$viewSubsNode = F2(
	function (config, z) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('formula')
				]),
			_List_fromArray(
				[
					A3(
					$author$project$Editor$viewNodeInputs,
					function (rest) {
						return A2(
							$elm$core$List$cons,
							$elm$html$Html$text('{'),
							A2(
								$elm$core$List$cons,
								A2(
									$author$project$Editor$autoSizeInput,
									A2(
										$elm$core$Maybe$withDefault,
										'',
										A2(
											$elm$core$Maybe$map,
											function ($) {
												return $.str;
											},
											$author$project$Zipper$zSubstitution(
												$author$project$Zipper$up(z)))),
									_List_fromArray(
										[
											$elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('textInput textInputSubst', true),
													_Utils_Tuple2(
													'semanticsProblem',
													$author$project$Helpers$Helper$hasReference(z))
												])),
											$elm$html$Html$Events$onInput(
											$author$project$Editor$ChangeSubst(z)),
											$elm$html$Html$Attributes$placeholder('a↦b,..')
										])),
								A2(
									$elm$core$List$cons,
									$elm$html$Html$text('}'),
									rest)));
					},
					config,
					z),
					A2($author$project$Editor$singleNodeProblems, config, z),
					A2($author$project$Editor$viewControls, config, z),
					A2($author$project$Editor$viewChildren, config, z)
				]));
	});
var $author$project$Editor$viewUnary = F2(
	function (config, z) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('alpha')
				]),
			_List_fromArray(
				[
					A2(
					$author$project$Editor$viewNode,
					config,
					$author$project$Zipper$down(z))
				]));
	});
var $author$project$Editor$viewUnaryWithSubst = F2(
	function (config, z) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('alpha'),
					$elm$html$Html$Attributes$class('withSubstitution')
				]),
			_List_fromArray(
				[
					A2(
					$author$project$Editor$viewSubsNode,
					config,
					$author$project$Zipper$down(z))
				]));
	});
var $author$project$Editor$view = function (model) {
	var present = model.present;
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tableau')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('actions')
							]),
						_List_fromArray(
							[
								$author$project$Editor$configMenu(present.config),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button'),
										$elm$html$Html$Events$onClick($author$project$Editor$Prettify)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Prettify formulas')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button'),
										$elm$html$Html$Events$onClick($author$project$Editor$Print)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Print')
									])),
								$author$project$Editor$jsonExportControl(present.tableau),
								$author$project$Editor$jsonImportControl(present.jsonImport),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button'),
										$elm$html$Html$Events$onClick($author$project$Editor$Undo)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Undo')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button'),
										$elm$html$Html$Events$onClick($author$project$Editor$Redo)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Redo')
									]))
							])),
						$author$project$Editor$jsonImportError(present.jsonImport),
						A2(
						$author$project$Editor$viewNode,
						present.config,
						$author$project$Zipper$zipper(present.tableau)),
						A2($author$project$Editor$verdict, present.config, present.tableau),
						A2($author$project$Editor$problems, present.config, present.tableau),
						$author$project$Helpers$Rules$help(present.config)
					]))
			]),
		title: 'Tableau Editor'
	};
};
var $author$project$Editor$main = $elm$browser$Browser$document(
	{init: $author$project$Editor$init, subscriptions: $author$project$Editor$subscriptions, update: $author$project$Editor$update, view: $author$project$Editor$view});
_Platform_export({'Editor':{'init':$author$project$Editor$main(
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
			])))(0)}});}(this));