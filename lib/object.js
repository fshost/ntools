/// <reference path="../../nodelib/node.js" />

/***
 * deep extend, works with circular references and can extend any javascript
 * object, while being faster than other deep extend methods:
 * http://jsperf.com/comparing-custom-deep-extend-to-jquery-deep-extend/2
 */
function extend(target, source, shallow, extendTarget) {
    /// <summary>Extend one object with another object's properties.</summary>
    /// <param name="target" type="Object">The target object to be extended.</param>
    /// <param name="source" type="Object">The source object to extend the target with.</param>
    /// <param name="shallow" type="Boolean" optional="true">Whether to extend using deep recursion.</param>
    /// <param name="extendTarget" type="Boolean" optional="true">Whether to extend the target object directly.</param>
    /// <returns type="Object">The target object extended with the source object.</returns>
    var o;
    if (extendTarget) o = target || {};
    else o = target ? clone(target, true) : {};
    if (!source) return o;
    var targetMeta, sourceMeta,
        array = '[object Array]',
        object = '[object Object]',
        setMeta = function (value) {
            var jclass;
            if (value === undefined) return 0;
            if (typeof value !== 'object') return false;
            jClass = {}.toString.call(value);
            if (jclass === array) return 1;
            if (jclass === object) return 2;
        };
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            targetMeta = setMeta(target[key]),
            sourceMeta = setMeta(source[key])
            if (source[key] !== target[key]) {
                if (!shallow && sourceMeta && targetMeta && targetMeta === sourceMeta) {
                    o[key] = extend(target[key], source[key], shallow);
                } else if (sourceMeta !== 0) {
                    o[key] = source[key];
                }
            }
        }
        else break; // ownProperties are always first
    }
    return o;
}
exports.extend = extend;

// clone an object or array
function clone(source, shallow) {
    /// <summary>Clone an object.</summary>
    /// <param name="source" type="Object">The source object to clone.</param>
    /// <param name="shallow" type="Boolean" optional="true">Whether to clone using deep recursion (default is true).</param>
    /// <returns type="Object">A clone of the source object.</returns>
    if (typeof source !== 'object')
        throw new TypeError('ntools.objects.clone: arguments > source: \n"' + source + '"\n is not of type [object]');
    if (shallow) {
        if (isArray(source)) return source.slice();
        var target = {};
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    }
    return extend({}, source);
}
exports.clone = clone;