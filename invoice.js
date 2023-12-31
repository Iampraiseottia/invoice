// DISPLAY & STORE TABLE VALUES, EDIT AND DELETE

var selectedRow = null;


function onSubmit(){
    var inputData = readData();
    if (selectedRow == null) 
        insertData(inputData);
    else
        updateData(inputData);


    refreshData()

}

function readData(){
    var inputData = {};
    inputData['description'] = document.getElementById('Descriptipon').value;
    inputData['amount'] = document.getElementById('Amount').value;
    inputData['tax'] = document.getElementById('Tax').value;
    return inputData;
}


function insertData(data){
    var table = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0], sum = 0;
    var newRow = table.insertRow(table.length); 
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.description;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.amount;  
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.tax;
    
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a href="" onClick="onEdit(this)">Edit</a>
                        <a href="" onClick="onDelete(this)">Delete</a>`;



  //Print Table
  let objectTable = {
    'description': data.description,
    'amount': data.amount,
    'tax': data.tax
  }
  
  let tableBody = document.getElementById('result');

  var row = document.createElement('tr');
  
  Object.values(objectTable).forEach(function(value) {
    var cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  });
  
  tableBody.appendChild(row);


}
    refreshData();


//Thes is to automatically refresh the browser input field

function refreshData(){
    document.getElementById('Descriptipon').value = '';
    document.getElementById('Amount').value = '';
    document.getElementById('Tax').value = '';
    var selectedRow = null;

}

//edit each content

function onEdit(td){
    event.preventDefault();
    selectedRow = td.parentElement.parentElement;
    document.getElementById('Descriptipon').value = selectedRow.cells[0].innerHTML;
    document.getElementById('Amount').value = selectedRow.cells[1].innerHTML;   
    document.getElementById('Tax').value = selectedRow.cells[2].innerHTML;      
}

//update data in cell

function updateData(inputData){
    selectedRow.cells[0].innerHTML = inputData.description;
    selectedRow.cells[1].innerHTML = inputData.amount;
    selectedRow.cells[2].innerHTML = inputData.tax;

}

//delete cell

function onDelete(td){
    event.preventDefault();
    row = td.parentElement.parentElement;
    document.getElementById('invoiceTable').deleteRow(row.rowIndex);
    refreshData();
}
 
//CALCULATION


function Calc(all){
    var tax = all.parentElement.parentElement.children[2].children[1].value;
    var amt = all.parentElement.parentElement.children[1].children[1].value;

    const amtValue = parseInt(amt.replace(/,/g, ''));
    const taxValue = parseInt(tax.replace(/,/g,'')); 


    var subtotal = amtValue + (taxValue / 100);
    document.getElementById('total2').innerHTML = subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var table = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0], sumAmt = 0, sumTax = 0;
    
    for(var i = 0; i < table.rows.length; i++){
      
        sumAmt = sumAmt + parseInt(table.rows[i].cells[1].innerHTML.replace(/,/g, ''));
        
    }


    document.getElementById('sum').innerHTML = sumAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    for(var i = 0; i < table.rows.length; i++){
        sumTax = sumTax + parseInt(table.rows[i].cells[2].innerHTML.replace(/,/g, ''));

    }

    document.getElementById('boris').innerHTML = sumTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    grandSum = sumAmt + sumTax;
    document.getElementById('total').innerHTML = grandSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var printTotalElement = document.querySelector('.printTotal');
    printTotalElement.innerHTML = grandSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
}




//COMMA'S
var amountEntered = document.getElementById('Amount');

amountEntered.addEventListener('keypress', function(event) {
  const key = event.key;
  
  if (!/[\d\s\b]/.test(key)) {
    event.preventDefault();
  }
});


amountEntered.addEventListener('input', function() {
  // Remove existing commas from the input value
  let inputValue = this.value.replace(/,/g, '');
  
  // Format the input value with commas
  inputValue = addCommas(inputValue);
  
  // Update the input value with the formatted number
  this.value = inputValue;
});

// Function to add commas to a number
function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




var TaxEntered = document.getElementById('Tax');

TaxEntered.addEventListener('keypress', function(event) {
  const key = event.key;
  
  if (!/[\d\s\b]/.test(key)) {
    event.preventDefault();
  }
});


TaxEntered.addEventListener('input', function() {
  // Remove existing commas from the input value
  let inputValue = this.value.replace(/,/g, '');
  
  // Format the input value with commas
  inputValue = addCommas(inputValue);
  
  // Update the input value with the formatted number
  this.value = inputValue;
});


// Function to add commas to a number
function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//Get Company Name, Billing Address, Invoice# & Date

const getCompanyName = document.getElementById('getcompanyName');
const dispayCompanyName = document.getElementById('dispayuCompanyName');
const dispayCompanyName2 = document.getElementById('dispayCompanyName');
const getBillingAddress = document.getElementById('getbillingAddress');
const dispayBilling = document.getElementById('dispayBillingAddress');
const dispayBillingAddress2 = document.getElementById('dispayuBillingAddress');
const inviceNum = document.getElementById('invoice-Number');
const dateCollect = document.getElementById('invoice-date');
const dispayDate = document.getElementById('date');
const displayInvoiceNumber = document.getElementById('displayInvoiceNumber');
const displayDate2 = document.getElementById('displayDate');

const currentDate = new Date();
const dateOptions = { dateStyle: 'short' };
const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
displayDate2.textContent = formattedDate;
dispayDate.textContent = formattedDate;


getCompanyName.addEventListener('input', function() {
  const value = getCompanyName.value;
  dispayCompanyName.textContent = value.toUpperCase();
  dispayCompanyName2.textContent = value.toUpperCase();
  dispayCompanyName2.style.fontWeight = '900';
});

getBillingAddress.addEventListener('input', function() {
  const value = getBillingAddress.value;
  dispayBilling.textContent = value.toUpperCase();
  dispayBillingAddress2.textContent = value.toUpperCase();
});

dateCollect.addEventListener('input', function() {
  const value = dateCollect.value;
  dispayDate.textContent = value;
  displayDate2.textContent = value;
});

inviceNum.addEventListener('input', function() {
  const value = inviceNum.value;
  displayInvoiceNumber.textContent = value;
});


//PRINT PDF

document.getElementById('printButtonInPdf').addEventListener('click', function() {

  document.getElementById('mainInvoiceTable').style.display = 'block';

  printJS({
    printable: 'mainInvoiceTable',
    type: 'html',
    targetStyles: ['*']
  });

  document.getElementById('mainInvoiceTable').style.display = 'none';

}); 


