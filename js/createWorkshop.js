console.log("du er i createworkshop")

const imgFile=document.getElementById('imgFile')
const previewImage = document.getElementById('imagePreview');

//imageUrl i type string. Url'en bruges på linje xx til at sende workshop-Image til backend, hvor den bliver gemt hvis admin vil bruge dataen

const saveBtn = document.getElementById("wsSaveBtn");

saveBtn.addEventListener("submit", handleFormSubmit)
async function handleFormSubmit(event){
    event.preventDefault()

    const form = event.currentTarget
    const url = form.action;

    console.log(url,"URL")

    try{
        const workshopObject = new FormData(form);
        const responseData = await postFormData(url,workshopObject);
        sessionStorage.setItem("workshop", JSON.stringify(responseData) )
    }catch (error){
        alert(error.message)
        console.log(error)
    }
}

async function postFormData(url,formData){
    const formDataObject = Object.fromEntries(formData.entries()); //converts to json object
    console.log("Sender data:", (formDataObject));

    const response = await fetch(url,{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(formDataObject)
    });
    window.location.href = "workshops.html"

    if(!response.ok){
        throw new Error(`HTTP-fejl - Status: ${response.status}`);
    }
    return response.json();
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM er indlæst");

    const form = document.getElementById("wsForm")
    if(form){
        form.addEventListener("submit", handleFormSubmit);
    }else{
        console.log("Form not found")
    }});
