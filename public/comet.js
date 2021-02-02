var state = true;
function beginCometAnimation()
{
    if(!state)
        return;
    const comet = document.querySelectorAll(".comet img");
    comet.forEach((val, index) => {
        val.classList.contains("cometFloat") && val.classList.remove("cometFloat");
    });
    let random = Math.floor(Math.random() * 5);
    console.log(random);
    let randomTime = Math.floor(Math.random() * 5 + 4);
    comet[random].classList.add("cometFloat");
    console.log(randomTime * 1000);
    setTimeout(beginCometAnimation, randomTime * 1000);
}
