const mobileMenu = document.getElementById("sidebar");
const desktopHeader = document.getElementById("desktop_header")
const root = document.getElementById("root")

const errorToast = Toastify({
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
})

const failLoginToast = Toastify({
  text: "نام کاربری یا رمز عبور نامعتبر!",
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
})

function getJewelery() {
  const result = fetch("https://fakestoreapi.com/products/category/jewelery")
    .then((res) => res.json())
    .catch((err) => {
      errorToast.showToast();
    });

  return result
}

function postUserLogin(user, pass) {
  const result = fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass })
  })
    .then(res => res.json())
    .then(json => {
      debugger
      localStorage.setItem("token", json.token)
      history.pushState({}, "", "/all-products")
      checkState()
      return json
    })
    .catch(err => {
      localStorage.removeItem("token")
      failLoginToast.showToast();
    })

  return result
}

function getAllProducts() {
  return fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .catch(err => {
      errorToast.showToast()
    })
}




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

async function handleGetMainPageJewelery() {
  const data = await getJewelery()
  renderMainPageJewelry(data)
}
handleGetMainPageJewelery()

function handleAClick(evt) {
  evt.preventDefault();

  const href = evt.target.getAttribute("href")

  history.pushState({}, "", href)

  checkState()
}

function renderLoginPage() {
  const template = `
  <form class="w-full max-w-96 mx-auto flex flex-col gap-4 items-center" onsubmit="handleLoginFormSubmit(event)">
  <div class="w-full">
    <label class="hidden" for="username">username:</label>
    <input class="border w-full p-2 rounded-md outline-none " placeholder="username" name="username" type="text" id="username">
  </div>

  <div class="w-full">
    <label class="hidden" for="password">password:</label>
    <input class="border w-full p-2 rounded-md outline-none " placeholder="password" name="password" type="password" id="password">
  </div>

  <input class="py-2 text-white rounded-md bg-blue-400 w-full" type="submit" value="login">
</form>
  `

  root.innerHTML = template
}

renderLoginPage()

async function handleLoginFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);

  const result = await postUserLogin(formData.get("username"), formData.get("password"))

}

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

function renderMenPage() {
  root.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div>
<div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div>
<div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div>
<div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div></div>`

  fetch("https://fakestoreapi.com/products/category/men's%20clothing")
    .then(res => res.json())
    .then(json => renderMenData(json))
    .catch(err => errorToast.showToast())

  function renderMenData(data) {
    const template = data.map(item => {
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
      `
    }).join("");

    const container = `
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 custom-container">
        ${template}
      </div>
    `

    root.innerHTML = container
  }
}

async function renderMainPage() {
  const template = `<!-- slider -->
    <div class="h-[50vh] custom-container-lg">
      <img class="h-[50vh] w-full object-cover" src="./assets/images/slider/1.jpg" width="500" height="800" alt="" />
    </div>

    <!-- categories -->
    <div class="flex flex-col md:flex-row custom-container-lg">
      <div class="relative flex-1">
        <img class="w-full aspect-square object-cover" src="./assets/images/categories/women.jpg" alt="" />
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">پوشاک زنانه</span>
      </div>
      <div class="relative flex-1">
        <img class="w-full aspect-square object-cover" src="./assets/images/categories/men.jpg" alt="" />
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">پوشاک
          مردانه</span>
      </div>

      <div class="relative flex-1">
        <img class="w-full aspect-square object-cover brightness-50" src="./assets/images/categories/electronics.jpg"
          alt="" />
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">لوازم
          الکترونیکی</span>
      </div>
      <div class="relative flex-1">
        <img class="w-full aspect-square object-cover brightness-50" src="./assets/images/categories/jewelry.jpg"
          alt="" />
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">جواهرات</span>
      </div>
    </div>

    <!-- jewelry container -->
    <h2 class="text-center mt-10">جواهرات</h2>
    <div id="jewelry-container" class="custom-container md:flex justify-center gap-4"></div>
`

  root.innerHTML = template;

  const jewelryData = await getJewelery()
  renderMainPageJewelry(jewelryData)
}

async function renderAllProducts() {
  root.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div>
<div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div>
<div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div>
<div class="w-full h-96 p-4 bg-slate-200 animate-pulse">
  <div class="w-full bg-slate-300 h-64"></div>
  <div class="w-1/3 h-6 bg-slate-300 rounded-lg mt-4"></div>
  <div class="w-1/5 h-6 bg-slate-300 rounded-lg mt-4"></div>
</div></div>`

  const data = await getAllProducts()

  const template = data.map(item => {
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
  `
  }).join("")

  const container = `
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 custom-container">
        ${template}
      </div>
    `

    root.innerHTML = container
}

function checkState() {
  const url = location.pathname;

  switch (url) {
    case "/men":
      renderMenPage();
      break;
    case "/all-products":
      renderAllProducts();
      break;
    case "/login":
      renderLoginPage();
      break;
    default:
      renderMainPage();
  }
}

window.addEventListener("popstate", checkState)
window.addEventListener("scroll", handleWindowScroll)