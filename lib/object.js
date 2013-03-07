/// <reference path="../../nodelib/node.js" />
var h = require('helpers')(__dirname, exports);
var array = h.sub('array');

/***
 * deep extend, works with circular references and can extend any javascript
 * object, while being faster than other deep extend methods.  The code below
 * is tuned for speed first, elegance second.  It is not code golf.
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
    var targetObjectType, sourceObjectType;
    // faster to have separate loop for shallow extends
    if (shallow) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                o[key] = source[key];
            }
            else break;
        }
        return o;
    }
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (Array.isArray(target[key]) && Array.isArray(source[key])) {
                o[key] = array.extend(o[key], source[key]);
            }
            else if (typeof target[key] === 'object' && typeof source[key] === 'object') {
                o[key] = extend(o[key], source[key]);
            }
            else {
                o[key] = source[key];
            }
        }
        else break;
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
    if (Array.isArray(source)) return array.clone(source, shallow);
    var target = {};
    if (shallow) return extend(target, source, true, true);
    for (var key in source) {
        if (source.hasOwnProperty(key)) {     
            if (Array.isArray(source[key])) {
                target[key] = array.clone(source[key]);
            }
            else if (typeof source[key] === 'object') {
                target[key] = clone(source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
        else break;
    }
    return target;
}
exports.clone = clone;