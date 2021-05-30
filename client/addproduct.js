

window.onload = function(){
    getAllProducts();
}

async function getAllProducts(){
    let api = `http://localhost:3000/api/users/getAllProducts`;
    let response = await fetch(api);
    let result = await response.json();
    console.log(result);
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
    console.log(product);
    saveNewProduct(product);
}

async function saveNewProduct(product){
    let api = `http://localhost:3000/api/users/saveNewProduct`;
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
    document.getElementById("pForm").reset();

}