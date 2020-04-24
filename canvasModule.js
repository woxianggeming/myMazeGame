let stepsDom = document.getElementById('steps')
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let character = null

class Character {
    constructor (connectList) {
        this.connectList = connectList
        this.level = Math.sqrt(connectList.length)
        this.position = 0
        this.type = 'rect'
        this.width = 14
        this.x = Math.floor(this.position % this.level)
        this.y = Math.floor(this.position / this.level)
        this.draw()
    }
    draw () {
        context.beginPath()
        context[this.type]((this.x + 1) * 30 - 7,(this.y + 1) * 30 - 7,this.width,this.width);
        context.fillStyle = 'red'
        context.fill()
    }
    clear () {
        context.clearRect((this.x + 1) * 30 - 14, (this.y + 1) * 30 - 14, 28, 28)
    }
    refresh () {
        this.clear()
        this.x = Math.floor(this.position % this.level)
        this.y = Math.floor(this.position / this.level)
        this.draw()
        if (this.isSuccess()) {
            successCallback()
        }
    }
    move (direction) {
        switch (direction) {
            case 'left': {
                if (this.x > 0 && this.connectList[this.position][this.position - 1]) {
                    this.position -= 1
                    this.addSteps()
                }
                break
            }
            case 'right': {
                if (this.x < this.level - 1 && this.connectList[this.position][this.position + 1]) {
                    this.position += 1
                    this.addSteps()
                }
                break
            }
            case 'up': {
                if (this.y > 0 && this.connectList[this.position][this.position - this.level]) {
                    this.position -= this.level
                    this.addSteps()
                }
                break
            }
            case 'down': {
                if (this.y < this.level - 1 && this.connectList[this.position][this.position + this.level]) {
                    this.position += this.level
                    this.addSteps()
                }
                break
            }
        }
        this.refresh()
    }
    isSuccess () {
        return this.position === this.level * this.level - 1
    }
    addSteps () {
        stepsDom.innerText = ++steps
    }
}

function initCanvas(level) {
    canvas.width = (level + 1) * 30
    canvas.height = (level + 1) * 30
    drawCanvas (level)
    character = new Character(contentGeneration (level))
    document.addEventListener('keydown', addEventListener)
}

function unloadCanvas() {
    document.removeEventListener('keydown', addEventListener)
}

function addEventListener(e) {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
        character.move('left')
    } else if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
        character.move('right')
    } else if (e.code === 'ArrowUp' || e.key === 'ArrowUp') {
        character.move('up')
    } else if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
        character.move('down')
    }
}

function drawCanvas(level) {
    context.strokeStyle = 'gray'
    context.lineWidth = 1
    for (let i = 0; i < level + 1; i++) {
        context.moveTo(15 + i * 30, 15)
        context.lineTo(15 + i * 30, 15 + 30 * level)
        context.stroke()
        context.moveTo(15, 15 + i * 30)
        context.lineTo(15 + level * 30, 15 + i * 30)
        context.stroke()
    }
}

function contentGeneration(level) {
    let disjointSet = new DisjointSet(level * level)
    let gridLingList = Array.from({length: level * level}, () => Array.from({length: level * level}, () => 0))
    while (!disjointSet.compare(0, level * level - 1)) {
        let randomGrid = Math.floor(Math.random() * level * level)
        let adjacentGrid = getRandomAdjacentGrads(randomGrid, level)
        if (!disjointSet.compare(randomGrid, adjacentGrid)) {
            gridLingList[randomGrid][adjacentGrid] = 1
            gridLingList[adjacentGrid][randomGrid] = 1
            disjointSet.join(randomGrid, adjacentGrid)
            drawLine(randomGrid, adjacentGrid, level)
        }
    }
    return gridLingList
}

function getRandomAdjacentGrads(grid, level) {
    let row = Math.floor(grid / level), line = grid % level
    let res = []
    if (row > 0) res.push((row - 1) * level + line)
    if (row < level - 1) res.push((row + 1) * level + line)
    if (line > 0) res.push(row * level + line - 1)
    if (line < level - 1) res.push(row * level + line + 1)
    return res[Math.floor(Math.random() * res.length)]
}

function drawLine (a, b, level) {
    let x1 = Math.floor(a / level), y1 = a % level
    let x2 = Math.floor(b / level), y2 = b % level
    let x3 = Math.ceil((x1 + x2) / 2), y3 = Math.ceil((y1 + y2) / 2)
    context.strokeStyle = 'white'
    if ((x2 - x1) === 1 || (x2 - x1) === -1) {
        context.clearRect(16 + 30 * y3, 14 + 30 * x3 , 28, 2)
    }
    if ((y2 - y1) === 1 || (y2 - y1) === -1) {
        context.clearRect(14 + 30 * y3, 16 + 30 * x3 , 2, 28)
    }
}
