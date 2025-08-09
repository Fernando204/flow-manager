const gotoCaixa = ()=>{
    selectBtView.style.marginLeft = "-400px";
    openBox.style.opacity = "0";
    vendaBox.style.opacity = "1";
    openBox.style.zIndex = "0"
    vendaBox.style.zIndex = "1";
    openBox = vendaBox;
}
const gotoClientRegister = ()=>{
    selectBtView.style.marginLeft = "-200px";
    openBox.style.opacity = "0";
    clientRegister.style.opacity = "1";

    clientRegister.style.zIndex = "1"
    openBox.style.zIndex = "0"
    openBox = clientRegister;
}
const gotoProductRegister = ()=>{
    selectBtView.style.marginLeft = "00px";
    openBox.style.opacity = "0"
    productRegisterBox.style.opacity = "1"

    productRegisterBox.style.zIndex = "1"
    openBox.style.zIndex = "0"
    openBox = productRegisterBox;
}
const gotoHistoric = ()=>{
    selectBtView.style.marginLeft = "200px";
}

const userInfoPageOpen = ()=>{
    selectBtView.style.marginLeft = "400px";
    openBox.style.opacity = "0";
    userInfoDiv.style.opacity = "1";

    userInfoDiv.style.zIndex = "1";
    openBox.style.zIndex = "0";
    openBox = userInfoDiv;

}

const gotoLogin = ()=>{
    loginBox.style.display = "flex";
    registerBox.style.display = "none";
} 
const gotoRegister = ()=>{
    loginBox.style.display = "none";
    registerBox.style.display = "flex";
}

showPassword1.addEventListener("change",()=>{
    const type = showPassword1.checked ? "text" : "password" ;
    passwordInput.type = type;
})
showPassword2.addEventListener("change",()=>{
    const type = showPassword2.checked ? "text" : "password" ;
    registerPassword.type = type;
    confirmPassword.type = type;
})

//testando teclado erguido com digitação extrema delicadeza pura hello world
//testando digitação com o teclado abaixado é beleza pura nessa bagaça hello worldconsole.log("hello wrld")""