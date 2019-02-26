function crack(password) {
    var guess = '';
    var startTime = Date.now();
    var guesses = 0;    
    running = true;
    
    var codes = [32];
    var low = 32;
    var high = 126;

    do {
        if(!running) return;

        guess = getCodes(codes);
        codes[0]++;

        for(var i = 0; i < codes.length; i++) {
            if(codes[i] > high) {
                var shouldIncreaseNext = true;

                codes[i] = low;
                
                if(i === codes.length - 1|| codes.length === 1) {
                    codes.push(low);
                    shouldIncreaseNext = false;
                }
                
                if(shouldIncreaseNext) {
                    codes[i + 1]++;
                }
            }
        }

        guesses++;
        if(guesses % 1000000 === 0) {
            self.postMessage({
                action: 'midway-progress',
                guesses: guesses
            });
        }
    }while(guess !== password);

    var time = Date.now() - startTime;
    running = false;

    return {
        time: time,
        guesses: guesses,
        password: guess
    }
}

function getCodes(codes) {
    var returnString = '';

    for(x in codes) {
        returnString += String.fromCharCode(codes[x]);
    }

    return returnString;
}

self.addEventListener('message', function (e) {
    var data = e.data;
    if(data.action === 'start') {
        const result = crack(data.password);
        self.postMessage({ action: 'completed', ...result })
    }
}, false);
