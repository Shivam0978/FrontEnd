let todolist=JSON.parse(localStorage.getItem("todolist")) || [];
let tododate=JSON.parse(localStorage.getItem("tododate")) || [];
let todotime=JSON.parse(localStorage.getItem("todotime")) || [];
let todoStatus = JSON.parse(localStorage.getItem("todoStatus")) ||
[];
displayer();
function addTodo(){
  let input = document.querySelector(".firstTodo");
  let item = input.value;

  todolist.push(item);
  todoStatus.push("pending",JSON.stringify(todoStatus));
  input.value = '';  // here innerText will not work cause we have use input tag,it is empty tag so no text is there to replace with.
  localStorage.setItem("todoStatus",JSON.stringify(todoStatus));
  localStorage.setItem("todolist",JSON.stringify(todolist));
  displayer();
}
function addDate(){
  let input =document.querySelector(".firstdate");
  let item= input.value;
  if(item){
  let [year,month,day] = item.split('-');item = `${day}/${month}/${year.slice(2)}`;
  }
  tododate.push(item);
  input.value = '';
  localStorage.setItem("tododate",JSON.stringify(tododate));
  displayer();

}
function addTime(){
  let input = document.querySelector(".firsttime");
  let item = input.value;
  todotime.push(item);
  input.value = '';
   localStorage.setItem("todotime",JSON.stringify(todotime));
  displayer();
}
function deleteTodo(index){
  todolist.splice(index,1);
  tododate.splice(index,1);
  todotime.splice(index,1);
  todoStatus.splice(index,1);

  localStorage.setItem("todolist",JSON.stringify(todolist));
  localStorage.setItem("tododate",JSON.stringify(tododate));
  localStorage.setItem("todotime",JSON.stringify(todotime));
  localStorage.setItem("todoStatus",JSON.stringify(todoStatus));

  displayer();
}
const sound1 = new Audio("fail.mp3");
const sound2 = new Audio("success.mp3");
const sound3 = new Audio("reset.mp3");
const sound4 = new Audio("clear.mp3");

function completeGoal(index){
  todoStatus[index]="completed";
  localStorage.setItem("todoStatus",JSON.stringify(todoStatus));

sound2.currentTime = 0;
sound2.play();

    displayer();
}

function failGoal(index){
  todoStatus[index]="failed";
   localStorage.setItem("todoStatus",JSON.stringify(todoStatus));
   
  sound1.currentTime=0;
  sound1.play();

    displayer();
}

function clearStatus(){
  sound3.currentTime = 0;
  sound3.play();

  for(let i=0; i<todolist.length;i++){
    todoStatus[i] = "pending";
  }
  localStorage.setItem("todoStatus",JSON.stringify(todoStatus));
  displayer();
}

function clearAll(){
  sound4.currentTime = 0;
  sound4.play();
  todolist = [];
  todotime = [];
  tododate = [];
  todoStatus = [];

  localStorage.setItem("todolist",JSON.stringify(todolist));
  localStorage.setItem("todotime",JSON.stringify(todotime));
  localStorage.setItem("tododate",JSON.stringify(tododate));
  localStorage.setItem("todoStatus",JSON.stringify(todoStatus));

  displayer();
   
}

function displayer(){

  let display = document.querySelector(".Items-display");
  let newHtml ='';
  
  for(let i=0;i<todolist.length;i++){
    let rowClass = "";
    if(todoStatus[i]==="completed"){
    rowClass = "completed";
  }
  else if (todoStatus[i]==="failed"){
  rowClass = "failed";
  }

newHtml = newHtml+ `
<div class="todoRow ${rowClass}" id="row-${i}">
<span class="items">${todolist[i]}</span>
<span class="items">${tododate[i]}</span>
<span class="items">${todotime[i]}</span>
<button class="delete" onclick="deleteTodo(${i})">Delete</button>
<span class="spantick">
<button class="tick"  onclick="completeGoal(${i})" >✔</button></span>

<button class="cross" onclick="failGoal(${i})">✘</button>

</div>
`;
  }
    display.innerHTML =newHtml;
  }

/* how displayer is working :- 
> display is representing Items-display
> display.innerText/Html removing prev. /Text/Html
> new T/H are being written via for loop
>new T/H are being displayed
eg: gym [delete] 
again entering other goal : drink
it removes the prev html/text : gym [delete]
loops run for both gym and drink
both appears  with html
*/
console.log(todolist);
console.log(tododate);
console.log(todotime);