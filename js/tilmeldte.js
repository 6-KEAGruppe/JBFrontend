document.addEventListener("DOMContentLoaded", async() => {

    //Henter alle workshopsne
    const response = await fetch("http://localhost:8080/workshops");
    const workshops = await response.json();
    const workshopList = document.querySelector("#workshopList");

    if (!workshops || workshops.length === 0) {
        const noDataMessage = document.createElement("p");
        noDataMessage.textContent = "Der er ingen workshops lige nu";
        workshopList.appendChild(noDataMessage);
    }

    else {
        // finder bruger fra en specifik workshop
        async function getWorkshopUsers(workshopId) {
            const response = await fetch(`http://localhost:8080/workshops/${workshopId}/users`);
            return await response.json();
        }

        // kører igennem alle workshopsne og laver navn og userliste for hver
        for (const workshop of workshops) {

            let workshopElement = document.createElement("li");
            workshopElement.innerHTML = `<h3>${workshop.name}</h3>`;

            const users = await getWorkshopUsers(workshop.id);

            if (users.length > 0) {
                const usersList = document.createElement("ul");
                usersList.className = "users-list";

                users.forEach(user => {
                    const userItem = document.createElement("li");
                    userItem.className = "user-item";

                    userItem.innerHTML = `
                    <div class="user-details">
                        <p>Name:  ${user.name || 'N/A'}</p>
                        <p>Email: ${user.email || 'N/A'}</p>
                        <p>Phone: ${user.phoneNumber || 'N/A'}</p>
                        <p>Company: ${user.company || 'N/A'}</p>
                    </div>
                `;

                    usersList.appendChild(userItem);
                });

                workshopElement.appendChild(usersList);
            } else {
                const noUsers = document.createElement("p");
                noUsers.textContent = "No users registered for this workshop";
                workshopElement.appendChild(noUsers);
            }

            workshopList.appendChild(workshopElement);
        }
    }
});
