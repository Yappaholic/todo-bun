import { ToDo, Folder, Data } from "./classes";
import { createFolder, createEventListeners, createToDoForm } from "./dom";
const saveData = new Data();
const create = document.querySelector(".add-folder");
const submitFolder = document.querySelector("form>button");
const module = document.querySelector("dialog");
//Creates needed listeners from dom.ts module
createEventListeners(create, module);
//Function to get the right object in the data
//Function to get folder name and create new folder
submitFolder.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("form");
  const data = new FormData(form);
  const name = data.get("folder");
  saveData.addFolder(new Folder(name.toString()));
  createFolder(new Folder(name.toString()));
  module.close();
});
const defaultFolder = new Folder("Neat Folder");
createFolder(defaultFolder);
saveData.addFolder(defaultFolder);
const todo = new ToDo("Neat", "ASAP", new Date(2005, 12, 12));
defaultFolder.addTodos(todo);
