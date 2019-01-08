var crackedCard = document.getElementById("cracked-card");
var crackedTime = document.getElementById("cracked-time");

var characters = ["A","B","C","D","E","F","G","H","I","J,","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j,","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," ",
    "1","2","3","4","5","6","7","8","9","0","!","@","#","$","%","^","&","*","(",")","-","_","+","=","\[","{","\]","}", "\\",
    "|",":",";","'","\"",",","<",".",">","/","?","`","~"];

var startTime;
var shouldCrack = true;

(() => {
    crackedCard.style.display = "none";
})();   

function validate() {
    var password = document.getElementById("password").value;

    if(password.length > 25 || password.length === 0) {
        return;
    }else {
        crackedCard.style.display = "none";
        startTime = Date.now();
        shouldCrack = true;
        crack(password);
    }
}

function crack(password) {
    var guess = "";
    var guesses = 0;

    do {
        guesses++;
        guess = "";
        var length = Math.ceil(Math.random() * 25);

        while(guess.length < length) {
            guess += characters[Math.floor(Math.random() * characters.length)];
        }

        console.log("Trying Guess #" + guesses + ":" + guess);
    }while(guess !== password);

    var finalTime = Date.now() - startTime;

    if(finalTime === 0) {
        crackedTime.innerText = "< 1"
    }else {
        crackedTime.innerText = finalTime;
    }

    crackedCard.style.display = "block";
    console.log("Password Found: " + guess);
}
