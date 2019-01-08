var characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J,", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j,", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "\[", "{", "\]", "}", "\\",
    "|", ":", ";", "'", "\"", ",", "<", ".", ">", "/", "?", "`", "~"];

function crack(password) {
    var guess = "";
    var startTime = Date.now();
    var guesses = 0;

    running = true;

    do {
        if(!running) return;

        guesses++;
        guess = "";
        var length = Math.ceil(Math.random() * 25);

        while(guess.length < length) {
            guess += characters[Math.floor(Math.random() * characters.length)];
        }

        if(guesses % 1000000 === 0) {
            self.postMessage({
                action: "midway-progress",
                guesses: guesses
            });
        }
    }while (guess !== password);

    var time = Date.now() - startTime;
    running = false;

    return {
        time: time,
        guesses: guesses,
        password: guess
    }
}

self.addEventListener('message', function (e) {
    var data = e.data;
    if(data.action === "start") {
        const result = crack(data.password);
        self.postMessage({ action: "completed", ...result })
    }
}, false);
