

window.onload = function(){
    getAllProducts();
}

async function getAllProducts(){
    let api = `http://localhost:3000/api/producs/getAllProducts`;
    let response = await fetch(api);
    let result = await response.json();
    showData(result.data);
}


function showData(products){
    let tbl = document.getElementById("ptable");
    while(tbl.rows.length>1){
        tbl.deleteRow(1);
    }
    for(let i=0;i<products.length;i++){
        let e = products[i];
        let cb = e.isActive?"checked":'';
        let trow = `<tr>
                <td>${i+1}</td>
                <td>${e.company}</td>
                <td>${e.type}</td>
                <td>${e.size}</td>
                <td>${e.price}</td>
                <td>${e.model}</td>
                <td>${e.color}</td>
                <td><input type="checkbox" ${cb}></td>
                <td>
                    <button class="btn btn-info">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
        </tr>`;
        tbl.insertAdjacentHTML('beforeend',trow);
    }
}

function onSubmit(e){
    e.preventDefault();
    let product = {
        company:document.getElementById("company").value,
        type:document.getElementById("type").value,
        size:document.getElementById("size").value,
        price:document.getElementById("price").value,
        model:document.getElementById("model").value,
        color:document.getElementById("color").value
    }
    saveNewProduct(product);
}

async function saveNewProduct(product){
    let api = `http://localhost:3000/api/producs/saveNewProduct`;
    let options = {
        method:"POST",
        body:JSON.stringify(product),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    let response = await fetch(api,options);
    let result = await response.json();
    console.log(result);
    getAllProducts();
    document.getElementById("pForm").reset();

}