/// <reference path="../../nodelib/node.js" />

function escapeHtml(html) {
    /// <summary>Escapes the given string of html.</summary>
    /// <param name="html" type="String">The html string to escape.</param>
    /// <returns type="String">The escaped html string.</returns>
    return String(html)
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    return ret;
};
exports.escapeHtml = escapeHtml;

function unescapeHtml(html) {
    /// <summary>Unescapes the given string of html.</summary>
    /// <param name="html" type="String">The html string to unescape.</param>
    /// <returns type="String">The unescaped html string.</returns>
    return String(html)
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
}
exports.unescapeHtml = unescapeHtml;

function removeBOM(text) {
    /// <summary>Remove Byte-Order-Mark from beginning of text if present.</summary>
    /// <param name="text" type="String">The text to remove the BOM from.</param>
    /// <returns type="String">The text after removing the BOM.</returns>
    if (text.indexOf('\uFEFF') === 0) {
        text = text.substring(1, text.length);
    }
    return text;
}
exports.removeBOM = removeBOM;
 
function removeLineBreaks(text) {
    /// <summary>Remove new-line and carriage-return characters from text.</summary>
    /// <param name="text" type="String">The text to remove the line-breaks from.</param>
    /// <returns type="String">The text after removing the line-breaks.</returns>
    return text.replace(/(\r\n|\n|\r)/gm, '');
};
exports.removeLineBreaks = removeLineBreaks;

function camelize(str, separator) {
    /// <summary>Camelizes a string.</summary>
    /// <param name="str" type="String">The string to camelize.</param>
    /// <param name="separator" type="String" optional="true">The character or string the denotes where to camelize.</param>
    /// <returns type="String">The text after removing the BOM.</returns>
    separator = separator || '-';
    var tokens = str.split(separator);
    for (var i = 1, l = tokens.length; i < l; i++) {
        tokens[i] = tokens[i].charAt(0).toUpperCase() + tokens[i].substr(1);
    }
    return tokens.join('');
}
exports.camelize = camelize;