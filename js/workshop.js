console.log("Du er på en enkelt workshopside");

// Hent ?name=... fra URL'en
const params = new URLSearchParams(window.location.search);
const name = params.get("name");

// API-urls
const workshopUrl = `http://localhost:8080/workshops/name/${name}`;

const allWorkshopsUrl = "http://localhost:8080/workshops"

// Funktion til at hente data
function fetchAnyUrl(url){
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Workshop ikke fundet");
            return response.json();
        })
        .catch(error => {
            console.error("Fejl ved hentning:", error);
            alert("Kunne ikke hente workshop");
        });
}

// Funktion til at tilføje workshop til siden
function addWorkshopToPage(workshop){

    document.title = "Workshop: " + workshop.name; // Ændrer titlen

    const workshopName = document.getElementById("workshopName");
     if (workshopName) {
        workshopName.innerHTML = workshop.name;
    }
    const workshopDescription = document.getElementById("workshopDescription");
    if (workshopDescription) {
        workshopDescription.innerHTML = workshop.description;
    }
}


// Funktion der tilføjer listen med workshops til siden ...
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

    const workshopHost = document.createElement("p")
    workshopHost.textContent = "Jeannie Bjerregaard"
    infoDiv.appendChild(workshopHost); // add to info

    const workshopAddress = document.createElement("p")
    workshopAddress.textContent = workshop.address;
    infoDiv.appendChild(workshopAddress); // add to info

    // when clicking on div you will be shown the workshop page
    workshopDiv.onclick = function (){
        localStorage.setItem("workshop", JSON.stringify(workshop));
        window.location.href = "workshopSide.html";
    }

    // add info and date div to the master div
    workshopDiv.appendChild(workshopDateDiv);
    workshopDiv.appendChild(infoDiv);

    // add everything to the workshopList
    document.getElementById("workshopList").appendChild(workshopDiv);

}


// Async-funktion der henter den specifikke workshop ...
async function fetchWorkshopAndAddToPage(){
    try {
        const workshop = await fetchAnyUrl(workshopUrl);
        if (workshop) {
            addWorkshopToPage(workshop);
        }
    } catch (error) {
        alert("Kunne ikke finde nogen workshops");
        console.error(error);
    }
}

// hent liste med alle workshops ...
let workshopList = []
async function fetchWorkshopsAndAddToFrontpage(){
    try{
        workshopList = await fetchAnyUrl(allWorkshopsUrl);
        console.log(workshopList)
        workshopList.forEach(addWorkshopToFrontpage)
    }catch(error){
        alert("Could not find any workshops")
    }
}



// Kør når siden er klar
document.addEventListener("DOMContentLoaded", async function(){
    console.log("DOM er indlæst");
    if (name) {
        await fetchWorkshopAndAddToPage();
        await fetchWorkshopsAndAddToFrontpage()
    } else {
        alert("Ingen gyldig 'name'-parameter i URL");
    }
});