const isDebug = true;

const pane = document.getElementById('pane');
const cells = document.getElementsByClassName('cell');

const smallGridBtn = document.getElementById('small-grid');
const mediumGridBtn = document.getElementById('medium-grid');
const bigGridBtn = document.getElementById('big-grid');
const clearGridBtn = document.getElementById('clear-grid');

const gradeColor = document.getElementById('step-opacity-brush');
const regularBrush = document.getElementById('regular-brush');
const rainbowBrush = document.getElementById('rainbow-brush');
const backgroundColor = 'pink';

const brushes = { REGULAR: 'regular', GRADE: 'grade', RAINBOW: 'rainbow' };

let dimension = 8;

smallGridBtn.addEventListener('click', _ => {
  debugLog('button => small-grid < 8 >');
  prepareGrid(8);
});

mediumGridBtn.addEventListener('click', _ => {
  debugLog('button => medium-grid < 16 >');
  prepareGrid(16);
});

bigGridBtn.addEventListener('click', _ => {
  debugLog('button => big-grid < 32 >');
  prepareGrid(32);
});

clearGridBtn.addEventListener('click', _ => {
  debugLog('button => clear grid');
  clearGrid();
});

regularBrush.addEventListener('click', _ => {
  debugLog('button => regular brush chosen');
  removeMouseoverListener();
  addMouseoverListener(brushes.REGULAR);
})

gradeColor.addEventListener('click', _ => {
  debugLog('button => grade brush chosen');
  removeMouseoverListener();
  addMouseoverListener(brushes.GRADE);
})

rainbowBrush.addEventListener('click', _ => {
  debugLog('button => raibow brush chosen');
  removeMouseoverListener();
  addMouseoverListener(brushes.RAINBOW);
})

function setGridTemplates(dimension) {
  debugLog(`grid dimension is < ${dimension}x${dimension} >`);
  pane.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  pane.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
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

function setBrushType(cell, brushType) {
  if (brushType == brushes.REGULAR) {
    debugLog('default brush');
    cell.style.backgroundColor = 'green';
  } else if (brushType == brushes.GRADE) {
    debugLog('grade brush');
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

  let squares = dimension**2;

  for (var i = 0; i < squares; i++) {
    let square = document.createElement("div");
    square.classList.add('cell');
    square.dataset.lightness = 95;
    pane.appendChild(square);
  }

  addMouseoverListener(brushes.REGULAR);
}

function clearGrid() {
  Array.from(cells).forEach(cell => {
    cell.removeAttribute('style');
  })
}

function debugLog(str) {
  if (!isDebug) return;
  console.log(str);
}

prepareGrid(dimension);
