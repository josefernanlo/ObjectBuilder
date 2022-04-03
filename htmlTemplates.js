const parser = new DOMParser();

export function createAccordionStep(id, label) {
  return parser.parseFromString(
    `
    <div>
    <button class="accordion" id="step${id}">${label}</button>
        <div class="panel">
            <p>Este es el paso seleccionado</p>
        </div>
        </div>`,
    "text/html"
  ).body.firstChild;
}

export function RadioElement(event) {
  return parser.parseFromString(
    `<div class="radio inserted" draggable="true" style="left:${
      event.clientX - event.target.offsetLeft
    }px; top:${event.clientY}px">
    <div>
      <p>Sí / No</p>
    </div>
  </div>`,
    "text/html"
  ).body.firstChild;
}

export function SelectElement(event) {
  return parser.parseFromString(
    `<div class="select inserted" draggable="true" style="left:${
      event.clientX - event.target.offsetLeft + 50
    }px; top:${event.clientY - 30}px">
    <div>
      <p>Multiples opciones</p>
    </div>
  </div>`,
    "text/html"
  ).body.firstChild;
}

export function endElement(event) {
  return parser.parseFromString(
    `<div class="end inserted" draggable="true" style="left:${
      event.clientX - event.target.offsetLeft + 200
    }px; top:${event.clientY - 15}px">
    <div>
      <p>FIN</p>
    </div>
  </div>`,
    "text/html"
  ).body.firstChild;
}
