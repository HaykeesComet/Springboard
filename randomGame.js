let counter = 0;
function func () {
    let draw = 0;
    draw = Math.random() * 1;
    console.log(draw)
    counter += 1; 
    if (draw > 0.75) {
        clearInterval(timerId);
        console.log(`The number of tries it took before you found a number greater than 0.75 is ${counter - 1}.`);
    }
}

let timerId;
function randomGame () {
    timerId = setInterval(func, 1000);
}

randomGame();