const { zid,kteb } = require('./../src/lib/standard') ;
var a = 5;
var b = 4;
var c = zid(a, b);
var f = function () {
    return kteb(b)
};
kteb(f)
