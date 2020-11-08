
function refresh(){
    location.reload();
}

var d = new Date();
var n1 = d.toLocaleDateString();
var n2 = d.toLocaleTimeString();
document.querySelector("#date").innerHTML = n1;
document.querySelector("#time").innerHTML = n2;

var array = Array();
const list = document.getElementById("list");

var ToDo = "";

document.addEventListener("keyup",function(){
    if(event.keyCode == 13){  
        if(document.querySelector(".add-to-do #input").value){
            const toDo = document.querySelector(".add-to-do #input").value;
            if(norepeat(toDo)){
            array.push([document.querySelector(".add-to-do #input").value , "uncheck"]);
            var item = `<li class="item">
                            <img class="check" src="check.png" onclick = check(event)>
                            <img class="circle" id="circle" src="circle.png" alt="check-box" onclick = check(event)>
                            <p class="text">${toDo}</p>
                            <img class="red-del" id="red-del" src="red-delete.png" alt="delete" onclick = del(event)>
                            <img class="del" src="delete.png" alt="delete" onclick = del(event)>                   
                        </li>`;
            const position = "beforeend";        
            list.insertAdjacentHTML(position, item);
            };
        }; 
        document.querySelector(".add-to-do #input").value = "";     
    };
});


function check(event){
    ToDo = event.target.parentNode.innerText;
    var x = findIndex(array,ToDo);
    if(array[x][1] == "uncheck") {
    document.querySelector(`#list .item:nth-child(${x+1})`).querySelector(".circle").style.display = "none";
    document.querySelector(`#list .item:nth-child(${x+1})`).querySelector(".item p").style.textDecoration = "line-through";
    document.querySelector(`#list .item:nth-child(${x+1})`).querySelector(".item p").style.opacity = "0.5";
    array[x][1] = "check";
    }
    else if(array[x][1] == "check"){
        document.querySelector(`#list .item:nth-child(${x+1})`).querySelector(".circle").style.display = "block";
        document.querySelector(`#list .item:nth-child(${x+1})`).querySelector(".item p").style.textDecoration = "initial";
        document.querySelector(`#list .item:nth-child(${x+1})`).querySelector(".item p").style.opacity = "1";
        array[x][1] = "uncheck";
    }   
}


function del(ToDo){
    ToDo = event.target.parentNode.innerText;
    var x = findIndex(array,ToDo);  
    list.removeChild(list.children[x]);
    array.splice(x,1);
}

function findIndex(array, ToDo) {
    for (var i = 0; i < array.length; i++){
        if (array[i][0] == ToDo){
            return i;
        }
    }
}

function norepeat(toDo){
    for (var i = 0; i < array.length; i++){
        if (array[i][0] == toDo){
            alert("Already added to the list");
            return false;
        }        
    }
    return true;
};
