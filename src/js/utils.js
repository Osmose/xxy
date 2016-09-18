import hash from 'object-hash';

/**
 * Generates the return value for the wrapper property on first access
 * and caches it on the object. All future calls return the cached value
 * instead of re-calculating it.
 */
export function cachedProperty(target, key, descriptor) {
  const getter = descriptor.get;
  const cachedKey = Symbol(`${key}_cached`);

  descriptor.get = function get() {
    if (this[cachedKey] === undefined) {
      Object.defineProperty(this, cachedKey, {
        value: this::getter(),
        writable: false,
        enumerable: false,
      });
    }
    return this[cachedKey];
  };

  return descriptor;
}

export function memoize(target, key, descriptor) {
  const func = descriptor.value;
  const lookupTable = {};
  descriptor.value = function wrapped(...args) {
    const lookupKey = hash(args);
    if (!(lookupKey in lookupTable)) {
      lookupTable[lookupKey] = func.apply(this, args);
    }

    return lookupTable[lookupKey];
  };

  return descriptor;
}

export function readStringFromView(view, offset, length) {
  let value = '';
  for (let k = 0; k < length; k++) {
    value += String.fromCharCode(view.getUint8(offset + k));
  }
  return value;
}
