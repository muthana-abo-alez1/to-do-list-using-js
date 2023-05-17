import readline from 'readline';
import Task from './Task.js';
import inquirer from 'inquirer';
function menu() {
  console.log("\n***************************");
  console.log("Welcome to JS TODO-APP");
  console.log("***************************");
  console.log("Select an action:");
  console.log("1) Add a new task");
  console.log("2) List all tasks");
  console.log("3) List completed tasks");
  console.log("4) Mark the task as done");
  console.log("5) Delete a task");
  console.log("6) Sort tasks by the due date");
  console.log("7) Sort tasks by priority");
  console.log("8) Clear all tasks");
  console.log("0) Exit");
  console.log("***************************\n");
}

async function main() {
  let userInput = 0;
  const Tasks= new Task();
  var newTask=new Task();
  let name;
  do {
    menu();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    userInput = parseInt(await getInput(rl, 'Enter your action: '));
    switch (userInput) {
      case 1:
        rl.close();
        console.log("Adding a new task...");
        newTask= await Tasks.createObject();
        Tasks.addTask(newTask);
        break;
      case 2:
        rl.close();
        console.log("Listing all tasks...");
        Tasks.printTasksArray();
        break;
      case 3:
        rl.close();
        console.log("Listing completed tasks...");
        Tasks.printTasksCompleted();
        break;
      case 4:
        rl.close();
        console.log("making Task Done...");
        name = await  inputAndReturn()
        Tasks.makeTaskDone(name)
        break;
      case 5:
        rl.close();
        console.log("Deleting a task...");
        name = await  inputAndReturn()
        Tasks.deleteTask(name)
        break;
      case 6:
        rl.close();
        console.log("Sorting tasks by due date...");
        Tasks.sortTasksByDueDate();
        break;
      case 7:
        rl.close();
        console.log("Sorting tasks by priority...");
         Tasks.sortTasksByPriority();
        break;
      case 8:
        rl.close();
        console.log("Clearing all tasks...");
        Tasks.clearAllTasks();
        break;
      case 0:
        rl.close();
        console.log("Exiting...");

        break;
      default:
        rl.close();
        console.log("Invalid action. Please try again.");
        break;
    }
  } while (userInput !== 0);
  console.log("Thanks");
}

function getInput(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}
function inputAndReturn() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'userInput',
      message: 'Enter the Name for Delete:'
    }
  ])
  .then(answers => answers.userInput);
}
main();