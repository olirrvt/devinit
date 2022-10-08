function abrirModalEditado(){
    const modal = document.querySelector(".modal-perfil-editado")
    modal.style.display = "block"

    const modalEdit = document.querySelector(".modal-content")
    modalEdit.style.display = "none"
}

async function editandoUsuario() {
    const id = localStorage.getItem("user_id");
    const url = `http://localhost:3020/usuario/${id}`;

    const inputNome = document.getElementById("input-edit-nome");
    const nome = inputNome.value;

    const inputEmail = document.getElementById("input-edit-email");
    const email = inputEmail.value;

    const inputSenha = document.getElementById("input-edit-senha");
    const senha = inputSenha.value;

    fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            nome,
            email,
            senha,
        })
    })
        .then(res => res.json())
        .then(res => {
            if(nome !== " "){
                localStorage.removeItem("user_nome")
                localStorage.setItem("user_nome", nome)
                }
    
                if(email !== " "){
                localStorage.removeItem("user_email")
                localStorage.setItem("user_email", email)
                }
            
            if (res.message) {
                console.log("Cadastrou!")
                abrirModalEditado()
            } else {
                console.log(res.error)
            }
        })
}

function fecharModalEditado(){
    window.location.href = "http://localhost:4020/perfil"
}

document.addEventListener("DOMContentLoaded", () => {
    valorPlaceholder()
    tirarDisabledNome()
    tirarDisabledEmail()
    tirarDisabledSenha()
})