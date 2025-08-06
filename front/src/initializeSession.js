fetch(serv+"/user/session",{
    method: "GET",
    credentials: "include"
}).then(async response =>{
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
}).then(response =>{
    userData = response;

    userNameH1.innerHTML = response.name;
    loadInfoMethod();

    infoUserName.innerHTML = response.name;
    infoUserDate.innerHTML = response.data;
    infoUserId.innerHTML = response.id;
    
    loginArea.style.display = "none";
    mainArea.style.display = "block";
}).catch(error =>{
    console.log(error);
});