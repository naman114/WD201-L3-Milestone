const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((todoItem) => getTodoItemStatus(todoItem) === -1);
  };

  const dueToday = () => {
    return all.filter((todoItem) => getTodoItemStatus(todoItem) === 0);
  };

  const dueLater = () => {
    return all.filter((todoItem) => getTodoItemStatus(todoItem) === 1);
  };

  const toDisplayableList = (list) => {
    return list
      .map((listItem) => {
        let todoListText = `[${listItem.completed ? "x" : " "}] ${
          listItem.title
        }`;

        const listItemStatus = getTodoItemStatus(listItem);
        if (listItemStatus === -1 || listItemStatus === 1)
          todoListText +=
            " " + new Date(listItem.dueDate).toISOString().split("T")[0];

        return todoListText;
      })
      .join("\n");
  };

  const getTodoItemStatus = (todoItem) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(todoItem.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (now.valueOf() === dueDate.valueOf()) return 0; // Due Today
    else if (now < dueDate) return 1; // Due Later

    return -1; // Overdue
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var d = new Date();
const today = formattedDate(d);
const yesterday = formattedDate(new Date(d.setDate(d.getDate() - 1)));
const tomorrow = formattedDate(new Date(d.setDate(d.getDate() + 2)));

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
