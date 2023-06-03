import {Order} from "../models/Order";
var n = new Date();
var y = n.getFullYear();
var m = n.getMonth() + 1;
var d = n.getDate();
$('#date').text(m + "/" + d + "/" + y);

var order = "ORDER"
var item = "ITEM";
var customer = "DATA";
var item_arr = [];
var customer_arr = [];
var cus;
var itm;
var order_item_arr = [];
var index;


function nextOrderID() {

    let arr = getLocalSData(order);
    if (arr.length === 0) {
        $('#order_id').text("MD-00001");
        return;
    }
    let old_arr = arr[arr.length - 1].order_id;
    let t = old_arr.split("-");
    let x = +t[1];
    x++;
    $('#order_id').text("MD-" + String(x).padStart(5, '0'));

}

$(document).ready(() => {

    item_arr = getLocalSData(item);
    customer_arr = getLocalSData(customer);

    item_arr.map((value) => {
        var opt = "<option>" + value.item_code + "</option>"
        $('#itemCodeCmb').append(opt);
    });

    customer_arr.map((value) => {
        var opt = "<option>" + value.customer_id + "</option>"
        $('#customerCmb').append(opt);
    });
});

function getLocalSData(key) {

    let pre_data = localStorage.getItem(key);
    let data_array = [];
    if (pre_data) {
        data_array = JSON.parse(pre_data);
    }
    return data_array;
}

$('#customerCmb').on('change', (event) => {
    customer_arr.map((value) => {
        if (value.customer_id === event.target.value) {
            cus = value;
            $('#customer_name').text(value.customer_name);
            $('#customer_address').text(value.customer_address);
            $('#customer_contact').text(value.customer_tel);
            //
            $('#customerCmb').css({borderBottom: "1px solid #ced4da"});
        }
    });
});
$('#itemCodeCmb').on('change', (event) => {
    item_arr.map((value) => {
        if (value.item_code === event.target.value) {
            itm = value;
            $('#des').text(value.item_description);
            $('#qty_on_hand').text(value.item_qty);
            $('#unit_price').text(value.item_unit_price);

            $('#itemCodeCmb').css({borderBottom: "1px solid #ced4da"});
        }
    });
});
$('#addBtn').on('click', () => {

    // checked is customer is selected

    if ($('#customerCmb :selected').text() === "Choose...") {
        alert("Please select the customer details !");
        $('#customerCmb').focus();
        $('#customerCmb').css({
            borderBottom: "2px solid red"
        });
        return;
    } else if ($('#itemCodeCmb :selected').text() === "Choose...") { // checked is items is selected
        alert("Please select the item details !");
        $('#itemCodeCmb').focus();
        $('#itemCodeCmb').css({borderBottom: "2px solid red"});
        return;
    } else if ($('#qty').val() === "") { // checked is input qty
        alert("Please add the qty on item !");
        $('#qty').focus();
        $('#qty').css({borderBottom: "2px solid red"});
        return;
    } else if ($('#qty').val() > $('#qty_on_hand').text()) { //checked is qty on hand with qty
        alert("Noo much qty left !");
        $('#qty').focus();
        $('#qty').css({borderBottom: "2px solid red"});
        return;
    }
    $('#addBtn').text() === 'Add' ? (order_item_arr.push(getObj())) :
        (order_item_arr[index] = getObj(), $('#addBtn').text('Add'), $('#addBtn').css({
            background: '#0d6efd',
            border: '#0d6efd'
        }));
    clearData();
    addTable();
})

function getObj() {
    return {
        item_code: $("#itemCodeCmb :selected").text(),
        item_description: $('#des').text(),
        item_qty_on_hand: $('#qty_on_hand').text(),
        item_unit_price: $('#unit_price').text(),
        item_qty: $('#qty').val(),
        total: $('#qty').val() * $('#unit_price').text()
    }
}

$('#qty').on('click', () => {
    $('#qty').css({borderBottom: "1px solid #ced4da"});
})

function addTable() {

    $('table tbody tr').remove();

    order_item_arr.map((value) => {
        var row = "<tr>" +
            "<td>" + value.item_code + "</td>" +
            "<td>" + value.item_description + "</td>" +
            "<td>" + value.item_qty_on_hand + "</td>" +
            "<td>" + value.item_unit_price + "</td>" +
            "<td>" + value.item_qty + "</td>" +
            "<td>" + value.total + "</td>" +
            "</tr>";

        $('#tbl').append(row);


    });
}


$('table tbody').on('click', 'tr', (event) => {

    $("#itemCodeCmb :selected").text($(event.target).closest('tr').find('td').eq(0).text());
    $('#des').text($(event.target).closest('tr').find('td').eq(1).text());
    $('#qty_on_hand').text($(event.target).closest('tr').find('td').eq(2).text());
    $('#unit_price').text($(event.target).closest('tr').find('td').eq(3).text());
    $('#qty').val($(event.target).closest('tr').find('td').eq(4).text());

    index = order_item_arr.findIndex(value => value.item_code === $("#itemCodeCmb :selected").text());

    $('#addBtn').text('Update');
    $('#addBtn').css({
        background: 'red', border: 'red'
    });
});

$('#placeOrderBtn').on('click', () => {
    if (order_item_arr.length === 0) {
        alert("Please add the order details first !");
        return;
    }
    let pre_oder_arr = getLocalSData(order);

    pre_oder_arr.push({
        order_id: $('#order_id').text(),
        customer: cus,
        item_arr: order_item_arr,
        order_data: $('#date').text()
    });

    localStorage.setItem(order, JSON.stringify(pre_oder_arr));
    order_item_arr = [];
    document.getElementById("customerCmb").selectedIndex = 0;
    $('#customer_name').text(".");
    $('#customer_address').text(".");
    $('#customer_contact').text(".");
    addTable();
    nextOrderID();
});

function clearData() {
    document.getElementById("itemCodeCmb").selectedIndex = 0;
    document.getElementById('customerCmb').disabled = false;
    $('#des').text('.');
    $('#qty_on_hand').text(".");
    $('#unit_price').text(".");
    $('#qty').val("");
}

nextOrderID();