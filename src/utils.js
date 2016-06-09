'use strict';

/**
 * @return {String}
 */
function id() {
    return Math.random().toString().substr(-15);
}

/**
 * @param {Object[]} holder
 * @param {Object} val
 * @param {Boolean} [loose] (default: false)
 * @param {Object} [excluding]
 * @return {Boolean}
 */
function has(holder, val, loose, excluding) {
    if (loose) {
        for (var i = 0, len = holder.length; i < len; i++) {
            if (holder[i] instanceof val) {
                if (!excluding) {
                    return true;
                } else if (holder[i] !== excluding) {
                    return true;
                }
            }
        }

        return false;
    } else {
        return holder.indexOf(val) !== -1;
    }
}

/**
 * @param {Object[]} holder
 * @param {Number[]|String[]} props
 * @param {Array}
 */
function get(holder, props) {
    for (var i = 0, len = props.length; i < len; i++) {
        holder = holder[props[i]] || [];
    }

    return holder;
}

/**
 * @param {Object[]} holder
 * @param {Number[]|String[]} props
 * @param {Object} val
 */
function set(holder, props, val) {
    for (var i = 0, len = props.length; i < len; i++) {
        holder[props[i]] = holder[props[i]] || [];
        holder = holder[props[i]];
    }

    if (!has(holder, val)) {
        holder.push(val);
    }
}

/**
 * @param {Object[]} holder
 * @param {Number[]|String[]} props
 * @param {Object} val
 */
function unset(holder, props, val) {
    for (var i = 0, len = props.length; i < len; i++) {
        holder[props[i]] = holder[props[i]] || [];

        if (i + 1 === len) {
            if (has(holder[props[i]], val)) {
                holder[props[i]] = holder[props[i]].filter(v => v !== val);
            }
        } else {
            holder = holder[props[i]];
        }
    }
}

/**
 * @param {Object[]} list
 * @param {Object} [exclude]
 * @return {Object}
 */
function rand(list, exclude) {
    var val;
    do { val = list[Math.floor(Math.random() * list.length)]; }
    while (JSON.stringify([val]) === JSON.stringify([exclude]));
    return val;
}

/**
 * @param {Number} max
 * @param {Number} min
 * @return {Number}
 */
function rand_i(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {String} args*
 */
function d(...args) {
    if (!process.env.DEBUG) {
        return;
    }

    if (typeof args[0] === 'string') {
        args[0] = 'DEBUG: ' + args[0];
    } else {
        args.unshift('DEBUG:');
    }

    console.log.apply(console, args);
}

/**
 * @param {Number} chance
 * @return {Boolean}
 */
function likelihood(chance) {
    return Math.random().toString().substr(0, chance) === '0.555555'.substr(0, chance);
}

/**
 * @param {Coor}
 * @return {Coor[]}
 */
function around_coors(coor) {
    return [
        { x: coor.x - 1, y: coor.y - 1 }, // top left
        { x: coor.x - 1, y: coor.y }, // left
        { x: coor.x - 1, y: coor.y + 1 }, // bottom left
        { x: coor.x, y: coor.y - 1 }, // top
        { x: coor.x + 1, y: coor.y - 1 }, // top right
        { x: coor.x + 1, y: coor.y }, // right
        { x: coor.x + 1, y: coor.y + 1 }, // bottom right
        { x: coor.x, y: coor.y + 1 }, // bottom
    ];
}

function clear() {
    var lines = process.stdout.getWindowSize()[1];
    var buffer = [];
    for(var i = 0; i < lines; i++) {
        buffer.push('\r\n');
    }

    console.log(buffer.join(''));
}

module.exports = {id, has, set: set, get: get, clear,
    unset, rand, d, likelihood, around_coors, rand_i};
