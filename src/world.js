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

    tick() {
        this.life.forEach(o => o.tick());
    }

    draw() {
        var x, y, key;

        var buffer = [],
            lifeline = {},
            padding = 16;

        var max_y = 0, max_x = 0,
            min_y = 0, min_x = 0,
            offset_y = 0, offset_x = 0,
            span_y = 0, span_x = 0;

        this.life.forEach(l => {
            max_y = Math.max(max_y, l.y);
            min_y = Math.min(min_y, l.y);
            max_x = Math.max(max_x, l.x);
            min_x = Math.min(min_x, l.x);
        });

        span_y = max_y - min_y + padding;
        span_x = max_x - min_x + padding;

        offset_y = span_y - padding / 2 - max_y;
        offset_x = span_x - padding / 2 - max_x;

        this.life.forEach(l => {
            switch (l.label) {
            case 'Ant':
                lifeline[JSON.stringify([
                    l.x + offset_x,
                    l.y + offset_y,
                ])] = 'a';
                break;
            }
        });

        for (y = 0; y < span_y; y++) {
            if (y === 0 || y + 1 === span_y) {
                // first/last
                for (x = 0; x < span_x; x++) {
                    buffer.push('-');
                }
            } else {
                for (x = 0; x < span_x; x++) {
                    if (x === 0 || x + 1 === span_x) {
                        // left/right
                        buffer.push('|');
                    } else {
                        key = JSON.stringify([x, y]);

                        if (lifeline[key]) {
                            buffer.push(lifeline[key]);
                        } else {
                            buffer.push(' ');
                        }
                    }
                }
            }

            if (y + 1 !== span_y) {
                buffer.push('\n');
            }
        }

        console.log(buffer.join(''));
    }
}

module.exports = World;
