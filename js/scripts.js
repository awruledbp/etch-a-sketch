const isDebug = true;

const pane = document.getElementById('pane');

let dimension = 4;

setGridTemplates(dimension);

let squares = dimension**2;

for (var i = 0; i < squares; i++) {
  let square = document.createElement("div");
  square.classList.add('cell');
  pane.appendChild(square);
}

function setGridTemplates(dimension) {
  console.log('gris temps - ' + dimension);
  pane.style.setProperty('grid-template-columns', `repeat(${dimension}, 1fr)`);
  pane.style.setProperty('grid-template-rows', `repeat(${dimension}, 1fr)`);
}

let cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('mouseover', event => {
      cell.style.setProperty('background-color', 'green');
    })
});
function debugLog(str) {
  if (!isDebug) return;
  console.log(str);
}
