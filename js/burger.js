export default function burger() {
  const menuElem = document.querySelector(".menu");
  const humburgerElem = document.querySelector(".humburger-menu");
  const menuListItems = document.querySelectorAll(".menu-list__item");

  const toggleMenu = () => {
    menuElem.classList.toggle("menu-active");
    humburgerElem.classList.toggle("humburger-menu-active");
  };

  humburgerElem.addEventListener("click", toggleMenu);
  for (const item of menuListItems) {
    item.addEventListener("click", toggleMenu);
  }
}
