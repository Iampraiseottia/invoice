const popup = document.getElementById("pop-up");
const editData = document.getElementById("editMain");
let currentUserData = null;

// Check authentication status on page load
async function checkAuthenticationStatus() {
  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        currentUserData = result.user;
        localStorage.setItem("currentUser", JSON.stringify(currentUserData));
        updateUIForLoggedInUser(currentUserData);
        return currentUserData;
      }
    }

    // User not logged in
    currentUserData = null;
    localStorage.removeItem("currentUser");
    updateUIForLoggedOutUser();
    return null;
  } catch (error) {
    console.error("Error checking authentication:", error);
    currentUserData = null;
    localStorage.removeItem("currentUser");
    updateUIForLoggedOutUser();
    return null;
  }
}

// Update UI for logged in user
function updateUIForLoggedInUser(userData) {
  const userStatus = document.getElementById("userStatus");
  const userGreeting = document.getElementById("userGreeting");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const registerBtn = document.getElementById("registerBtn");
  const loginStatus = document.getElementById("login-status");
  const loadInvoiceBtn = document.getElementById("loadInvoice");

  if (userStatus) {
    userStatus.className = "user-status logged-in";
  }
  if (userGreeting) {
    userGreeting.textContent = `Welcome, ${userData.full_name}`;
  }
  if (loginBtn) {
    loginBtn.style.display = "none";
  }
  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
  }
  if (registerBtn) {
    registerBtn.style.display = "none";
  }
  if (loginStatus) {
    loginStatus.textContent = "Logged In";
  }
  if (loadInvoiceBtn) {
    loadInvoiceBtn.style.display = "inline-block";
  }

  displayUserData(userData);

  updateInvoiceFormWithUserData();
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
  const userStatus = document.getElementById("userStatus");
  const userGreeting = document.getElementById("userGreeting");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const registerBtn = document.getElementById("registerBtn");
  const loginStatus = document.getElementById("login-status");
  const loadInvoiceBtn = document.getElementById("loadInvoice");

  if (userStatus) {
    userStatus.className = "user-status logged-out";
  }
  if (userGreeting) {
    userGreeting.textContent = "Not logged in";
  }
  if (loginBtn) {
    loginBtn.style.display = "inline-block";
  }
  if (logoutBtn) {
    logoutBtn.style.display = "none";
  }
  if (registerBtn) {
    registerBtn.style.display = "inline-block";
  }
  if (loginStatus) {
    loginStatus.textContent = "Guest User";
  }
  if (loadInvoiceBtn) {
    loadInvoiceBtn.style.display = "none";
  }
}

// Open popup
function openPopup() {
  popup.classList.add("open-popup");
}

// Close popup
function closePopup() {
  popup.classList.remove("open-popup");
}

// Show edit details form
function editDetails() {
  populateEditForm();
  editData.style.display = "block";
}

// Display user data in popup
function displayUserData(userData) {
  document.getElementById("full-name-get").textContent =
    userData.full_name || "Not Set";
  document.getElementById("email-get").textContent =
    userData.email || "Not Set";
  document.getElementById("num-get").textContent =
    userData.phone_number || "Not Set";
  document.getElementById("country-get").textContent =
    userData.country || "Not Set";
}

// Display default data if no user is logged in
function displayDefaultData() {
  document.getElementById("full-name-get").textContent = "Guest User";
  document.getElementById("email-get").textContent = "Not logged in";
  document.getElementById("num-get").textContent = "Not Set";
  document.getElementById("country-get").textContent = "Not Set";
}

// Populate edit form with current data
function populateEditForm() {
  if (currentUserData) {
    document.getElementById("name-dis").value = currentUserData.full_name || "";
    document.getElementById("email-dis").value = currentUserData.email || "";
    document.getElementById("num-dis").value =
      currentUserData.phone_number || "";
    document.getElementById("country-dis").value =
      currentUserData.country || "";
    document.getElementById("password-dis").value = "";
  } else {
    document.getElementById("name-dis").value = "";
    document.getElementById("email-dis").value = "";
    document.getElementById("num-dis").value = "";
    document.getElementById("country-dis").value = "";
    document.getElementById("password-dis").value = "";
  }
}

// Update user profile
async function updateUserProfile() {
  const updatedData = {
    full_name: document.getElementById("name-dis").value.trim(),
    email: document.getElementById("email-dis").value.trim(),
    phone_number: document.getElementById("num-dis").value.trim(),
    country: document.getElementById("country-dis").value.trim(),
  };

  const password = document.getElementById("password-dis").value.trim();
  if (password) {
    updatedData.password = password;
  }

  if (!updatedData.full_name || !updatedData.email) {
    showError("profile-error", "Full name and email are required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(updatedData.email)) {
    showError("profile-error", "Please enter a valid email address");
    return;
  }

  try {
    if (currentUserData && currentUserData.id) {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (result.success) {
        currentUserData = { ...currentUserData, ...updatedData };
        localStorage.setItem("currentUser", JSON.stringify(currentUserData));

        displayUserData(currentUserData);
        editData.style.display = "none";
        showSuccess("profile-success", "Profile updated successfully!");
        updateInvoiceFormWithUserData();
      } else {
        showError("profile-error", "Failed to update profile: " + result.error);
      }
    } else {
      showError("profile-error", "Please log in to update your profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    showError("profile-error", "Error updating profile. Please try again.");
  }
}

// Show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  const successElement = document.getElementById(
    elementId.replace("error", "success")
  );
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
  if (successElement) {
    successElement.style.display = "none";
  }
}

// Show success message
function showSuccess(elementId, message) {
  const successElement = document.getElementById(elementId);
  const errorElement = document.getElementById(
    elementId.replace("success", "error")
  );
  if (successElement) {
    successElement.textContent = message;
    successElement.style.display = "block";
  }
  if (errorElement) {
    errorElement.style.display = "none";
  }
}

// Update invoice form with user data
function updateInvoiceFormWithUserData() {
  if (currentUserData) {
    const companyNameField = document.getElementById("getcompanyName");
    if (
      companyNameField &&
      !companyNameField.value &&
      currentUserData.full_name
    ) {
      companyNameField.value = currentUserData.full_name;
      companyNameField.dispatchEvent(new Event("input"));
    }

    const countryField = document.getElementById("Country");
    if (countryField && !countryField.value && currentUserData.country) {
      countryField.value = currentUserData.country;
      countryField.dispatchEvent(new Event("change"));
    }
  }
}

// User logout
async function logoutUser() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    currentUserData = null;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentInvoiceData");
    localStorage.removeItem("invoiceItems");

    updateUIForLoggedOutUser();
    clearInvoiceForm();
  }
}

// Clear invoice form
function clearInvoiceForm() {
  const fields = ["getcompanyName", "getbillingAddress", "Country"];
  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) field.value = "";
  });

  const invoiceNumberField = document.getElementById("invoice-Number");
  if (invoiceNumberField) invoiceNumberField.value = "100";

  const dateField = document.getElementById("invoice-date");
  if (dateField) dateField.value = "";

  const termsField = document.querySelector("#try textarea");
  if (termsField) termsField.value = "";

  const outputTable = document.getElementById("output");
  const resultTable = document.getElementById("result");
  if (outputTable) outputTable.innerHTML = "";
  if (resultTable) resultTable.innerHTML = "";

  const totalFields = ["sum", "boris", "total", "total2"];
  totalFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) field.innerHTML = "0";
  });
}

// Load user invoices
async function loadUserInvoices() {
  if (!currentUserData || !currentUserData.id) {
    return { success: false, error: "User not logged in" };
  }

  try {
    const response = await fetch("/api/invoices", {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error("Error loading invoices:", error);
    return { success: false, error: "Failed to load invoices" };
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  checkAuthenticationStatus();

  const updateButton = document.getElementById("update");
  if (updateButton) {
    updateButton.addEventListener("click", updateUserProfile);
  }
});

function isUserLoggedIn() {
  return currentUserData && currentUserData.id;
}

function getCurrentUser() {
  return currentUserData;
}

window.userProfileManager = {
  openPopup,
  closePopup,
  editDetails,
  updateUserProfile,
  logoutUser,
  loadUserInvoices,
  isUserLoggedIn,
  getCurrentUser,
  checkAuthenticationStatus,
};
