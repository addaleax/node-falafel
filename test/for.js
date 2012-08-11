var falafel = require('../');
var test = require('tap').test;
var vm = require('vm');

test('for loop', function (t) {
    t.plan(2);
    
    var src = '(' + function () {
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += i;
        }
        return sum;
    } + ')()';
    
    var output = falafel(src, function (node) {
        if (node.type === 'ForStatement') {
            t.equal(node.update.source(), 'i++');
            node.update.update('i+=2');
        }
    });
    
    var res = vm.runInNewContext(output);
    t.equal(res, 2 + 4 + 6 + 8);
});
