//Drop down
var dropdown = document.querySelector('.dropdown');
var dropdownContent = document.querySelector('.dropdown-content');

dropdown.addEventListener('mouseover', function () {
    dropdownContent.style.display = 'block';
});

dropdown.addEventListener('mouseout', function () {
    dropdownContent.style.display = 'none';
});


//Animate Image
var image = document.getElementById("animate-image");
image.classList.add("animate");


//Client Images
var clientImage = document.getElementById("client-image");

clientImage.addEventListener("mouseover", function() {
    clientImage.style.filter = "brightness(100%)";
});

clientImage.addEventListener("mouseout", function() {
    clientImage.style.filter = "brightness(50%)";
});