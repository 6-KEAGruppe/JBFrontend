//ændring til at pushe
console.log("Du er på forsiden")
const workshopUrl = "http://localhost:8080/workshops"

// fetch function to fetch workshops
function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

function addWorkshopToFrontpage(workshop){

    // the div that contains info and date
    const workshopDiv = document.createElement("div")
    workshopDiv.className = "workshopCard"

    const dateObj = new Date(workshop.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('da-DK', {month: "long"})


    // the div that contains date
    const workshopDateDiv = document.createElement("div")
    workshopDateDiv.className = "workshopDate"
    workshopDateDiv.innerHTML = `${month.toUpperCase()}<br>${day}`;

    //the div that contains info
    const infoDiv = document.createElement("div")
    infoDiv.className = "workshopInfo"

    const workshopName = document.createElement("h3")
    workshopName.innerHTML = workshop.name;
    infoDiv.appendChild(workshopName); // add to info

    /*
    const workshopDate = document.createElement("h5")
    workshopDate.innerHTML = workshop.date;
    workshopDateDiv.appendChild(workshopDate);
     */

    const workshopHost = document.createElement("p")
    workshopHost.textContent = "Jeannie Bjerregaard"
    infoDiv.appendChild(workshopHost); // add to info

    const workshopAddress = document.createElement("p")
    workshopAddress.textContent = workshop.address;
    infoDiv.appendChild(workshopAddress); // add to info

    // when clicking on div you will be shown the workshop page
    workshopDiv.onclick = function (){
        localStorage.setItem("workshop", JSON.stringify(workshop));
        window.location.href = `workshop.html?wid=${workshop.id}`;
    }

    // add info and date div to the master div
    workshopDiv.appendChild(workshopDateDiv);
    workshopDiv.appendChild(infoDiv);

    // add everything to the workshopList
    document.getElementById("workshopList").appendChild(workshopDiv);

    /*
    const workshopPicture = document.createElement("img")
    workshopPicture.setAttribute("src", workshop.image)
    workshopPicture.setAttribute("alt", "x")
    workshopPicture.setAttribute("width", 50)
    workshopPicture.setAttribute("height", 80)
    workshopDiv.appendChild(workshopPicture);
     */
}

let workshopList = []

async function fetchWorkshopsAndAddToFrontpage(){
    try{
        workshopList = await fetchAnyUrl(workshopUrl);
        console.log(workshopList)
        workshopList.forEach(addWorkshopToFrontpage)
    }catch(error){
        alert("Could not find any workshops")
    }
}

document.addEventListener("DOMContentLoaded", async function(){
    console.log("DOM er indlæst")
    await fetchWorkshopsAndAddToFrontpage()
})

