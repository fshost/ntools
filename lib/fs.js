/// <reference path="../../nodelib/node.js" />
var h = require('helpers')(__dirname, exports);
var string = h.sub('string'),
    nclass = h.sub('class'),
    classify = nclass.classify;


var fs = require('fs');
var path = require('path');

function FS() { }
// get the contents of a file as a string ala readFileSync
FS.prototype.text = function (filepath) {
    return string.removeBOM(fs.readFileSync(filepath).toString());
}.bind(FS.prototype);

var NFS = classify(FS).mixin(fs).mixin(path);

var nfs = new NFS();
console.log(nfs.readFileSync);
module.exports = nfs;