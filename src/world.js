'use strict';

const has = require('./utils').has;

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

module.exports = World;
