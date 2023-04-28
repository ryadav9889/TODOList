// array to store the tasks
let tasks = [];
var arrHistory= [];

// variable to count completed task
var c=0;
//  variable  ishistoryOn
var isHistoryOn=false;

// getting the element bu=y their Id's
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// function to add task 
function addTaskTODom(task){
    const li=document.createElement('li');
     li.innerHTML=
     `<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
     <label for="${task.id}">${task.text}</label>
     <img src="download.png" class="delete" data-id="${task.id}" />`;

       taskList.append(li);
}


// function to render or to refresh task array/list
function renderList (tasks) {
       taskList.innerHTML='';
    
  for (let i = 0; i < tasks.length; i++) {
    console
    addTaskTODom(tasks[i]);
 }
 tasksCounter.innerHTML=tasks.length;
     
}
// End



// function to mark the task as completed
function markTaskAsComplete (taskId) {
        const task =tasks.filter(function(task){
            return task.id===taskId;
        });

        if(task.length>0){
            const currentTask=task[0];
            currentTask.done=!currentTask.done;
            renderList(tasks);
            
            if(currentTask.done==true){
                c++
                document.getElementById('tasks-completed').innerHTML=c;
                showNotification("Task is mark as completed");
                return;
            }
           
        }
        c--;
        document.getElementById('tasks-completed').innerHTML=c;
        showNotification("Task is mark as not  completed");
}
// End


// function to delete the task
function deleteTask (taskId) {
let newTasks=tasks.filter(function(tasks){
     return tasks.id!=taskId;
});

tasks=newTasks;

renderList(tasks);
showNotification('Task deleted successfully');
return;
}
// End




// function to add the task to the tasks array
function addTask (task) {

    arrHistory.push(task);
    tasks.push(task);
    renderList(tasks);
}
// End


// function to show notification 

function showNotification(text) {
    alert(text);
}


// event handler to add task item to task list
function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text=e.target.value;

        if(!text){
           showNotification('Task can not be empty') 
           return;
        }
        const task={
               text,
               id: Date.now().toString(),
               done: false,
        }
        e.target.value='';
        addTask(task);
    }
}


// event handler for whole document
function handleClickListener(e) {
    



    if (e.target.className==='delete') {
      tId =e.target.dataset.id;
      
        deleteTask(tId);
        return;
    } else if(e.target.className==='custom-checkbox') {
          tId=e.target.id;
        markTaskAsComplete(tId);
        return;
    }

    if (e.target.id==='clearAll') {
        tasks=[];
        document.getElementById('tasks-completed').innerHTML=0;
        c=0;
        renderList(tasks);
    }

     
    if(e.target.id==='history'){
       if (!isHistoryOn) {
        console.log(isHistoryOn)
        isHistoryOn=true;
        renderList(arrHistory);
       }
       else{
        console.log(isHistoryOn);
           isHistoryOn=false;
           renderList(tasks);
       }
    }
}

// function to start the application
function initializeApp(){
    addTaskInput.addEventListener('keyup',handleInputKeypress);
     document.addEventListener('click',handleClickListener);
}
initializeApp();


