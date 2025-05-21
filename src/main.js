const mobileMenu = document.getElementById("sidebar");

function toggleSidebar() {
  mobileMenu.classList.toggle("translate-x-full");
}

fetch("https://fakestoreapi.com/products/category/jewelery")
  .then((res) => res.json())
  .then((json) => renderMainPageJewelry(json))
  .catch((err) => alert(err));

function renderMainPageJewelry(items) {
  const container = document.getElementById("jewelry-container");

  const template = items
    .map((item) => {
      return `
        <div class="w-full max-w-96">
        <img
          class="w-full aspect-[3/4] object-contain"
          src="${item.image}"
          alt=""
        />

        <h3>${item.title}</h3>
        <span>${item.price} تومان</span>
      </div>
        `;
    })
    .join("");

  container.innerHTML = template;
}
