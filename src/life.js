'use strict';

const id = require('./utils').id;
const set = require('./utils').set;
const d = require('./utils').d;

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
        var sibling = new Life(this.label, this.knowledge);
        sibling.health = this.health;
        sibling.x = this.x;
        sibling.y = this.y;
        return sibling;
    }

    toString() {
        return `${this.label}[${this.id}]`;
    }
}

module.exports = Life;
