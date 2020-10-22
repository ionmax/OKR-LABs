// 1
jQuery.fn.swapWith = function(to) {
    var copy_to = $(to).clone(true);
    var copy_from = $(this).clone(true);
    $(to).replaceWith(copy_from);
    $(this).replaceWith(copy_to);
};


// 2
var a = 10;
var b = 20;
var c = 25;

function square(){
    var p = (a + b + c)/2;
    return Math.sqrt(p*(p-a)*(p-b)*(p-c)); 
}


// 3
function minValue(){
    var text = $("#text").val();
    var nums = text.split(" ").map(x => +x);
    var min = Math.min(...nums);
    return nums.filter(x => x === min).length;
}

function setCookie(name,value,seconds) {
    var expires = "";
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var allCookies = document.cookie.split(';');
    for(let i=0; i < allCookies.length; i++) {
        var c = allCookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function saveCookie(){
    var min = minValue();
    alert(min);
    setCookie("min", min, 1000);
    $("#form").css("visibility", "hidden");
}

function deleteCookie(){
    if(!getCookie("min")){
        $("#form").css("visibility", "visible");
    } else{
        if(confirm("Want to delete cookies?")){
            console.log("test");
            eraseCookie("min");
            $("#form").css("visibility", "visible");
            if(confirm("Cookie is deleted. Do you want to reload the page?")){
                location.reload();
            }
        }
    }
}

// 4

jQuery.fn.changeColorTo = function(color) {
    this.children().css("color", color);
};

function takeColor(){
    var color = localStorage.getItem("color");
    $("#content").changeColorTo(color);
}

function task4(){
    var elem = $("#color");
    elem.blur(function(){
        $("#content").changeColorTo(elem.val());
        localStorage.setItem("color", elem.val());
    });
}

// 6

function inputValue(from, to){
    $(to).val($(from).html());
}

function addEvent(elemToChange, elemWithValue){
    $(elemWithValue).change(function(){
        $(elemToChange).html($(elemWithValue).val());
        localStorage.setItem(elemToChange, $(elemWithValue).val());
    });
}

function clickButtons(button, elem){
    $(button).click(function(){
        localStorage.removeItem(elem);
    });
}

function inputAll(){
    addEvent(".menu", "#menu-input");
    addEvent("#content", "#content-input");
    addEvent("#aside", "#aside-input");
    addEvent("#firstdiv-ins", "#firstdiv-input");
    addEvent("#seconddiv-ins", "#seconddiv-input");
    addEvent(".contacts", "#contacts-input");

    clickButtons("#menu-button", ".menu");
    clickButtons("#content-button", "#content");
    clickButtons("#aside-button", "#aside");
    clickButtons("#firstdiv-button", "#firstdiv-ins");
    clickButtons("#seconddiv-button", "#seconddiv-ins");
    clickButtons("#contacts-button", ".contacts");
}

function readLS(elem){
    if(localStorage.getItem(elem)){
        $(elem).html(localStorage.getItem(elem));
    }
}

function setHtml(){
    readLS(".menu");
    readLS("#content");
    readLS("#aside");
    readLS("#firstdiv-ins");
    readLS("#seconddiv-ins");
    readLS(".contacts");

    inputValue(".menu", "#menu-input");
    inputValue("#content", "#content-input");
    inputValue("#aside", "#aside-input");
    inputValue("#firstdiv-ins", "#firstdiv-input");
    inputValue("#seconddiv-ins", "#seconddiv-input");
    inputValue(".contacts", "#contacts-input");

    inputAll();
}


//main
(function main(){
    //task 1 - change elements 4th and 5th 
    $("#firstdiv").swapWith("#seconddiv");

    //task 2 - square of triangle
    var e = Math.pow(10, 3);
    $("#content").append("<p>Square of triangle: " + Math.round(square() * e) / e + "</p>");

    //task 3 - 1.Count min values. 2.Set cookies 3.Delete cookies
    // $("#button").click(saveCookie);
    // document.addEventListener("DOMContentLoaded", deleteCookie); 

    //task 4 - Change text color of content. Save the value
    //in local storage
    document.addEventListener("DOMContentLoaded", takeColor); 
    task4();

    //task 5 - Event load. It's black because it stand after DOMContentLoaded
    window.addEventListener("load", function(){
        $("aside").append("<p>Event load happend</p>");
    });

    //task 6
    document.addEventListener("DOMContentLoaded", setHtml); 
})();


