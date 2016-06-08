'use strict';

const Life = require('./life');
const World = require('./world');
const d = require('./utils').d;

const ANT_KNOWLEDGE = [
    require('./knowledge').move_knowledge,
    require('./knowledge').asexual_reproduction_knowledge,
    require('./knowledge').random_death_knowledge,
];

var world = new World();

world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));
world.add(new Life('Ant', ANT_KNOWLEDGE));

setInterval(() => {
    d('tick');
    world.tick();

    if (!world.life.length) {
        d('all life is gone');
        process.exit();
    }
}, 100);
