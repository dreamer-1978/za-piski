export const templateTodoItem = ({ task, id, isCompleted }) => {
  return `
    <li class="item">
         <h3 class="taskItem ${
           isCompleted ? "taskDown" : ""
         }" data-id="${id}" data-action="changeStatus">${task}</h3>
        <button type="button" class="buttonRemove" data-action="removeTodo" data-id="${id}">
        <img class="deleteIcon" src="/images/delete.svg" alt="del">                
        </button>
        <button type="button" class="buttonCancel hiddenButton" data-action="cancelButton">CANCEL</button>
    </li>
    `;
};
