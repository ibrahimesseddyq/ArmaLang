const { zid,kteb } = require('./../src/lib/standard') ;
var a = 5;
var b = 4;
var c = zid(a, b);
var fa = function () {
    kteb(a);
    return kteb(b)
};
fa()
