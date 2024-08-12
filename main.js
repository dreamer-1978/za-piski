import { templateTodoItem } from "./templateTodoItem.js";
import { dataList } from "./helpers.js";

const refs = {
  formTodo: document.querySelector(".js_formTodo"),
  list: document.querySelector(".js_List"),
};

refs.formTodo.addEventListener("submit", onSubmit);
refs.list.addEventListener("click", onClickByList);

//   todoList: [],

//   initTodo(list) {
//     this.todoList = list;
//   },

//   addTodo(task) {
//     const newTodo = {
//       id: Date.now().toString(),
//       task,
//       isCompleted: false,
//     };
//     this.todoList = [...this.todoList, newTodo];
//     return newTodo;
//   },
//   changeStatus(id) {
//     this.todoList = this.todoList.map((todo) => {
//       if (todo.id === id) {
//         return { ...todo, isCompleted: !todo.isCompleted };
//       }
//       return todo;
//     });
//   },

//   removeTodo(id) {
//     this.todoList = this.todoList.filter((todo) => todo.id !== id);
//   },
// };

const addInitList = () => {
  let listTodo = localStorage.getItem("list");
  if (!listTodo) return;
  listTodo = JSON.parse(listTodo);
  dataList.initTodo(listTodo);
  const markup = listTodo.map((todo) => templateTodoItem(todo)).join("");
  refs.list.innerHTML = markup;
};
addInitList();
function onSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const input = form.elements.taskTodo;
  const { value } = input;
  const currentTodo = dataList.addTodo(value);

  if (!value.trim()) {
    return;
  }
  const markupTodoItem = templateTodoItem(currentTodo);
  refs.list.insertAdjacentHTML("beforeend", markupTodoItem);
  localStorage.setItem("list", JSON.stringify(dataList.todoList));
  form.reset();
  input.focus();
}

function onClickByList({ target }) {
  if (target.dataset.action === "removeTodo") {
    const removeButton = target;
    const parentLi = removeButton.closest(".item");
    const cancelButton = parentLi.querySelector(
      'button[data-action="cancelButton"]'
    );
    parentLi.classList.add("itemRemove");
    removeButton.classList.add("hiddenButton");
    cancelButton.classList.remove("hiddenButton");
    const timer = 3;
    let count = 0;
    cancelButton.textContent = `CANCEL ${timer}s`;

    const idST = setInterval(() => {
      count += 1;
      cancelButton.textContent = `CANCEL ${timer - count}s`;
      if (timer <= count) {
        clearInterval(idST);

        dataList.removeTodo(removeButton.dataset.id);
        parentLi.remove();
        localStorage.setItem("list", JSON.stringify(dataList.todoList));
      }
      cancelButton.setAttribute("data-id-si", idST);
    }, 1000);
    return;
  }

  if (target.dataset.action === "cancelButton") {
    const cancelButton = target;
    const parentLi = cancelButton.closest(".item");
    const removeButton = parentLi.querySelector(
      'button[data-action="removeTodo"]'
    );
    console.log(cancelButton.dataset);
    clearInterval(cancelButton.dataset.idSi);
    parentLi.classList.remove("itemRemove");
    removeButton.classList.remove("hiddenButton");
    cancelButton.classList.add("hiddenButton");
    return;
  }

  if (target.dataset.action === "changeStatus") {
    target.classList.toggle("taskDown");
    dataList.changeStatus(target.dataset.id);
    localStorage.setItem("list", JSON.stringify(dataList.todoList));
  }
}
