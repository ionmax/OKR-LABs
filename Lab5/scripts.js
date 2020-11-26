const work = document.querySelector("#work");
const canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');

const open_button = document.querySelector("#open-button");
const close_button = document.querySelector("#close-button");
const start_button = document.querySelector("#play");
const stop_button = document.querySelector("#stop");
const reload_button = document.querySelector("#reload");
const text_field = document.querySelector("#text-field");
const events = [];

let radius = 10;
let firstInitialX = radius;
let firstInitialY = radius;
let secondInitialX = radius;
let secondInitialY = radius;
let dx = -2;
let dy = -1;
let isActive = false;

let interval;

function buttonsList(){
    open_button.addEventListener("click", () => {
        localStorage.clear();
        work.setAttribute("style", "display: flex;");
        text_field.innerHTML = "Open_button clicked";
        events.push("Open_button clicked");
        localStorage.setItem(new Date(), "Open_button clicked");
    });

    close_button.addEventListener("click", () => {
        work.setAttribute("style", "display: none;");
        text_field.innerHTML = "Close_button clicked";
        events.push("Close_button clicked");
        localStorage.setItem(new Date(), "Close_button clicked");
        let keys = Object.keys(localStorage),
            values = [],
            i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
        keys.sort();
        keys.forEach((item) => {
            if(events.includes(localStorage.getItem(item)))
            {
                document.querySelector("#localStor").value += `${localStorage.getItem(item)}   -   ${item}\n`;
            }
        });
    });

    start_button.addEventListener("click", () => {
        if(!isActive){
            interval = setInterval(draw, 20);
        }
        isActive = true;
        start_button.setAttribute("style", "display: none;");
        stop_button.setAttribute("style", "display: block;");
        text_field.innerHTML = "Play_button clicked";
        events.push("Play_button clicked");
        localStorage.setItem(new Date(), "Play_button clicked");
    });

    stop_button.addEventListener("click", () => {
        start_button.setAttribute("style", "display: block;");
        stop_button.setAttribute("style", "display: none;");
        text_field.innerHTML = "Stop_button clicked";
        events.push("Stop_button clicked");
        localStorage.setItem(new Date(), "Stop_button clicked");
        clearInterval(interval);
        isActive = false;
    });

    reload_button.addEventListener("click", () => {
        reload_button.setAttribute("style", "display: none;");
        start_button.setAttribute("style", "display: block;");
        text_field.innerHTML = "Reload_button clicked";
        localStorage.setItem(new Date(), "Reload_button clicked");
        events.push("Reload_button clicked");
    });
}

function setRand(){
    firstInitialY = Math.floor(Math.random() * Math.floor(canvas.height - 2*radius)) + 10;
    secondInitialX = Math.floor(Math.random() * Math.floor(canvas.width - 2*radius)) + 10;
}

function drawCircle(x, y, color){
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(firstInitialX, firstInitialY, "rgb(255, 0, 0)");
    drawCircle(secondInitialX, secondInitialY, "rgb(0, 255, 0)");

    if(firstInitialX + dx > canvas.width-radius || firstInitialX + dx < radius) {
        dx = -dx;
        text_field.innerHTML = "Gorizontal ball kicked a wall";
        events.push("Gorizontal ball kicked a wall");
        localStorage.setItem(new Date(), "Gorizontal ball kicked a wall");
    }

    firstInitialX += dx;

    if(secondInitialY + dy > canvas.height-radius || secondInitialY + dy < radius) {
        dy = -dy;
        text_field.innerHTML = "Vertical ball kicked a wall";
        events.push("Vertical ball kicked a wall");
        localStorage.setItem(new Date(), "Vertical ball kicked a wall");
    }
    
    secondInitialY += dy;

    if(Math.abs(firstInitialY - secondInitialY) < 11 && Math.abs(firstInitialX - secondInitialX) < 11){
        clearInterval(interval);
        isActive = false;
        setRand();
        reload_button.setAttribute("style", "display: block;");
        start_button.setAttribute("style", "display: none;");
        stop_button.setAttribute("style", "display: none;");
        text_field.innerHTML = "Balls are kicked";
        events.push("Balls are kicked");
        localStorage.setItem(new Date(), "Balls are kicked");
    }
}

//main
(function main(){
    
    buttonsList();

    setRand();

})();




