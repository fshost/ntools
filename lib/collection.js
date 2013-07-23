/* 
    collection: a subclassed Array object class
*/
var lodash = require('lodash');
var methods = [
    'rest',
    'difference',
    'initial',
    'findIndex',
    'first',
    'flatten',
    'intersection',
    'last',
    'object',
    'range',
    'union',
    'unique',
    'without',
    'some',
    'any',
    'contains',
    'each',
    'find',
    'groupBy',
    'include',
    'inject',
    'invoke',
    'max',
    'min',
    'pluck',
    'reject',
    'shuffle',
    'sortBy',
    'toArray',
    'where'
];


function Collection() {
    var arr = [];
    arr.push.apply(arr, arguments);
    arr.__proto__ = Collection.prototype;
    for (var i = 0; i < arr.length; i++)
        if (Array.isArray(arr[i]) && (!(arr[i] instanceof Collection)))
            arr[i] = Collection.apply(null, arr[i]);
    return arr;
}
Collection.prototype.__proto__ = Array.prototype;
methods.forEach(function (method) {
    Collection.prototype[method] = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this);
        return lodash.method.apply(lodash, args);
    };
});
var proto = {

    // returns true if [value] is in the array
    has: function(value) {
        return this.indexOf(value) > -1;
    },

    // returns first property in obj that matches an element in the array
    matchKey: function(obj) {
        var i, l = this.length;
        if (obj.isObject)
            return undefined;
        for (i = 0; i < l; i++)
            if (obj[this[i]].isDefined)
                return obj[this[i]];
        return false;
    },

    // returns true the start of [str] matches an element in the array
    elementStarts: function(str, unconverted) {
        // if uncoverted is true, will not convert element to string prior to match test
        var i,
            l = this.length,
            currentStr,
            strLength;
        for (i = 0; i < l; i++) {
            currentStr = (unconverted) ? this[i] : this[i].toString();
            strLength = currentStr.length;
            if (str.substr(0, strLength).toLowerCase() === currentStr)
                return true;
        }
        return false;
    },

    // determine if array a contain the same elements as array b
    match: function(b, options) {
        var i,
            aLength = this.length,
            bLength = b.length;
        // set default options
        options = mashUtil.setDefaults(options, {
            ordered: false, // order matters if true
            sameLength: true // have to be same length if true
        });

        if (aLength != bLength && options.sameLength)
            return false;
        if (options.ordered)
            for (i = 0; i < aLength; i++)
                if (b.indexOf(this[i]) === -1)
                    return false;
                else
                    for (i in this)
                        if (b.indexOf(this[i]) === -1)
                            return false;
        return true;
    }

};
for (var key in proto)
    Collection.prototype[key] = proto[key];

exports.Collection = Collection;

// typecasts an object into the mash.Array class
// exports.toArray = function toArray(o, options) {
//     var a,
//         key,
//         keyName,
//         defaults = {
//             toValues: false, // convert objects to array of the object's values
//             keyAs: null, // specifies key name for wrapping keys
//             // ignored if toValues is false or argument not Object
//             // if null, false, or undefined, keys will be dropped               
//             toEmpty: false // if argument is undefined, return an empty array
//             // if false then will wrap (mimic native constructor)
//         };
//     options = options || {};
//     for (key in options) {
//         if (options[key] == undefined)
//             options[key] = defaults[key];
//     }
//     if (o.isUndefined)
//         if (options.toEmpty)
//             return new exports.Collection;
//         else
//             return new exports.Collection(undefined);
//     if (o.isArray)
//         return o;
//     if (o.isObject && options.toValues) {
//         a = [];
//         t = o.clone();
//         for (key in t) {
//             if (t.hasOwnProperty(key)) {
//                 if (options.keyAs) {
//                     keyName = (options.keyAs.isBool) ? defaultKeyName : options.keyAs.toString();
//                     t[key][keyName] = key;
//                 }
//                 a.push(t[key]);
//             }
//         }
//         return a;
//     } else
//         return [o];

// };