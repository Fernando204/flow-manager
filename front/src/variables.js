//Areas para login e registro:
const loginBox = document.querySelector(".userLogin");
const registerBox = document.querySelector(".userRegister")
const mainArea = document.getElementById("mainArea");
const loginArea = document.getElementById("loginArea");

//chackbox:
const showPassword1 = document.getElementById("showPassword1");
const showPassword2 = document.getElementById("showPassword2");

//elementos para registro:
const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword")
const registerBt = document.getElementById("registerBt")

//listas:
const clientListDiv = document.getElementById("clientList");
const productListDiv = document.getElementById("productList");
const productSaleListDiv = document.getElementById("productListDiv");

//elementos para login:
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBt = document.getElementById("loginBt"); 

//elementos de layout da pagina
const logoutBt = document.getElementById("logoutBt");
const selectBtView = document.querySelector(".selectAreaBt");
const vendaBox = document.querySelector(".vendaBox");
const clientRegister = document.querySelector(".clientBox");
const productRegisterBox = document.querySelector(".productRegisterBox");
const userInfoDiv = document.getElementById("userInfoDiv");
const userNameH1 = document.getElementById("userNameH1");
const searchProductBox = document.getElementById("searchProductBox");//caixa onde mostra as sugestões de produtos
const productInput = document.getElementById("productInput");
const clientInput = document.getElementById("clientInput");
const clientSearchBox = document.getElementById("clientSearchBox");
const finalizeBt = document.getElementById("finalizeSaleBt");
const addProductBt = document.getElementById("addProductBt");
const paymentWay = document.getElementById("paymentWay");
const quantidade = document.querySelector(".q2");
const editInputs = document.querySelectorAll(".infoEdit-input");

//elementos de informações do cliente:
const closeInfoBt = document.getElementById("closeInfoBt");
const clientInfoDiv = document.getElementById("clientInfoDiv");
const fiadoCheckBox = document.getElementById("fiadoCheckBox");
const deleteClientBt = document.getElementById("deletClientBt");
const infoUserName = document.getElementById("infoUserName");
const infoUserId = document.getElementById("infoUserId");
const infoUserDate = document.getElementById("infoUserDate");

//elementos para registrar clientes
const clientNameInput = document.getElementById("clientName");
const clientCPFinput = document.getElementById("clientCPF");
const clientPhoneInput = document.getElementById("clientPhone"); 

//elementos para registrar produtos
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const medidaSelect = document.getElementById("medidaSelect");
const granelPrice = document.getElementById("precoGranel");

//elemetos de informação de produtos
const closeProductBt = document.getElementById("close-product");
const productInfoDiv = document.getElementById("productInfoDiv");

const toggleEditClient = document.getElementById("toggle-edit-client");
const toggleEditProduct = document.getElementById("toggle-edit-Product");

let productList = [];
let clientList = [];
let listaDeCompra = [];
let userData = {};
let atualClient = [];
let atualProduct = [];
let lastClientInfo = [];
let clientEditSave = false;
let totalDaCompra = 0;
let openBox = vendaBox;//variavel para separar a interface exibida