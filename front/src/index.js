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

const registerUser = ()=>{
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const cPassword = confirmPassword.value;

    if (password != cPassword) {
        alert("senhass divergentes");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email inválido");
        return;
    }

    if (!name || !email || !password || !cPassword) {
        alert("preencha todos os campos!");
        return;
    }
    if (password.length < 8) {
        alert("a senha deve conter pelo menos 8 caracteres");
        return;
    }
    fetch(serv+"/user/register",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({name: name, email: email, password: password})
    }).then( async response =>{
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = response.json();
        return data;
    }).then(response =>{
        alert(response.name+" registrado com sucesso");
        userData = response;
    }).catch(error =>{
        alert(error);
        console.log(error);
    })
}