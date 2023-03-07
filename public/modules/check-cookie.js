export default function checkCookie(cookieName) {
    const cookies = document.cookie.split(";"); // split all cookies into an array
    for (var i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim(); // remove whitespace
        if (cookie.startsWith(cookieName + ":")) {
            return getEmailAddress(cookie); // found the cookie
        }
    }
    return false; // cookie not found
}

function getEmailAddress(str) {
    const emailRegex = /email:(.*?)=/;
    const match = str.match(emailRegex);
    if (match) {
        return match[1];
    } else {
        return null; // or throw an error, depending on the desired behavior
    }
}
