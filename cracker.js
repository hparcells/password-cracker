var crackedCard = document.getElementById("cracked-card");
var crackedTime = document.getElementById("cracked-time");
var crackedGuesses = document.getElementById("cracked-guesses");
var crackingCard = document.getElementById("cracking-card");
var crackingGuessCount = document.getElementById("guess-live-count");

var startTime;
var shouldCrack = true;
var worker;

crackedCard.style.display = "none";
crackingCard.style.display = "none";

function validate() {
    var password = document.getElementById("password").value;

    if(password.length > 25 || password.length === 0) {
        return;
    } else {
        crackedCard.style.display = "none";
        crackingCard.style.display = "block";
        startTime = Date.now();
        shouldCrack = true;
        worker.postMessage({
            action: "start",
            password: password,
        })
    }
}

function restartWorker() {
    if(worker) worker.terminate();

    worker = new Worker('worker.js');

    worker.addEventListener('message', function (e) {
        var data = e.data;
        if(data.action === "completed") {
    
            // data = {guesses: number, time: number, password: string}
    
            if(data.time === 0) {
                crackedTime.innerText = "< 1";
            }else {
                crackedTime.innerText = data.time;
            }
    
            crackedGuesses.innerText = data.guesses;
    
            crackedCard.style.display = "block";
            crackingCard.style.display = "none";
        }else if (data.action === "midway-progress") {
            crackingGuessCount.innerText = data.guesses;
        }
    }, false);
}

restartWorker();

function stop() {
    crackedCard.style.display = "none";
    crackingCard.style.display = "none";
    restartWorker();
}
