import readline from 'readline';

class Task{
    name ;
    complete;
    priorityLevel;
    dueDate;
    description;
    tasksArray;
    tasksArray = [];
    constructor(name = "",complete=false,priorityLevel=1,dueDate="",description=""){
        this.name=name;
        this.complete=complete;
        this.priorityLevel=priorityLevel;
        this.description=description;
        var dateParts = dueDate.split("-");
        var year = parseInt(dateParts[2]);
        var month = parseInt(dateParts[1]); 
        var day = parseInt(dateParts[0]);
        this.dueDate= new Date(year, month, day);
        
    }
    createObject() {
      return new Promise((resolve) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
    
        const handleInput = () => {
          rl.question('Enter the task name: ', (name) => {
            rl.question('Enter the priority level(1-10): ', (priorityLevel) => {
              rl.question('Enter the due date(dd-mm-yyyy): ', (dueDate) => {
                rl.question('Enter the task description: ', (description) => {
                  rl.close();
                  const newObject = new Task(name, false, priorityLevel, dueDate, description);
                  resolve(newObject);
                });
              });
            });
          });
        };
    
        handleInput(); 
      });
    }


    addTask(task){
      this.tasksArray.push(task);
      console.log("Added successfully");
    }
    printTasksArray() {
      let count = 0;
      this.tasksArray.forEach((task, index=0) => {
        count++;
        console.log(`Task ${index += 1}:`);
        console.log("Name:", task.name);
        console.log("Complete:", task.complete);
        console.log("Priority Level:", task.priorityLevel);
        console.log("Due Date:", task.dueDate);
        console.log("Description:", task.description);
        console.log("---------");
      });
      if(count==0)
      console.log("not found tasks");
    }

    printTasksCompleted() {
      let count = 0;
      this.tasksArray.forEach((task, index=0) => {
        if(task.complete==true) {
          count++;
        console.log(`Task ${index += 1}:`);
        console.log("Name:", task.name);
        console.log("Complete:", task.complete);
        console.log("Priority Level:", task.priorityLevel);
        console.log("Due Date:", task.dueDate);
        console.log("Description:", task.description);
        console.log("---------");
        }
      });
      if(count==0)
      console.log("no tasks completed");
    }

    makeTaskDone(taskName) {
          const task = this.tasksArray.find(task => task.name === taskName);
          if (task) {
            task.complete = true;
            console.log(`Task "${task.name}" has been marked as done.`);
          } else {
            console.log(`Task "${taskName}" not found.`);
          }
    }


    deleteTask(taskName) {
      const index = this.tasksArray.findIndex(task => task.name === taskName);
      if (index !== -1) {
        this.tasksArray.splice(index, 1);
        console.log(`Task "${taskName}" has been deleted.`);
      } else {
        console.log(`Task "${taskName}" not found.`);
      }
    }

    clearAllTasks() {
      this.tasksArray = [];
      console.log("All tasks have been cleared.");
    }
    sortTasksByDueDate() {
      this.tasksArray.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      console.log("Tasks sorted by due date:");
      this.printTasksArray();
    }
    
    sortTasksByPriority() {
      this.tasksArray.sort((a, b) => b.priorityLevel - a.priorityLevel);
      console.log("Tasks sorted by priority:");
      this.printTasksArray();
    }

}
export default Task;