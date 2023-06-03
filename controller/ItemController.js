import {Item} from "../models/Item.js";

var item = "ITEM";

//------------add new object into the localStorage---------------------------

$('#saveBtn').on('click', () => {

    if (checkText()) {
        let arr = getLocalSData();

        if (isExistsById(arr)) {
            alert("Item code all ready exists !");
            return;
        }
        arr.push(new Item($('#itemCode').val(),$('#des').val(),$('#unitPrice').val(),$('#qty').val()));
        localStorage.setItem(item, JSON.stringify(arr));
        loadData();
        disableBtn();
        clearData();
    }
});

//--------check customer_id all ready exists --------------------------

function isExistsById(arr) {
    let flag = false;
    arr.filter((event) => {
        if (event.item_code === $('#itemCode').val()) {
            flag = true;
        }
    });
    return flag;
}


//----------------get localStorage array-------------------------------

function getLocalSData() {

    let pre_data = localStorage.getItem(item);
    let data_array = [];
    if (pre_data) {
        data_array = JSON.parse(pre_data);
    }
    return data_array;
}

//-------------------load table data-------------------------------

function loadData() {

    let per_data = localStorage.getItem(item);

    $('table tbody tr td').remove();

    let item_data_arr = JSON.parse(per_data);
    if(per_data){
        item_data_arr.map((value, index) => {
            console.log(value)
            var row = "<tr>" +
                "<td>" + value._itemCode + "</td>" +
                "<td>" + value._description + "</td>" +
                "<td>" + value._unitPrice + "</td>" +
                "<td>" + value._qtyOnHand + "</td>" +
                "</tr>";

            $('tbody').append(row);
        });
    }

}

//---------------add table row click event listener-------------------------

loadData();

$('table tbody').on('click', 'tr', (event) => {
    $('#itemCode').val($(event.target).closest('tr').find('td').eq(0).text());
    $('#des').val($(event.target).closest('tr').find('td').eq(1).text());
    $('#unitPrice').val($(event.target).closest('tr').find('td').eq(2).text());
    $('#qty').val($(event.target).closest('tr').find('td').eq(3).text());

    document.getElementById('saveBtn').disabled = true;
    document.getElementById('itemCode').disabled = true;
    document.getElementById('updateBtn').disabled = false;
    document.getElementById('deleteBtn').disabled = false;
});


//-----------------update data in localStorage-------------------------------

$('#updateBtn').on('click', () => {
    console.log('hi123.....');
    if (checkText()) {
        let cus_arr = getLocalSData();

        let index = cus_arr.findIndex(value => value.item_code === $('#itemCode').val());

        cus_arr[index] = new Item($('#itemCode').val(),$('#des').val(),$('#unitPrice').val(),$('#qty').val())

        localStorage.setItem(item, JSON.stringify(cus_arr));
        loadData();
        disableBtn();
        clearData();
    }
});

//----------------------delete data in localStorage------------------------------

$('#deleteBtn').on('click', () => {

    if (checkText()) {
        let cus_arr = getLocalSData();

        let index = cus_arr.findIndex(value => value.item_code === $('#itemCode').val());

        cus_arr.splice(index, 1);
        localStorage.setItem(item, JSON.stringify(cus_arr));
        loadData();
        disableBtn();
        clearData();
    }
});

function checkText() {
    if ($('#itemCode').val() === "") {
        alert("Item code is empty or invalid !");
        $('#itemCode').focus();
        $('#itemCode').css({
            borderBottom: "2px solid red"
        });
        return false;
    } else if ($('#des').val() === "") {
        alert("Description is invalid or empty !");
        $('#des').focus();
        $('#des').css({borderBottom: "2px solid red"});
        return false;
    } else if ($('#unitPrice').val() === "") {
        alert("Unit price is invalid or empty  !");
        $('#unitPrice').focus();
        $('#unitPrice').css({borderBottom: "2px solid red"});
        return false;
    } else if ($('#qty').val() === "") {
        alert("Qty is invalid or empty  !");
        $('#qty').focus();
        $('#qty').css({borderBottom: "2px solid red"});
        return false;
    }
    return true;
}

$('#itemCode').on('keypress', () => {
    $('#itemCode').css({borderBottom: "1px solid #ced4da"});
});
$('#des').on('keypress', () => {
    $('#des').css({borderBottom: "1px solid #ced4da"});
});
$('#unitPrice').on('keypress', () => {
    $('#unitPrice').css({borderBottom: "1px solid #ced4da"});
});
$('#qty').on('keypress', () => {
    $('#qty').css({borderBottom: "1px solid #ced4da"});
});

$('#myform').on('mouseover', () => {
    if ($('#itemCode').val() !== "" && $('#des').val() !== "" && $('#unitPrice').val() !== "" && $('#qty').val() !== "") {
        document.getElementById('saveBtn').disabled = false;
        return;
    }
    document.getElementById('saveBtn').disabled = true;
});

//-----------------------clear function-----------------------------------

function clearData() {
    $('#itemCode').val("");
    $('#des').val("");
    $('#unitPrice').val("");
    $('#qty').val("");
    document.getElementById('itemCode').disabled = false;
    document.getElementById('saveBtn').disabled = false;
}

function disableBtn() {
    document.getElementById('saveBtn').disabled = true;
    document.getElementById('updateBtn').disabled = true;
    document.getElementById('deleteBtn').disabled = true;
}

disableBtn();