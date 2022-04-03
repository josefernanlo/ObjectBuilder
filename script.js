import {
  RadioElement,
  SelectElement,
  endElement,
  createAccordionStep,
} from "./htmlTemplates.js";

let accordionGlobal = 0;
// ARRAYS GLOBALES
let arraySteps = [];
let arraySubSteps = [];

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
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = 0.5;
    },
    false
  );

  function createComponent(event) {
    switch (event.target.className) {
      case "radio":
      case "radio inserted":
        CANVAS.appendChild(RadioElement(event));
        break;
      case "select":
      case "select inserted":
        CANVAS.appendChild(SelectElement(event));
        break;
      case "end":
      case "end inserted":
        CANVAS.appendChild(endElement(event));
        break;
      default:
        break;
    }
  }
  function removeComponent(event) {
    event.target.remove();
  }

  document.addEventListener(
    "dragend",
    function (event) {
      if (event.target.classList.contains("inserted")) {
        if (event.screenX < 300) {
          removeComponent(event);
        } else {
          removeComponent(event);
          createComponent(event);
        }
      } else {
        if (event.screenX > 300) {
          createComponent(event);
        }
      }
      event.target.style.opacity = "";
    },
    false
  );

  document.addEventListener(
    "dragover",
    function (event) {
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

  function createSubStep(){
      const obj = {
          id: [],
          elastic: '',
          typification: '',
          step: '',
          tag: '',
          label: '',
          components: [],
      }
  }

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

  /*AAÑADIR SUBSTEPS*/


});
