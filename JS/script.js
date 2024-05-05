const itemsliderbars = document.querySelectorAll(".cartegory-left li"); // Thay đổi ".cartegory-left-li" thành ".cartegory-left li"
itemsliderbars.forEach(function (menu, index) {
  menu.addEventListener("click", function () {
    menu.classList.toggle("block");
  });
});
