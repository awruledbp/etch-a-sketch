const isDebug = true;

const pane = document.getElementById('pane');
const cells = document.getElementsByClassName('cell');

const customGridInput = document.getElementById('custom-grid-text');
const customGridBtn = document.getElementById('custom-grid-button');

const smallGridBtn = document.getElementById('small-grid');
const mediumGridBtn = document.getElementById('medium-grid');
const bigGridBtn = document.getElementById('big-grid');
const clearGridBtn = document.getElementById('clear-grid');

const gradualBrush = document.getElementById('gradual-brush');
const regularBrush = document.getElementById('regular-brush');
const rainbowBrush = document.getElementById('rainbow-brush');

const clearGridBtn = document.getElementById('clear-grid');

const brushes = {
  REGULAR: 'regular',
  GRADUAL: 'gradual',
  RAINBOW: 'rainbow'
};

const controlGroups = {
  SIZE: 'size-controls',
  BRUSH: 'brush-controls'
};

let currentBrush = brushes.REGULAR;

let dimension = 16;

customGridBtn.addEventListener('click', _ => {
  const errorMessage = "You could only input numbers from 1 to 100!";
  let value = Number.parseInt(customGridInput.value);
  if (Number.isNaN(value)) {
    alert(errorMessage);
  } else if (value > 100) {
    alert(errorMessage);
  } else {
    debugLog(`button => custom-grid < ${value} >`);
    setActiveButton(customGridBtn, controlGroups.SIZE);
    prepareGrid(value);
  }
});

smallGridBtn.addEventListener('click', _ => {
  debugLog('button => small-grid < 16 >');
  setActiveButton(smallGridBtn, controlGroups.SIZE);
  prepareGrid(16);
});

mediumGridBtn.addEventListener('click', _ => {
  debugLog('button => medium-grid < 32 >');
  setActiveButton(mediumGridBtn, controlGroups.SIZE);
  prepareGrid(32);
});

bigGridBtn.addEventListener('click', _ => {
  debugLog('button => big-grid < 64 >');
  setActiveButton(bigGridBtn, controlGroups.SIZE);
  prepareGrid(64);
});

regularBrush.addEventListener('click', _ => {
  debugLog('button => regular brush chosen');
  setActiveButton(regularBrush, controlGroups.BRUSH);
  setupMouseoverListener(brushes.REGULAR);
})

gradualBrush.addEventListener('click', _ => {
  debugLog('button => gradual brush chosen');
  setActiveButton(gradualBrush, controlGroups.BRUSH);
  setupMouseoverListener(brushes.GRADUAL);
})

rainbowBrush.addEventListener('click', _ => {
  debugLog('button => raibow brush chosen');
  setActiveButton(rainbowBrush, controlGroups.BRUSH);
  setupMouseoverListener(brushes.RAINBOW);
})

clearGridBtn.addEventListener('click', _ => {
  debugLog('button => clear grid');
  clearGrid();
});

//I used this workaround with the template because there was some
//strange issue on bigger grid sizes (e.g. 30x30+), when I tried to setup
//template like this - `repeat(dimension, 1fr)`. Cells weren't
//occupying  all available space on the grid and there were 1px empty lines
//on the right and bottom sides of the grid.
function setGridTemplates(dimension) {
  debugLog(`grid dimension is < ${dimension}x${dimension} >`);
  let templateValue = `1.1fr repeat(${dimension-2}, 1fr) 1.1fr`;
  pane.style.gridTemplate = `${templateValue} / ${templateValue}`;
}

let listenerHandler = null;

function addMouseoverListener(type) {
  pane.addEventListener('mouseover', listenerHandler = function() {
    if (event.target.className === 'cell') {
      setBrushType(event.target, type);
    }
  });
}

function removeMouseoverListener() {
  pane.removeEventListener('mouseover', listenerHandler);
}

function setupMouseoverListener(brushType) {
  removeMouseoverListener();
  addMouseoverListener(brushType);
  currentBrush = brushType;
}

function setActiveButton(button, controlGroup) {
  let controlGroupButtons = document.getElementById(controlGroup).querySelectorAll('button');
  Array.from(controlGroupButtons).forEach(button => {
    button.classList.remove('selected');
  })
  button.classList.add('selected');
}

function setBrushType(cell, brushType) {
  if (brushType == brushes.REGULAR) {
    debugLog('default brush');
    cell.style.backgroundColor = 'green';
  } else if (brushType == brushes.GRADUAL) {
    debugLog('gradual brush');
    cell.style.backgroundColor = `hsl(0, 0%, ${cell.dataset.lightness}%)`;
    if (cell.dataset.lightness > 50) {
      cell.dataset.lightness -= 5;
    }
  } else if (brushType == brushes.RAINBOW) {
    debugLog('rainbow brush');
    let randomHue = Math.floor(Math.random() * 360);
    cell.style.backgroundColor = `hsl(${randomHue}, 100%, 50%)`;
  } else {
    debugLog('wrong brush ' + brushType);
  }
}

function prepareGrid(dimension) {
  pane.replaceChildren();

  removeMouseoverListener();

  setGridTemplates(dimension);

  let squares = dimension ** 2;

  for (var i = 0; i < squares; i++) {
    let square = document.createElement("div");
    square.classList.add('cell');
    square.dataset.lightness = 95;
    pane.appendChild(square);
  }

  addMouseoverListener(currentBrush);
}

function clearGrid() {
  Array.from(cells).forEach(cell => {
    cell.removeAttribute('style');
  })
}

function debugLog(str) {
  if (!isDebug) {
    return;
  }
  console.log(str);
}

prepareGrid(dimension);
