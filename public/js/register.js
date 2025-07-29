const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
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
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
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
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

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
  }

  // Error handling
  function showError(inputElement, message) {
    if (!inputElement) return;
    inputElement.classList.add("error");
    const inputBox = inputElement.closest(".input_box");
    if (inputBox) {
      const errorElement = inputBox.querySelector("small");
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add("show");
      }
    }
  }

  function clearError(inputElement) {
    if (!inputElement) return;
    inputElement.classList.remove("error");
    const inputBox = inputElement.closest(".input_box");
    if (inputBox) {
      const errorElement = inputBox.querySelector("small");
      if (errorElement) {
        errorElement.classList.remove("show");
        errorElement.textContent = "";
      }
    }
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

  // Check if user is already logged in
  async function checkAuthStatus() {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          window.location.href = "/html/invoice.html";
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
    }
  }

  checkAuthStatus();

  const form = document.getElementById("registerForm");

  if (form) {
    // Clear errors when user starts typing
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("input", () => clearError(input));
      input.addEventListener("change", () => clearError(input));
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      const generalError = document.getElementById("general-error");
      if (generalError) {
        generalError.style.display = "none";
      }

      // Validation
      let hasErrors = false;

      if (!data.full_name || data.full_name.length < 2) {
        showError(
          document.getElementById("title"),
          "Please enter a valid full name"
        );
        hasErrors = true;
      }

      if (!data.email || !data.email.includes("@")) {
        showError(
          document.getElementById("email"),
          "Please enter a valid email"
        );
        hasErrors = true;
      }

      if (!data.phone_number || data.phone_number.length < 8) {
        showError(
          document.getElementById("phone_number"),
          "Please enter a valid phone number"
        );
        hasErrors = true;
      }

      if (!data.Country) {
        showError(
          document.getElementById("Country"),
          "Please select your country"
        );
        hasErrors = true;
      }

      if (!data.password || data.password.length < 6) {
        showError(
          document.getElementById("password"),
          "Password must be at least 6 characters"
        );
        hasErrors = true;
      }

      if (data.password !== data.confirm_password) {
        showError(
          document.getElementById("confirm_password"),
          "Passwords do not match"
        );
        hasErrors = true;
      }

      if (!document.getElementById("terms").checked) {
        showGeneralError("Please agree to the terms and conditions");
        hasErrors = true;
      }

      if (hasErrors) return;

      // Submit form
      const submitButton = form.querySelector('input[type="submit"]');
      const originalValue = submitButton.value;
      submitButton.value = "REGISTERING...";
      submitButton.disabled = true;

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });

        const result = await response.json();

        if (result.success) {
          showGeneralError("Registration successful! Redirecting...", true);

          setTimeout(() => {
            window.location.href = result.redirect;
          }, 1500);
        } else {
          showGeneralError(result.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        showGeneralError("Network error: " + error.message);
      } finally {
        submitButton.value = originalValue;
        submitButton.disabled = false;
      }
    });
  }
});
