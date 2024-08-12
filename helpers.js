export const dataList = {
  todoList: [],

  initTodo(list) {
    this.todoList = list;
  },

  addTodo(task) {
    const newTodo = {
      id: Date.now().toString(),
      task,
      isCompleted: false,
    };
    this.todoList = [...this.todoList, newTodo];
    return newTodo;
  },
  changeStatus(id) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
  },

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  },
};
