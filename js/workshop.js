console.log("Du er på en enkelt workshopside");

// Hent ?name=... fra URL'en
const param = new URLSearchParams(window.location.search);
const workshopID = param.get("wid");

// API-url
const workshopUrl = `http://localhost:8080/workshops/${workshopID}`;

// Funktion til at hente data fra eksternt (backend) api
function fetchAnyUrl(workshopUrl){
    return fetch(workshopUrl)
        .then(response => {
            if (!response.ok) throw new Error("Workshop ikke fundet");
            return response.json();
        })
        .catch(error => {
            console.error("Fejl ved hentning:", error);
            alert("Kunne ikke hente workshop med det angivne id");
        });
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

// Funktion til at tilføje workshop til sidens html ...
function addWorkshopToPage(workshop){

    document.title = "Workshop: " + workshop.name;
    // Sæt title - bemærk det er for alle med class=workshopName (for-loop) ...
    let workshopNameElements = document.getElementsByClassName("workshopName");
    for (let element of workshopNameElements) {
        element.innerHTML = workshop.name;
    }
    // Sæt billede ...
    const imgElement = document.querySelector("#billede img");
    if (imgElement && workshop.image) {
        imgElement.src = workshop.image;
    }
    // Sæt beskrivelsen ...
    const workshopDescription = document.getElementById("workshopDescription");
    if (workshopDescription) {
        workshopDescription.innerHTML = workshop.description;
    }
    // Sæt dato ...
    const workshopDate = document.getElementById("workshopDate");
    if (workshopDate) {
        workshopDate.innerHTML = workshop.date;
    }
    // Sæt adressen ...
    const workshopAddress = document.getElementById("workshopAddress");
    if (workshopAddress) {
        workshopAddress.innerHTML = workshop.address;
    }
}


// Kør funktioner, når siden er klar ...
document.addEventListener("DOMContentLoaded", async function(){
    console.log("DOM er indlæst");
    if (workshopID) {
        await fetchWorkshopAndAddToPage();
    } else {
        alert("Intet gyldigt 'workshop-id'-parameter i URL");
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const param = new URLSearchParams(window.location.search);
    const workshopID = param.get("wid");

    // Sæt workshopId i hidden input
    const workshopInput = document.getElementById("workshopIdInput");
    if (workshopInput && workshopID) {
        workshopInput.value = workshopID;
    }

    // Lyt på form submit
    const form = document.getElementById("tilmeldingsForm");
    const resultDiv = document.getElementById("tilmeldingResult");

    if (!form) {
        console.error("Formular ikke fundet.");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Stop default form submission

        const formData = {
            name: form.yourname.value,
            email: form.youremail.value,
            phone: form.yourphone.value,
            company: form.yourcompany.value,
            workshopId: workshopInput.value
        };

        try {
            const response = await fetch("http://localhost:8080/workshops/attend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                resultDiv.innerText = "Tilmelding sendt! ✅";
            } else {
                console.log("HTTP status:", response.status);
                const text = await response.text();
                console.log("Respons body (tekst):", text);
                let errorMessage = text;

                try {
                    // Hvis serveren sender JSON, prøv at parse det
                    const json = JSON.parse(text);
                    errorMessage = json.message || JSON.stringify(json);
                } catch (e) {
                    // Ikke JSON, beholder text som fejlbesked
                }

                resultDiv.innerText = "Tilmelding fejlede: " + errorMessage;
            }


        } catch (error) {
            console.error("Fejl:", error);
            resultDiv.innerText = "Der opstod en fejl under tilmelding.";
        }
    });
});
