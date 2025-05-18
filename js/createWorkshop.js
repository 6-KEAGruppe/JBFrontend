console.log("du er i createworkshop")

const imgFile=document.getElementById('imgFile')
const preview = document.getElementById('imagePreview');

function uploadImage(event) {
    const file = event.target.files[0];
    console.log(file)
    const reader = new FileReader();
    if (file) {
        reader.onload = function (e) {
            preview.style.backgroundImage = `url('${e.target.result}')`;
        }
        //readAsDataURL læser filen som en data-URL
        reader.readAsDataURL(file);
    }
}
    imgFile.addEventListener('change', uploadImage);