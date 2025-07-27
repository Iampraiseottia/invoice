// register.js - Fixed version with proper error handling

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Democratic Republic of the Congo (Kinshasa)",
  "Congo, Republic of (Brazzaville)",
  "Cook Islands",
  "Costa Rica",
  "Côte D'ivoire (Ivory Coast)",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "North Korea",
  "South Korea",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Lao",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar, Burma",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Island",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion Island",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland (Eswatini)",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Tibet",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Wallis and Futuna Islands",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Populate countries dropdown
  const selectElement = document.getElementById("Country");
  if (selectElement) {
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      selectElement.appendChild(option);
    });

    // Event listener for the select element
    selectElement.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;
      console.log("Selected Country:", selectedCountry);
    });
  }

  // Helper functions for error handling
  function showError(inputElement, message) {
    if (!inputElement) return;

    // Add error class to input
    inputElement.classList.add("error");

    // Find the parent input_box
    const inputBox = inputElement.closest(".input_box");
    if (inputBox) {
      // Find the small error element
      const errorElement = inputBox.querySelector("small");
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add("show");
      }
    }
  }

  function clearError(inputElement) {
    if (!inputElement) return;

    // Remove error class
    inputElement.classList.remove("error");

    // Find the parent input_box
    const inputBox = inputElement.closest(".input_box");
    if (inputBox) {
      // Hide the error message
      const errorElement = inputBox.querySelector("small");
      if (errorElement) {
        errorElement.classList.remove("show");
        errorElement.textContent = "";
      }
    }
  }

  function clearAllErrors() {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => clearError(input));
    hideGeneralError();
  }

  function showGeneralError(message, isSuccess = false) {
    const generalError = document.getElementById("general-error");
    if (generalError) {
      generalError.textContent = message;
      generalError.style.display = "block";

      if (isSuccess) {
        generalError.classList.add("success");
      } else {
        generalError.classList.remove("success");
      }
    }
  }

  function hideGeneralError() {
    const generalError = document.getElementById("general-error");
    if (generalError) {
      generalError.style.display = "none";
      generalError.classList.remove("success");
    }
  }

  // Form handling
  const form = document.querySelector("form");

  if (form) {
    // Clear errors when user starts typing
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("input", () => clearError(input));
      input.addEventListener("change", () => clearError(input));
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Clear all previous errors
      clearAllErrors();

      // Get form elements
      const fullNameInput = document.getElementById("title");
      const emailInput = document.getElementById("email");
      const phoneNumberInput = document.getElementById("phone_number");
      const countrySelect = document.getElementById("Country");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirm_password");
      const termsCheckbox = document.getElementById("terms");

      // Get form values
      const fullName = fullNameInput ? fullNameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const phoneNumber = phoneNumberInput ? phoneNumberInput.value.trim() : "";
      const country = countrySelect ? countrySelect.value : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput
        ? confirmPasswordInput.value
        : "";

      let hasErrors = false;

      // Validation checks
      if (!fullName || fullName.length < 2) {
        showError(
          fullNameInput,
          "Please enter a valid full name (at least 2 characters)"
        );
        hasErrors = true;
      }

      if (!email || !email.includes("@")) {
        showError(emailInput, "Please enter a valid email address");
        hasErrors = true;
      }

      if (!phoneNumber) {
        showError(phoneNumberInput, "Please enter a phone number");
        hasErrors = true;
      }

      if (!country) {
        showError(countrySelect, "Please select your country");
        hasErrors = true;
      }

      if (!password || password.length < 6) {
        showError(passwordInput, "Password must be at least 6 characters long");
        hasErrors = true;
      }

      if (!confirmPassword) {
        showError(confirmPasswordInput, "Please confirm your password");
        hasErrors = true;
      } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, "Passwords do not match");
        hasErrors = true;
      }

      if (!termsCheckbox || !termsCheckbox.checked) {
        showGeneralError("Please agree to the terms and conditions");
        hasErrors = true;
      }

      // Stop if there are validation errors
      if (hasErrors) {
        return;
      }

      // Show loading state
      const submitButton = form.querySelector('input[type="submit"]');
      const originalValue = submitButton.value;
      submitButton.value = "REGISTERING...";
      submitButton.disabled = true;

      const formData = new FormData(form);

      try {
        // Updated fetch URL - remove '../php/' if running on Live Server
        const response = await fetch("/php/signup.php", {
          method: "POST",
          body: formData,
        });

        // Check if response is ok
        if (!response.ok) {
          if (response.status === 405) {
            throw new Error(
              "Server configuration error. Please check if PHP is properly configured."
            );
          } else if (response.status === 404) {
            throw new Error(
              "signup.php file not found. Please check the file path."
            );
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();

          if (result.success) {
            showGeneralError("Registration successful! Redirecting...", true);

            // Redirect after a short delay
            setTimeout(() => {
              if (result.redirect) {
                window.location.href = result.redirect;
              } else {
                window.location.href = "login.html";
              }
            }, 1500);
          } else {
            showGeneralError(result.message || "Registration failed");
          }
        } else {
          // If not JSON, show the response text
          const text = await response.text();
          console.log("Server response:", text);
          showGeneralError("Server error. Please check console for details.");
        }
      } catch (error) {
        console.error("Error:", error);
        showGeneralError("Network error: " + error.message);
      } finally {
        // Reset button state
        submitButton.value = originalValue;
        submitButton.disabled = false;
      }
    });
  }
});
