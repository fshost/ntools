/// <reference path="../../nodelib/node.js" />
var h = require('helpers')(__dirname, exports);
var object = h.sub('object'),
    extend = object.extend;

function mixin(constructor, source) {
    constructor.prototype = extend(constructor.prototype, source, false, true);
    return constructor;
}
exports.mixin = mixin;

function classify(constructor) {
    constructor.mixin = function (source) {
        return mixin(constructor, source);
    };
    
    return constructor;
}
exports.classify = classify;