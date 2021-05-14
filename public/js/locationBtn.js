const btnVal = document.querySelector("#location-btn");            

             
                       

function locationPage() {
   let btnClass = btnVal.className;
   console.log(btnClass);
   document.location.replace(`/api/locations/${btnClass}`)

  
}

document.querySelector("#location-btn").addEventListener("click", locationPage);