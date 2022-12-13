import Task from "./Task.js";

export default class TaskManager {
  constructor() {
    this.tasks = [];

    if (typeof localStorage.getItem('tasks') === 'string') {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
      this.tasks.forEach((object, index) => this.tasks[index] = Object.assign(new Task(), object));
    }
  }

  addTask(description, completed = false) {
    this.tasks.push(new Task(description, completed));
    this.updateLocalStorage();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id != id);
    this.updateLocalStorage();
  }

  updateTask(id, description) {
    console.log(`updateTask(${id}) ${description})`);
    this.tasks.filter(task => task.id == id)[0].set('description', description);
    this.updateLocalStorage();
  }

  completeTask(id) {
    this.tasks.filter(task => task.id == id)[0].set('completed', true);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

