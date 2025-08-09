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
                closeBt.classList.add("closeBt");
                infoDiv.appendChild(closeBt);
                
                
                const deleteBt = document.createElement("button");
                deleteBt.classList.add("main-button");
                deleteBt.classList.add("deletBt")
                
                
                const title = document.createElement("h1");
                infoDiv.appendChild(title);
                if (item.price) {
                    infoBt.addEventListener("click",()=>{
                    infoDiv.style.display = "flex";
                    })
                    closeBt.addEventListener("click",()=>{
                        infoDiv.style.display = "none";
                    })
    
                    deleteBt.textContent = "Excluir Produto";
                    title.textContent = "Informações do Produto";
                    
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
                }else{
                    infoBt.addEventListener("click",()=>{
                        clientInfoDiv.style.display = "flex";
                        
                        editInputs[0].value = item.name;
                        editInputs[1].value = item.cpf;
                        editInputs[2].value = item.phone;

                        const formatDate = new Date(item.date);
                        editInputs[3].value = formatDate.toLocaleString("pt-BR");

                        if (item.fiado){
                            fiadoCheckBox.checked = true;
                        }
                        atualClient[0] = client;
                        atualClient[1] = item;
                    })
                   
                }
                title.style.marginLeft = "20px"
                infoDiv.appendChild(deleteBt);

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
        credentials: "include",
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
        credentials: "include",
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

logoutBt.addEventListener("click",async ()=>{
    try{
        const response = await fetch(serv+"/user/logout",{
            method: "GET",
            credentials: "include"
        });
        if(!response.ok) {
            const textError = await response.text();
            throw new Error()
        }
        const responseMessage = await response.text();
        alert(responseMessage);
        window.location.reload();
    }catch(err){
        alert(err);
        console.log(err);
    }
})
loginBt.addEventListener("click",loginUser);
registerBt.addEventListener("click",registerUser);

productInput.addEventListener("input",()=>{
    const query = productInput.value.toLowerCase();
    searchProductBox.innerHTML = "";
    
    if (query == "") return;
    
    const result = [];
    productList.forEach(item =>{
        if (item.name.toLowerCase().includes(query)){
            result.push(item);
        }
    })
    
    result.forEach(produto =>{
        const item = document.createElement("div");
        item.classList.add("search-item")
        item.textContent = produto.name;
        item.onclick = ()=>{
            productInput.value = produto.name;
            searchProductBox.innerHTML = '';
        }
        searchProductBox.appendChild(item);
    })
})
clientInput.addEventListener("input",()=>{
    const query = clientInput.value;
    clientSearchBox.innerHTML = "";

    if(query == "") return;

    const result = [];
    clientList.forEach(client =>{
        if (client.name.toLowerCase().includes(query)) {
            result.push(client);        
        }
    })

    result.forEach(client =>{
        const item = document.createElement("div");
        item.classList.add("search-item");
        item.textContent = client.name;
        item.onclick = ()=>{
            clientInput.value = client.name;
            clientSearchBox.innerHTML = "";
        }
        clientSearchBox.appendChild(item);
    })
})
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      searchProductBox.innerHTML = "";
      clientSearchBox.innerHTML = "";
    }
  });

addProductBt.addEventListener("click",()=>{
    const nomeProduto = productInput.value;
    console.log("Lista de Produtos: "+productList);
    productList.forEach(produto =>{
        if (produto.name == nomeProduto) {

            const obj = {
                name: produto.name,
                id: produto.id,
                quantidade: quantidade.value,
                price: produto.price,
                total: (produto.price * parseInt(quantidade.value))
            };
            listaDeCompra.push(obj);

            const div = document.createElement("div");
            div.classList.add("list-item");

            const nome = document.createElement("p");
            nome.textContent = produto.name+"           ";
            div.appendChild(nome);

            const preço = document.createElement("p");
            preço.textContent = "        Preço: "+produto.price+" R$";
            div.appendChild(preço);

            const excludeBt = document.createElement("button");
            excludeBt.textContent = "Excluir";
            excludeBt.addEventListener("click",()=>{
                const index = productList.indexOf(produto);
                if (index !== -1) {
                    productList.splice(index,1);
                }
                div.remove();
            })
            div.appendChild(excludeBt);

            productSaleListDiv.appendChild(div);
        }
    })
})

finalizeBt.addEventListener("click",()=>{
    let compraObj = {};

    const clienteNM = clientInput.value;
    if (clienteNM === null || !clienteNM) {
        clienteNM = "cliente não definido";
        return;
    }

    clientList.forEach(c =>{
        if (c.name === clienteNM) {
            alert(c.name+": "+c.id);
            compraObj.cliente = c.id;
            compraObj.formaDePagamento = paymentWay.value;
            compraObj.produtos = listaDeCompra;
        }
    })

    fetch(serv+"/flow/client/compra",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(compraObj)
    }).then(response =>{
        if (!response.ok) {
            const errorMessage = response.text();
            throw new Error("erro ao registrar compra:  "+responseMessage);
        }
        const data = response.text();
        return data;
    }).then(response => {
        alert(response);

        listaDeCompra = [];
        productSaleListDiv.innerHTML = "";
        clientInput.value = "";
        productInput.value = "";
        quantidade.value = "";
    }).catch(err =>{
        alert(err);
        console.log(err);
    })
})

closeInfoBt.addEventListener("click",()=>{
    clientInfoDiv.style.display = "none";
});

deleteClientBt.addEventListener("click",()=>{
    
})