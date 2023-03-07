import redirectTo from "../modules/redirect.js";
import HTTPRequest from "../modules/HTTPRequest.js";
import { createElement } from "../modules/modules.js";

export default function RenderLoginPage(data) {
    const startTitle = createElement("h1", "pageTitle");
    startTitle.innerText = "Página de login";

    const loginForm = createElement("div", "loginForm");
    loginForm.innerHTML = `
    <div class="loginForm">
        <div class="containerInformation" id="login">
            <div class="container_mail">
                <input type="email" id="email" class="mainInput" placeholder="e-mail"/>
            </div>
            <div class="container_passwd">
                <input type="password" id="password" class="mainInput" placeholder="senha" />
            </div>
            <div class="container_btn">
                <button type="button" id="enter">ENTRAR</button>
            </div>
        </div>
    `;

    const container = createElement("div", "container");
    container.appendChild(startTitle);
    container.appendChild(loginForm);

    const response = {
        page: container,
        object: null,
        addEvents: addLoginEvent,
    };

    return response;
}

function addLoginEvent() {
    const loginButton = document.querySelector("#enter");

    loginButton.onclick = async () => {
        loginButton.disabled = !loginButton.disabled;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const credentials = {
            email: email,
            password: password,
        };

        const userData = await HTTPRequest("/login", "POST", credentials);

        if (userData === true) {
            redirectTo("/");
        } else {
            alert("Informações incorretas!");
            loginButton.disabled = !loginButton.disabled;
        }
    };
}
