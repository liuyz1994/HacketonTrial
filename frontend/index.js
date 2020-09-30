var initRow = 1;
function init(){
    console.log('init');
    for (var i = 0; i < initRow; i++) {
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
      }
}
function addRow() {
    var table = document.getElementById("tableBody");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<input type=\"text\" class=\"form-control\" name=\"method\"" + rowCount + "\"/>";
    cell2.innerHTML = "<input type=\"text\" class=\"form-control\" name=\"endpoint\"" + rowCount + "\"/>";
    cell3.innerHTML = "<input type=\"json\" class=\"form-control\" name=\"body\"" + rowCount + "\"/> ";
    cell4.innerHTML = "<input type=\"button\" class=\"btn btn-success \"  value=\"Add \" onclick=\"save()\">";
}
function save(){
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:3000/a';
    Http.open('POST', url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText === '200' );
       if(Http.responseText === '200'){
        var table = document.getElementById("tableBody");
        var rowCount = table.rows.length -1;
        var cell = document.getElementById("tableBody").rows[rowCount].cells[3];
        cell.innerHTML = "<input type=\"button\" class=\"btn btn-danger \"  value=\"Delete \" onclick=\"\">"
       }
    }
}