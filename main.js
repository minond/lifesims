"use strict"

const Life = require("./life")
const World = require("./world")

const ANT_KNOWLEDGE = require("./knowledge").ANT_KNOWLEDGE
const LEAF_KNOWLEDGE = require("./knowledge").LEAF_KNOWLEDGE

const d = require("./utils").d
const clear = require("./utils").clear

var world = new World()

world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("a", Life.ANT, ANT_KNOWLEDGE))
world.add(new Life("+", Life.LEAF, LEAF_KNOWLEDGE))
world.add(new Life("+", Life.LEAF, LEAF_KNOWLEDGE))
world.add(new Life("+", Life.LEAF, LEAF_KNOWLEDGE))
world.add(new Life("+", Life.LEAF, LEAF_KNOWLEDGE))

setInterval(() => {
  if (!world.life.length) {
    d("all life is gone")
    process.exit()
  } else {
    clear()
    world.tick()
    world.draw()
  }
}, 1000 / 10)
