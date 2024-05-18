import { ToDo, Folder, Data, Urgency } from "./classes";
import { parse } from "date-fns";
//Create new folder object and div
function createFolder(object: Folder, numberId: number, saveData: Data) {
  const newToDoButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete folder";
  const main = document.querySelector(".main");
  const folderContainer = document.createElement("div");
  const objectId = object.getTitle().replace(" ", "-");
  folderContainer.setAttribute("id", numberId.toString());
  const div = document.createElement("div");
  const title = document.createElement("p");
  newToDoButton.classList.toggle("new");
  newToDoButton.textContent = "Add todo";
  newToDoButton.setAttribute("type", "button");
  div.classList.toggle("folder");
  div.setAttribute("id", objectId);
  title.textContent = object.getTitle();
  saveData.addFolder(object);
  deleteButton.addEventListener("click", () => {
    saveData.deleteFolder(object.getTitle());
    folderContainer.remove();
  });
  newToDoButton.addEventListener("click", () => {
    createToDoForm(numberId, saveData);
  });
  folderContainer.appendChild(div);
  div.appendChild(title);
  div.appendChild(newToDoButton);
  div.appendChild(deleteButton);
  main.appendChild(folderContainer);
}
function createToDo(
  div: Element,
  data: FormData,
  saveData: Data,
  folderId: number,
) {
  const folder = document.getElementById(folderId.toString()).firstElementChild
    .id;
  const folderTitle = folder.replace("-", " ");
  const deleteButton = document.createElement("button");
  deleteButton.classList.toggle("delete-todo");
  deleteButton.textContent = "delete todo";
  const isDone = document.createElement("button");
  isDone.classList.toggle("not-done");
  isDone.addEventListener("click", () => {});
  const title = document.createElement("p");
  const urgency = document.createElement("p");
  const date = document.createElement("p");
  title.textContent = data.get("title").toString();
  urgency.textContent = data.get("urgency").toString();
  date.textContent = data.get("date").toString();
  //isDone button event
  isDone.addEventListener("click", () => {
    let toDoObj: any = saveData.getToDo(folderTitle, title.textContent);
    if (isDone.classList.contains("not-done")) {
      isDone.classList.toggle("not-done");
      isDone.classList.toggle("done");
      toDoObj.changeIsDone(true, saveData);
    } else if (isDone.classList.contains("done")) {
      isDone.classList.toggle("not-done");
      isDone.classList.remove("done");
      toDoObj.changeIsDone(false, saveData);
    }
  });
  //Button to delete todo
  deleteButton.addEventListener("click", () => {
    const parent = deleteButton.parentElement;
    parent.remove();
    saveData.deleteToDo(folderTitle, title.textContent);
  });
  //
  const toDoUrgency: any = data.get("urgency").toString();
  let toDoDate: any = data.get("date").toString();
  toDoDate = toDoDate.replace("-", "/").replace("-", "/");
  const parseDate = parse(toDoDate, "yyyy/MM/dd", new Date());
  const toDo = new ToDo(title.textContent, toDoUrgency, parseDate);
  const folderObject: Folder = saveData.getFolder(folderTitle);
  folderObject.addTodos(toDo, saveData);
  div.appendChild(isDone);
  div.appendChild(title);
  div.appendChild(urgency);
  div.appendChild(date);
  div.appendChild(deleteButton);
  return 0;
}
//Creates div with form to get data and then create new todo
function createToDoForm(folderId: number, saveData: Data) {
  const folder = document.getElementById(folderId.toString());
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
  //Check validity and send data to create todo
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
      createToDo(div, data, saveData, folderId);
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
  folder.appendChild(div);
}
//Some dialog stuff to create Folders
function createEventListeners(create: Element, module: any): void {
  create.addEventListener("click", () => {
    module.showModal();
  });
}
export { createFolder, createEventListeners, createToDoForm };
