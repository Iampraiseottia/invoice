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



//Update
var updateButton = document.getElementById('update');
updateButton.addEventListener('click', function() {
  var updatedFullName = document.getElementById('name-dis').value;
  var updatedEmailAddress = document.getElementById('email-dis').value;
  var updatedPhoneNumber = document.getElementById('num-dis').value;
  var updatedCountry = document.getElementById('country-dis').value;
  var updatedPassword = document.getElementById('password-dis').value;

  document.getElementById('full-name-get').textContent = updatedFullName;
  document.getElementById('email-get').textContent = updatedEmailAddress;
  document.getElementById('num-get').textContent = updatedPhoneNumber;
  document.getElementById('country-get').textContent = updatedCountry;
  document.getElementById('pass-get').textContent = updatedPassword;

  // Store updated data in local storage
  localStorage.setItem('fullName', updatedFullName);
  localStorage.setItem('emailAddress', updatedEmailAddress);
  localStorage.setItem('phoneNumber', updatedPhoneNumber);
  localStorage.setItem('country', updatedCountry);
  localStorage.setItem('password', updatedPassword);

  var editPopup = document.getElementById('editMain');
  editPopup.style.display = 'none';
});

// Retrieve data from local storage on page load
window.addEventListener('load', function() {
  var storedFullName = localStorage.getItem('fullName');
  var storedEmailAddress = localStorage.getItem('emailAddress');
  var storedPhoneNumber = localStorage.getItem('phoneNumber');
  var storedCountry = localStorage.getItem('country');
  var storedPassword = localStorage.getItem('password');

  if (storedFullName) {
    document.getElementById('full-name-get').textContent = storedFullName;
  }
  if (storedEmailAddress) {
    document.getElementById('email-get').textContent = storedEmailAddress;
  }
  if (storedPhoneNumber) {
    document.getElementById('num-get').textContent = storedPhoneNumber;
  }
  if (storedCountry) {
    document.getElementById('country-get').textContent = storedCountry;
  }
  if (storedPassword) {
    document.getElementById('pass-get').textContent = storedPassword;
  }
});