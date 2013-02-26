/// <reference path="../../nodelib/node.js" />

var path = require('path'),
    h = require('helpers')(__dirname, exports),
    ntools = h.sub('/../ntools'),
    assert = require('should');

describe('ntools.object', function () {

    var object = ntools.object;
   
    it('has an extend method to extend objects', function () {
        var target = {
            attributes: {
                classNames: ['test'],
                data: [1,2]
            },
            childNodes: [{
                tag: 'div',
                childNodes: [{
                    tag: 'div',
                    childNodes: []
                }]
            }]
        };
        var source = {
            tag: 'body',
            attributes: {
                classNames: ['test2'],
                data: [3]
            },
            childNodes: [{
                tag: 'ul',
                childNodes: [{
                    tag: 'li',
                    childNodes: []
                }]
            }]
        };
        var result = object.extend(target, source);
        result.tag.should.equal('body');
        result.childNodes.length.should.equal(2);
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
        source.should.deep.equal(result);
    });


})