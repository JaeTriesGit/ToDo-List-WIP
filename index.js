let mode = "dark"

var UserInput = document.getElementById("UserInput");
const Temp = document.getElementById('Template');
const TDList = document.getElementById('AllToDos')

let ToDoList = [
   
];

function DeleteThis(Obj) { //Get the parent element (temp) and delete!!!
    let Test = Obj.parentElement.value;
    ToDoList.splice(Test, Test+1);
    console.log(Test);
    Obj.parentElement.remove();
};

function DeleteCompleted() {
    for (let i=0;i<ToDoList.length;i++) {
        if (ToDoList[i][1] === true) {
            ToDoList.splice(i, i+1);
        }
    }
}

function InputStart(Obj) { //when input starts (is on focus)
    Obj.style.color = "hsl(0, 0%, 98%)";
};

UserInput.addEventListener("keypress", function(event) { //enter press func for userinput
    if (event.key === "Enter") { //If the key pressed is "Enter" ->
        ToDoList.push([UserInput.value, false]); //We'll push em out as [TEXT,COMPLETED]
        const TempClone = Temp.cloneNode(true); //Clone the template
        TempClone.style.visibility="visible"; //Set visibility
        TempClone.value = ToDoList.length; //Set the value?
        let CloneText = TempClone.querySelector('p'); //We get the paragraph
        CloneText.innerText = UserInput.value; //We set the text of the paragraph
        TDList.appendChild(TempClone); //We set the parent of the clone to the TDList
        UserInput.blur(); //Take the focus off of input field
        UserInput.value = ""; //Reset input field text
        UserInput.style.color = "hsl(233, 14%, 35%)"; //Reset input field text color
        //console.log(TempClone.value, ToDoList.length) 
    }
});

//./Assets/icon-check.svg

function Check(Obj){
    console.log(Obj);
    if (Checked === true) {
        Obj.checked=false
        Obj.src = url('./Assets/Empty-Check.png');
    } else {
        Obj.checked=true
        Obj.src = url('./Assets/icon-check.svg')
    }
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