var isEdit = false;
var sel_id;
var sOrder = "asc";
window.onload = function () {
    getAllProducts();
}

async function getAllProducts(uri) {
    let api = uri?uri:`http://localhost:3000/api/products/getAllProducts`;
    let response = await fetch(api);
    let result = await response.json();
    showData(result.data);
}


function showData(products) {
    let tbl = document.getElementById("ptable");
    while (tbl.rows.length > 1) {
        tbl.deleteRow(1);
    }
    for (let i = 0; i < products.length; i++) {
        let e = products[i];
        let cb = e.isActive ? "checked" : '';
        let trow = `<tr>
                <td>${i + 1}</td>
                <td>${e.company}</td>
                <td>${e.type}</td>
                <td>${e.size}</td>
                <td>${e.price}</td>
                <td>${e.model}</td>
                <td>${e.color}</td>
                <td><input type="checkbox" onchange="onStatus(event,'${e._id}')" ${cb}></td>
                <td>
                    <button class="btn btn-info" onclick="onEdit('${e._id}')">Edit</button>
                    <button class="btn btn-danger" onclick="onDelete('${e._id}')">Delete</button>
                </td>
        </tr>`;
        tbl.insertAdjacentHTML('beforeend', trow);
    }
}


async function onDelete(id){
if(confirm("Do you want to Delete?")){
    let api = `http://localhost:3000/api/products/deleteProduct/${id}`;
    let options = {
        method: "DELETE"
    }
    let response = await fetch(api, options);
    let result = await response.json();
    getAllProducts();
    resetActiveClass();
}   
}

async function onEdit(id) {
    let api = `http://localhost:3000/api/products/getProductById/${id}`;
    let response = await fetch(api);
    let result = await response.json();
    let p = result.data;
    document.getElementById("company").value = p.company;
    document.getElementById("type").value = p.type;
    document.getElementById("size").value = p.size;
    document.getElementById("price").value = p.price;
    document.getElementById("model").value = p.model;
    document.getElementById("color").value = p.color;
    isEdit = true;
    document.getElementById("sbtn").innerHTML = "Update";
    document.getElementById("sbtn").className = "btn btn-success";
    sel_id = id;
}

function onReset() {
    isEdit = false;
    document.getElementById("sbtn").innerHTML = "Add";
    document.getElementById("sbtn").className = "btn btn-primary";
    sel_id = null;
}


function onStatus(e, id) {
    resetActiveClass();
    let data = {
        id: id,
        isActive: e.target.checked
    }
    updateProduct(data);
}

function onSubmit(e) {
    resetActiveClass();
    e.preventDefault();
    let product = {
        company: document.getElementById("company").value,
        type: document.getElementById("type").value,
        size: document.getElementById("size").value,
        price: document.getElementById("price").value,
        model: document.getElementById("model").value,
        color: document.getElementById("color").value
    };
    isEdit?(product.id=sel_id,updateProduct(product)):saveNewProduct(product);
}

async function updateProduct(data) {
    let api = `http://localhost:3000/api/products/updateProduct`;
    let options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    let response = await fetch(api, options);
    let result = await response.json();
    getAllProducts();
    onReset();
    document.getElementById("pForm").reset();
}

async function saveNewProduct(product) {
    let api = `http://localhost:3000/api/products/saveNewProduct`;
    let options = {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    let response = await fetch(api, options);
    let result = await response.json();
    getAllProducts();
    document.getElementById("pForm").reset();

}


async function onSort(p){
    await resetActiveClass();
    console.log(p);
    document.getElementById(`t${p}`).className = "bg-primary text-light";
    let api = `http://localhost:3000/api/products/getAllProducts?sortby=${p}&&order=${sOrder}`;
    sOrder=sOrder=="asc"?"desc":"asc";
    getAllProducts(api);
}

function resetActiveClass(){
    document.getElementById(`tcompany`).className = "";
    document.getElementById(`ttype`).className = "";
    document.getElementById(`tsize`).className = "";
    document.getElementById(`tprice`).className = "";
    document.getElementById(`tmodel`).className = "";
    document.getElementById(`tcolor`).className = "";
    document.getElementById(`tisActive`).className = "";
}