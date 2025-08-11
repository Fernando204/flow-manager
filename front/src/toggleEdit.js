toggleEditClient.addEventListener("change",()=>{
    if (toggleEditClient.checked){
        editInputs.forEach(item =>{
            item.removeAttribute("readonly");

        })
    }else{
        if (!clientEditSave ) {
            if (!confirm("descartar alterações? ")) {
                return;
            }
            editInputs.forEach((item, index)=>{
                item.setAttribute("readonly",true);
                item.value = lastClientInfo[index];
            })
        }
    }
})