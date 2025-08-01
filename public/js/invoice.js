
var selectedRow = null;
var invoiceItems = JSON.parse(localStorage.getItem("invoiceItems")) || [];
var currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

var editingInvoiceId = null;
var editingInvoiceSource = null;


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

  if (!validateItemFields()) {
    return;
  }

  var inputData = readData();
  if (!inputData.description || !inputData.amount) {
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

function calculateTotalAmount() {
  let subtotal = 0;
  let taxTotal = 0;

  invoiceItems.forEach((item) => {
    const amount = parseFloat(item.amount) || 0;
    const taxPercentage = parseFloat(item.tax_percentage) || 0;
    const taxAmount = (amount * taxPercentage) / 100;

    subtotal += amount;
    taxTotal += taxAmount;
  });

  return subtotal + taxTotal;
}


// Invoice Template 

function generateInvoiceHTML(invoiceData) {
  const subtotal = invoiceData.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const taxTotal = invoiceData.items.reduce((sum, item) => {
    const amount = parseFloat(item.amount || 0);
    const taxRate = parseFloat(item.tax_percentage || 0);
    return sum + (amount * taxRate / 100);
  }, 0);
  const total = subtotal + taxTotal;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${invoiceData.invoice_number}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 20px; 
          background: white;
        }
        .header { 
          background: #398fbd; 
          color: white; 
          padding: 30px 20px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
        }
        .logo { 
          max-height: 100px; 
          max-width: 200px;
        }
        .company-info { 
          text-align: right; 
        }
        .company-info h2 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        .invoice-details { 
          margin: 30px 0; 
          display: flex; 
          justify-content: space-between; 
        }
        .bill-to h3 { 
          margin: 0 0 10px 0; 
          color: #398fbd;
        }
        .invoice-info h3 {
          margin: 0 0 10px 0;
          color: #398fbd;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0; 
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 12px; 
          text-align: left; 
        }
        th { 
          background: #72ded6; 
          font-weight: bold;
        }
        .amount-cell {
          text-align: right;
        }
        .totals { 
          text-align: right; 
          margin: 20px 0; 
        }
        .totals p {
          margin: 5px 0;
          font-size: 16px;
        }
        .total-row { 
          font-size: 24px; 
          font-weight: bold; 
          color: #264f88; 
          border-top: 2px solid #398fbd;
          padding-top: 10px;
        }
        .notes { 
          background: #f8f9fa; 
          padding: 20px; 
          margin: 20px 0; 
          border-left: 4px solid #72ded6;
        }
        .notes h3 {
          margin: 0 0 10px 0;
          color: #398fbd;
        }
        .signature { 
          margin: 20px 0; 
          text-align: center; 
        }
        .signature img { 
          max-height: 100px; 
          max-width: 200px;
        }
        @media print {
          body { margin: 0; }
          .header { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          ${invoiceData.logo_image_data ? `<img src="${invoiceData.logo_image_data}" class="logo" alt="Company Logo">` : `<h2>${invoiceData.company_name}</h2>`}
        </div>
        <div class="company-info">
          <h2 style="color: black" >${invoiceData.company_name}</h2>
          <p style="color: black">${invoiceData.billing_address.replace(/\n/g, '<br>')}</p>
          <p style="color: black"><strong>Date:</strong> ${new Date(invoiceData.invoice_date).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div class="invoice-details">
        <div class="bill-to">
          <h3>BILL TO:</h3>
          <p><strong>${invoiceData.company_name}</strong></p>
          <p>${invoiceData.billing_address.replace(/\n/g, '<br>')}</p>
          ${invoiceData.country ? `<p>${invoiceData.country}</p>` : ''}
        </div>
        <div class="invoice-info">
          <h3>Invoice #${invoiceData.invoice_number}</h3>
          <p><strong>Invoice Date:</strong> ${new Date(invoiceData.invoice_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> Completed</p>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th style="width: 50%;">Description</th>
            <th style="width: 20%;">Amount (FCFA)</th>
            <th style="width: 15%;">Tax %</th>
            <th style="width: 15%;">Total (FCFA)</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => {
            const amount = parseFloat(item.amount) || 0;
            const tax_percent = parseFloat(item.tax_percentage) || 0;
            const tax_amount = (amount * tax_percent) / 100;
            const itemTotal = amount + tax_amount;
            return `
              <tr>
                <td>${item.description}</td>
                <td class="amount-cell">${amount.toLocaleString()}</td>
                <td class="amount-cell">${tax_percent}%</td>
                <td class="amount-cell">${itemTotal.toLocaleString()}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      
      <div class="totals">
        <p><strong>Subtotal: ${subtotal.toLocaleString()} FCFA</strong></p>
        <p><strong>Tax Total: ${taxTotal.toLocaleString()} FCFA</strong></p>
        <p class="total-row">TOTAL: ${total.toLocaleString()} FCFA</p>
      </div>
      
      ${invoiceData.terms_conditions ? `
        <div class="notes">
          <h3>NOTES:</h3>
          <p>${invoiceData.terms_conditions.replace(/\n/g, '<br>')}</p>
        </div>
      ` : ''}
      
      ${invoiceData.signature_image_data ? `
        <div class="signature">
          <p><strong>Authorized Signature:</strong></p>
          <img src="${invoiceData.signature_image_data}" alt="Authorized Signature">
        </div>
      ` : ''}
      
      <div style="margin-top: 40px; text-align: center; color: #666; border-top: 1px solid #ddd; padding-top: 20px;">
        <p>Generated by EaseInvoice | ${new Date().toLocaleDateString()}</p>
      </div>
    </body>
    </html>
  `;
}



async function generateAndDownloadPDF(invoiceData) {
  try {
    // New window with the invoice content
    const printWindow = window.open('', '_blank');
    const invoiceHTML = generateInvoiceHTML(invoiceData);
    
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
        printWindow.onafterprint = function() {
          printWindow.close();
        };
      }, 100);
    };
    
  } catch (error) {
    console.error('PDF generation error:', error);
    showNotification('PDF generation failed, but invoice was saved.', 'warning');
  }
}

// Save and Print Invoice
async function saveAndPrintInvoice() {
  // Validate all form fields first
  if (!validateFormFields()) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  const saveButton = document.getElementById('printButtonInPdf');
  const originalText = saveButton.innerHTML;
  const isUpdating = editingInvoiceId !== null;
  
  saveButton.innerHTML = `<div style="display: flex; align-items: center; justify-content: center;"><div style="width: 20px; height: 20px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div><span style="margin-left: 10px;">${isUpdating ? 'Updating...' : 'Saving...'}</span></div>`;
  saveButton.disabled = true;

  try {
    // Form values with validation
    const invoiceNumber = document.getElementById("invoice-Number")?.value?.trim();
    const invoiceDate = document.getElementById("invoice-date")?.value;
    const companyName = document.getElementById("getcompanyName")?.value?.trim();
    const billingAddress = document.getElementById("getbillingAddress")?.value?.trim();
    const country = document.getElementById("Country")?.value?.trim();
    const termsConditions = document.querySelector("#try textarea")?.value?.trim();

    if (!invoiceNumber) {
      throw new Error('Invoice number is required');
    }
    if (!invoiceDate) {
      throw new Error('Invoice date is required');
    }
    if (!companyName) {
      throw new Error('Company name is required');
    }
    if (!Array.isArray(invoiceItems) || invoiceItems.length === 0) {
      throw new Error('At least one invoice item is required');
    }


    const signatureImageData = getSignatureImageData();
    const logoImageData = getLogoImageData();

    // Prepare invoice data 
    const invoiceData = {
      invoice_number: invoiceNumber,
      invoice_date: invoiceDate,
      company_name: companyName,
      billing_address: billingAddress || '',
      country: country || '',
      terms_conditions: termsConditions || '',
      signature_image_data: getSignatureImageData(),
      logo_image_data: getLogoImageData(),
      items: invoiceItems.map((item) => ({
        description: (item.description || '').toString().trim(),
        amount: parseFloat(item.amount) || 0,
        tax_percentage: parseFloat(item.tax_percentage) || 0,
      }))
    };

    console.log('Prepared invoice data:', invoiceData);

    const totalAmount = calculateTotalAmount();

    // Check if user is logged in and save/update to server
    let serverSaveSuccess = false;
    let serverInvoiceId = editingInvoiceId;

    if (window.userProfileManager && window.userProfileManager.isUserLoggedIn()) {
      try {
        const url = isUpdating ? `/api/invoices/${editingInvoiceId}` : "/api/invoices";
        const method = isUpdating ? "PUT" : "POST";
        
        console.log(`Attempting to ${isUpdating ? 'update' : 'save'} to server...`, invoiceData);
        
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(invoiceData),
        });

        console.log('Server response status:', response.status);
        const responseText = await response.text();
        console.log('Raw server response:', responseText);
        
        if (!response.ok) {
          console.error('Server response error:', responseText);
          throw new Error(`Server error: ${response.status} - ${responseText}`);
        }

        let result;
        try {
          result = JSON.parse(responseText);
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
          throw new Error('Invalid JSON response from server');
        }
        
        console.log('Parsed server response:', result);
        
        if (result.success) {
          serverSaveSuccess = true;
          if (!isUpdating) {
            serverInvoiceId = result.invoice.id;
          }
          showNotification(`Invoice ${isUpdating ? 'updated' : 'saved'} to server successfully!`, 'success');
        } else {
          throw new Error(result.error || `Server ${isUpdating ? 'update' : 'save'} failed`);
        }
      } catch (serverError) {
        console.error(`Server ${isUpdating ? 'update' : 'save'} failed:`, serverError);
        showNotification(`Server ${isUpdating ? 'update' : 'save'} failed: ${serverError.message}. ${isUpdating ? 'Updating' : 'Saving'} locally instead.`, 'warning');
      }
    } else {
      console.log('User not logged in, saving locally only');
    }

    // Handle local storage updates
    const savedInvoices = JSON.parse(localStorage.getItem("savedInvoices")) || [];
    const invoiceWithId = {
      ...invoiceData,
      id: serverInvoiceId || editingInvoiceId || Date.now(),
      created_at: isUpdating ? (savedInvoices.find(inv => inv.id == editingInvoiceId)?.created_at || new Date().toISOString()) : new Date().toISOString(),
      updated_at: isUpdating ? new Date().toISOString() : undefined,
      status: 'completed',
      total_amount: totalAmount,
      saved_to_server: serverSaveSuccess
    };
    
    if (isUpdating) {
      // Update existing invoice in local storage
      const existingIndex = savedInvoices.findIndex(inv => inv.id == editingInvoiceId);
      if (existingIndex !== -1) {
        savedInvoices[existingIndex] = invoiceWithId;
      } else {
        savedInvoices.push(invoiceWithId);
      }
    } else {
      // Add new invoice
      savedInvoices.push(invoiceWithId);
    }
    
    localStorage.setItem("savedInvoices", JSON.stringify(savedInvoices));

    if (serverSaveSuccess) {
      showNotification(`Invoice ${isUpdating ? 'updated' : 'saved'} successfully to database!`, 'success');
    } else {
      showNotification(`Invoice ${isUpdating ? 'updated' : 'saved'} locally!`, 'success');
    }
    
    localStorage.removeItem("currentInvoiceData");
    localStorage.removeItem("invoiceItems");

    // Generate and download PDF
    await generateAndDownloadPDF(invoiceWithId);

    // Reset editing state and create new invoice 
    setTimeout(() => {
      console.log(`Invoice ${isUpdating ? 'updated' : 'saved'} successfully! Creating new invoice...`);
      
      // Reset editing state
      editingInvoiceId = null;
      editingInvoiceSource = null;
      
      const printButton = document.getElementById('printButtonInPdf');
      if (printButton) {
        printButton.innerHTML = `<i class="fas fa-print"></i> Save & Print Invoice`;
      }
      
      clearInvoiceForm();
      
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('invoice-date').value = today;
      
      initializeInvoiceId();
      
      showNotification('New invoice ready!', 'success');
    }, 2000);

  } catch (error) {
    console.error("Error saving invoice:", error);
    showNotification(error.message || 'Error saving invoice. Please try again.', 'error');
  } finally {
    saveButton.innerHTML = originalText;
    saveButton.disabled = false;
  }
} 



function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);npm install nodemailer puppeteer
    z-index: 10000;
    max-width: 400px;
    font-size: 14px;
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer !important; margin-left: 10px;">&times;</button>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}


async function showAllInvoices() {
  let allInvoices = [];
  
  // Check if user is logged in and fetch from server
  if (window.userProfileManager && window.userProfileManager.isUserLoggedIn()) {
    try {
      console.log('Fetching invoices from server...');
      
      const response = await fetch("/api/invoices", {
        method: "GET",
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server invoices:', result);
        
        if (result.success && result.invoices) {
          allInvoices = result.invoices.map(invoice => ({
            ...invoice,
            source: 'server',
            total_amount: parseFloat(invoice.total_amount) || 0
          }));
          showNotification('Loaded invoices from database', 'success');
        }
      } else {
        console.warn('Failed to fetch from server, using local storage');
        throw new Error('Server fetch failed');
      }
    } catch (error) {
      console.error('Error fetching server invoices:', error);
      showNotification('Using local invoices only', 'warning');
    }
  }
  
  // Get local invoices 
  const localInvoices = JSON.parse(localStorage.getItem("savedInvoices")) || [];
  
  // If no server invoices, use local ones
  if (allInvoices.length === 0) {
    allInvoices = localInvoices.map(invoice => ({
      ...invoice,
      source: 'local'
    }));
  }

  // Create modal to display invoices
  const modal = document.createElement('div');
  modal.id = 'invoiceListModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 80%;
    width: 70%;
    max-height: 80%;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;

  const invoiceSource = allInvoices.length > 0 && allInvoices[0].source === 'server' ? 'Database' : 'Local Storage';
  
  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <h3 style="margin: 0; color: #398fbd;">Saved Invoices (${allInvoices.length})</h3>
        <small style="color: #666;">Source: ${invoiceSource}</small>
      </div>
      <button onclick="closeInvoiceModal()" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">&times;</button>
    </div>
    <div id="invoiceGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
      ${allInvoices.map(invoice => `
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #f8f9fa; position: relative;">
          ${invoice.source === 'server' ? '<div style="position: absolute; top: 5px; right: 5px; background: #28a745; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px;">DB</div>' : ''}
          <h4 style="margin: 0 0 10px 0; color: #398fbd;">Invoice #${invoice.invoice_number}</h4>
          <p style="margin: 5px 0;"><strong>Company:</strong> ${invoice.company_name || 'N/A'}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(invoice.invoice_date).toLocaleDateString()}</p>
          <p style="margin: 5px 0;"><strong>Total:</strong> ${(invoice.total_amount || 0).toLocaleString()} FCFA</p>
          <p style="margin: 5px 0;"><strong>Items:</strong> ${(invoice.items && invoice.items.length) || 0}</p>
          <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="viewInvoice('${invoice.id}', '${invoice.source}')" style="background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">View</button>
            <button onclick="printSavedInvoice('${invoice.id}', '${invoice.source}')" style="background: #17a2b8; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">Print</button>
            <button onclick="loadInvoiceToEdit('${invoice.id}', '${invoice.source}')" style="background: #ffc107; color: #212529; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">Edit</button>
            <button onclick="deleteInvoice('${invoice.id}', '${invoice.source}')" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}


// Invoice modal
window.closeInvoiceModal = function() {
  const modal = document.getElementById('invoiceListModal');
  if (modal) modal.remove();
};


// View All Invoices 
window.viewInvoice = async function(invoiceId, source = 'local') {
  let invoice = null;
  
  if (source === 'server') {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          invoice = result.invoice;
        }
      }
    } catch (error) {
      console.error('Error fetching invoice from server:', error);
    }
  }
  
  // Fallback to local storage
  if (!invoice) {
    const savedInvoices = JSON.parse(localStorage.getItem("savedInvoices")) || [];
    invoice = savedInvoices.find(inv => inv.id == invoiceId);
  }
  
  closeInvoiceModal();
  
  if (invoice) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generateInvoiceHTML(invoice));
    printWindow.document.close();
  } else {
    showNotification('Invoice not found', 'error');
  }
};



window.printSavedInvoice = async function(invoiceId, source = 'local') {
  let invoice = null;
  
  if (source === 'server') {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          invoice = result.invoice;
        }
      }
    } catch (error) {
      console.error('Error fetching invoice from server:', error);
    }
  }
  
  // Fallback to local storage
  if (!invoice) {
    const savedInvoices = JSON.parse(localStorage.getItem("savedInvoices")) || [];
    invoice = savedInvoices.find(inv => inv.id == invoiceId);
  }
  
  closeInvoiceModal();
  
  if (invoice) {
    generateAndDownloadPDF(invoice);
  } else {
    showNotification('Invoice not found', 'error');
  }
};


window.loadInvoiceToEdit = async function(invoiceId, source = 'local') {
  let invoice = null;
  
  if (source === 'server') {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          invoice = result.invoice;
        }
      }
    } catch (error) {
      console.error('Error fetching invoice from server:', error);
    }
  }
  
  // Fallback to local storage
  if (!invoice) {
    const savedInvoices = JSON.parse(localStorage.getItem("savedInvoices")) || [];
    invoice = savedInvoices.find(inv => inv.id == invoiceId);
  }
  
  closeInvoiceModal();
  
  if (invoice) {
    // Set editing state
    editingInvoiceId = invoiceId;
    editingInvoiceSource = source;
    
    // Load invoice data into form (excluding images)
    document.getElementById("getcompanyName").value = invoice.company_name || "";
    document.getElementById("getbillingAddress").value = invoice.billing_address || "";
    document.getElementById("Country").value = invoice.country || "";
    document.getElementById("invoice-Number").value = invoice.invoice_number || "";
    document.getElementById("invoice-date").value = invoice.invoice_date || "";
    document.querySelector("#try textarea").value = invoice.terms_conditions || "";

    if (invoice.items) {
      invoiceItems = invoice.items;
      populateInvoiceItems();
    }

    // Update displays
    updateCompanyDisplays(invoice.company_name || "");
    updateBillingDisplays(invoice.billing_address || "");
    
    // Reset logo container and show gallery
    const imageContainer = document.getElementById('image-container');
    const gallery = document.getElementById('gallery');
    if (imageContainer) {
      imageContainer.innerHTML = '';
    }
    if (gallery) {
      gallery.style.display = 'block';
    }
    
    // Reset signature container and show signature area
    const imageContainer2 = document.getElementById('image-container2');
    const sig = document.getElementById('sig');
    const arrange = document.getElementById('try');
    if (imageContainer2) {
      imageContainer2.innerHTML = '';
    }
    if (sig) {
      sig.style.display = 'block';
    }
    if (arrange) {
      arrange.style.display = 'block';
      arrange.style.justifyContent = '';
      arrange.style.marginRight = '';
    }
    
    // Update button text to indicate editing
    const printButton = document.getElementById('printButtonInPdf');
    if (printButton) {
      printButton.innerHTML = `<i class="fas fa-save"></i> Update & Print Invoice`;
    }
    
    showNotification('Invoice loaded for editing. Please select logo and signature again.', 'info');
  } else {
    showNotification('Invoice not found', 'error');
  }
};



window.deleteInvoice = async function(invoiceId, source = 'local') {
  if (!confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
    return;
  }

  // Show loading state
  const deleteButtons = document.querySelectorAll(`[onclick*="deleteInvoice('${invoiceId}', '${source}')"]`);
  deleteButtons.forEach(btn => {
    btn.disabled = true;
    btn.innerHTML = 'Deleting...';
    btn.style.opacity = '0.6';
  });

  let serverDeleteSuccess = false;
  let localDeleteSuccess = false;

  try {
    // Delete from server/database if it's a server invoice or if user is logged in
    if (source === 'server' || (window.userProfileManager && window.userProfileManager.isUserLoggedIn())) {
      try {
        console.log(`Attempting to delete invoice ${invoiceId} from database...`);
        
        const response = await fetch(`/api/invoices/${invoiceId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        console.log('Delete response status:', response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log('Delete response:', result);
          
          if (result.success) {
            serverDeleteSuccess = true;
            console.log('Successfully deleted from database');
          } else {
            throw new Error(result.error || 'Database deletion failed');
          }
        } else {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
      } catch (serverError) {
        console.error('Error deleting from server/database:', serverError);
        showNotification(`Failed to delete from database: ${serverError.message}`, 'error');
        
      }
    }

    try {
      const savedInvoices = JSON.parse(localStorage.getItem("savedInvoices")) || [];
      const initialLength = savedInvoices.length;
      const filteredInvoices = savedInvoices.filter(inv => inv.id != invoiceId);
      
      if (filteredInvoices.length < initialLength) {
        localStorage.setItem("savedInvoices", JSON.stringify(filteredInvoices));
        localDeleteSuccess = true;
        console.log('Successfully deleted from local storage');
      }
    } catch (localError) {
      console.error('Error deleting from local storage:', localError);
    }

    // Show appropriate success message
    if (source === 'server' && serverDeleteSuccess) {
      showNotification('Invoice deleted from database successfully!', 'success');
    } else if (source === 'local' && localDeleteSuccess) {
      showNotification('Invoice deleted from local storage successfully!', 'success');
    } else if (serverDeleteSuccess && localDeleteSuccess) {
      showNotification('Invoice deleted successfully from both database and local storage!', 'success');
    } else if (serverDeleteSuccess || localDeleteSuccess) {
      showNotification('Invoice deleted successfully!', 'success');
    } else {
      showNotification('Failed to delete invoice completely. Please try again.', 'error');
      return;
    }

    closeInvoiceModal();
    
    // Refresh the invoice list after a short delay
    setTimeout(() => {
      showAllInvoices();
    }, 500);

  } catch (error) {
    console.error('Unexpected error during deletion:', error);
    showNotification(`Unexpected error: ${error.message}`, 'error');
  } finally {
    // Reset button states
    deleteButtons.forEach(btn => {
      btn.disabled = false;
      btn.innerHTML = 'Delete';
      btn.style.opacity = '1';
    });
  }
};



// Get signature image and Logo data
function getSignatureImageData() {
  const signatureImg = document.querySelector("#image-container2 img");
  if (signatureImg && signatureImg.src && signatureImg.src !== '') {
    return signatureImg.src;
  }
  return null;
}

function getLogoImageData() {
  const logoImg = document.querySelector("#image-container img");
  if (logoImg && logoImg.src && logoImg.src !== '') {
    return logoImg.src;
  }
  return null;
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


  // Check authentication and update UI
  if (window.userProfileManager) {
    await window.userProfileManager.checkAuthenticationStatus();
  }
});


// New invoice button functionality
function createNewInvoice() {
  // Reset editing state
  editingInvoiceId = null;
  editingInvoiceSource = null;
  
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

  console.log("New invoice created!");
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





// STyles 

const validationStyles = `
  .error-border {
    border: 2px solid #dc3545 !important;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .field-container {
    margin-bottom: 1rem;
  }
`;

if (!document.getElementById('validation-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'validation-styles';
  styleSheet.textContent = validationStyles;
  document.head.appendChild(styleSheet);
}



// Validation functions
function validateFormFields() {
  const errors = [];
  let isValid = true;

  clearAllErrors();

  // Required fields 
  const requiredFields = [
    { 
      id: 'getcompanyName', 
      name: 'Company Name', 
      message: 'Company name is required',
      validate: (val) => val && val.trim().length > 0
    },
    { 
      id: 'getbillingAddress', 
      name: 'Billing Address', 
      message: 'Billing address is required',
      validate: (val) => val && val.trim().length > 0
    },
    { 
      id: 'Country', 
      name: 'Country', 
      message: 'Please select a country',
      validate: (val) => val && val.trim().length > 0
    },
    { 
      id: 'invoice-Number', 
      name: 'Invoice Number', 
      message: 'Invoice number is required',
      validate: (val) => val && val.toString().trim().length > 0
    },
    { 
      id: 'invoice-date', 
      name: 'Invoice Date', 
      message: 'Invoice date is required',
      validate: (val) => val && val.length > 0
    }
  ];

  // Validate form fields
  requiredFields.forEach(field => {
    const element = document.getElementById(field.id);
    const value = element ? element.value : null;
    
    if (!field.validate(value)) {
      showFieldError(field.id, field.message);
      isValid = false;
    }
  });

  // Check if logo is selected
  const logoContainer = document.getElementById('image-container');
  const logoGallery = document.getElementById('gallery');
  if (!logoContainer || !logoContainer.innerHTML.trim() || 
      (logoGallery && logoGallery.style.display !== 'none')) {
    showImageError('gallery', 'Please select a logo');
    isValid = false;
  }

  // Check if signature is selected
  const signatureContainer = document.getElementById('image-container2');
  const signatureDiv = document.getElementById('sig');
  if (!signatureContainer || !signatureContainer.innerHTML.trim() || 
      (signatureDiv && signatureDiv.style.display !== 'none')) {
    showImageError('sig', 'Please add your signature');
    isValid = false;
  }

  // Check if at least one item is added
  if (!Array.isArray(invoiceItems) || invoiceItems.length === 0) {
    showFieldError('invoiceTable', 'Please add at least one item to the invoice');
    isValid = false;
  }

  // Validate invoice items
  if (Array.isArray(invoiceItems)) {
    invoiceItems.forEach((item, index) => {
      if (!item.description || !item.description.toString().trim()) {
        showNotification(`Item ${index + 1}: Description is required`, 'error');
        isValid = false;
      }
      if (!item.amount || parseFloat(item.amount) <= 0) {
        showNotification(`Item ${index + 1}: Valid amount is required`, 'error');
        isValid = false;
      }
    });
  }

  return isValid;
}


function validateItemFields() {
  const errors = [];
  let isValid = true;

  clearItemErrors();

  const description = document.getElementById('Descriptipon').value.trim();
  const amount = document.getElementById('Amount').value.trim();
  const tax = document.getElementById('Tax').value.trim();

  if (!description) {
    showFieldError('Descriptipon', 'Description is required');
    isValid = false;
  }

  if (!amount) {
    showFieldError('Amount', 'Amount is required');
    isValid = false;
  }

  if (!tax) {
    showFieldError('Tax', 'Tax percentage is required');
    isValid = false;
  }

  return isValid;
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Add error border
  field.classList.add('error-border');

  // Create or update error message
  let errorElement = document.getElementById(`${fieldId}-error`);
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = `${fieldId}-error`;
    errorElement.className = 'error-message';
    
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }
  
  errorElement.textContent = message;
}




function showImageError(elementId, message) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.style.border = '2px solid #dc3545';

  // Create or update error message
  let errorElement = document.getElementById(`${elementId}-error`);
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = `${elementId}-error`;
    errorElement.className = 'error-message';
    
    element.parentNode.insertBefore(errorElement, element.nextSibling);
  }
  
  errorElement.textContent = message;
}



function clearAllErrors() {
  document.querySelectorAll('.error-border').forEach(field => {
    field.classList.remove('error-border');
  });

  // Remove all error messages
  document.querySelectorAll('.error-message').forEach(error => {
    error.remove();
  });

  const gallery = document.getElementById('gallery');
  const sig = document.getElementById('sig');
  if (gallery) gallery.style.border = '';
  if (sig) sig.style.border = '';
}

function clearItemErrors() {
  const itemFields = ['Descriptipon', 'Amount', 'Tax'];
  itemFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) field.classList.remove('error-border');
    if (errorElement) errorElement.remove();
  });
}



// Clearing invoice fields 
function clearInvoiceForm() {
  // Reset editing state
  editingInvoiceId = null;
  editingInvoiceSource = null;
  
  const printButton = document.getElementById('printButtonInPdf');
  if (printButton) {
    printButton.innerHTML = `<i class="fas fa-print"></i> Save & Print Invoice`;
  }
  
  document.getElementById('getcompanyName').value = '';
  document.getElementById('getbillingAddress').value = '';
  document.getElementById('Country').value = '';
  document.getElementById('invoice-Number').value = '';
  document.getElementById('invoice-date').value = '';
  document.querySelector('#try textarea').value = '';

  document.getElementById('Descriptipon').value = '';
  document.getElementById('Amount').value = '';
  document.getElementById('Tax').value = '';

  document.getElementById('dispayuCompanyName').textContent = '';
  document.getElementById('dispayCompanyName').textContent = '';
  document.getElementById('dispayBillingAddress').textContent = '';
  document.getElementById('dispayuBillingAddress').textContent = '';
  document.getElementById('displayInvoiceNumber').textContent = '100';
  document.getElementById('date').textContent = '';
  document.getElementById('displayDate').textContent = '';

  const imageContainer = document.getElementById('image-container');
  const imageContainer2 = document.getElementById('image-container2');
  const gallery = document.getElementById('gallery');
  const sig = document.getElementById('sig');

  if (imageContainer) imageContainer.innerHTML = '';
  if (imageContainer2) imageContainer2.innerHTML = '';
  if (gallery) gallery.style.display = 'block';
  if (sig) sig.style.display = 'block';

  document.getElementById('sum').innerHTML = '0';
  document.getElementById('boris').innerHTML = '0';
  document.getElementById('total').innerHTML = '0';
  document.getElementById('total2').innerHTML = '0';
  
  const printTotalElement = document.querySelector('.printTotal');
  if (printTotalElement) {
    printTotalElement.innerHTML = '0';
  }

  invoiceItems = [];
  document.getElementById('output').innerHTML = '';
  document.getElementById('result').innerHTML = '';

  clearAllErrors();
}
