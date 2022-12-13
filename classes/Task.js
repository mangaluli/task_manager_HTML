export default class Task {
  constructor(description = '', completed = false) {
    this.id = uniqueId();
    this.description = description;
    this.completed = completed;
  };

  get = key => this[key];
  set = (key, value) => this[key] = value;

  html = () => this.completed ?
    `<div class="row my-3">
      <div class="col-sm">
        <input type="text" class="form-control text-secondary text-decoration-line-through" value="${this.description}" placeholder="I'm empty :)" readonly>
      </div>
      <div class="col-sm-auto mt-sm-0 mt-2 text-white" data-id="${this.id}">
        <button type="button" class="btn btn-success disabled"><i class="fa-solid fa-check-double"></i></button>
        <button type="button" class="btn btn-primary disabled"><i class="fa-solid fa-pen"></i></button>
        <button type="button" id="btn_delete" class="btn btn-danger"><i class="fa-sharp fa-solid fa-trash"></i></button>
      </div>
    </div>`
    :
    `<div class="row my-3">
      <div class="col-sm">
        <input type="text" class="form-control" id="task" value="${this.description}" placeholder="I'm empty :)">
      </div>
      <div class="col-sm-auto mt-sm-0 mt-2 text-white" data-id="${this.id}">
        <button type="button" id="btn_complete" class="btn btn-success"><i class="fa-solid fa-check"></i></button>
        <button type="button" id="btn_update" class="btn btn-primary"><i class="fa-solid fa-pen"></i></button>
        <button type="button" id="btn_delete" class="btn btn-danger"><i class="fa-sharp fa-solid fa-trash"></i></button>
      </div>
    </div>`
}

function uniqueId() {
  var date = Date.now();
  if (date <= uniqueId.previous) {
    date = ++uniqueId.previous;
  } else {
    uniqueId.previous = date;
  }
  return date;
}

uniqueId.previous = 0;