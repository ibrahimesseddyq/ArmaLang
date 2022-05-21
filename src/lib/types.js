function t2kedMnType(type, val) {
    if (typeOf(val) === type) {
        return val;
    }
    throw new Error(`${val} type dyalo mchi ${type}.`)
}

function rahObject(thing) {
    return thing !== null && (typeof thing === "function" || typeof thing === "object");
}

function ChmnType(thing) {
    if (thing === undefined) {
        return "undefined";
    }
    if (thing === null) {
        return "null";
    }
    if (thing.type !== undefined && typeof thing.type === "function") {
        const type = thing.type();
        if (typeof type === "string" && type !== "") {
            return type;
        }
    }
    if (Number.isNaN(thing)) {
        return "NaN";
    } else if (Array.isArray(thing)) {
        return "array";
    } else if (Object.prototype.toString.call(thing) === "[object RegExp]") {
        return "regexp";
    } else if (Object.prototype.toString.call(thing) === "[object Date]") {
        return "date";
    } else {
        return typeof thing;
    }
}

function mytbdlch(obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach(key => {
        if (isObject(obj[key]) && !Object.isFrozen(obj[key])) {
            Object.freeze(obj[key]);
        }
    });
    return obj;
}
module.exports = {
    t2kedMnType,
    rahObject,
    mytbdlch,
    ChmnType
}