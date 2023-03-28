let mode = "dark"
let Tab = "All"
let TodoId = 0

var UserInput = document.getElementById("UserInput");
const Temp = document.getElementById('Template');
const TDList = document.getElementById('AllToDos');
const ItemsLeft = document.getElementById('Items-Left')

const All = document.getElementById("Control-All");
const Act = document.getElementById("Control-Active");
const Comp = document.getElementById("Control-Completed");

let ToDoList = [
   
];

/*function UpdateList(){
    const GetAll = document.getElementsByClassName("ToDo");

    if (Tab === "All") {
        Array.prototype.forEach.call(GetAll, function(Obj) {
            Obj.style.visibility = "visible";
        });

    } else if (Tab === "Active") {
        Array.prototype.forEach.call(GetAll, function(Obj) {
            for (i=0;i<ToDoList.length;i++) {
                console.log(Obj, Obj.value, ToDoList[i][1], ToDoList[i][2]);
                if (ToDoList[i][1] === false && ToDoList[i][2] === Obj.value) {
                    Obj.style.visibility = "visible";
                    break;
                } else if (ToDoList[i][1] === true) {
                    Obj.style.visibility = "hidden";
                    break;
                }
            }
        });

    } else if (Tab === "Completed") {
        Array.prototype.forEach.call(GetAll, function(Obj) {
            for (i=0;i<ToDoList.length;i++) {
                if (ToDoList[i][1] === true && ToDoList[i][2] === Obj.value) {
                    Obj.style.visibility = "visible";
                } else {
                    Obj.style.visibility = "hidden";
                }
            }
        })
    }
};*/

function ChangeTab() { //0:Text 1:Checked 2:ID 3:TempClone?
    if (Tab === "All") { //This bs ain't doing sh?
        for (i=0;i<ToDoList.length;i++) {
            ToDoList[i][3].style.visibility = "visible"; //Check spelling, I had an error here for 20 minutes cus of "visibily" :skull:
            ToDoList[i][3].style.order = 0;
        }
    } else if (Tab === "Active") {
        let Actives = 0;
        for (i=0;i<ToDoList.length;i++) {
            if (ToDoList[i][1] === false) {
                Actives += 1;
                ToDoList[i][3].style.visibility = "visible";
                ToDoList[i][3].style.order = Actives;
            } else {
                ToDoList[i][3].style.visibility = "hidden";
                ToDoList[i][3].style.order = 5002;
            }
        }
    } else if (Tab === "Completed") {
        for (i=0;i<ToDoList.length;i++) {
            let Comple = 0;
            if (ToDoList[i][1] === true) {
                Comple += 1;
                ToDoList[i][3].style.visibility = "visible";
                ToDoList[i][3].style.order = Comple;
            } else {
                ToDoList[i][3].style.visibility = "hidden";
                ToDoList[i][3].style.order = 5002;
            }
        }
    }
};

document.querySelectorAll(".Tab").forEach(obj => {


    obj.addEventListener("mouseenter", (e) => {
         obj.style.color = "hsl(0, 0%, 98%)"
    });

    obj.addEventListener("mouseleave", (e) => { //This is all obviously f'd up we gotta fix dis ;(
        if (Tab === obj.value) {
            obj.style.color = "hsl(220, 98%, 61%)";
        } else {
            obj.style.color = "hsl(0, 0%, 98%)";
        }
    });

});

All.addEventListener("mouseenter",(e)=>{
    All.style.color = "hsl(0,0%,98%)"
});

All.addEventListener("mouseleave",(e)=>{
    if (Tab === "All") {
        All.style.color="hsl(220, 98%, 61%)";
    } else {
        All.style.color="hsl(233, 14%, 35%)";
    }
});

Act.addEventListener("mouseenter",(e)=>{
    Act.style.color = "hsl(0,0%,98%)"
});

Act.addEventListener("mouseleave",(e)=>{
    if (Tab === "Active") {
        Act.style.color="hsl(220, 98%, 61%)";
    } else {
        Act.style.color="hsl(233, 14%, 35%)";
    }
});

Comp.addEventListener("mouseenter",(e)=>{
    Comp.style.color = "hsl(0,0%,98%)"
});

Comp.addEventListener("mouseleave",(e)=>{
    if (Tab === "Completed") {
        Comp.style.color="hsl(220, 98%, 61%)";
    } else {
        Comp.style.color="hsl(233, 14%, 35%)";
    }
});

function DeleteCompleted() {
    for (i=0;i<ToDoList.length;i++) {
        if (ToDoList[i][1] === true) {
            ToDoList[i][3].remove();
            ToDoList.splice(i, 1);
        }
    }
};

function InputStart(Obj) { //when input starts (is on focus)
    Obj.style.color = "hsl(0, 0%, 98%)";
};

//Food for thought: Should we completely start over with programming this to make it more efficient?
//We'll see in the next episode :skull:

function GetTodoById(Id){
    for (i=0;i<ToDoList.length;i++) {
        if (ToDoList[i][2] === Id) {
            return ToDoList[i];
        }
    }
    return null;
};

UserInput.addEventListener("keypress", function(event) { //enter press func for userinput
    if (event.key === "Enter") { //If the key pressed is "Enter" 
        const TempClone = Temp.cloneNode(true); //Clone the template
        TempClone.style.visibility="visible"; //Set visibility
        TempClone.className = "ToDo";
        TodoId += 1;
        ToDoList.push([UserInput.value, false, TodoId, TempClone]); //We'll push em out as [TEXT,COMPLETED,ID,Temp?????]
        TempClone.value = TodoId; //Set the value?
        let CloneText = TempClone.querySelector('p'); //We get the paragraph
        let CloneCheck = TempClone.querySelector('div'); //The div (for checkbox)
        let CloneDel = TempClone.querySelector('img.del'); //Get the delete?
        let CheckImg = CloneCheck.querySelector('img'); //The checkbox

        CloneCheck.addEventListener("click", (e) => {
            for (i in ToDoList) {
                if (ToDoList[i][2] === TempClone.value) {
                    if (ToDoList[i][1] === false) {
                        ToDoList[i][1] = true;
                        CheckImg.src = "./Assets/icon-check.svg";
                        CheckImg.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
                        CloneCheck.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
                        CloneText.style.color = "hsl(233, 14%, 35%)";
                        CloneText.style.textDecoration = "line-through";
                    } else if (ToDoList[i][1] === true) {
                        ToDoList[i][1] = false;
                        CheckImg.src = "./Assets/Empty-Check.png";
                        CheckImg.style.backgroundImage = "";
                        CloneCheck.style.backgroundImage = "hsl(233, 14%, 35%)";
                        CloneText.style.color = "hsl(0, 0%, 98%)";
                        CloneText.style.textDecoration = "none";
                    }
                }
            }
        });

        CloneCheck.addEventListener("mouseenter", (e) => {
            CloneCheck.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
        });

        CloneCheck.addEventListener("mouseleave", (e) => {
            const GetTodo = GetTodoById(TempClone.value);
            console.log(GetTodo[1])
            if (GetTodo[1] === true) { //If the todo is complete;
                CloneCheck.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
                CheckImg.style.backgroundImage = "linear-gradient(135deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
            } else if (GetTodo[1] === false) { //If the todo is not complete;
                CloneCheck.style.backgroundColor = "hsl(233, 14%, 35%)";
                CheckImg.style.backgroundColor = "hsl(233, 14%, 35%)";
                CloneCheck.style.backgroundImage = ''; //Lets gooooooo
                CheckImg.style.backgroundImage = ''; //This fixed everything lmao what even
            }
        });

        CloneDel.addEventListener('click', (e) => {

            for (let i=0;i<=ToDoList.length;i++) {  //Bro never EVER forget .length again :skull:
                if (ToDoList[i][2] === TempClone.value) { //if todolist id == tempclone id
                    ToDoList.splice(i, 1); //destroiiiiiiiijairrijirjrjirijjikekkkekek
                    break;
                }
            };
            
            TempClone.remove(); //byebye
        });

        CloneText.innerText = UserInput.value; //We set the text of the paragraph
        TDList.appendChild(TempClone); //We set the parent of the clone to the TDList
        UserInput.blur(); //Take the focus off of input field
        UserInput.value = ""; //Reset input field text
        UserInput.style.color = "hsl(233, 14%, 35%)"; //Reset input field text color
        let TDLen = ToDoList.length;
        ItemsLeft.innerText = (TDLen+ " items left");
    }
});

//./Assets/icon-check.svg

function SwapTab(Type, Obj) {
    All.style.color = "hsl(233deg, 14%, 35%)";
    Act.style.color = "hsl(233deg, 14%, 35%)";
    Comp.style.color = "hsl(233deg, 14%, 35%)";
    Obj.style.color = "hsl(220, 98%, 61%)";
    Tab = Type;
    console.log(Type);
    ChangeTab();
};

function ChangeMode() {
    console.log(mode)
    if (mode === "dark") {
        mode = "light";
        document.getElementById("mode").src="./Assets/icon-moon.svg";
        document.body.style.backgroundImage = "url(./Assets/bg-desktop-light.jpg)";
        document.body.style.backgroundColor = "hsl(0, 0%, 100%)";
    } else if (mode === "light") {
        mode = "dark";
        document.getElementById("mode").src="./Assets/icon-sun.svg";
        document.body.style.backgroundImage = "url(./Assets/bg-desktop-dark.jpg)";
        document.body.style.backgroundColor = "hsl(240, 12%, 11%)";
    }
};