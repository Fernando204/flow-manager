const registerClient = ()=>{
    fetch(serv+"/flow/client/register",{
        headers:{"Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(
            {name: clientNameInput.value,
            CPF: clientCPFinput.value, 
            phone: clientPhoneInput.value})

    }).then(response =>{
        if (!response.ok) {
            throw new Error("erro ao registrar cliente")
        }
        const data = response.text();
        return data;
    }).then(response =>{
        alert(response);
        console.log(response);
    }).catch(err =>{
        console.log(err);
        alert(err);
    })
}

const registerProduct = ()=>{
    fetch(serv+"/products",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name: productNameInput.value,
            price: productPriceInput.value,
            medida: medidaSelect.value
        })
    }).then(response =>{
        if (!response.ok){
            const data = response.text();
            throw new Error(data);
        }
        const data = response.text();
        return data
    }).then(response =>{
        alert(response);
        console.log(response);
    }).catch(response =>{
        alert(response);
    })
}