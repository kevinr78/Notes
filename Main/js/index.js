"use strict";

const taskList = [];
let taskCount = 0;

const newTaskButton = document.querySelector("#new_task_button");
const task_title = document.getElementById("task_title");
const task_body = document.getElementById("task_body");
const task_priority = document.getElementById("task_priority");
const task_due_date = document.getElementById("task_due_date");
const save_task_button = document.getElementById("save_task_button");
const taskCardContainer = document.querySelector(".task_list");
const new_task_close_button = document.querySelector(".close_button");
const new_task_add_button = document.querySelector(".add_button");

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
  console.log(taskList);
  updateUi(tempTask);
  taskCount++;
}

function updateUi(task) {
  const { title, body, priority } = task;
  let badgeColor =
    priority === "1"
      ? "text-bg-danger"
      : priority === "2"
      ? "text-bg-warning"
      : "text-bg-success";

  /*   let taskCard = `
  <div class=" task_card">
  <div class="card-header">${title}</div>
  <div class="card-body">
    <h5 class="card-title">${body}</h5>
  </div>
  <div class="card-metadata">
    <h5 class="card-text">
      <span class="badge text-bg-secondary ${badgeColor}">
        <span class="material-symbols-outlined">
          priority_high
        </span> 
        ${priority === 1 ? "High" : priority === 2 ? "Medium" : "Low"}
      </span>
    </h5>
    <h5 class="card-text">
      <span class="badge text-bg-secondary">
        <span class="material-symbols-outlined mr-1">  today </span>
        ${create_date}
      </span>
    </h5>
  </div>
</div>
  `; */

  let taskCard = `    <div class="task_card">
  <div class="task_card_header">
    <p>${title}</p>
    <span class="material-symbols-outlined">
      close
    </span>
  </div>
  <div class="task_card_body">
    <div class="task_card_body_content">
    ${body}
    </div>
  </div>
  <div class="card_metadata">
    <p class="card_metadata_body ${badgeColor}">
      <span class="material-symbols-outlined">
        priority_high
      </span> 
      <span class=" ">
      ${priority === "1" ? "High" : priority === "2" ? "Medium" : "Low"}
      </span>
    </p>
    <p class="card_metadata_body text-bg-secondary">
      <span class="material-symbols-outlined">
        schedule
        </span>
      <span class=" ">
      15/09/2000
      </span>
    </p>
  </div>
</div>`;

  taskCardContainer.insertAdjacentHTML("beforeend", taskCard);
  clearTaskModal();
}

function clearTaskModal() {
  task_title.value = "";
  task_body.value = "";
  task_priority.value = "3";
}
