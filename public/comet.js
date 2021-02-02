// var state = true;
setTimeout(beginCometAnimation, 7000);
function beginCometAnimation()
{

    const comet = document.querySelectorAll(".comet img");
    comet.forEach((val, index) => {
        val.classList.contains("cometFloat") && val.classList.remove("cometFloat");
    });
    // if(!state){
    //     return;
    // }
    let random = Math.floor(Math.random() * 5);
    console.log(random);
    let randomTime = Math.floor(Math.random() * 10 + 5);
    comet[random].classList.add("cometFloat");
    console.log(randomTime * 1000);
    let x = setTimeout(beginCometAnimation, randomTime * 1000);
}
