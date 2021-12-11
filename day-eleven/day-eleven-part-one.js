const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString()

function parseRows(input) {
    return input
        .split('\n')
        .map(row => row.split('').map(str => +str ));
}

function increaseEnergy(y, x, rows) {
    // If we're at ten then we just flashed
    if (++rows[y][x] !== 10) return

    const notNull = (_y, _x) => rows[_y] != null && rows[_y][_x] != null
    const tooBig = (_y, _x) => rows[_y][_x] > 9

    const coords = [
        [y, x - 1],
        [y - 1 , x - 1],
        [y - 1 , x],
        [y - 1 , x + 1],
        [y, x + 1],
        [y + 1 , x + 1],
        [y + 1 , x],
        [y + 1 , x - 1],
    ]

    for (const [cy, cx] of coords) {
        notNull(cy, cx) && !tooBig(cy, cx) && increaseEnergy(cy, cx, rows)
    }
}

function step(rows) {
    let flashes = 0
    // loop once to increment
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[0].length; x++) {
            increaseEnergy(y, x, rows)
        }
    }

    // loop twice to reset and count flashes
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[0].length; x++) {
            if (rows[y][x] > 9) {
                flashes++
                rows[y][x] = 0;
            }
        }
    }
    return flashes
}

function progressTime(steps, rows) {
    let flashes = 0
    for (let i = 0; i < steps; i++) {
        flashes += step(rows)
    }
    return flashes
}

const parsedRows = parseRows(rawInput);
const output = progressTime(100, parsedRows)
console.log(output)