/// <reference path="../../nodelib/node.js" />
var h = require('helpers')(__dirname, exports);
var string = h.sub('string'),
    classify = h.sub('class').classify;

var fs = require('fs');
var path = require('path');

var FS = classify(function FS() { }).mixin(fs).mixin(path);

// get the contents of a file as a string ala readFileSync
FS.prototype.text = function (filepath) {
    return string.removeBOM(this.readFileSync(filepath).toString());
};

module.exports = new FS();
