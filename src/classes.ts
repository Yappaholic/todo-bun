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
  addTodos(todo: Object) {
    this.todos.push(todo);
    return this.todos;
  }
  removeTodos(todo: Object) {
    let p = this.todos.indexOf(todo);
    if (this.length === 0) {
      return undefined;
    } else {
      this.todos.splice(p, 1);
    }
    return this.todos;
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
  changeTitle(newTitle: string) {
    this.title = newTitle;
    return this.title;
  }
  changeUrgency(newUrgency: Urgency) {
    this.urgency = newUrgency;
    return this.urgency;
  }
  changeDate(newDate: Date) {
    const date: string = format(newDate, "MM/dd/yyyy");
    this.dueDate = date;
    return this.dueDate;
  }
}
class Data {
  public array: Object[];
  public length: number;
  constructor() {
    this.array = [];
    this.length = this.array.length;
  }
  addFolder(object: Folder) {
    this.array.push(object);
    this.length++;
  }
  getFolder(name: string) {
    if (this.length === 0) {
      return undefined;
    }
    for (let i = 0; i < this.length; i++) {
      let object: any = this.array[i];
      if (object.title === name) {
        return object;
      } else {
        return undefined;
      }
    }
  }
}
export { ToDo, Folder, Urgency, Data };
