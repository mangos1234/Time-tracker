
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data[0].timeframes.daily.current);


        var backgroundsToChange = document.querySelectorAll("section");
        var colours = ["hsl(15, 100%, 70%)", "hsl(195, 74%, 62%)", "hsl(348, 100%, 68%)", "hsl(145, 58%, 55%)", "hsl(264, 64%, 52%)", "hsl(43, 84%, 65%)"]
        var backgrounds = ["url(./images/icon-work.svg)", "url(./images/icon-play.svg)", "url(./images/icon-study.svg)", "url(./images/icon-exercise.svg)", "url(./images/icon-social.svg)", "url(./images/icon-self-care.svg)"]
        var pannels = document.querySelectorAll(".pannel");
        var dailybtn = document.querySelector(".daily");
        var monthlybtn = document.querySelector(".monthly");
        var weeklybtn = document.querySelector(".weekly");
        var timeType = "weekly";
        weeklybtn.style.color = "white"

        dailybtn.addEventListener("click", function(){
            weeklybtn.style.color = "hsl(235, 45%, 61%)"
            monthlybtn.style.color = "hsl(235, 45%, 61%)"
            dailybtn.style.color = "white"
            timeType = "daily";
            update()
        })
        weeklybtn.addEventListener("click", function(){
            dailybtn.style.color = "hsl(235, 45%, 61%)"
            monthlybtn.style.color = "hsl(235, 45%, 61%)"
            weeklybtn.style.color = "white"
            timeType = "weekly";
            update()
        })
        monthlybtn.addEventListener("click", function(){
            weeklybtn.style.color = "hsl(235, 45%, 61%)"
            dailybtn.style.color = "hsl(235, 45%, 61%)"
            monthlybtn.style.color = "white"
            timeType = "monthly";
            update()
        })


        for (let x = 0; x < backgroundsToChange.length; x++)
        {
            backgroundsToChange[x].style.background = backgrounds[x] + "no-repeat";
            backgroundsToChange[x].style.backgroundColor = colours[x];
            backgroundsToChange[x].style.backgroundPositionX = "right";  
        }

        update();

        function update(){
            for(let x = 0; x < backgroundsToChange.length; x++){
                pannels[x].innerHTML = `
                <div class="timeContainer">
                <h3>${data[x].title}</h3> 
                <img src="./images/icon-ellipsis.svg">
                </div>
                `
                
                
                switch (timeType){
                    case "daily":
                        pannels[x].innerHTML += `
                        <div class="timeContainer">
                        <h4>${data[x].timeframes.daily.current + "hrs"} </h4>
                        <h2>${"Yesterday - " + data[x].timeframes.daily.previous + "hrs"}</h2>
                        </div>
                        `
                    break;
                
                    case "weekly":
                        pannels[x].innerHTML += `
                        <div class="timeContainer">
                        <h4>${data[x].timeframes.weekly.current + "hrs"}</h4>
                        <h2>${"Last Week - " + data[x].timeframes.weekly.previous + "hrs"}</h2>
                        </div>
                        `
                    break;
        
                    case "monthly":
                        pannels[x].innerHTML += `
                        <div class="timeContainer">
                        <h4>${data[x].timeframes.monthly.current + "hrs"}</h4>
                        <h2>${"Last Month - " + data[x].timeframes.monthly.previous + "hrs"}</h2>
                        </div>
                        `
                    break;
                    
                }
            }
        }
    });


