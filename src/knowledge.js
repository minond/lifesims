'use strict';

const d = require('./utils').d;
const rand = require('./utils').rand;
const set = require('./utils').set;
const unset = require('./utils').unset;
const likelihood = require('./utils').likelihood;
const around_coors = require('./utils').around_coors;

function slow_death_knowledge(obj) {
    obj.health--;

    if (!obj.health) {
        obj.world.remove(obj);
    }
}

function asexual_reproduction_knowledge(obj) {
    if (likelihood(4)) {
        d('%s is reproducing', obj.toString());
        obj.world.add(obj.clone());
    }
}

function random_death_knowledge(obj) {
    if (likelihood(4)) {
        d('%s is randomly dying :(', obj.toString());
        obj.world.remove(obj);
        // XXX add food in same place
    }
}

function move_knowledge(obj) {
    var last = obj.memory.move_knowledge || { x: obj.x, y: obj.y },
        next;

    if (obj.freeze) {
        d('%s staying in [%s, %s]', obj.toString(), last.x, last.y);
        return;
    }

    next = rand(around_coors(obj), last);

    d('%s moving from [%s, %s] to [%s, %s]', obj.toString(), last.x, last.y, next.x, next.y);
    unset(obj.world, [last.x, last.y], obj);
    set(obj.world, [next.x, next.y], obj);
    obj.x = next.x;
    obj.y = next.y;
    obj.memory.move_knowledge = next;
}

module.exports = {
    asexual_reproduction_knowledge,
    random_death_knowledge,
    move_knowledge,

    ANT_KNOWLEDGE: [
        asexual_reproduction_knowledge,
        random_death_knowledge,
        move_knowledge,
        slow_death_knowledge,
    ]
};
