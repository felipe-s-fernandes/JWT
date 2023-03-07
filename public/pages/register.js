import redirectTo from "../modules/redirect.js";
import HTTPRequest from "../modules/HTTPRequest.js";
import { createElement } from "../modules/modules.js";

export default function RenderRegisterPage(data) {
    const startTitle = createElement("h1", "pageTitle");
    startTitle.innerText = "Página de cadastro";

    const registerForm = createElement("div", "registerForm");
    registerForm.innerHTML = `
    <div class="registerForm">
        <div class="containerInformation" id="login">
            <div class="container_mail">
                <input type="name" id="nameInput" class"mainInput" placeholder="nome">
            </div>
            <div class="container_mail">
                <input type="email" id="email" class="mainInput" placeholder="e-mail"/>
            </div>
            <div class="container_passwd">
                <input type="password" id="password" class="mainInput" placeholder="senha" />
            </div>
            <select id="typeSelect">
                <option value="" selected disabled>tipo de usuário</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Peba">Usuário Peba</option>
            </select>            
            <div class="container_btn">
                <button type="button" id="enter">cadastrar usuário</button>
                <button type="button" id="return">voltar</button>
            </div>
        </div>
    `;

    const container = createElement("div", "container");
    container.appendChild(startTitle);
    container.appendChild(registerForm);

    const response = {
        page: container,
        object: null,
        addEvents: addRegisterEvent,
    };

    return response;
}

function addRegisterEvent() {
    const backButton = document.querySelector("#return");
    backButton.onclick = () => {
        redirectTo("/");
    };

    const registerButton = document.querySelector("#enter");

    registerButton.onclick = async () => {
        registerButton.disabled = !registerButton.disabled;
        const name = document.querySelector("#nameInput").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const type = document.querySelector("#typeSelect").value;

        const userData = {
            name: name,
            email: email,
            password: password,
            type: type,
        };

        try {
            await HTTPRequest("/register", "POST", userData);
            //alert("Usuário cadastrado com sucesso!");
            redirectTo("/");
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar usuário.");
            registerButton.disabled = !registerButton.disabled;
        }
    };
}
