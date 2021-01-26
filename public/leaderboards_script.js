async function leaderboards()
{
    let request = await fetch("./leaderboards_data.json");
    let response = await request.json();
    // console.log(response);
    let list = document.querySelector(".data ul");
    
    for(let i=0; i < response.leaderboards.length; i++)
    {
        list.innerHTML += `<li>Name: ${response.leaderboards[i].name} | Score: ${response.leaderboards[i].score}</li>`;
    }
}


const dataArr = leaderboards();



