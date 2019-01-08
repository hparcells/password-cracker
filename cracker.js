var crackedCard = document.getElementById("cracked-card");
var crackedTime = document.getElementById("cracked-time");

var startTime;
var shouldCrack = true;
var worker = new Worker('worker.js');

crackedCard.style.display = "none";

function validate() {
    var password = document.getElementById("password").value;

    if(password.length > 25 || password.length === 0) {
        M.toast({html: "Either your password is too short or too long!"});
        return;
    }else {
        crackedCard.style.display = "none";
        startTime = Date.now();
        shouldCrack = true;
        worker.postMessage({
            action: "start",
            password: password,
        })
    }
}


worker.addEventListener('message', function (e) {
    var data = e.data;
    if(data.action === "completed") {

        // data = {guesses: Number, time: Number, password: string}

        if(data.time === 0) {
            crackedTime.innerText = "< 1"
        } else {
            crackedTime.innerText = data.time;
        }

        crackedCard.style.display = "block";
    }
}, false);
