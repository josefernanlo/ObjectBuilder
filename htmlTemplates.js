const parser = new DOMParser();
let idCounter = 0;
export function createAccordionStep(id, label) {
  return parser.parseFromString(
    `
    <div>
    <button class="accordion" id="step__${id}">${label}</button>
        <div class="panel">
            <p>Este es el paso seleccionado</p>
        </div>
        </div>`,
    "text/html"
  ).body.firstChild;
}

export function RadioElement(event, id = idCounter) {
  idCounter++;
  return parser.parseFromString(
    `<div id="${id}" class="radio inserted" draggable="true" style="left:${event.pageX}px; top:${event.pageY}px">
    <div>
      <p>Sí / No</p>
    </div>
  </div>`,
    "text/html"
  ).body.firstChild;
}

export function SelectElement(event, id = idCounter) {
  idCounter++;
  return parser.parseFromString(
    `<div id="${id}" class="select inserted" draggable="true" style="left:${event.pageX}px; top:${event.pageY}px">
    <div>
      <p>Multiples opciones</p>
    </div>
  </div>`,
    "text/html"
  ).body.firstChild;
}

export function endElement(event, id = idCounter) {
  idCounter++;
  return parser.parseFromString(
    `<div id="${id}" class="end inserted" draggable="true" style="left:${
      event.pageX
    }px; top:${event.pageY - 15}px">
    <div>
      <p>FIN</p>
    </div>
  </div>`,
    "text/html"
  ).body.firstChild;
}

export function subStepElement(event, id = idCounter) {
  idCounter++;
  return parser.parseFromString(
    `<div id="${id}" class="subStep inserted" draggable="true" style="left:${
      event.pageX
    }px; top:${event.pageY - 15}px">
  <div>
    <p>FIN</p>
  </div>
</div>`,
    "text/html"
  ).body.firstChild;
}
