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
