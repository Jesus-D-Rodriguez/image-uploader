let imageBox = document.getElementById('imgBox');
let text2 = document.querySelector('.text-2');
let text1 = document.querySelector('.text-1');
let imageButton = document.querySelector('.image-button');
let images = document.getElementById('images');
let imgForm = document.getElementById('imgForm');
var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
  console.log(e);
});

clipboard.on('error', function(e) {
  console.log(e);
});





imageBox.addEventListener('dragover', (e)=>{

    e.preventDefault();
    e.stopPropagation();

});

imageBox.addEventListener('dragleave', ()=>{


});

imageBox.addEventListener('drop', (e)=>{

    let filess = []

    e.preventDefault();
    e.stopPropagation();

    //console.log("evemto   ", e.dataTransfer.files[0]);
    filess.push(e.dataTransfer.files[0]);


    let formData = new FormData();
    formData.append("images", e.dataTransfer.files[0]);

    makePostRequest('/', formData);
    document.querySelector(".container-box").style.gridTemplateRows = "30% 55% 15%";
 

    let container = document.getElementById('container');


  


    text1.innerHTML= "<div class='a'> <i class='fa-sharp fa-solid fa-circle-check' style='color: #219653;'></i> </div>"
    text2.innerHTML= "<div class='a'>Uploaded succesfully!</div>"
    imageBox.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    imageBox.style.backgroundImage = "none";
    //console.log(images.files[0].name);
    imageBox.innerHTML = `<div class="image">
    <img src="${URL.createObjectURL(e.dataTransfer.files[0])}" alt="image" style="object-fit: contain;">
    </div>`;


    const url = getCurrentURL();
    imageButton.classList.add("button-submitted");
    imageButton.innerHTML = `
    <div id="div-submitted">
    <input type="text" value="${url + "uploads/" + e.dataTransfer.files[0].name}" id="myInput"></input> 
    <button id="b-s" onclick="myFunction()">Copy link</button>
    </div>`



});



function getCurrentURL () {
    return window.location.href
}

images.addEventListener('change', (e)=>{

    e.preventDefault();
    e.stopPropagation();

    let filess = [];
    //filess.push(e.dataTransfer.files[0]);
    //console.log(images.files[0]);


    //imgForm.submit();


    let formData = new FormData();
    formData.append("images", images.files[0]);
    makePostRequest('/', formData);
    document.querySelector(".container-box").style.gridTemplateRows = "30% 55% 15%";
 

    let container = document.getElementById('container');

   

    text1.innerHTML= "<div class='a'> <i class='fa-sharp fa-solid fa-circle-check' style='color: #219653;'></i> </div>"
    text2.innerHTML= "<div class='a'>Uploaded succesfully!</div>"
    imageBox.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    imageBox.style.backgroundImage = "none";
    console.log(images.files[0].name);
    imageBox.innerHTML = `<div class="image">
    <img src="${URL.createObjectURL(images.files[0])}" alt="image" style="object-fit: contain;">
    </div>`;


    const url = getCurrentURL();
    imageButton.classList.add("button-submitted");
    imageButton.innerHTML = `
    <div id="div-submitted">
    <input type="text" value="${url + "uploads/" + images.files[0].name}" id="myInput"></input> 
    <button id="b-s" class="btn" data-clipboard-target="#myInput">Copy link</button>
    </div>`


})

function myFunction() {
    // Get the text field
    var copyText = document.getElementById("myInput");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    
    // Alert the copied text
    alert("Copied the text: " + copyText.value);
  }


  //Muestra la barra de carga
function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.querySelector(".container-box").style.display = "none";
  }
  
  //Oculta la barra de carga
  function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.querySelector(".container-box").style.display = "grid";
  }
  
  //Función para realizar la solicitud POST
  async function makePostRequest(url, data) {
    showLoader();
    try {
      /*const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });*/

      const response = await fetch(url, {method: "POST", 
      body:  data, enctype:"multipart/form-data", redirect: 'follow'});
      //const result = await response.json();
      //const result = await response;
      hideLoader();
      //return result;

    } catch (error) {
      console.log(error)
      //hideLoader();
      throw error;
      //console.error(error);
    }
  }
  