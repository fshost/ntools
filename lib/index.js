/// <reference path="../../nodelib/node.js" />
var path = require('path');

function submodule(name) {
    /// <summary>Require a local Node.js module file.</summary>
    /// <param name="name" type="String">The filename of the module.</param>
    /// <returns type="Object">The Node.js module.</returns>
    return require(path.resolve(__dirname + path.sep + name));
}
function exp(name) {
    /// <summary>Export a local module file as a property.</summary>
    /// <param name="name" type="String">The filename of the module.</param>
    exports[name] = submodule(name);
}
function mixin(name, excludeNs) {
    /// <summary>Mixin a local module file's methods with root namespace.</summary>
    /// <param name="name" type="String">The filename of the module.</param>
    /// <param name="excludeNs" type="Boolean" optional="true">Whether to export module as a namespace also (default is true).</param>
    var sub = submodule(name);
    for (var key in sub) {
        if (sub.hasOwnProperty(key)) {
            exports[key] = sub[key];
        }
    }
    if (!excludeNs) {
        // include methods in namespaced module
        exp(name);
    }
}

mix('string');
mix('object');
