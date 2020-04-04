import { EVENT_TYPES, SELECTORS } from "./constants";

const getInput = () => {
  try {
    const inputFieldEl = document.querySelector(SELECTORS.INPUT_FIELD);
    return inputFieldEl;
  } catch (error) {
    console.error("Failed to get input value", error);
  }
};

const clearInput = element => {
  try {
    element.value = "";
  } catch (error) {
    console.error("Failed to clear input", error);
  }
};

const createFragment = HTMLstring => {
  try {
    const docFrag = document.createDocumentFragment();
    const tempEl = document.createElement("div");
    tempEl.insertAdjacentHTML("afterbegin", HTMLstring);
    while (tempEl.firstChild) {
      docFrag.appendChild(tempEl.firstChild);
    }
    return docFrag;
  } catch (error) {
    console.error("Failed to create document fragment", error);
  }
};

const createTodoFragment = string => {
  try {
    const markup = `
    <div class="c-todos__item">
      <p>${string}</p>
      <i class="far fa-times-circle c-todos__remove"></i>
    </div> 
  `;
    const docFrag = createFragment(markup);
    return docFrag;
  } catch (error) {
    console.error("Failed to create todo fragment", error);
  }
};

const appendTodo = fragment => {
  try {
    const todoContainer = document.querySelector(SELECTORS.TODO_CONTAINER);
    todoContainer.appendChild(fragment);
  } catch (error) {
    console.error("Failed to append todo", error);
  }
};

function removeTodo() {
  try {
    this.closest(SELECTORS.TODO_ITEM).remove();
  } catch (error) {
    console.error("Failed to remove todo", error);
  }
}

const sumbitTodo = () => {
  try {
    const input = getInput();
    const todoStr = input.value;
    if (!todoStr) return;
    clearInput(input);
    const todoFrag = createTodoFragment(todoStr);
    attachEvent({
      context: todoFrag,
      selector: SELECTORS.TODO_REMOVE,
      type: EVENT_TYPES.CLICK,
      callback: removeTodo
    });
    appendTodo(todoFrag);
  } catch (error) {
    console.error("Failed to submit todo", error);
  }
};

const attachEvent = ({ context, selector, type, callback } = args) => {
  try {
    const el = context.querySelector(selector);
    if (type === EVENT_TYPES.KEYPRESS) {
      el.addEventListener(type, event => {
        if (event.key === "Enter") {
          callback();
        }
      });
    } else {
      el.addEventListener(type, callback);
    }
  } catch (error) {
    console.error("Failed to attach event", error);
  }
};

const init = () => {
  try {
    attachEvent({
      context: document,
      selector: SELECTORS.ICON,
      type: EVENT_TYPES.CLICK,
      callback: sumbitTodo
    });
    attachEvent({
      context: document,
      selector: SELECTORS.INPUT_FIELD,
      type: EVENT_TYPES.KEYPRESS,
      callback: sumbitTodo
    });
  } catch (error) {
    console.error("Failed to initialise", error);
  }
};

window.addEventListener(EVENT_TYPES.LOAD, init);
