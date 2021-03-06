"use strict"

const shuffle = require("./utils").shuffle
const id = require("./utils").id
const set = require("./utils").set
const d = require("./utils").d

class Life {
  constructor(simbol, label, knowledge) {
    this.MAX_HEALTH = 100

    this.id = id()
    this.simbol = simbol
    this.label = label
    this.knowledge = shuffle(knowledge)

    this.world = null
    this.health = 100
    this.memory = {}
    this.x = 0
    this.y = 0
    this.born = Date.now()
    this.freeze = false
  }

  init() {
    d("%s being set on [%s, %s]", this.toString(), this.x, this.y)
    set(this.world, [this.x, this.y], this)
  }

  tick() {
    this.knowledge.forEach(knowledge => {
      if (this.freeze) {
        return
      }

      knowledge(this)
    })
  }

  clone() {
    var sibling = new Life(this.simbol, this.label, this.knowledge)
    sibling.health = this.health
    sibling.x = this.x
    sibling.y = this.y
    return sibling
  }

  toString() {
    return `${this.label}[${this.id}]`
  }
}

module.exports = Life
module.exports.LEAF = "Leaf"
module.exports.ANT = "Ant"
