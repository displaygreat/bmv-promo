//variant 1 to open modal using event delegation
const modalElem = document.querySelector(".modal");
//variant 2 to open modal
// const moreElems = document.querySelectorAll(".more");
const designBlock = document.querySelector(".design-block");

const openModal = () => {
  modalElem.classList.remove("hidden");
  disableScroll();
};
const closeModal = () => {
  modalElem.classList.add("hidden");
  enableScroll();
};

//variant 1 to open modal using event delegation
designBlock.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".more")) {
    openModal();
  }
});

//variant 2 to open modal
// moreElems.forEach((elem) => {
//   elem.addEventListener("click", openModal);
// });

modalElem.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target.classList.contains("overlay") ||
    target.classList.contains("modal__close")
  ) {
    closeModal();
  }
});
