const gotoCaixa = ()=>{
    selectBtView.style.marginLeft = "-300px";
    openBox.style.opacity = "0";
    vendaBox.style.opacity = "1";
    openBox.style.zIndex = "0"
    vendaBox.style.zIndex = "1";
    openBox = vendaBox;
}
const gotoClientRegister = ()=>{
    selectBtView.style.marginLeft = "-100px";
    openBox.style.opacity = "0";
    clientRegister.style.opacity = "1";

    clientRegister.style.zIndex = "1"
    openBox.style.zIndex = "0"
    openBox = clientRegister;
}
const gotoProductRegister = ()=>{
    selectBtView.style.marginLeft = "100px";
    openBox.style.opacity = "0"
    productRegisterBox.style.opacity = "1"

    productRegisterBox.style.zIndex = "1"
    openBox.style.zIndex = "0"
    openBox = productRegisterBox;
}
const gotoHistoric = ()=>{
    selectBtView.style.marginLeft = "300px";
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