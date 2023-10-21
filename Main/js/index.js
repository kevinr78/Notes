"use strict";

const taskList = [];
let taskCount = 0;

const newTaskButton = document.querySelector("#new_task_button");
const task_title = document.getElementById("task_title");
const task_body = document.getElementById("task_body");
const task_priority = document.getElementById("task_priority");
const task_due_date = document.getElementById("task_due_date");
const save_task_button = document.getElementById("save_task_button");
const taskCardContainer = document.querySelector(".task_card_container");
const new_task_close_button = document.querySelector(".close_button");
const new_task_add_button = document.querySelector(".add_button");
const taskCardCloseBtn = document.querySelector(".task_card_close_button");

const sideNavMenuBtn = document.querySelector(".side_menu_button");

class Task {
  constructor(title, body, date, priority) {
    this.title = title;
    this.body = body;
    this.date = date;
    this.priority = priority;
  }

  /*  set date(value) {
    if (new Date(value) < new Date()) {
      return "Date cannot be in the past";
    }
  } */
}
/* 
save_task_button.addEventListener("click", createNewTask); */
document
  .querySelector(".new_task_input_container")
  .addEventListener("click", (e) => {
    document.querySelector(".toggle_input").classList.add("expand");
  });

sideNavMenuBtn.addEventListener("click", (e) => {
  document.querySelector(".side_menu").classList.add("expand_side");
});
new_task_add_button.addEventListener("click", () => {
  createNewTask();
});

function createNewTask() {
  let tempTask = Object.create({});

  if (
    task_title.textContent == "" ||
    task_body.textContent == "" ||
    task_priority.value == ""
  ) {
    alert("Please fill all the details");
    return;
  }
  tempTask["id"] = taskCount + 1;
  tempTask["title"] = task_title.textContent;
  tempTask["body"] = task_body.textContent;
  tempTask["priority"] = task_priority.value;
  /*  tempTask["create_date"] = task_due_date.value; */

  taskList.push(tempTask);

  updateUi(tempTask);
  taskCount++;
}

function updateUi(task) {
  const { id, title, body, priority } = task;
  let tHeader, tBody, tPriority, taskCardPriorityBadge, tDate, tCloseBtn;
  let taskCardTemplate = document.querySelector("#task_card_template");

  let cardClone = taskCardTemplate.content.cloneNode(true);
  console.log(cardClone.querySelector(".task_card_header").dataset);
  let badgeColor =
    priority === "1"
      ? "text-bg-danger"
      : priority === "2"
      ? "text-bg-warning"
      : "text-bg-success";

  tHeader = cardClone.querySelectorAll("#task_card_header_text")[0];
  tBody = cardClone.querySelectorAll(".task_card_body_content")[0];
  tCloseBtn = cardClone.querySelectorAll("#delete_card_button")[0];
  tCloseBtn.addEventListener("click", removeCard);
  tPriority = cardClone.querySelectorAll(".card_metadata_priority")[0];
  tDate = cardClone.querySelectorAll(".card_metadata_date")[0];
  taskCardPriorityBadge = cardClone.querySelector(".card_metadata_body");
  cardClone.querySelector(".task_card").id = `card_${id}`;
  tHeader.textContent = title;
  tBody.textContent = body;
  tPriority.textContent =
    priority === "1" ? "High" : priority === "2" ? "Medium" : "Low";
  tDate.textContent = new Date().toLocaleDateString();
  taskCardPriorityBadge.classList.add(badgeColor);

  taskCardContainer.appendChild(cardClone);
  clearTaskModal();
}

function clearTaskModal() {
  task_title.value = "";
  task_body.value = "";
  task_priority.value = "3";
}

function removeCard(e) {
  let cardId = e.target.parentElement.parentElement.id;
  console.log(cardId);
  document.getElementById(cardId).remove();
}
