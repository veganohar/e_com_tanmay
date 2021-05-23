

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
}