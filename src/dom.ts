import { ToDo, Folder, Urgency } from "./classes";
//Create new folder object and div
function createFolder(object: Folder): void {
  const newToDoButton = document.createElement("button");
  const main = document.querySelector(".main");
  const div = document.createElement("div");
  const title = document.createElement("p");
  const objectId = object.getTitle().replace(" ", "-");
  newToDoButton.classList.toggle("new");
  newToDoButton.textContent = "Add todo";
  div.classList.toggle("folder");
  div.setAttribute("id", objectId);
  title.textContent = object.getTitle();
  div.appendChild(title);
  div.appendChild(newToDoButton);
  main.appendChild(div);
}
//Some dialog stuff to create Folders
function createEventListeners(create: Element, module: any): void {
  create.addEventListener("click", () => {
    module.showModal();
  });
}
export { createFolder, createEventListeners };
