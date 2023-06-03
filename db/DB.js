
var data = "DATA";

export function getAllDB(){

    let pre_data = localStorage.getItem(data);
    let data_array = [];
    if (pre_data) {
        data_array = JSON.parse(pre_data);
    }
    return data_array ;
}
export function saveCustomerDB(customer){

    let data_array = getAllDB();

    data_array.push(customer);

    localStorage.setItem(data, JSON.stringify(data_array));
}
export function updateCustomerDB(customer){

    let data_array = getAllDB();

    let index = getAllDB().findIndex(value => value._id === customer._id);

    data_array[index] = customer;

    localStorage.setItem(data, JSON.stringify(data_array));
}
export function deleteCustomerDB(customer){

    let data_array = getAllDB();

    let index = getAllDB().findIndex(value => value._id === customer._id);

    data_array.splice(index, 1);

    localStorage.setItem(data, JSON.stringify(data_array));
}