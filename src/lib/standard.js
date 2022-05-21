/*
    those functions just for testing they will be replaced soon
*/
function kteb(...args) {
    console.log(...args);
}

function zid(x, y) {
    return x + y;
}

function lsse9(s1, s2) {
    if (!s1.concat) {
        throw new Error(`${x} mt9derch tls9ha.`);
    }
    return s1.concat(s2);
}

function dreb(x, y) {
    return x * y;
}

function n9ess(x, y) {
    return x - y;
}

function _9ssem(x, y) {
    return x / y;
}

function modulo(x, y) {
    return x % y;
}

function jider(x) {
    return Math.sqrt(x);
}

function _9owa(x, y) {
    return Math.pow(x, y);
}

function _9reb(x) {
    return Math.floor(x);
}

function tyssawi(x, y) {
    return x === y;
}

function ilakan(cond, consequent, alternate) {
    if (cond) {
        return consequent();
    } else {
        return alternate();
    }
}

function ola(cond1, cond2) {
    return cond1 || cond2;
}

function f(arrayLike, index) {
    return arrayLike[index];
}

function mahed(string, times) {
    for (let i = 0; i < times; i++) {
        string()
    }
}

function mnTal(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function lkolWahd(arr, fun) {
    arr.forEach(fun);
}
module.exports = {
    kteb,
    zid,
    lsse9,
    dreb,
    n9ess,
    _9ssem,
    modulo,
    jider,
    _9owa,
    _9reb,
    tyssawi,
    ilakan,
    ola,
    f,
    mahed,
    mnTal,
    lkolWahd
}