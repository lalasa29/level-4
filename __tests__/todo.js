/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Examine the to-do list.", () => {
  beforeAll(() => {
    add({
      title: "Practicing dance for an hour",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add a new item to the to-do list.", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Going out with Friends",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("A TODO is marked as finished.", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Sort the incomplete TODOs.", () => {
    let lt_t = overdue();

    expect(
      lt_t.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("Get today's TODOs that are past due.", () => {
    let lt_t = dueToday();

    expect(
      lt_t.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("Obtain the upcoming TODOs for later.", () => {
    let lt_t = dueLater();

    expect(
      lt_t.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
