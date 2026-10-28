const menuIcon = document.getElementById("menuIcon");
const menuList = document.getElementsByTagName("header")[0];
const navOverlay = document.querySelector(".nav-overlay");

menuIcon.onclick = () => {
    menuList.classList.toggle("opened");
};
navOverlay.onclick = () => {
    menuList.classList.remove("opened");
};

function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
    closeMenu();
}

function closeMenu() {
    menuList.classList.remove("opened");
}

const themeIcon = document.getElementById("themeIcon");
const themeToggler = document.getElementById("themeToggler");

function toggleThemeHandler() {
    let mode = document.documentElement.attributes.hasOwnProperty("data-theme")
        ? "light"
        : "dark";
    const html = document.documentElement;

    if (mode === "light") {
        html.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
    } else {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}
