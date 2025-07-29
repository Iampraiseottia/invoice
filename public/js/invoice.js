
var selectedRow = null;
var invoiceItems = JSON.parse(localStorage.getItem("invoiceItems")) || [];
var currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Load saved data on page load
window.addEventListener("load", function () {
  loadSavedInvoiceData();
  loadUserProfile();
  populateInvoiceItems();
});

// User Profile Management
function loadUserProfile() {
  if (currentUser) {
    document.getElementById("full-name-get").textContent =
      currentUser.full_name || "Not Set";
    document.getElementById("email-get").textContent =
      currentUser.email || "Not Set";
    document.getElementById("num-get").textContent =
      currentUser.phone_number || "Not Set";
    document.getElementById("country-get").textContent =
      currentUser.country || "Not Set";

    if (currentUser.full_name) {
      document.getElementById("getcompanyName").value = currentUser.full_name;
      updateCompanyDisplays(currentUser.full_name);
    }
  }
}

function updateUserProfile(userData) {
  currentUser = userData;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  loadUserProfile();
}

// Save invoice data to local storage
function saveinvoiceDataLocally() {
  const invoiceData = {
    companyName: document.getElementById("getcompanyName").value,
    billingAddress: document.getElementById("getbillingAddress").value,
    country: document.getElementById("Country").value,
    invoiceNumber: document.getElementById("invoice-Number").value,
    invoiceDate: document.getElementById("invoice-date").value,
    termsConditions: document.querySelector("#try textarea").value,
    items: invoiceItems,
  };

  localStorage.setItem("currentInvoiceData", JSON.stringify(invoiceData));
}

// Load saved invoice data
function loadSavedInvoiceData() {
  const savedData = JSON.parse(localStorage.getItem("currentInvoiceData"));
  if (savedData) {
    document.getElementById("getcompanyName").value =
      savedData.companyName || "";
    document.getElementById("getbillingAddress").value =
      savedData.billingAddress || "";
    document.getElementById("Country").value = savedData.country || "";
    document.getElementById("invoice-Number").value =
      savedData.invoiceNumber || "100";
    document.getElementById("invoice-date").value = savedData.invoiceDate || "";
    document.querySelector("#try textarea").value =
      savedData.termsConditions || "";

    updateCompanyDisplays(savedData.companyName);
    updateBillingDisplays(savedData.billingAddress);

    invoiceItems = savedData.items || [];
  }
}

// Populate invoice items table from local storage
function populateInvoiceItems() {
  const outputTable = document.getElementById("output");
  const resultTable = document.getElementById("result");

  outputTable.innerHTML = "";
  resultTable.innerHTML = "";

  invoiceItems.forEach((item, index) => {
    insertRowIntoTable(item, index);
    insertRowIntoPrintTable(item);
  });

  updateTotals();
}

// onSubmit with local storage
function onSubmit(event) {
  if (event) event.preventDefault();

  var inputData = readData();
  if (!inputData.description || !inputData.amount) {
    alert("Please fill in description and amount");
    return;
  }

  if (selectedRow == null) {
    insertData(inputData);
  } else {
    updateData(inputData);
  }

  refreshData();
  saveinvoiceDataLocally();
}

function readData() {
  var inputData = {};
  inputData["description"] = document.getElementById("Descriptipon").value;
  inputData["amount"] = document
    .getElementById("Amount")
    .value.replace(/,/g, "");
  inputData["tax"] =
    document.getElementById("Tax").value.replace(/,/g, "") || "0";
  return inputData;
}

function insertData(data) {
  const item = {
    description: data.description,
    amount: parseFloat(data.amount) || 0,
    tax_percentage: parseFloat(data.tax) || 0,
  };

  invoiceItems.push(item);

  // Insert into table
  insertRowIntoTable(item, invoiceItems.length - 1);
  insertRowIntoPrintTable(item);

  updateTotals();
}

function insertRowIntoTable(item, index) {
  var table = document
    .getElementById("invoiceTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);

  newRow.insertCell(0).innerHTML = item.description;
  newRow.insertCell(1).innerHTML = formatNumber(item.amount);
  newRow.insertCell(2).innerHTML = formatNumber(item.tax_percentage);
  newRow.insertCell(3).innerHTML = `
    <a href="#" onClick="onEdit(this, ${index})" style="color: blue; text-decoration: none; margin-right: 10px;">Edit</a>
    <a href="#" onClick="onDelete(this, ${index})" style="color: red; text-decoration: none;">Delete</a>
  `;
}

function insertRowIntoPrintTable(item) {
  let tableBody = document.getElementById("result");
  var row = document.createElement("tr");

  ["description", "amount", "tax_percentage"].forEach(function (key) {
    var cell = document.createElement("td");
    cell.textContent =
      key === "description" ? item[key] : formatNumber(item[key]);
    row.appendChild(cell);
  });

  tableBody.appendChild(row);
}

// edit
function onEdit(td, index) {
  event.preventDefault();
  selectedRow = td.parentElement.parentElement;

  const item = invoiceItems[index];
  document.getElementById("Descriptipon").value = item.description;
  document.getElementById("Amount").value = formatNumber(item.amount);
  document.getElementById("Tax").value = formatNumber(item.tax_percentage);
}

//  update
function updateData(inputData) {
  const rowIndex = selectedRow.rowIndex - 1;

  invoiceItems[rowIndex] = {
    description: inputData.description,
    amount: parseFloat(inputData.amount) || 0,
    tax_percentage: parseFloat(inputData.tax) || 0,
  };

  // Update table displays
  selectedRow.cells[0].innerHTML = inputData.description;
  selectedRow.cells[1].innerHTML = formatNumber(inputData.amount);
  selectedRow.cells[2].innerHTML = formatNumber(inputData.tax);

  // Update print table
  const printTableRows = document.getElementById("result").rows;
  if (printTableRows[rowIndex]) {
    printTableRows[rowIndex].cells[0].textContent = inputData.description;
    printTableRows[rowIndex].cells[1].textContent = formatNumber(
      inputData.amount
    );
    printTableRows[rowIndex].cells[2].textContent = formatNumber(inputData.tax);
  }

  updateTotals();
  saveinvoiceDataLocally();
}

// Delete
function onDelete(td, index) {
  event.preventDefault();

  // Remove from array
  invoiceItems.splice(index, 1);

  // Remove from both tables
  const mainTable = document.getElementById("invoiceTable");
  const printTable = document.getElementById("result");

  mainTable.deleteRow(td.parentElement.parentElement.rowIndex);
  if (printTable.rows[index]) {
    printTable.deleteRow(index);
  }

  populateInvoiceItems();
  saveinvoiceDataLocally();
}

// Update totals calculation
function updateTotals() {
  let subtotal = 0;
  let taxTotal = 0;

  invoiceItems.forEach((item) => {
    const amount = parseFloat(item.amount) || 0;
    const taxPercentage = parseFloat(item.tax_percentage) || 0;
    const taxAmount = (amount * taxPercentage) / 100;

    subtotal += amount;
    taxTotal += taxAmount;
  });

  const grandTotal = subtotal + taxTotal;

  document.getElementById("sum").innerHTML = formatNumber(subtotal);
  document.getElementById("boris").innerHTML = formatNumber(taxTotal);
  document.getElementById("total").innerHTML = formatNumber(grandTotal);
  document.getElementById("total2").innerHTML = formatNumber(grandTotal);

  const printTotalElement = document.querySelector(".printTotal");
  if (printTotalElement) {
    printTotalElement.innerHTML = formatNumber(grandTotal);
  }
}

// calculation
function Calc(element) {
  updateTotals();
  saveinvoiceDataLocally();
}

// Format number with commas
function formatNumber(num) {
  return parseFloat(num || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function refreshData() {
  document.getElementById("Descriptipon").value = "";
  document.getElementById("Amount").value = "";
  document.getElementById("Tax").value = "";
  selectedRow = null;
}

// Company displays
function updateCompanyDisplays(value) {
  const upperValue = value.toUpperCase();
  document.getElementById("dispayuCompanyName").textContent = upperValue;
  document.getElementById("dispayCompanyName").textContent = upperValue;
}

// Billing displays
function updateBillingDisplays(value) {
  const upperValue = value.toUpperCase();
  document.getElementById("dispayBillingAddress").textContent = upperValue;
  document.getElementById("dispayuBillingAddress").textContent = upperValue;
}

// Event listeners for real-time updates
document
  .getElementById("getcompanyName")
  .addEventListener("input", function () {
    updateCompanyDisplays(this.value);
    saveinvoiceDataLocally();
  });

document
  .getElementById("getbillingAddress")
  .addEventListener("input", function () {
    updateBillingDisplays(this.value);
    saveinvoiceDataLocally();
  });

document
  .getElementById("invoice-Number")
  .addEventListener("input", function () {
    document.getElementById("displayInvoiceNumber").textContent = this.value;
    saveinvoiceDataLocally();
  });

document.getElementById("invoice-date").addEventListener("input", function () {
  document.getElementById("date").textContent = this.value;
  document.getElementById("displayDate").textContent = this.value;
  saveinvoiceDataLocally();
});

// Save and Print Invoice
async function saveAndPrintInvoice() {
  if (!currentUser) {
    alert("Please log in to save invoices");
    return;
  }

  const invoiceData = {
    invoice_number: document.getElementById("invoice-Number").value,
    invoice_date: document.getElementById("invoice-date").value,
    company_name: document.getElementById("getcompanyName").value,
    billing_address: document.getElementById("getbillingAddress").value,
    country: document.getElementById("Country").value,
    terms_conditions: document.querySelector("#try textarea").value,
    signature_image_data: getSignatureImageData(),
    logo_image_data: getLogoImageData(),
    items: invoiceItems.map((item) => ({
      description: item.description,
      amount: item.amount,
      tax_percentage: item.tax_percentage,
    })),
  };

  try {
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    const result = await response.json();

    if (result.success) {
      alert("Invoice saved successfully!");
      localStorage.removeItem("currentInvoiceData");
      localStorage.removeItem("invoiceItems");

      printInvoice();
    } else {
      alert("Failed to save invoice: " + result.error);
    }
  } catch (error) {
    console.error("Error saving invoice:", error);
    alert("Error saving invoice. Please try again.");
  }
}

// Get signature image data
function getSignatureImageData() {
  const signatureImg = document.querySelector("#image-container2 img");
  return signatureImg ? signatureImg.src : null;
}

// Get logo image data
function getLogoImageData() {
  const logoImg = document.querySelector("#image-container img");
  return logoImg ? logoImg.src : null;
}

// Print invoice function
function printInvoice() {
  document.getElementById("mainInvoiceTable").style.display = "block";

  printJS({
    printable: "mainInvoiceTable",
    type: "html",
    targetStyles: ["*"],
  });

  document.getElementById("mainInvoiceTable").style.display = "none";
}

// Image selection
function selectImage() {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.addEventListener("change", function (event) {
    var selectedFile = event.target.files[0];
    if (selectedFile) {
      displayImage(selectedFile);
      saveinvoiceDataLocally();
    }
  });

  fileInput.click();
}

function displayImage(file) {
  var container = document.getElementById("image-container");
  var logoAll = document.getElementById("gallery");

  container.innerHTML = "";

  if (file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var image = document.createElement("img");
      image.src = event.target.result;
      image.style.marginTop = "80px";
      image.style.marginRight = "30px";
      image.style.maxWidth = "150px";
      image.style.maxHeight = "150px";
      image.classList.add("selected-image");

      logoAll.style.display = "none";
      container.appendChild(image);
    };

    reader.readAsDataURL(file);
  }
}

function selectFile() {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.addEventListener("change", function (event) {
    var selectedFile = event.target.files[0];
    if (selectedFile) {
      displayFile(selectedFile);
      saveinvoiceDataLocally();
    }
  });

  fileInput.click();
}

function displayFile(file) {
  var container = document.getElementById("image-container2");
  var sig = document.getElementById("sig");
  var arrange = document.getElementById("try");

  container.innerHTML = "";

  if (file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var fileContent = document.createElement("img");
      fileContent.src = event.target.result;
      fileContent.style.height = "136px";
      fileContent.style.width = "170px";
      fileContent.style.marginTop = "50px";
      fileContent.classList.add("selected-image");

      sig.style.display = "none";
      arrange.style.display = "flex";
      arrange.style.justifyContent = "space-between";
      arrange.style.marginRight = "20px";

      container.appendChild(fileContent);
    };

    reader.readAsDataURL(file);
  }
}

// Print buttons
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("printButtonInPdf")
    .addEventListener("click", saveAndPrintInvoice);

  for (let i = 2; i <= 13; i++) {
    const button = document.getElementById(`printButtonInPdf${i}`);
    if (button) {
      button.addEventListener("click", saveAndPrintInvoice);
    }
  }

  document.getElementById("addItem").addEventListener("click", onSubmit);
});

// Input formatting for amounts
var amountEntered = document.getElementById("Amount");
amountEntered.addEventListener("keypress", function (event) {
  const key = event.key;
  if (!/[\d\s\b]/.test(key)) {
    event.preventDefault();
  }
});

amountEntered.addEventListener("input", function () {
  let inputValue = this.value.replace(/,/g, "");
  inputValue = addCommas(inputValue);
  this.value = inputValue;
});

var TaxEntered = document.getElementById("Tax");
TaxEntered.addEventListener("keypress", function (event) {
  const key = event.key;
  if (!/[\d\s\b\.]/.test(key)) {
    event.preventDefault();
  }
});

TaxEntered.addEventListener("input", function () {
  let inputValue = this.value.replace(/,/g, "");
  inputValue = addCommas(inputValue);
  this.value = inputValue;
});

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Country selection
const countries = [
  {
    name: "Afghanistan",
  },
  {
    name: "Albania",
  },
  {
    name: "Algeria",
  },
  {
    name: "American Samoa",
  },
  {
    name: "Andorra",
  },
  {
    name: "Angola",
  },
  {
    name: "Anguilla",
  },
  {
    name: "Antarctica",
  },
  {
    name: "Antigua and Barbuda",
  },
  {
    name: "Argentina",
  },
  {
    name: "Armenia",
  },
  {
    name: "Aruba",
  },
  {
    name: "Australia",
  },
  {
    name: "Austria",
  },
  {
    name: "Azerbaijan",
  },
  {
    name: "Bahamas",
  },
  {
    name: "Bahrain",
  },
  {
    name: "Bangladesh",
  },
  {
    name: "Barbados",
  },
  {
    name: "Belarus",
  },
  {
    name: "Belgium",
  },
  {
    name: "Belize",
  },
  {
    name: "Benin",
  },
  {
    name: "Bermuda",
  },
  {
    name: "Bhutan",
  },
  {
    name: "Bolivia",
  },
  {
    name: "Bosnia and Herzegovina",
  },
  {
    name: "Botswana",
  },
  {
    name: "Brazil",
  },
  {
    name: "Brunei Darussalam",
  },
  {
    name: "Bulgaria",
  },
  {
    name: "Burkina Faso",
  },
  {
    name: "Burundi",
  },
  {
    name: "Cambodia",
  },
  {
    name: "Cameroon",
  },
  {
    name: "Canada",
  },
  {
    name: "Cape Verde",
  },
  {
    name: "Cayman Islands",
  },
  {
    name: "Central African Republic",
  },
  {
    name: "Chad",
  },
  {
    name: "Chile",
  },
  {
    name: "China",
  },
  {
    name: "Christmas Island",
  },
  {
    name: "Cocos (Keeling) Islands",
  },
  {
    name: "Colombia",
  },
  {
    name: "Comoros",
  },
  {
    name: "Democratic Republic of the Congo (Kinshasa)",
  },
  {
    name: "Congo, Republic of (Brazzaville)",
  },
  {
    name: "Cook Islands",
  },
  {
    name: "Costa Rica",
  },
  {
    name: `Côte D'ivoire (Ivory Coast)`,
  },
  {
    name: "Croatia",
  },
  {
    name: "Cuba",
  },
  {
    name: "Cyprus",
  },
  {
    name: "Czech Republic",
  },
  {
    name: "Denmark",
  },
  {
    name: "Djibouti",
  },
  {
    name: "Dominica",
  },
  {
    name: "Dominican Republic",
  },
  {
    name: "East Timor (Timor-Leste)",
  },
  {
    name: "Ecuador",
  },
  {
    name: "Egypt",
  },
  {
    name: "El Salvador",
  },
  {
    name: "Equatorial Guinea",
  },
  {
    name: "Eritrea",
  },
  {
    name: "Estonia",
  },
  {
    name: "Ethiopia",
  },
  {
    name: "Falkland Islands",
  },
  {
    name: "Faroe Islands",
  },
  {
    name: "Fiji",
  },
  {
    name: "Finland",
  },
  {
    name: "France",
  },
  {
    name: "Gabon",
  },
  {
    name: "Gambia",
  },
  {
    name: "Georgia",
  },
  {
    name: "Germany",
  },
  {
    name: "Ghana",
  },
  {
    name: "Gibraltar",
  },
  {
    name: "Greece",
  },
  {
    name: "Greenland",
  },
  {
    name: "Grenada",
  },
  {
    name: "Guadeloupe",
  },
  {
    name: "Guam",
  },
  {
    name: "Guinea",
  },
  {
    name: "Guinea-Bissau",
  },
  {
    name: "Guyana",
  },
  {
    name: "Haiti",
  },
  {
    name: "Holy See",
  },
  {
    name: "Honduras",
  },
  {
    name: "Hong Kong",
  },
  {
    name: "Hungary",
  },
  {
    name: "Iceland",
  },
  {
    name: "India",
  },
  {
    name: "Indonesia",
  },
  {
    name: "Iran",
  },
  {
    name: "Iraq",
  },
  {
    name: "Ireland",
  },
  {
    name: "Israel",
  },
  {
    name: "Italy",
  },
  {
    name: "Jamaica",
  },
  {
    name: "Japan",
  },
  {
    name: "Jordan",
  },
  {
    name: "Kazakhstan",
  },
  {
    name: "Kenya",
  },
  {
    name: "Kiribati",
  },
  {
    name: "North Korea",
  },
  {
    name: "South Korea",
  },
  {
    name: "Kosovo",
  },
  {
    name: "Kuwait",
  },
  {
    name: "Kyrgyzstan",
  },
  {
    name: "Lao",
  },
  {
    name: "Latvia",
  },
  {
    name: "Lebanon",
  },
  {
    name: "Lesotho",
  },
  {
    name: "Liberia",
  },
  {
    name: "Libya",
  },
  {
    name: "Liechtenstein",
  },
  {
    name: "Lithuania",
  },
  {
    name: "Luxembourg",
  },
  {
    name: "Macau",
  },
  {
    name: "Madagascar",
  },
  {
    name: "Malawi",
  },
  {
    name: "Malaysia",
  },
  {
    name: "Maldives",
  },
  {
    name: "Mali",
  },
  {
    name: "Malta",
  },
  {
    name: "Marshall Islands",
  },
  {
    name: "Mauritius",
  },
  {
    name: "Mayotte",
  },
  {
    name: "Mexico",
  },
  {
    name: "Micronesia",
  },
  {
    name: "Moldova",
  },
  {
    name: "Mongolia",
  },
  {
    name: "Montenegro",
  },
  {
    name: "Montserrat",
  },
  {
    name: "Morocco",
  },
  {
    name: "Mozambique",
  },
  {
    name: "Myanmar",
  },
  {
    name: "Namibia",
  },
  {
    name: "Nauru",
  },
  {
    name: "Netherlands",
  },
  {
    name: "New Caledonia",
  },
  {
    name: "New Zealand",
  },
  {
    name: "Nicaragua",
  },
  {
    name: "Niger",
  },
  {
    name: "Nigeria",
  },
  {
    name: "Niue",
  },
  {
    name: "North Macedonia",
  },
  {
    name: "Northern Mariana Islands",
  },
  {
    name: "Norway",
  },
  {
    name: "Oman",
  },
  {
    name: "Pakistan",
  },
  {
    name: "Palau",
  },
  {
    name: "Palestine",
  },
  {
    name: "Panama",
  },
  {
    name: "Papua New Guinea",
  },
  {
    name: "Paraguay",
  },
  {
    name: "Peru",
  },
  {
    name: "Philippines",
  },
  {
    name: "Pitcairn Island",
  },
  {
    name: "Poland",
  },
  {
    name: "Portugal",
  },
  {
    name: "Puerto Rico",
  },
  {
    name: "Qatar",
  },
  {
    name: "Reunion Island",
  },
  {
    name: "Romania",
  },
  {
    name: "Russian Federation",
  },
  {
    name: "Rwanda",
  },
  {
    name: "Saint Kitts and Nevis",
  },
  {
    name: "Saint Lucia",
  },
  {
    name: "Saint Vincent and the Grenadines",
  },
  {
    name: "Samoa",
  },
  {
    name: "San Marino",
  },
  {
    name: "Sao Tome and Principe",
  },
  {
    name: "Saudi Arabia",
  },
  {
    name: "Senegal",
  },
  {
    name: "Serbia",
  },
  {
    name: "Seychelles",
  },
  {
    name: "Sierra Leone",
  },
  {
    name: "Singapore",
  },
  {
    name: "Slovakia",
  },
  {
    name: "Slovenia",
  },
  {
    name: "Solomon Islands",
  },
  {
    name: "Somalia",
  },
  {
    name: "South Africa",
  },
  {
    name: "South Sudan",
  },
  {
    name: "Spain",
  },
  {
    name: "Sudan",
  },
  {
    name: "Suriname",
  },
  {
    name: "Swaziland (Eswatini)",
  },
  {
    name: "Sweden",
  },
  {
    name: "Switzerland",
  },
  {
    name: "Syria",
  },
  {
    name: "Taiwan",
  },
  {
    name: "Tajikistan",
  },
  {
    name: "Tanzania",
  },
  {
    name: "Thailand",
  },
  {
    name: "Tibet",
  },
  {
    name: "Timor-Leste",
  },
  {
    name: "Togo",
  },
  {
    name: "Tokelau",
  },
  {
    name: "Tonga",
  },
  {
    name: "Trinidad and Tobago",
  },
  {
    name: "Tunisia",
  },
  {
    name: "Turkey",
  },
  {
    name: "Turkmenistan",
  },
  {
    name: "Turks and Caicos Islands",
  },
  {
    name: "Tuvalu",
  },
  {
    name: "Uganda",
  },
  {
    name: "United Arab Emirates",
  },
  {
    name: "United Kingdom",
  },
  {
    name: "United States",
  },
  {
    name: "Uruguay",
  },
  {
    name: "Uzbekistan",
  },
  {
    name: "Vanuatu",
  },
  {
    name: "Venezuela",
  },
  {
    name: "Vietnam",
  },
  {
    name: "Western Sahara",
  },
  {
    name: "Yemen",
  },
  {
    name: "Zambia",
  },
  {
    name: "Zimbabwe",
  },
];

// Set current date
const currentDate = new Date();
const dateOptions = { dateStyle: "short" };
const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
document.getElementById("displayDate").textContent = formattedDate;
document.getElementById("date").textContent = formattedDate;

// Generate auto invoice ID
async function generateAutoInvoiceId() {
  try {
    // Check if user is logged in
    if (
      !window.userProfileManager ||
      !window.userProfileManager.isUserLoggedIn()
    ) {
      // For guest users
      const lastId = localStorage.getItem("lastInvoiceId") || "100";
      const nextId = (parseInt(lastId) + 1).toString();
      localStorage.setItem("lastInvoiceId", nextId);
      return nextId;
    }

    // For logged-in users, get from server
    const response = await fetch("/api/invoices/next-number", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        return result.next_invoice_number;
      }
    }

    // Falling back to local storage
    const lastId = localStorage.getItem("lastInvoiceId") || "100";
    const nextId = (parseInt(lastId) + 1).toString();
    localStorage.setItem("lastInvoiceId", nextId);
    return nextId;
  } catch (error) {
    console.error("Error generating auto invoice ID:", error);

    return Date.now().toString().slice(-6);
  }
}

// Initialize auto invoice ID on page load
async function initializeInvoiceId() {
  const invoiceNumberField = document.getElementById("invoice-Number");
  if (
    invoiceNumberField &&
    (!invoiceNumberField.value || invoiceNumberField.value === "100")
  ) {
    const autoId = await generateAutoInvoiceId();
    invoiceNumberField.value = autoId;

    // Update display
    const displayElement = document.getElementById("displayInvoiceNumber");
    if (displayElement) {
      displayElement.textContent = autoId;
    }
  }
}

// Populate country dropdown with flags
function populateCountryDropdown() {
  const countrySelect = document.getElementById("Country");
  if (!countrySelect) return;

  countrySelect.innerHTML = '<option value="">Select Your Country</option>';

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", async function () {
  const today = new Date().toISOString().split("T")[0];
  const dateField = document.getElementById("invoice-date");
  if (dateField) {
    dateField.value = today;
  }

  await initializeInvoiceId();

  populateCountryDropdown();

  enhanceCountrySelection();

  // Load saved data
  loadSavedInvoiceData();
  loadUserProfile();
  populateInvoiceItems();

  // Add event listeners for auto-save
  const autoSaveFields = [
    "getcompanyName",
    "getbillingAddress",
    "Country",
    "invoice-Number",
    "invoice-date",
  ];
  autoSaveFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener("input", debouncedAutoSave);
    }
  });

  const termsField = document.querySelector("#try textarea");
  if (termsField) {
    termsField.addEventListener("input", debouncedAutoSave);
  }

  // Add event listeners for new buttons
  const saveAsDraftBtn = document.getElementById("saveAsDraft");
  const loadInvoiceBtn = document.getElementById("loadInvoice");

  if (saveAsDraftBtn) {
    saveAsDraftBtn.addEventListener("click", saveAsDraft);
  }

  if (loadInvoiceBtn) {
    loadInvoiceBtn.addEventListener("click", showInvoiceList);
  }

  // Check authentication and update UI
  if (window.userProfileManager) {
    await window.userProfileManager.checkAuthenticationStatus();
  }
});

// New invoice button functionality
function createNewInvoice() {
  clearInvoiceForm();

  initializeInvoiceId();

  const today = new Date().toISOString().split("T")[0];
  const dateField = document.getElementById("invoice-date");
  if (dateField) {
    dateField.value = today;
  }

  localStorage.removeItem("currentInvoiceData");
  localStorage.removeItem("invoiceItems");

  // Reset invoice items array
  invoiceItems = [];

  alert("New invoice created!");
}

// Add new invoice button to the interface
function addNewInvoiceButton() {
  const actionsContainer = document.querySelector(".invoice-actions");
  if (actionsContainer) {
    const newInvoiceBtn = document.createElement("button");
    newInvoiceBtn.className = "btn-secondary";
    newInvoiceBtn.id = "newInvoice";
    newInvoiceBtn.textContent = "New Invoice";
    newInvoiceBtn.addEventListener("click", createNewInvoice);

    actionsContainer.insertBefore(newInvoiceBtn, actionsContainer.firstChild);
  }
}

// After DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  addNewInvoiceButton();
});

