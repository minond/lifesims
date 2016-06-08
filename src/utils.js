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
 * @return {Boolean}
 */
function has(holder, val, loose) {
    if (loose) {
        for (var i = 0, len = holder.length; i < len; i++) {
            if (holder[i] instanceof val) {
                return true;
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
 * @param {String} args*
 */
function d(...args) {
    if (typeof args[0] === 'string') {
        args[0] = 'DEBUG: ' + args[0];
    } else {
        args.unshift('DEBUG:');
    }

    console.log.apply(console, args);
}

function likelihood(chance) {
    return Math.random().toString().substr(0, chance) === '0.555555'.substr(0, chance);
}

module.exports = {id, has, set: set, unset, rand, d, likelihood};
