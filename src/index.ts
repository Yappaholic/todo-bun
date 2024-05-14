import { ToDo, Folder, Urgency } from "./classes";
const main = document.querySelector(".main");
const newToDo = document.querySelector(".new");
const create = document.querySelector(".add-folder");
const module = document.querySelector("dialog");
const submitFolder = document.querySelector("form>button");
const form = document.querySelector("form");
const defaultFolder = new Folder("Neat Folder");
const defaultToDo = new ToDo("Neat todo", "In Process", new Date(2005, 12, 12));
const newToDoButton = document.createElement("button");
defaultFolder.addTodos(defaultToDo);
function createFolder(object: Folder) {
  const div = document.createElement("div");
  const title = document.createElement("p");
  const toggle = document.createElement("button");
  const objectName = object.getTitle().replace(" ", "-");
  newToDoButton.classList.toggle("new");
  newToDoButton.textContent = "Add todo";
  div.classList.toggle("folder");
  div.classList.add(objectName);
  title.textContent = object.getTitle();
  toggle.textContent = "Open folder ▼";
  div.appendChild(title);
  div.appendChild(newToDoButton);
  div.appendChild(toggle);
  main.appendChild(div);
}
create.addEventListener("click", () => {
  module.showModal();
});
submitFolder.addEventListener("click", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("folder");
  createFolder(new Folder(name.toString()));
  module.close();
});
createFolder(defaultFolder);
console.log("hiiiiii");
