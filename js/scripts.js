const isDebug = true;

const pane = document.getElementById('pane');
const cells = document.getElementsByClassName('cell');

const smallGridBtn = document.getElementById('small-grid');
const mediumGridBtn = document.getElementById('medium-grid');
const bigGridBtn = document.getElementById('big-grid');

const backgroundColor = 'pink';

let dimension = 4;

prepareGrid(dimension);

smallGridBtn.addEventListener('click', _ => {
  debugLog('small-grid < 8 >');
  prepareGrid(8);
});

mediumGridBtn.addEventListener('click', _ => {
  debugLog('medium-grid < 16 >');
  prepareGrid(16);
});

bigGridBtn.addEventListener('click', _ => {
  debugLog('big-grid < 32 >');
  prepareGrid(32);
});

function setGridTemplates(dimension) {
  debugLog(`grid dimension is < ${dimension}x${dimension} >`);
  pane.style.setProperty('grid-template-columns', `repeat(${dimension}, 1fr)`);
  pane.style.setProperty('grid-template-rows', `repeat(${dimension}, 1fr)`);
}

function setMouseoverListeners() {
  Array.from(cells).forEach(cell => {
    cell.addEventListener('mouseover', _ => {
      cell.style.setProperty('background-color', 'green');
    })
  });
}

function prepareGrid(dimension) {
  pane.replaceChildren();

  setGridTemplates(dimension);

  let squares = dimension**2;

  for (var i = 0; i < squares; i++) {
    let square = document.createElement("div");
    square.classList.add('cell');
    pane.appendChild(square);
  }

  setMouseoverListeners();
}

function debugLog(str) {
  if (!isDebug) return;
  console.log(str);
}
