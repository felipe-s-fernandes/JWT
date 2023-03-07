import RenderStartPage from "./start.js";
import RenderLoginPage from "./login.js";

export default function getPagesRouter() {
    const pagesRouter = {
        "/": RenderStartPage,
        "/login": RenderLoginPage,
        getPage: function (url, data) {
            return this[url](data);
        },
    };
    return pagesRouter;
}
