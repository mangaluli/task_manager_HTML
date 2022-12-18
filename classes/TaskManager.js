import Task from "./Task.js";

export default class TaskManager {
  constructor() {
    this.tasks = [];

    // Stores the, converted to Task, locally stored objects into (this.tasks) array.
    if (typeof localStorage.getItem('tasks') === 'string') {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
      this.tasks.forEach((object, index) => this.tasks[index] = Object.assign(new Task(), object));
    }
  }

  addTask(description, completed = false) {
    this.tasks.push(new Task(description, completed));
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id != id);
  }

  updateTask(id, description) {
    this.tasks.filter(task => task.id == id)[0].set('description', description);
  }

  completeTask(id) {
    this.tasks.filter(task => task.id == id)[0].set('completed', true);
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}