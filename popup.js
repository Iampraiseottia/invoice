function openPopup() {
    // Retrieve the input value
    var fullName = document.getElementById("title").value;

    // Encode the value to ensure it can be passed as a query parameter
    var encodedFullName = encodeURIComponent(fullName);

    // Open the popup.html file with the query parameter
    window.open("popup.html?fullName=" + encodedFullName, "Popup", "width=400,height=400");
}

// Retrieve the query parameter from the URL
var params = new URLSearchParams(window.location.search);
var fullName = params.get("fullName");

// Update the <p> tag with the query parameter value
document.getElementById("popup-name").textContent = fullName;