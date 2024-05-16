import { ToDo, Folder, Data } from "./classes";
import { createFolder, createEventListeners, createToDoForm } from "./dom";
const saveData = new Data();
const create = document.querySelector(".add-folder");
const submitFolder = document.querySelector("form>button");
const module = document.querySelector("dialog");
let idCounter = 0;
//Creates needed listeners from dom.ts module
createEventListeners(create, module);
//Function to get the right object in the data
//Function to get folder name and create new folder
submitFolder.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("form");
  const data = new FormData(form);
  const name = data.get("folder");
  createFolder(new Folder(name.toString()), idCounter, saveData);
  idCounter++;
  module.close();
});
const defaultFolder = new Folder("Neat Folder");
createFolder(defaultFolder, idCounter, saveData);
idCounter++;
