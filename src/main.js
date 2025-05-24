const mobileMenu = document.getElementById("sidebar");
const desktopHeader = document.getElementById("desktop_header")
// const test = document.getElementById("test")

// const tst = Toastify({
//   text: "دریافت دیتا با خطا مواجه شد!",
//   duration: 3000,
//   // destination: "https://github.com/apvarun/toastify-js",
//   // newWindow: true,
//   close: true,
//   gravity: "top", // `top` or `bottom`
//   position: "center", // `left`, `center` or `right`
//   stopOnFocus: true, // Prevents dismissing of toast on hover
//   style: {
//     background: "linear-gradient(to right, #ff5555, #ff0000)",
//   },
//   onClick: function () {
//     location.reload()
//   } // Callback after click
// })

// console.log("tst:", tst)

// function handleTest() {
//   tst.showToast()
// }

// test.addEventListener("click", handleTest)


function toggleSidebar() {
  mobileMenu.classList.toggle("translate-x-full");
}

fetch("https://fakestoreapi.com/products/category/jewelery")
  .then((res) => res.json())
  .then((json) => renderMainPageJewelry(json))
  .catch((err) => {
    Toastify({
      text: "دریافت دیتا با خطا مواجه شد!",
      duration: 3000,
      // destination: "https://github.com/apvarun/toastify-js",
      // newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ff5555, #ff0000)",
      },
      onClick: function () {
        location.reload()
      } // Callback after click
    }).showToast();
  });

function renderMainPageJewelry(items) {
  const container = document.getElementById("jewelry-container");

  const template = items
    .map((item) => {
      return `
        <div class="w-full max-w-64">
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

function handleWindowScroll(evt) {
  const windowScroll = window.scrollY;

  if (windowScroll > 200) {
    desktopHeader.style = "position: fixed; z-index: 10; top: 0; left: 0; width: 100%; background-color: gray; max-width: 10000000000000px; color: white; align-items: center; padding: 16px 32px"
  } else {
    desktopHeader.style = ""
  }
}

window.addEventListener("scroll", handleWindowScroll)