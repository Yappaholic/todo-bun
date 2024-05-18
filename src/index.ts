import { ToDo, Folder, Data } from "./classes";
import { createFolder, createEventListeners, createToDo } from "./dom";
import { parse } from "date-fns";
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
  const name = data.get("folder").toString();
  console.log(saveData);
  createFolder(new Folder(name), idCounter, saveData);
  idCounter++;
  module.close();
});
//localStorage.clear();
function restoreData() {
  if (!localStorage["data"] || localStorage["data"] === "[]") {
    console.log("empty");
    return 0;
  } else {
    const restData = JSON.parse(localStorage["data"]);
    saveData.restoreData(restData);
    for (let i = 0; i < saveData.array.length; i++) {
      const folder: any = saveData.array[i];
      createFolder(new Folder(folder.title), idCounter, saveData);
      for (let j = 0; j < folder.todos.length; j++) {
        const folderId = document.getElementById(idCounter.toString());
        const div = document.createElement("div");
        div.classList.toggle("todo-form");
        folderId.appendChild(div);
        const todo: ToDo = folder.todos[j];
        const todoDate = parse(todo.dueDate, "MM/dd/yyyy", new Date());
        createToDo(
          div,
          todo.title,
          todo.urgency,
          todoDate,
          saveData,
          idCounter,
          folder,
        );
      }
      idCounter++;
    }
    return restData;
  }
}
restoreData();
