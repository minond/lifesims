'use strict';

const Life = require('./life');
const World = require('./world');

const ANT_KNOWLEDGE = require('./knowledge').ANT_KNOWLEDGE;

const d = require('./utils').d;
const clear = require('./utils').clear;

var world = new World();

world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));

setInterval(() => {
    d('tick');
    clear();
    world.tick();
    world.draw();

    if (!world.life.length) {
        d('all life is gone');
        process.exit();
    }
}, 100);
