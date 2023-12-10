function countDown(num) {
    let seconds = 1000;
    for (let i = num; i > 0; i--) {
        setTimeout(function () {console.log(i);}, seconds);
        seconds += 1000;
    }
    seconds += 1000;
    setTimeout(function () {console.log('DONE!');}, seconds);
}

countDown(4);