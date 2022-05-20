function t2kedMnType(type, val) {
    if (typeOf(val) === type) {
        return val;
    }
    throw new Error(`${val} type dyalo mchi ${type}.`)
}

function rahObject(thing) {
    return thing !== null && (typeof thing === "function" || typeof thing === "object");
}