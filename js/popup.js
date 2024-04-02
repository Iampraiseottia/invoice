const popup = document.getElementById('pop-up');

function openPopup(){

    popup.classList.add('open-popup');

}

function closePopup(){
    
    popup.classList.remove('open-popup');

}


const editData = document.getElementById('editMain');

function editDetails(){

    editData.style.display = 'block';

}



// Retrive data
const fullNameTake = document.getElementById("full-name-get").textContent;
const emailTake = document.getElementById("email-get").textContent;
const countryTake = document.getElementById("country-get").textContent;
const passwordTake = document.getElementById("pass-get").textContent;
const numberTake = document.getElementById("num-get").textContent;

// Display values in the input fields
document.getElementById("name-dis").value = fullNameTake;
document.getElementById("email-dis").value = emailTake;
document.getElementById("num-dis").value = numberTake;
document.getElementById("country-dis").value = countryTake;
document.getElementById("password-dis").value = passwordTake;

