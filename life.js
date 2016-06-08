'use strict';

class World extends Array {
    constructor() {
        super();
        this.life = [];
    }

    add(obj) {
        obj.world = this;
        obj.init();
        this.life.push(obj);
    }

    remove(obj) {
        if (has(this.life, obj)) {
            this.life.splice(this.life.indexOf(obj), 1);
        }
    }
}

class Life {
    constructor(label, knowledge) {
        this.id = id();
        this.label = label;
        this.knowledge = knowledge;

        this.world = null;
        this.health = 100;
        this.memory = {};
        this.x = 0;
        this.y = 0;
        this.born = Date.now();
        this.freeze = false;
    }

    init() {
        d('%s being set on [%s, %s]', this.toString(), this.x, this.y);
        set(this.world, [this.x, this.y], this);
    }

    tick() {
        this.knowledge.forEach(knowledge => knowledge(this));
    }

    clone() {
        var sibling = new Life(this.label, this.knowledge)
        sibling.health = this.health;
        sibling.x = this.x;
        sibling.y = this.y;
        return sibling;
    }

    toString() {
        return `${this.label}[${this.id}]`;
    }
}

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

function asexual_reproduction_knowledge(obj) {
    if (Math.random().toString().substr(0, 4) === '0.55') {
        d('%s is reproducing', obj.toString());
        obj.world.add(obj.clone());
    }
}

function random_death_knowledge(obj) {
    if (Math.random().toString().substr(0, 4) === '0.55') {
        d('%s is randomly dying :(', obj.toString());
        obj.world.remove(obj);
        // XXX add food in same place
    }
}

function move_knowledge(obj) {
    var last = obj.memory['move_knowledge'] || { x: obj.x, y: obj.y },
        next;

    if (obj.freeze) {
        d('%s staying in [%s, %s]', obj.toString(), last.x, last.y);
        return;
    }

    next = rand([
        { x: obj.x - 1, y: obj.y - 1 }, // top left
        { x: obj.x - 1, y: obj.y }, // left
        { x: obj.x - 1, y: obj.y + 1 }, // bottom left
        { x: obj.x, y: obj.y - 1 }, // top
        { x: obj.x + 1, y: obj.y - 1 }, // top right
        { x: obj.x + 1, y: obj.y }, // right
        { x: obj.x + 1, y: obj.y + 1 }, // bottom right
        { x: obj.x, y: obj.y + 1 }, // bottom
    ], last);

    d('%s moving from [%s, %s] to [%s, %s]', obj.toString(), last.x, last.y, next.x, next.y);
    unset(obj.world, [last.x, last.y], obj);
    set(obj.world, [next.x, next.y], obj);
    obj.x = next.x;
    obj.y = next.y;
}

var world = new World();
var ANT_KNOWLEDGE = [move_knowledge, asexual_reproduction_knowledge, random_death_knowledge];
world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));

setInterval(() => {
    world.life.forEach(o => o.tick())

    if (!world.life.length) {
        d('all life is gone');
        process.exit();
    }
}, 100);
