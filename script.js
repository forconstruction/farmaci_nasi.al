const products = [
  { id: "serum-hydra", name: "Serum hidratues Hydra+", category: "kujdesi-i-lekures", categoryLabel: "Kujdesi i lëkurës", description: "Hidratim i lehtë, për një lëkurë të freskët çdo ditë.", price: 1450, shape: "bottle", colors: ["#eaf1e9", "#fff", "#eff1e8", "#477558"], label: "MË I PËLQYER", type: "Hydra serum", symbol: "✳" },
  { id: "vitamina-c", name: "Vitaminë C 1000 mg", category: "vitamina", categoryLabel: "Vitamina", description: "Përkrah mirëqenien tuaj me vitaminë C çdo ditë.", price: 890, shape: "bottle", colors: ["#f5f0df", "#fff7df", "#ebddbc", "#8a6b34"], label: "ZGJEDHJA JONË", type: "Vitamin C", symbol: "C" },
  { id: "krem-duarsh", name: "Krem ushqyes për duar", category: "kujdesi-i-lekures", categoryLabel: "Kujdesi i lëkurës", description: "Kujdes i butë dhe hidratim për duar të buta.", price: 680, shape: "tube", colors: ["#f2e9e5", "#fff9f5", "#ead8d1", "#915d51"], label: "", type: "Hand cream", symbol: "♡" },
  { id: "omega-3", name: "Omega 3 — vaj peshku", category: "vitamina", categoryLabel: "Vitamina", description: "Suplement i përditshëm për stilin tuaj të jetesës.", price: 1250, shape: "bottle", colors: ["#e9eef2", "#f8fbfc", "#dce6e9", "#53727a"], label: "", type: "Omega 3", symbol: "≈" },
  { id: "sapun-natyral", name: "Sapun i butë natyral", category: "higjiena", categoryLabel: "Higjiena", description: "Pastron butësisht, për kujdesin e përditshëm.", price: 420, shape: "bar", colors: ["#e8efe2", "#f7f8e9", "#d9e3c9", "#637b49"], label: "", type: "Gentle soap", symbol: "❧" },
  { id: "krem-bebe", name: "Krem mbrojtës për bebe", category: "bebe", categoryLabel: "Për bebe", description: "Kujdes i butë për lëkurën delikate të bebes.", price: 750, shape: "tube", colors: ["#f3e8e7", "#fff8f5", "#ead8d6", "#9b6c6e"], label: "I BUTË DHE I KUJDESHËM", type: "Baby care", symbol: "♡" },
  { id: "vitamina-d", name: "Vitaminë D3 2000 IU", category: "vitamina", categoryLabel: "Vitamina", description: "Një plotësues i thjeshtë për rutinën tuaj ditore.", price: 970, shape: "bottle", colors: ["#f2ecdf", "#fffaf0", "#e7ddc8", "#8c764e"], label: "", type: "Vitamin D3", symbol: "☼" },
  { id: "balsam-lip", name: "Balsam hidratues për buzë", category: "kujdesi-i-lekures", categoryLabel: "Kujdesi i lëkurës", description: "Butësi dhe hidratim praktik, gjithmonë me vete.", price: 390, shape: "tube", colors: ["#f1e6e9", "#fff7f9", "#ead5db", "#94586e"], label: "", type: "Lip care", symbol: "♡" },
  { id: "termometer", name: "Termometër digjital", category: "mireqenie", categoryLabel: "Mirëqenie", description: "Matje e lehtë dhe e qartë për gjithë familjen.", price: 1100, shape: "bar", colors: ["#e6edf0", "#f7fbfa", "#d6e2e2", "#55757a"], label: "", type: "Digital care", symbol: "°" },
  { id: "peceta-bebe", name: "Peceta të buta për bebe", category: "bebe", categoryLabel: "Për bebe", description: "Për pastrim të butë dhe kujdes të përditshëm.", price: 560, shape: "jar", colors: ["#e9eef6", "#f8faff", "#dfe7f0", "#63758b"], label: "", type: "Baby wipes", symbol: "☁" },
  { id: "larje-duarsh", name: "Xhel pastrues duarsh", category: "higjiena", categoryLabel: "Higjiena", description: "Praktik për kujdesin higjienik në lëvizje.", price: 530, shape: "bottle", colors: ["#e2efed", "#f5fbf8", "#d2e5df", "#4d8172"], label: "", type: "Hand hygiene", symbol: "✳" },
  { id: "multivitamina", name: "Multivitamina për të rritur", category: "mireqenie", categoryLabel: "Mirëqenie", description: "Një plotësues i përditshëm për rutinën tuaj.", price: 1380, shape: "jar", colors: ["#f2eadc", "#fff9ed", "#e8dcc5", "#92764a"], label: "ZGJEDHJA JONË", type: "Daily wellness", symbol: "✳" }
];

const formatPrice = (amount) => `${new Intl.NumberFormat("sq-AL").format(amount)} ALL`;
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const emptyProducts = document.querySelector("#empty-products");
const catalogCount = document.querySelector("#catalog-count");
const cartDrawer = document.querySelector("#cart-drawer");
const backdrop = document.querySelector("#drawer-backdrop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const drawerFooter = document.querySelector("#drawer-footer");
const toast = document.querySelector("#toast");
const categoryButtons = [...document.querySelectorAll(".filter-chip")];

let selectedCategory = "all";
let cart = readCart();
let toastTimer;

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("pharmacy-nasi-cart") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) =>
      item && typeof item.id === "string" &&
      products.some((product) => product.id === item.id) &&
      Number.isInteger(item.quantity) && item.quantity > 0
    );
  } catch (error) {
    console.error("Shporta e ruajtur nuk mund të lexohet.", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("pharmacy-nasi-cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Shporta nuk mund të ruhet në këtë shfletues.", error);
    showToast("Shporta nuk mund të ruhet në këtë shfletues.");
  }
}

function packageMarkup(product) {
  const [artBg, packageBg, packageShadow, packageInk] = product.colors;
  return `<div class="product-art" style="--art-bg:${artBg};--package-bg:${packageBg};--package-shadow:${packageShadow};--package-ink:${packageInk}">
    ${product.label ? `<span class="product-badge">${product.label}</span>` : ""}
    <button class="favorite-button" type="button" aria-label="Shto ${product.name} te të preferuarat" aria-pressed="false">♡</button>
    <span class="art-sparkle one" aria-hidden="true">✦</span><span class="art-sparkle two" aria-hidden="true">✧</span>
    <div class="package package-${product.shape}" aria-hidden="true"><span class="package-name">nasi</span><span class="package-type">${product.type}</span><span class="package-symbol">${product.symbol}</span></div>
  </div>`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("sq");
  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = `${product.name} ${product.categoryLabel} ${product.description}`.toLocaleLowerCase("sq").includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filtered.map((product, index) => `
    <article class="product-card" style="animation-delay:${Math.min(index * 35, 210)}ms">
      ${packageMarkup(product)}
      <div class="product-info">
        <div class="product-category">${product.categoryLabel}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom"><span class="product-price">${formatPrice(product.price)}</span>
          <button class="add-to-cart" type="button" data-add="${product.id}" aria-label="Shto ${product.name} në shportë">+</button>
        </div>
      </div>
    </article>`).join("");

  emptyProducts.hidden = filtered.length > 0;
  productGrid.hidden = filtered.length === 0;
  catalogCount.textContent = `${filtered.length} ${filtered.length === 1 ? "produkt" : "produkte"} të përzgjedhura`;
}

function renderCart() {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  document.querySelector(".cart-count").textContent = itemCount;
  document.querySelector(".cart-trigger").setAttribute("aria-label", `Hap shportën, ${itemCount} ${itemCount === 1 ? "produkt" : "produkte"}`);
  document.querySelector(".drawer-item-count").textContent = `(${itemCount})`;
  document.querySelector("#cart-subtotal").textContent = formatPrice(subtotal);
  cartEmpty.hidden = itemCount > 0;
  drawerFooter.hidden = itemCount === 0;
  cartItems.hidden = itemCount === 0;
  document.querySelector("#order-subtotal").textContent = formatPrice(subtotal);

  if (subtotal >= 3000) {
    document.querySelector("#shipping-message").textContent = "Urime! Përfitoni dërgesë falas për këtë porosi.";
  } else {
    document.querySelector("#shipping-message").textContent = `Shtoni edhe ${formatPrice(3000 - subtotal)} për dërgesë falas.`;
  }

  cartItems.innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    const [artBg, packageBg, packageShadow, packageInk] = product.colors;
    return `<article class="cart-item">
      <div class="cart-item-art" style="--art-bg:${artBg};--package-bg:${packageBg};--package-shadow:${packageShadow};--package-ink:${packageInk}">
        <div class="package package-${product.shape}" aria-hidden="true"><span class="package-name">nasi</span><span class="package-type">${product.type}</span><span class="package-symbol">${product.symbol}</span></div>
      </div>
      <div class="cart-item-details"><strong>${product.name}</strong><small>${formatPrice(product.price)} / copë</small>
        <div class="quantity-control" aria-label="Sasia"><button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Zvogëlo sasinë">−</button><span>${item.quantity}</span><button type="button" data-quantity="${product.id}" data-change="1" aria-label="Rrit sasinë">+</button></div>
      </div>
      <div class="cart-item-end"><span class="cart-item-price">${formatPrice(product.price * item.quantity)}</span><button class="remove-item" type="button" data-remove="${product.id}">Hiq</button></div>
    </article>`;
  }).join("");
}

function updateCart(id, change) {
  const item = cart.find((entry) => entry.id === id);
  if (!item && change > 0) cart.push({ id, quantity: 1 });
  else if (item) {
    item.quantity += change;
    if (item.quantity <= 0) cart = cart.filter((entry) => entry.id !== id);
  }
  saveCart();
  renderCart();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.classList.add("no-scroll");
  requestAnimationFrame(() => backdrop.classList.add("visible"));
  cartDrawer.querySelector(".close-drawer").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  backdrop.classList.remove("visible");
  document.body.classList.remove("no-scroll");
  document.querySelector(".cart-trigger").focus();
  setTimeout(() => {
    if (!backdrop.classList.contains("visible")) backdrop.hidden = true;
  }, 260);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    categoryButtons.forEach((chip) => {
      const isSelected = chip === button;
      chip.classList.toggle("selected", isSelected);
      chip.setAttribute("aria-pressed", String(isSelected));
    });
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) closeCart();
});

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    const product = products.find((entry) => entry.id === addButton.dataset.add);
    updateCart(addButton.dataset.add, 1);
    addButton.classList.add("added");
    addButton.textContent = "✓";
    showToast(`${product.name} u shtua në shportë.`);
    setTimeout(() => {
      if (addButton.isConnected) {
        addButton.classList.remove("added");
        addButton.textContent = "+";
      }
    }, 1000);
    return;
  }

  const favoriteButton = event.target.closest(".favorite-button");
  if (favoriteButton) {
    const selected = favoriteButton.getAttribute("aria-pressed") !== "true";
    favoriteButton.setAttribute("aria-pressed", String(selected));
    favoriteButton.classList.toggle("is-favorite", selected);
    favoriteButton.textContent = selected ? "♥" : "♡";
    showToast(selected ? "Produkti u shtua te të preferuarat." : "Produkti u hoq nga të preferuarat.");
  }
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) updateCart(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
  if (removeButton) {
    cart = cart.filter((item) => item.id !== removeButton.dataset.remove);
    saveCart();
    renderCart();
  }
});

document.querySelector(".cart-trigger").addEventListener("click", openCart);
document.querySelector(".close-drawer").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
document.querySelector(".continue-shopping").addEventListener("click", () => {
  closeCart();
  document.querySelector("#produktet").scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".checkout-button").addEventListener("click", () => {
  if (cart.length) document.querySelector("#order-dialog").showModal();
});
document.querySelector(".dialog-dismiss").addEventListener("submit", () => {
  document.querySelector("#order-dialog").close();
});

document.querySelector("#order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) return;
  const formData = new FormData(event.currentTarget);
  const itemLines = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return `${product.name} × ${item.quantity} — ${formatPrice(product.price * item.quantity)}`;
  });
  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  const subject = encodeURIComponent("Kërkesë porosie — Pharmacy Nasi");
  const body = encodeURIComponent(
    `Përshëndetje Pharmacy Nasi,\n\nDëshiroj të konfirmoj disponueshmërinë dhe dërgesën për produktet e mëposhtme:\n\n${itemLines.join("\n")}\n\nNëntotali: ${formatPrice(total)}\n\nEmri: ${formData.get("name")}\nTelefoni: ${formData.get("phone")}\nAdresa: ${formData.get("address")}\n\nJu lutem më kontaktoni për konfirmim.`
  );
  window.location.href = `mailto:info@pharmacy_nasi.al?subject=${subject}&body=${body}`;
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Mesazh nga ${formData.get("name")} — Pharmacy Nasi`);
  const body = encodeURIComponent(`Emri: ${formData.get("name")}\nEmail-i: ${formData.get("email")}\n\n${formData.get("message")}`);
  window.location.href = `mailto:info@pharmacy_nasi.al?subject=${subject}&body=${body}`;
  document.querySelector("#contact-feedback").textContent = "Email-i u përgatit në aplikacionin tuaj. Faleminderit që na kontaktuat!";
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Mbyll menynë" : "Hap menynë");
  navLinks.classList.toggle("open", expanded);
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Hap menynë");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
