type Urgency = "ASAP" | "Done" | "Canceled" | "In Progress";
import { format } from "date-fns";
class Folder {
  public title: string;
  public todos: Object[];
  public length: number;
  constructor(title: string, ...args: Object[]) {
    this.title = title;
    this.todos = args;
    this.length = this.todos.length;
  }
  changeTitle(newTitle: string) {
    this.title = newTitle;
    return this.title;
  }
  getTitle() {
    return this.title;
  }
  getTodos() {
    return this.todos;
  }
  addTodos(todo: Object, data: Data) {
    this.todos.push(todo);
    this.length++;
  }
}
class ToDo {
  public title: string;
  public urgency: Urgency;
  public dueDate: string;
  public isDone: boolean;

  constructor(title: string, urgency: Urgency, dueDate: Date) {
    this.title = title;
    this.urgency = urgency;
    this.dueDate = format(dueDate, "MM/dd/yyyy");
    this.isDone = false;
  }
  changeIsDone(state: boolean, data: Data) {
    this.isDone = state;
    data.updateData();
  }
}
class Data {
  public array: Object[];
  public length: number;
  constructor() {
    this.array = [];
    this.length = 0;
  }
  addFolder(object: Folder) {
    this.array.push(object);
    this.length++;
    this.updateData();
    return this.array;
  }
  getFolder(name: string) {
    for (let i = 0; i <= this.length; i++) {
      const object: any = this.array[i];
      if (!object) {
        return undefined;
      } else if (object.title === name) {
        return object;
      }
    }
  }
  getToDo(folderTitle: string, toDoTitle: string) {
    const parent: Folder = this.getFolder(folderTitle);
    for (let i = 0; i <= parent.todos.length; i++) {
      let todo: any = parent.todos[i];
      if (todo.title === toDoTitle) {
        let p = parent.todos.indexOf(todo);
        return parent.todos[p];
      }
    }
  }
  deleteToDo(folderName: string, toDoName: string) {
    const object: Folder = this.getFolder(folderName);
    for (let i = 0; i <= object.todos.length; i++) {
      let todo: any = object.todos[i];
      if (todo.title === toDoName) {
        let p = object.todos.indexOf(todo);
        if (this.length === 0) {
          this.updateData();
          return undefined;
        } else {
          object.todos.splice(p, 1);
        }
        this.updateData();
        return object;
      }
    }
  }
  deleteFolder(folderName: string) {
    const folder = this.getFolder(folderName);
    this.array.splice(folder, 1);
    this.length--;
    this.updateData();
    return this.array;
  }
  updateData() {
    const json = JSON.stringify(this.array);
    localStorage["data"] = json;
  }
  restoreData(restoreArray: Object[]) {
    this.array = [...restoreArray];
    this.length = this.array.length;
    return this.array;
  }
}
export { ToDo, Folder, Urgency, Data };
