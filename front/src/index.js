const getMethod = async (url)=>{
    try{
        const response = await fetch(serv+url);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = await response.json();
        return data;
    }catch(err ){
        alert(err)
        console.log(err);
    }
}
const loadInfoMethod = ()=>{
    getMethod("/products/get?id="+userData.id).then(data =>{
        if (data) {
            productList = data;
            console.log(productList);
        }
    });
    getMethod("/clients/get?id="+userData.id).then(data =>{
        if (data) {
            clientList = data;
            console.log(clientList);
        }
    });
}

const registerClient = ()=>{
    fetch(serv+"/flow/client/register",{
        headers:{"Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(
            {name: clientNameInput.value,
            CPF: clientCPFinput.value, 
            phone: clientPhoneInput.value,
            user: userData.id 
        })

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
            medida: medidaSelect.value,
            user: userData.id
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
        loginArea.style.display = "none";
        mainArea.style.display = "block";
    }).catch(error =>{
        alert(error);
        console.log(error);
    })
}

const loginUser = ()=>{
    const email = emailInput.value;
    const password = passwordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email inválido");
        return;
    }

    if (!email || !password ) {
        alert("preencha todos os campos!");
        return;
    }
    if (password.length < 8) {
        alert("a senha deve conter pelo menos 8 caracteres");
        return;
    }
    fetch(serv+"/user/login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({email: email, password: password})
    }).then( async response =>{
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = response.json();
        return data;
    }).then(response =>{
        alert(response.name+" logado com sucesso");
        userData = response;
        loginArea.style.display = "none";
        mainArea.style.display = "block";
    }).catch(error =>{
        alert(error);
        console.log(error);
    })
}

loginBt.addEventListener("click",loginUser);
registerBt.addEventListener("click",registerUser);