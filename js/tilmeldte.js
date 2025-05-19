const workshops = document.querySelector("#workshopList")

document.addEventListener("DOMContentLoaded", async() =>{

    response = await fetch("http://localhost:8080/workshops")

    result = await response.json()

    result.forEach(
        let workshop = document.createElement("li");

    )

})