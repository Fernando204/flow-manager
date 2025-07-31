//elementos de layout da pagina
const selectBtView = document.querySelector(".selectAreaBt");
const vendaBox = document.querySelector(".vendaBox");
const clientRegister = document.querySelector(".clientBox");
const productRegisterBox = document.querySelector(".productRegisterBox");

//elementos para registrar clientes
const clientNameInput = document.getElementById("clientName");
const clientCPFinput = document.getElementById("clientCPF");
const clientPhoneInput = document.getElementById("clientPhone"); 

//elementos para registrar produtos
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const medidaSelect = document.getElementById("medidaSelect");
const granelPrice = document.getElementById("precoGranel");

let productList = [];
let clientList = [];
let openBox = vendaBox;//variavel para separar a interface exibida