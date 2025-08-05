const getMethod = async (url)=>{//função reutilizavel para fazer requisições GET
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
const loadList = (list,listDiv)=>{
    if (Array.isArray(list)){
            listDiv.innerHTML = "";
            list.forEach(item=>{
                const client = document.createElement("div");
                client.classList.add("list-item");

                const name = document.createElement("p");
                name.textContent = item.name;
                name.style.marginRight = "30px"
                client.appendChild(name);

                const infoBt = document.createElement("button");
                infoBt.textContent = "Informações";
                client.appendChild(infoBt);

                const infoDiv = document.createElement("div");
                infoDiv.classList.add("infoDiv");

                const closeBt = document.createElement("button");
                closeBt.textContent = "X";
                infoDiv.appendChild(closeBt);
                
                closeBt.addEventListener("click",()=>{
                    infoDiv.style.display = "none";
                })

                infoBt.addEventListener("click",()=>{
                    infoDiv.style.display = "flex";
                })
                
                if (item.price) {
                    const title = document.createElement("h1");
                    title.textContent = "Informações do Produto";
                    title.style.marginLeft = "20px"
                    infoDiv.appendChild(title);

                    const name = document.createElement("p");
                    name.textContent = "Nome do Produto: "+item.name;
                    infoDiv.appendChild(name);

                    const preço = document.createElement("p");
                    preço.textContent = "Preço Do Produto: "+item.price;
                    infoDiv.appendChild(preço);

                    const medida = document.createElement("p");
                    medida.textContent = "Medida do Produto: "+item.medida;
                    infoDiv.appendChild(medida);

                    const formatDate = new Date(item.dataDeRegistro);
                    const data = document.createElement("p");
                    data.textContent = "Data De registro: "+formatDate.toLocaleString("pt-BR");
                    infoDiv.appendChild(data);
                }
                document.body.appendChild(infoDiv);
                listDiv.appendChild(client);
        })
    }
}
const loadInfoMethod = ()=>{
    getMethod("/products/get?id="+userData.id).then(data =>{
        if (data) {
            productList = data;
            loadList(productList,productListDiv);
            console.log(productList);
        }
    });
    getMethod("/flow/client/get?id="+userData.id).then(data =>{
        if (data) {
            clientList = data;
            loadList(clientList,clientListDiv);
            console.log(clientList);
        }
    });
}

const registerClient = ()=>{
    const obj = {name: clientNameInput.value,
            CPF: clientCPFinput.value, 
            phone: clientPhoneInput.value,
            user: userData.id 
        };

    fetch(serv+"/flow/client/register",{
        headers:{"Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(obj)

    }).then(response =>{
        if (!response.ok) {
            throw new Error("erro ao registrar cliente")
        }
        const data = response.text();
        return data;
    }).then(response =>{
        alert(response);
        console.log(response);
        clientList.push(obj);
        loadList(clientList,clientListDiv);
    }).catch(err =>{
        console.log(err);
        alert(err);
    })
}

const registerProduct = ()=>{
    const obj = {
            name: productNameInput.value,
            price: productPriceInput.value,
            medida: medidaSelect.value,
            user: userData.id
        };

    fetch(serv+"/products",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(obj)
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
        productList.push(obj);
        loadList(productList,productListDiv);
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
        loadInfoMethod();
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
        loadInfoMethod();
        loginArea.style.display = "none";
        mainArea.style.display = "block";
    }).catch(error =>{
        alert(error);
        console.log(error);
    })
}

loginBt.addEventListener("click",loginUser);
registerBt.addEventListener("click",registerUser);