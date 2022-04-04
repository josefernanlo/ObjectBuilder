import {
  RadioElement,
  SelectElement,
  endElement,
  createAccordionStep,
  subStepElement,
} from "./htmlTemplates.js";

let accordionGlobal = 0;
// ARRAYS GLOBALES
let arraySteps = [];
let arraySubSteps = [];
let stepSelected = "";
let addSubStep = false;
const SUBST = document.getElementById("subStepStep");

window.addEventListener("load", () => {
  /** DRAGGABLES */
  const CANVAS = document.getElementById("right");

  let dragged;
  const RADIOFATHER = document.getElementById("radioFather");
  const SELECTFATHER = document.getElementById("selectFather");
  const ENDFATHER = document.getElementById("endFather");

  document.addEventListener(
    "dragstart",
    function (event) {
      cleanElementsConnection();
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = 0.5;
    },
    false
  );

  function createComponent(event, id) {
    cleanElementsConnection();
    switch (event.target.classList[0]) {
      case "radio":
      case "radio inserted":
        CANVAS.appendChild(RadioElement(event, id));
        break;
      case "select":
      case "select inserted":
        CANVAS.appendChild(SelectElement(event, id));
        break;
      case "end":
      case "end inserted":
        CANVAS.appendChild(endElement(event, id));
        break;
      case "subStep inserted":
        CANVAS.appendChild(subStepElement(event, id));
      default:
        break;
    }
    updateEvents();
  }
  function removeComponent(event) {
    cleanElementsConnection();
    event.target.remove();
  }

  document.addEventListener(
    "dragend",
    function (event) {
      cleanElementsConnection();
      if (event.target.classList.contains("inserted")) {
        if (event.screenX < 300) {
          removeComponent(event);
        } else {
          event.target.style.top = event.clientY;
          event.target.style.left = event.clientX;
        }
      } else {
        if (event.screenX > 300) {
          createComponent(event);
        }
      }
      event.target.style.opacity = "";
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    },
    false
  );

  document.addEventListener(
    "dragover",
    function (event) {
      cleanElementsConnection();
      event.preventDefault();
    },
    false
  );

  /*AÑADIR STEPS*/
  const ADDSTEPBUTTON = document.getElementById("addStep");
  const MODALSTEP = document.getElementById("modalStep");
  const MODALSUBSTEP = document.getElementById("modalSubStep");
  const SPAN0 = document.getElementsByClassName("close")[0];
  const SPAN1 = document.getElementsByClassName("close")[1];
  const CONFIRMADDSTEPBUTTON = document.getElementById("confirmAddStep");
  const CONFIRMADDSSUBTEPBUTTON = document.getElementById("confirmAddSubStep");

  const INPUTID = document.getElementById("stepId");
  const INPUTTAG = document.getElementById("stepTag");
  const INPUTETIQUETA = document.getElementById("stepEtiqueta");
  const CONTAINERSTEP = document.getElementById("containerStep");

  ADDSTEPBUTTON.addEventListener("click", () => {
    let active = document.getElementsByClassName("active");
    if (active.length >= 1) {
      MODALSUBSTEP.style.display = "block";
    } else {
      MODALSTEP.style.display = "block";
    }
  });

  SPAN0.onclick = function () {
    MODALSTEP.style.display = "none";
  };
  SPAN1.onclick = function () {
    MODALSUBSTEP.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == MODALSTEP || event.target == MODALSUBSTEP) {
      MODALSTEP.style.display = "none";
      MODALSUBSTEP.style.display = "none";
    }
  };

  CONFIRMADDSTEPBUTTON.onclick = function (event) {
    MODALSTEP.style.display = "none";
    createStep();
  };

  function createStep() {
    const obj = {
      id: INPUTID.value,
      tag: INPUTTAG.value,
      etiqueta: INPUTETIQUETA.value,
    };
    arraySteps.push(obj);
    console.log(arraySteps);
    CONTAINERSTEP.appendChild(
      createAccordionStep(INPUTID.value, INPUTETIQUETA.value)
    );

    /*Accordion*/

    let ACCORDION = document.getElementsByClassName("accordion");
    ACCORDION[accordionGlobal].addEventListener("click", function (event) {
      this.classList.add("active");
      stepSelected = this.id.split("__").pop();
      SUBST.value = stepSelected;
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }

      let active = document.getElementsByClassName("active");
      for (let j = 0; j < active.length; j++) {
        if (active[j] != this) {
          active[j].nextElementSibling.style.maxHeight = null; //or 0px
          active[j].classList.remove("active");
        }
      }
    });
    accordionGlobal++;
  }

  /*AÑADIR SUBSTEPS*/
  const SUBID = document.getElementById("subStepId");
  const SUBELASTIC = document.getElementById("subStepElastic");
  const SUBTYPI = document.getElementById("subStepTypification");
  const SUBTAG = document.getElementById("subStepTag");

  CONFIRMADDSSUBTEPBUTTON.onclick = function (event) {
    console.log(stepSelected);
    SUBST.value = stepSelected;
    MODALSUBSTEP.style.display = "none";
    createSubStep();
    addSubStep = true;
    CANVAS.classList.add("pulseRequired");
  };

  function createSubStep() {
    const obj = {
      id: SUBID.value,
      elastic: SUBELASTIC.value,
      typification: SUBTYPI.value,
      step: stepSelected,
      tag: SUBTAG.value,
      label: "",
      components: [],
    };
    arraySubSteps.push(obj);
    console.log(arraySubSteps);
  }

  CANVAS.onclick = function (event) {
    if (addSubStep) {
      addSubStep = false;
      CANVAS.classList.remove("pulseRequired");
      CANVAS.appendChild(subStepElement(event));
    }
  };

  function updateEvents() {
    const insertedElements = document.getElementsByClassName("inserted");
    for (var i = 0; i < insertedElements.length; i++) {
      insertedElements[i].addEventListener('click', prueba);
    }
  }

  let element1 = undefined;
  let element2 = undefined; 
  function prueba(event){
    const elementClicked = event.path[0].classList.contains('inserted') ? event.path[0] : event.path[2];
    if (element1 === undefined){
      element1 = elementClicked
    } else {
      element2 = elementClicked
      const endpointOptions = { isSource: true, isTarget: true };
      const d1 = jsPlumb.addEndpoint( element1, { anchor: "LeftMiddle" }, endpointOptions );
      const d2 = jsPlumb.addEndpoint( element2, { anchor: "LeftMiddle" }, endpointOptions );

      try {
        jsPlumb.connect({
          source: d1,
          target: d2,
          connector: [ "Flowchart", { curviness: 1, stub: 10 }, {cssClass:"connectorClass"} ],
          paintStyle:{ strokeStyle:"#00f", lineWidth:2 },
        });
        jsPlumb.draggable(element1.id);
        jsPlumb.draggable(element2.id);
      } catch(error) {
        console.log(error)
      } finally {
        cleanElementsConnection();
      }
    }
  }
  function cleanElementsConnection(){
    element1 = undefined;
    element2 = undefined; 
  }
});

jsPlumb.ready(function() {
  jsPlumb.Defaults.Endpoint = "Blank";
  const container = document.getElementById("right")
  jsPlumb.setContainer(container);
});