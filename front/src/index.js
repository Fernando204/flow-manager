const selectBtView = document.querySelector(".selectAreaBt");
const vendaBox = document.querySelector(".vendaBox");
const clientRegister = document.querySelector(".clientBox");

let openBox = vendaBox;

const gotoCaixa = ()=>{
    selectBtView.style.marginLeft = "-200px";
    openBox.style.opacity = "0";
    vendaBox.style.opacity = "1";
    openBox = vendaBox;
}
const gotoClientRegister = ()=>{
    selectBtView.style.marginLeft = "0px";
    openBox.style.opacity = "0";
    clientRegister.style.opacity = "1";
    openBox = clientRegister;
}
const gotoHistoric = ()=>{
    selectBtView.style.marginLeft = "200px";
}