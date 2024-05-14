import { ToDo, Folder, Urgency } from "./classes";
import { createFolder, createEventListeners } from "./dom";
const create = document.querySelector(".add-folder");
const submitFolder = document.querySelector("form>button");
const module = document.querySelector("dialog");
//Creates needed listeners from dom.ts module
createEventListeners(create, module);
const saveData: Folder[] = [];
//Function to get the right object in the data
function getObject(id: string) {
  for (let i = 0; i < saveData.length; i++) {
    if (saveData[i].title === id) {
      return saveData[i];
    }
  }
}
//Function to get folder name and create new folder
submitFolder.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("form");
  const data = new FormData(form);
  const name = data.get("folder");
  saveData.push(new Folder(name.toString()));
  createFolder(new Folder(name.toString()));
  module.close();
});
const defaultFolder = new Folder("Neat Folder");
createFolder(defaultFolder);
saveData.push(defaultFolder);
