/// <reference path="../../nodelib/node.js" />

var path = require('path'),
    h = require('helpers')(__dirname, exports),
    ntools = h.sub('/../ntools');

var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('ntools.object', function () {

    var object = ntools.object;
   
    it('has an extend method to extend objects', function () {
        var target = {
            attributes: {
                classNames: ['test'],
                data: [1,2]
            },
            parentNode: {
                tag: 'div',
                childNodes: []
            }
        };
        var source = {
            tag: 'body',
            attributes: {
                classNames: ['test2'],
                data: [3]
            },
            parentNode: {
                childNodes: [{
                    tag: 'li',
                    childNodes: []
                }]
            }
        };
        var expected = {
            tag: 'body',
            attributes: {
                classNames: ['test2'],
                data: [3, 2]
            },
            parentNode: {
                tag: 'div',
                childNodes: [{
                    tag: 'li',
                    childNodes: []
                }]
            }
        };
        var result = object.extend(target, source);
        expect(result).to.deep.equal(expected);
    });

    it('has a clone method to clone objects', function () {
        var source = {
                tag: 'div',
                childNodes: [{
                    tag: 'div',
                    childNodes: []
                }]
        };
        var result = object.clone(source);
        result.childNodes.should.not.equal(source.childNodes);
        expect(source).to.deep.equal(result);
    });

})