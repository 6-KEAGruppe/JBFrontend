const form = document.querySelector(".login-form");

form.addEventListener("submit", async(event) =>{
    event.preventDefault()

    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata)
    const dataJson = JSON.stringify(data)

    try{
        const response = await fetch(form.action, {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: dataJson
        });

        const result = await response.json();

        if(result){
            window.location.href = "https://www.jb-consulting.dk/"
        }
        else{
            alert("Wrong Password or Username")
        }
    }
    catch (error){
        console.error("Error", error);
    }
})

