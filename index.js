let startGame = document.getElementById('startGame')
let start = document.getElementById('start')
let clear = document.getElementById('clear')
let nextLevel = document.getElementById('nextLevel')
let next = document.getElementById('next')
let levelDom = document.getElementById('level')
let timeDom = document.getElementById('time')

function bindEvents() {
    start.addEventListener('click', function () {
        hideBlock ()
        initGame()
    })
    clear.addEventListener('click', function () {
        localStorage.clear()
        initParams()
    })
    next.addEventListener('click', function () {
        unloadCanvas()
        hideBlock ()
        resetParams ()
        initGame()
    })
}

function successCallback() {
    displayBlock ()
    stopTime ()
    saveRecord ()
}

function initGame () {
    addTime ()
    initCanvas(level)
}

function addTime () {
    timer = setInterval(() => {
        time = (Number(time) + 0.01).toFixed(2)
        timeDom.innerText = time
    }, 10)
}

function displayBlock() {
    nextLevel.style.display = 'flex'
}

function hideBlock() {
    startGame.style.display = 'none'
    nextLevel.style.display = 'none'
}

function stopTime () {
    clearInterval(timer)
}

function initParams() {
    level = Number(localStorage.getItem('level')) || 9
    time = '0.00'
    steps = 0
    timer = null
    levelDom.innerText = level - 8
    stepsDom.innerText = steps
    timeDom.innerText = time
}

function resetParams () {
    level += 1
    steps = 0
    time = '0.00'
    levelDom.innerText = level - 8
    stepsDom.innerText = steps
    timeDom.innerText = time
}

function saveRecord () {
    localStorage.setItem('level', level)
}

let level, time, timer, steps

bindEvents()
initParams()
