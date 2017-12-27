"use strict"

const Life = require("./life")
const d = require("./utils").d
const rand = require("./utils").rand
const rand_i = require("./utils").rand_i
const has = require("./utils").has
const get = require("./utils").get
const set = require("./utils").set
const unset = require("./utils").unset
const likelihood = require("./utils").likelihood
const around_coors = require("./utils").around_coors

function leaf_eating_knowledge(obj) {
  d("%s needs to get to food", obj.toString())
  obj.health--

  around_coors(obj).forEach(coor => {
    if (has(get(obj.world, [coor.x, coor.y]), Life.LEAF, true)) {
      d("%s found food", obj.toString())
      obj.health = obj.MAX_HEALTH
    }
  })
}

function death_knowledge(obj) {
  if (!obj.health) {
    d("%s is out of health and will now pass away", obj.toString())
    obj.world.remove(obj)
  }
}

function random_asexual_reproduction_knowledge(obj) {
  if (likelihood(4)) {
    d("%s is reproducing", obj.toString())
    obj.world.add(obj.clone())
  }
}

function random_death_knowledge(chance) {
  return function(obj) {
    if (likelihood(chance)) {
      d("%s is randomly dying :(", obj.toString())
      obj.world.remove(obj)
      // XXX add food in same place
    }
  }
}

function sibling_placement_knowledge(obj) {
  var coor, coors

  if (!obj.memory.sibling_placement_knowledge) {
    unset(obj.world, [obj.x, obj.y], obj)
    coors = around_coors(obj)

    for (var i = 0, len = coors.length; i < len; i++) {
      if (!has(get(obj.world, [coors[i].x, coors[i].y]), Life, true, obj)) {
        coor = coors[i]
        obj.x = coor.x
        obj.y = coor.y
        obj.memory.sibling_placement_knowledge = true
        set(obj.world, [obj.x, obj.y], obj)
        return
      }
    }
  }
}

function move_knowledge(obj) {
  var last = obj.memory.move_knowledge || { x: obj.x, y: obj.y },
    next

  next = rand(around_coors(obj), last)

  d(
    "%s moving from [%s, %s] to [%s, %s]",
    obj.toString(),
    last.x,
    last.y,
    next.x,
    next.y
  )
  unset(obj.world, [last.x, last.y], obj)
  set(obj.world, [next.x, next.y], obj)
  obj.x = next.x
  obj.y = next.y
  obj.memory.move_knowledge = next
}

module.exports = {
  ANT_KNOWLEDGE: [
    random_asexual_reproduction_knowledge,
    random_death_knowledge(4),
    move_knowledge,
    death_knowledge,
    leaf_eating_knowledge
  ],

  LEAF_KNOWLEDGE: [
    sibling_placement_knowledge,
    random_asexual_reproduction_knowledge,
    random_death_knowledge(5)
  ]
}
