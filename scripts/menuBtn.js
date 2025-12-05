window.addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.querySelector(".mobile-menu-toggle .open");
  const closeMenuBtn = document.querySelector(".mobile-menu-toggle .close");
  const linksListContainer = document.querySelector(".header .wrapper .links ");
  const header = document.querySelector(".header ");

  openMenuBtn.addEventListener("click", () => {
    openMenuBtn.parentElement.classList.add("active");
    linksListContainer.classList.add("active");
    header.classList.add("active");
  });

  closeMenuBtn.addEventListener("click", () => {
    openMenuBtn.parentElement.classList.remove("active");
    linksListContainer.classList.remove("active");
    header.classList.remove("active");
  });
});
