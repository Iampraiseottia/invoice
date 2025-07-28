const countries = [
  "Afghanistan",
  "Albania",
  "Algeria", // ... include all countries from your original list
  "United States",
  "United Kingdom",
  "Cameroon",
  "Germany",
  "France",
  "Spain",
  "Italy",
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

  // Helper functions for error handling
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

  // Form handling
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
        });

        const result = await response.json();

        if (result.success) {
          showGeneralError("Registration successful! Redirecting...", true);
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("token", result.token);

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
