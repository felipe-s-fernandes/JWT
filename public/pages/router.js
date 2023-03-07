import RenderStartPage from "./start.js";
import RenderLoginPage from "./login.js";
import RenderRegisterPage from "./register.js";

export default function getPagesRouter() {
    const pagesRouter = {
        "/": RenderStartPage,
        "/login": RenderLoginPage,
        "/register": RenderRegisterPage,
        getPage: function (url, data) {
            return this[url](data);
        },
    };
    return pagesRouter;
}
