import TaskManager from "./classes/TaskManager.js";

function render() {
  let
    output_tasks = document.querySelector('#o_task'),
    output_completed = document.querySelector('#o_complete');
  output_tasks.innerHTML = '';
  output_completed.innerHTML = '';

  // Add to Tasks to screen
  manager.tasks.forEach(task =>
    task.get('completed') ?
      output_completed.innerHTML += task.html()
      :
      output_tasks.innerHTML += task.html()
  )

  // Clear Event Listeners
  let
    old_node = document.querySelector('body'),
    new_node = old_node.cloneNode(true);
  old_node.parentNode.replaceChild(new_node, old_node);

  // Buttons
  let
    button_add = document.querySelector('#btn_add'),
    button_complete = document.querySelectorAll('#btn_complete'),
    button_update = document.querySelectorAll('#btn_update'),
    button_delete = document.querySelectorAll('#btn_delete');

  // Add new Task
  button_add.addEventListener('click', () => {
    let input = button_add.parentElement.parentElement.children[0].children[0];
    manager.addTask(input.value);
    input.value = '';
    render();
  });

  // Complete Task
  button_complete.forEach(button => button.addEventListener('click', () => {
    let id = button.parentElement.dataset.id;
    manager.completeTask(id);
    render();
  }));

  // Update Task's Description
  button_update.forEach(button => button.addEventListener('click', () => {
    let id = button.parentElement.dataset.id;
    let description = button.parentElement.parentElement.children[0].children[0].value;
    manager.updateTask(id, description);
    render();
  }));

  // Delete Task
  button_delete.forEach(button => button.addEventListener('click', () => {
    let id = button.parentElement.dataset.id;
    manager.deleteTask(id);
    render();
  }));
}

let manager = new TaskManager();

// Tip's! - Only on your 1st visit.
if (localStorage.getItem('tipped') != 'true') {
  manager.addTask('✅ Complete ➡️');
  manager.addTask('✏️ Save ➡️');
  manager.addTask('🗑️ Delete ➡️');
  manager.addTask('I did this one already', true);
  localStorage.setItem('tipped', true);
}

render();