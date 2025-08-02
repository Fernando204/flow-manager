//Areas para login e registro:
const loginBox = document.querySelector(".userLogin");
const registerBox = document.querySelector(".userRegister")
const mainArea = document.getElementById("mainArea");
const loginArea = document.getElementById("loginArea");

//elementos para login ou registro:
const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword")
const registerBt = document.getElementById("registerBt")

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBt = document.getElementById("loginBt"); 

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
let userData = {};
let openBox = vendaBox;//variavel para separar a interface exibida