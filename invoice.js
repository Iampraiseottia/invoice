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
    var table = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0];
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

                        
}

function refreshData(){
    document.getElementById('Descriptipon').value = '';
    document.getElementById('Amount').value = '';
    document.getElementById('Tax').value = '';
    var selectedRow = null;

}

function onEdit(td){
    event.preventDefault();
    selectedRow = td.parentElement.parentElement;
    document.getElementById('Descriptipon').value = selectedRow.cells[0].innerHTML;
    document.getElementById('Amount').value = selectedRow.cells[1].innerHTML;   
    document.getElementById('Tax').value = selectedRow.cells[3].innerHTML;      
}

function updateData(inputData){
    selectedRow.cells[0].innerHTML = inputData.description;
    selectedRow.cells[1].innerHTML = inputData.amount;
    selectedRow.cells[2].innerHTML = inputData.tax;

}

function onDelete(td){
    row = td.parentElement.parentElement;
}
