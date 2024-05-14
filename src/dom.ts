import { ToDo, Folder, Data } from "./classes";
//Create new folder object and div
function createFolder(object: Folder) {
  const newToDoButton = document.createElement("button");
  const main = document.querySelector(".main");
  const div = document.createElement("div");
  const title = document.createElement("p");
  const objectId = object.getTitle().replace(" ", "-");
  newToDoButton.classList.toggle("new");
  newToDoButton.textContent = "Add todo";
  newToDoButton.setAttribute("type", "button");
  div.classList.toggle("folder");
  div.setAttribute("id", objectId);
  title.textContent = object.getTitle();
  newToDoButton.addEventListener("click", () => {
    createToDoForm();
  });
  div.appendChild(title);
  div.appendChild(newToDoButton);
  main.appendChild(div);
}
function createToDo(div: Element, data: FormData) {
  const isDone = document.createElement("button");
  const title = document.createElement("p");
  const urgency = document.createElement("p");
  const date = document.createElement("p");
  title.textContent = data.get("title").toString();
  urgency.textContent = data.get("urgency").toString();
  div.appendChild(title);
  div.appendChild(urgency);
}
//Creates div with form to get data and then create new todo
function createToDoForm() {
  const main = document.querySelector(".main");
  const div = document.createElement("div");
  div.classList.toggle("todo-form");
  const form = document.createElement("form");
  div.appendChild(form);
  const name = document.createElement("input");
  name.setAttribute("type", "text");
  name.setAttribute("name", "title");
  name.required = true;
  const urgency = document.createElement("select");
  urgency.setAttribute("name", "urgency");
  const asap = document.createElement("option");
  asap.value = "ASAP";
  asap.textContent = "ASAP";
  const done = document.createElement("option");
  done.value = "Done";
  done.textContent = "Done";
  const inProgress = document.createElement("option");
  inProgress.value = "In Progress";
  inProgress.textContent = "In Progress";
  const cancelled = document.createElement("option");
  cancelled.value = "Cancelled";
  cancelled.textContent = "Cancelled";
  const date = document.createElement("input");
  date.setAttribute("type", "date");
  date.setAttribute("name", "date");
  date.required = true;
  const submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.textContent = "Create todo";
  submit.addEventListener("click", (e) => {
    const validity = form.checkValidity();
    if (!validity) {
      form.reportValidity();
    } else {
      e.preventDefault();
      while (div.firstChild) {
        div.removeChild(div.lastChild);
      }
      const data = new FormData(form);
      createToDo(div, data);
    }
  });
  urgency.appendChild(asap);
  urgency.appendChild(done);
  urgency.appendChild(inProgress);
  urgency.appendChild(cancelled);
  form.appendChild(name);
  form.appendChild(urgency);
  form.appendChild(date);
  form.appendChild(submit);
  div.appendChild(form);
  main.appendChild(div);
}
//Some dialog stuff to create Folders
function createEventListeners(create: Element, module: any): void {
  create.addEventListener("click", () => {
    module.showModal();
  });
}
export { createFolder, createEventListeners, createToDoForm };
