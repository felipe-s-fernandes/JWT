export function createElement(htmlElement, className) {
    const element = document.createElement(htmlElement);
    element.classList.add(className);
    return element;
}
