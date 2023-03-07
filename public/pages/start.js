import { createElement } from "../modules/modules.js";
import checkCookie from "../modules/check-cookie.js";
import redirectTo from "../modules/redirect.js";
import HTTPRequest from "../modules/HTTPRequest.js";

export default async function RenderStartPage(data) {
    const container = createElement("div", "container");

    const startTitle = createElement("h1", "pageTitle");
    startTitle.innerText = "Página inicial";
    container.appendChild(startTitle);

    const email = checkCookie("email");

    if (email) {
        const userData = await HTTPRequest(`/login/${email}`, "GET");

        const userInfo = createElement("div", "userInfo");

        const userInfoTitle = createElement("h3", "userInfoTitle");
        userInfoTitle.innerText = "Informações do usuário";
        userInfo.appendChild(userInfoTitle);

        const userId = createElement("p", "userData");
        userId.innerText = "ID: " + userData.id;
        userInfo.appendChild(userId);

        const userName = createElement("p", "userData");
        userName.innerText = "Nome: " + userData.name;
        userInfo.appendChild(userName);

        const userEmail = createElement("p", "userData");
        userEmail.innerText = "e-mail: " + userData.email;
        userInfo.appendChild(userEmail);

        const userType = createElement("p", "userData");
        userType.innerText = "tipo: " + userData.type;
        userInfo.appendChild(userType);

        container.appendChild(userInfo);
    }

    const loginButton = createElement("button", "pageButtons");
    if (email) {
        loginButton.innerText = "logout";
        loginButton.onclick = async () => {
            loginButton.disabled = !loginButton.disabled;
            await HTTPRequest("/login", "DELETE", { email });
            redirectTo("/");
        };
    } else {
        loginButton.innerText = "login";
        loginButton.onclick = () => {
            redirectTo("/login");
        };
    }
    container.appendChild(loginButton);

    const response = {
        page: container,
        object: null,
        addEvents: () => {
            console.log("Start page rendered");
        },
    };

    return response;
}
