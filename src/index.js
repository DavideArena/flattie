function iter(output, val, options) {

	const {
		nullish,
		sep,
		key,
		transformKey,
	} = options || {};

	var k, pfx = key ? (key + sep) : key;

	if (val == null) {
		if (nullish) output[key] = val;
	} else if (typeof val != 'object') {
		output[key] = val;
	} else if (Array.isArray(val)) {
		for (k = 0; k < val.length; k++) {
			iter(output, val[k], { nullish, sep, key: pfx + k, transformKey });
		}
	} else {
		for (k in val) {
			iter(output, val[k], { nullish, sep, key: pfx + (transformKey ? transformKey(pfx, k) : k), transformKey });
		}
	}
}
export function flattie(input, glue, toNull, options = {}) {
	var output = {};

	if (options && options.transformKey && typeof options.transformKey !== 'function') {
		throw new Error('value of options.transformKey must be a function returning a string');
	}

	if (typeof input == 'object') {
		iter(output, input, {
			nullish: !!toNull,
			sep: (glue || ( glue == "" && options.allowGlueEmptyString )) ? glue : '.',
			key: '',
			transformKey: options.transformKey,
		});
	}
	return output;
}

