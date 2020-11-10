//global
const first = document.getElementsByClassName("menu")[0];
const second = document.getElementById("aside");
const third = document.getElementById("content");
const fourth = document.getElementById("firstdiv-ins");
const fifth = document.getElementById("seconddiv-ins");
const sixth = document.getElementsByClassName("contacts")[0];

// 1

const delay = 2000;

let parts = [first, second, third, fourth, fifth, sixth];
let partsHtml = [];

for(let i = 0; i < parts.length; i++){
    partsHtml.push(parts[i].innerHTML);
}

function task1(){

    for(let i = 0; i < 6; i++){
        setTimeout(() => {
            parts[i].innerHTML = i === 5 ? partsHtml[0] : partsHtml[i+1];
        }, 500 + i*delay);
    }
}

// 2

jQuery.fn.changeBgColorTo = function(color) {
    this.css("background-color", color);
};

let promise = new Promise(function(resolve, reject){
    try{
        window.onload = function(){
            second.innerHTML += "Hello from onload event";
        };
        setTimeout(() => resolve(), 5000);
    }
    catch(ex){
        reject(ex);
    }
});

function task2(){

    let colors = ["rgba(255, 255, 255, 0.5)",
    "rgba(0, 0, 255, 0.5)",
    "rgba(0, 255, 0, 0.5)",
    "rgba(255, 0, 0, 0.5)",
    "rgba(0, 0, 0, 0.5)",
    ];

    promise.then(() => {
        $("header").changeBgColorTo("rgba(255, 255, 100, 0.5)");
        $("footer").changeBgColorTo("rgba(255, 0, 255, 0.5)");
    });   

    setInterval(() => {
        $("#content").changeBgColorTo(colors[Math.floor(Math.random() * 5)]);
    }, 5000);
}


//task 3

function loadCommits(){
    let account = $("#acc-name").val() || "";
    let repo = $("#rep-name").val() || "";
    let textarea = $("#result");

    if(!account || !repo){
        third.innerHTML = "<p style = 'color:red;'>Fields are empty!!!</p>";
        return;
    }

    $.ajax({
        type: "get",
        url: `https://api.github.com/repos/${account}/${repo}/commits`, 
        success: (result) => {
            let text = "";
            result.forEach((el) => {
                text += `${el.commit.author.name}: ${el.commit.message} \n`;
            });      
            textarea.val(text);
        },
        error: (xhr, textStatus, errorTrown) => {
            third.innerHTML = `<p style = 'color:red; border: 1px solid red;'>Error:${textStatus} (${errorTrown})</p>`;
        }
    });
}

//task 4

function func1(){
    console.log("func1 started");
}
function func2(){
    console.log("func2 started");
}

function task4(callback1, callback2){
    console.log("task 4 started");
    callback1();
    callback2();
}

//task 5

function quickSort(arr) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
      
    for (let i = 1; i < arr.length; i++) {
      if (pivot > arr[i]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}


function task5(){
    let input = $("#task5").val();
    let numbers = input.split(" ");

    let filtered = numbers.filter((elem) => {
        return /^-?\d+\.?\d*$/.test(elem);
    });

    console.log(quickSort(filtered.map(x=>+x)));
}

//main
(function main(){
    
    // task1();

    // task2();

    // $("#get-commits").click(() => loadCommits());

    // task4(func1, func2);

    $("#task5").blur(() => task5());
})();


