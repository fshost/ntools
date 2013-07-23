var jsType = require('jstype');
var isArguments = jsType.isArguments;

var array = require(__dirname + '/array');

/**
 * Extend one object with another object's properties. Extend is deep by
 * default and works with circular references.
 * @param {Object} target The target object to be extended.
 * @param {Object} source The source object to extend the target with.
 * @param {Boolean} shallowWhether to extend using deep recursion.
 * @param {Boolean} [extendTarget] Whether to extend the target object directly.
 * @returns {Object} The target object extended with the source object.
 */

function extend(target, source, shallow, extendTarget) {

    var o, key;
    if (extendTarget) o = target || {};
    else o = target ? clone(target, true) : {};
    if (!source) return o;
    var targetObjectType, sourceObjectType;
    // faster to have separate loop for shallow extends
    if (shallow) {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                o[key] = source[key];
            } else break;
        }
        return o;
    }
    for (key in source) {
        if (source.hasOwnProperty(key)) {
            if (Array.isArray(target[key]) && Array.isArray(source[key])) {
                o[key] = array.extend(o[key], source[key]);
            } else if (typeof target[key] === 'object' && typeof source[key] === 'object') {
                o[key] = extend(o[key], source[key]);
            } else {
                o[key] = source[key];
            }
        } else break;
    }
    return o;
}
exports.extend = extend;


/**
 * Clone an object.
 * @param {Object} source The source object to clone.
 * @param {Boolean} [shallow=true] Whether to clone using deep recursion.
 * @returns {Object} A clone of the source object.
 */

function clone(source, shallow) {
    if (typeof source !== 'object')
        throw new TypeError('ntools.objects.clone: arguments > source: \n"' + source + '"\n is not of type [object]');
    if (Array.isArray(source)) return array.clone(source, shallow);
    var target = {};
    if (shallow) return extend(target, source, true, true);
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (Array.isArray(source[key])) {
                target[key] = array.clone(source[key]);
            } else if (typeof source[key] === 'object') {
                target[key] = clone(source[key]);
            } else {
                target[key] = source[key];
            }
        } else break;
    }
    return target;
}
exports.clone = clone;


/**
 * determine whether one object matches another object
 * a match is determined by having the same number of owned properties, the same
 * set of keys (although not necessarily the same order), equal values for
 * every corresponding key, and an identical 'prototype' property.
 * @param target a javascript object to compare to.
 * @param source a javascript object to compare with.
 * @returns {Boolean} Whether target and source match (deepEqual) each other
 */
function matches(target, source) {
    if (target === source) {
        return true;
    } else if (target instanceof Date && source instanceof Date) {
        return target.getTime() === source.getTime();
    } else if (target instanceof RegExp && source instanceof RegExp) {
        return target.source === source.source &&
            target.global === source.global &&
            target.multiline === source.multiline &&
            target.lastIndex === source.lastIndex &&
            target.ignoreCase === source.ignoreCase;
    } else if (typeof target != 'object' && typeof source != 'object') {
        return target == source;
    } else {
        var ka, kb, key;
        var a = target;
        var b = source;
        if (isArguments(target))
            a = Array.prototype.slice.call(a);
        if (isArguments(b))
            b = Array.prototype.slice.call(b);
        try {
            ka = Object.keys(a);
            kb = Object.keys(b);
        } catch (e) {
            return false;
        }
        if (ka.length != kb.length)
            return false;
        ka.sort();
        kb.sort();
        for (i = ka.length - 1; i >= 0; i--) {
            if (ka[i] != kb[i]) return false;
        }
        for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];
            if (!matches(a[key], b[key])) return false;
        }
        return true;
    }
}
exports.matches = matches;