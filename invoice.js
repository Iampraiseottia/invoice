// DISPLAY & STORE TABLE VALUES, EDIT AND DELETE

var selectedRow = null;


function onSubmit(){
    var inputData = readData();
    if (selectedRow == null) 
        insertData(inputData);
    else
        updateData(inputData);


    refreshData();
    
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

    
                        // cell5 = newRow.insertCell(4);
                        // cell5.innerHTML = `<a onchange="Calc(this)"></a>`;

    
                        
}

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
    
    var subtotal = amt * tax;
    document.getElementById('total2').innerHTML = subtotal;

    var table = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0], sumAmt = 0, sumTax = 0;

    for(var i = 0; i < table.rows.length; i++){
        sumAmt = sumAmt + parseInt(table.rows[i].cells[1].innerHTML);

    }
    document.getElementById('sum').innerHTML = sumAmt;


    for(var i = 0; i < table.rows.length; i++){
        sumTax = sumTax + parseInt(table.rows[i].cells[1].innerHTML);

    }
    document.getElementById('boris').innerHTML = sumTax;

    grandSum = sumAmt + sumTax;
    document.getElementById('total').innerHTML = grandSum;

}
