let productsData = [];
let categoriesData = [];
let visibleProductsCount = 6;
const PRODUCTS_PER_LOAD = 6;
let currentProducts = [];

const DATA_URL = "assets/data/";

$(document).ready(function () {
  if ($("#main-content").length) {
    createProductsLayout();
    createProductModal();
    loadProducts();
    loadCategories();
    bindFilterEvents();
    bindCartEvents();
    bindLoadMoreEvent();
    renderCart();
  }
  if ($("#faq-container").length) {
    loadFAQ();
  }
  if ($("#contactForm").length) {
    loadProductsForSummary();
  }
});

// Products section 1 - layout, data loading and general rendering + control of data
function createProductsLayout() {
  const layoutHTML = `<section id="products">
        <div class="row g-0" id="products-row"></div>
      </section>`;
  $("#main-content").html(layoutHTML);
}

function createProductModal() {
  const modalHTML = `<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
         <div class="modal-body">
          <div class="row align-items-center">
            <div class="col-12 col-md-6 text-center mb-3 mb-md-0">
              <img id="productModalImage" src="" class="img-fluid" alt="">
            </div>
            <div class="col-12 col-md-6 text-center text-md-start">
              <div id="productModalFeaturesAndComponents" class="mb-3"></div>
                <p id="productModalDescription"></p>
                <p id="productModalPrice" class="fs-4 fw-bold"></p>
                <small id="productModalNote"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  $("body").append(modalHTML);
}

function loadProducts() {
  $.ajax({
    url: `${DATA_URL}products.json`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      productsData = data;
      renderProducts();
      renderCart();
      populateFilterElements();
    },
    error: function (xhr) {
      console.log(xhr);
    },
  });
}

function loadCategories() {
  $.ajax({
    url: `${DATA_URL}categories.json`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      categoriesData = data;
      populateFilterElements();
    },
    error: function (xhr) {
      console.error(xhr);
    },
  });
}

function renderProducts(products = productsData) {
  const productsRow = $("#products-row");
  let groupHTML = "";
  currentProducts = products;
  const visibleProducts = products.slice(0, visibleProductsCount);

  if (!products.length) {
    productsRow.empty();
    $("#zeroResults").removeClass("hidden");
    $("#loadMoreBtn").addClass("hidden");
    return;
  }
  $("#zeroResults").addClass("hidden");
  visibleProducts.forEach((product, index) => {
    if (index % 3 === 0) groupHTML += `<div class="card-group">`;

    groupHTML += `
      <div class="card rounded">
        <img src="${product.image.src}" class="card-img-top" alt="${product.image.alt}">
        <div class="card-body text-center">
          <h5 class="card-title cs-text">$${product.price} ${product.name}</h5>
          <p class = "mb-2 cs-text">In stock:${product.stock}</p>
          <button class="read-more-btn" data-id="${product.id}">Read more</button>
          <button class="add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? "disabled" : ""}>${product.stock === 0 ? "Out of stock" : "Add to cart"}</button>
        </div>
      </div>
    `;

    if (index % 3 === 2 || index === visibleProducts.length - 1) {
      groupHTML += `</div>`;
    }
  });
  $(productsRow).html(groupHTML);
  bindProductModalEvents(products);
  toggleLoadMoreButton(products.length);
}

function bindProductModalEvents(products) {
  $(".read-more-btn").on("click", function () {
    const id = Number($(this).data("id"));
    const product = productsData.find((product) => product.id === id);

    if (!product) {
      return;
    }

    $("#productModalLabel").text(`$${product.price} ${product.name}`);
    $("#productModalImage")
      .attr("src", product.image.src)
      .attr("alt", product.image.alt);
    $("#productModalFeaturesAndComponents").html(`
      <p>CPU: ${product.MainComponents.CPU}</p>
      <p>GPU: ${product.MainComponents.GPU}</p>
      <p>Features: ${product.features.join(", ")}</p>
    `);
    $("#productModalDescription").text(product.description);
    $("#productModalPrice").text(`$${product.price}`);
    $("#productModalNote").text(
      "Note: Picture shown is for illustrative purposes only.",
    );

    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  });
}

function toggleLoadMoreButton(totalProducts) {
  if (visibleProductsCount >= totalProducts) {
    $("#loadMoreBtn").addClass("hidden");
  } else {
    $("#loadMoreBtn").removeClass("hidden");
  }
}

function bindLoadMoreEvent() {
  $("#loadMoreBtn").on("click", function () {
    visibleProductsCount += PRODUCTS_PER_LOAD;
    renderProducts(currentProducts);
  });
}

function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function getCartProductsCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = productsData.find((product) => product.id === productId);
  if (!product || product.stock === 0) {
    return;
  }
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity >= product.stock) {
      showToast("You have reached the maximum stock for this product.");
      return;
    }
    existingItem.quantity++;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  saveCart(cart);
  renderCart();
  showToast(`${product.name} added to cart.`);
}

function renderCart() {
  const cart = getCart();
  const cartItems = $("#cartItems");

  if (!cart.length) {
    cartItems.html("<p>Your cart is empty.</p>");
    return;
  }

  if (cart.length > 2) {
    const productsCount = getCartProductsCount();
    cartItems.html(`
      <p>You have ${productsCount} product/s in your cart.</p>
      <button id="clearCartBtn" class="btn btn-sm btn-danger" type="button">
      Clear cart </button>`);
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach((cartItem) => {
    const product = productsData.find((product) => product.id === cartItem.id);
    if (!product) {
      return;
    }
    const itemTotal = product.price * cartItem.quantity;
    total += itemTotal;
    html += `
      <div class="mb-3 border-bottom pb-2">
        <strong>${product.name}</strong>
        <p class="mb-1">Available: ${product.stock}</p>
        <p class="mb-1">$${product.price} x ${cartItem.quantity}</p>
        <p class="mb-1">Subtotal: $${itemTotal}</p>

        <button class="decrease-cart-item btn btn-sm btn-dark" data-id="${product.id}" type="button">-</button>
        <button class="increase-cart-item btn btn-sm btn-dark" data-id="${product.id}" type="button">+</button>
        <button class="remove-cart-item btn btn-sm btn-danger" data-id="${product.id}" type="button">Remove</button>
      </div>
    `;
  });
  html += `<strong> Total: $${total}</strong>`;
  cartItems.html(html);
}

function bindCartEvents() {
  $("#products-row").on("click", ".add-to-cart-btn", function () {
    const productId = Number($(this).data("id"));
    addToCart(productId);
  });

  $("#cartItems").on("click", ".increase-cart-item", function () {
    const productId = Number($(this).data("id"));
    addToCart(productId);
  });

  $("#cartItems").on("click", ".decrease-cart-item", function () {
    const productId = Number($(this).data("id"));
    const cart = getCart();
    const item = cart.find((item) => item.id === productId);

    if (!item) {
      return;
    }

    item.quantity--;

    const updatedCart = cart.filter((item) => item.quantity > 0);

    saveCart(updatedCart);
    renderCart();
  });

  $("#cartItems").on("click", ".remove-cart-item", function () {
    const productId = Number($(this).data("id"));
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);

    saveCart(updatedCart);
    renderCart();
  });

  $("#cartItems").on("click", "#clearCartBtn", function () {
    localStorage.removeItem("cart");
    renderCart();
  });

  $("#checkoutBtn").on("click", function () {
    const cart = getCart();

    if (!cart.length) {
      return;
    }

    window.location.href = "contact.html";
  });
}

// Products section 2 - creating and populating filter/sort elements
function populateFilterElements() {
  if (!productsData.length || !categoriesData.length) {
    return;
  }
  populateCategorySelect();
  populateResolutionCheckboxes();
}

function makeSafeId(value) {
  return value.toString().toLowerCase().replaceAll(" ", "-");
}

function createCheckbox(name, id, value, labelText) {
  return `
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        name="${name}"
        id="${id}"
        value="${value}"
      >
      <label class="form-check-label" for="${id}">
        ${labelText}
      </label>
    </div>
  `;
}

function populateCategorySelect() {
  let html = `<option value="all">All categories</option>`;

  categoriesData.forEach((category) => {
    html += `
      <option value="${category.id}">
        ${category.name}
      </option>
    `;
  });

  $("#categorySelect").html(html);
}

function populateResolutionCheckboxes() {
  const resolutions = [];

  productsData.forEach((product) => {
    if (!resolutions.includes(product.targetResolution)) {
      resolutions.push(product.targetResolution);
    }
  });

  let html = "";

  resolutions.forEach((resolution) => {
    html += createCheckbox(
      "resolutionFilter",
      `resolution-${makeSafeId(resolution)}`,
      resolution,
      resolution,
    );
  });

  $("#resolutionFilters").html(html);
}

// Products section 3 - filtering products based on user input
function filteredProducts() {
  const selectedCategory = $("#categorySelect").val();
  const selectedResolutions = $("input[name='resolutionFilter']:checked")
    .map(function () {
      return $(this).val();
    })
    .get();
  const searchQuery = $("#searchInput").val().trim().toLowerCase();

  return productsData.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" ||
      product.category.toString() === selectedCategory;
    const resolutionMatch =
      selectedResolutions.length === 0 ||
      selectedResolutions.includes(product.targetResolution);
    const searchMatch = product.name.toLowerCase().includes(searchQuery);
    return categoryMatch && resolutionMatch && searchMatch;
  });
}

//Products section 4 - sorting products based on user input
function sortProducts(products) {
  const sortValue = $("#sortSelect").val();
  const sortedProducts = [...products];
  switch (sortValue) {
    case "alphaasc":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphadesc":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "priceasc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "pricedesc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
  }
  return sortedProducts;
}

//Products section 5 - applying filters and sorting when user changes filter/sort options
function applyFiltersAndSorting() {
  const filtered = filteredProducts();
  const sorted = sortProducts(filtered);
  renderProducts(sorted);
}

//Products section 6 - events for filter/sort options
function bindFilterEvents() {
  $("#categorySelect").on("change", applyFiltersAndSorting);
  $("#sortSelect").on("change", applyFiltersAndSorting);
  $("#resolutionFilters").on(
    "change",
    "input[name='resolutionFilter']",
    applyFiltersAndSorting,
  );

  $("#searchInput").on("keyup", applyFiltersAndSorting);
  $("#searchBtn").on("click", applyFiltersAndSorting);
}

//Toast notification
function showToast(message) {
  const toastContainer = $("#toastContainer");

  const toast = $(`
    <div class="custom-toast">
      ${message}
    </div>
  `);

  toastContainer.append(toast);

  setTimeout(() => {
    toast.addClass("show");
  }, 10);

  setTimeout(() => {
    toast.removeClass("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// FAQ Section
function loadFAQ() {
  $.ajax({
    url: `${DATA_URL}faq.json`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      renderFAQ(data);
    },
    error: function (xhr) {
      console.log(xhr);
    },
  });
}

function renderFAQ(data) {
  const $faqContainer = $("#faq-container");
  $faqContainer.empty();

  data.forEach((faq) => {
    const $item = $("<div>").addClass("faq-item");
    const $question = $("<h5>").addClass("faq-question").text(faq.question);
    const $answer = $("<p>").addClass("faq-answer").text(faq.answer);

    $item.append($question).append($answer);
    $faqContainer.append($item);
  });

  $(".faq-question").on("click", function () {
    const $answer = $(this).next(".faq-answer");

    $(".faq-answer").not($answer).slideUp(200);

    $answer.slideToggle(200);
  });
}

//Contact/order section - loading order summary data
function loadProductsForSummary() {
  fetch(`${DATA_URL}products.json`)
    .then((response) => response.json())
    .then((products) => {
      renderOrderSummary(products);
    });
}

function renderOrderSummary(products) {
  const cart = getCart();
  const productsCount = getCartProductsCount();
  const selectedProducts = document.getElementById("selectedProducts");
  const orderTotal = document.getElementById("orderTotal");
  if (!cart.length) {
    selectedProducts.innerHTML = "<p>No PC is selected.</p>";
    orderTotal.textContent = "$0";
    return;
  }
  if (productsCount > 2) {
    let html = "";
    let total = 0;

    cart.forEach((item) => {
      const product = products.find((product) => product.id === item.id);

      if (!product) {
        return;
      }

      total += product.price * item.quantity;
    });

    selectedProducts.innerHTML = `
    <p class="fw-bold">You have ${productsCount} product/s in your cart.</p>
  `;

    orderTotal.textContent = `$${total}`;
    return;
  }
  let html = "";
  let total = 0;
  cart.forEach((item) => {
    const product = products.find((product) => product.id === item.id);
    if (!product) {
      return;
    }
    const itemTotal = product.price * item.quantity;
    total += itemTotal;
    html += `
      <div class="mb-3 border-bottom pb-2">
        <strong>${product.name}</strong>
        <p class="mb-1">CPU: ${product.MainComponents.CPU}</p>
        <p class="mb-1">GPU: ${product.MainComponents.GPU}</p>
        <p class="mb-1">Quantity: ${item.quantity}</p>
        <p class="mb-0">Subtotal: $${itemTotal}</p>
      </div>
    `;
  });
  selectedProducts.innerHTML = html;
  orderTotal.textContent = `$${total}`;
}

//Contact/order section - complete form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) {
    return;
  }

  const email = document.getElementById("Email");
  const phone = document.getElementById("phoneNumber");
  const delivery = document.getElementById("delivery");
  const storePickup = document.getElementById("storePickup");
  const addressContainer = document.getElementById("addressContainer");
  const address = document.getElementById("address");
  const paymentContainer = document.getElementById("paymentContainer");

  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const acquireError = document.getElementById("acquireError");
  const addressError = document.getElementById("addressError");
  const paymentError = document.getElementById("paymentError");
  const pcError = document.getElementById("pcError");

  document
    .querySelectorAll("input[name='acquirementMethod']")
    .forEach((radio) => {
      radio.addEventListener("change", () => {
        if (delivery.checked) {
          addressContainer.classList.remove("d-none");
          paymentContainer.classList.remove("d-none");
        } else {
          addressContainer.classList.add("d-none");
          paymentContainer.classList.add("d-none");
        }

        if (delivery.checked || storePickup.checked) {
          acquireError.classList.add("d-none");
          acquireError.innerText = "";
        }
      });
    });

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
  const phoneRegex = /^(06[0-9]\d{6,7}|\+3816[0-9]\d{6,7})$/;

  email.addEventListener("input", () => {
    if (emailRegex.test(email.value.trim())) {
      email.classList.remove("is-invalid");
      emailError.classList.add("d-none");
      emailError.innerText = "";
    }
  });

  phone.addEventListener("input", () => {
    if (phoneRegex.test(phone.value.trim())) {
      phone.classList.remove("is-invalid");
      phoneError.classList.add("d-none");
      phoneError.innerText = "";
    }
  });

  address.addEventListener("input", () => {
    if (address.value.trim().length >= 20) {
      address.classList.remove("is-invalid");
      addressError.classList.add("d-none");
      addressError.innerText = "";
    }
  });

  document.querySelectorAll("input[name='paymentMethod']").forEach((radio) => {
    radio.addEventListener("change", () => {
      paymentError.classList.add("d-none");
      paymentError.innerText = "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    [
      emailError,
      phoneError,
      acquireError,
      addressError,
      paymentError,
      pcError,
    ].forEach((el) => {
      el.classList.add("d-none");
      el.innerText = "";
    });

    [email, phone, address].forEach((el) => el.classList.remove("is-invalid"));

    if (!emailRegex.test(email.value.trim())) {
      emailError.innerText =
        "Enter a valid email (gmail, yahoo, outlook, hotmail).";
      emailError.classList.remove("d-none");
      email.classList.add("is-invalid");
      valid = false;
    }

    if (!phoneRegex.test(phone.value.trim())) {
      phoneError.innerText =
        "Enter a valid phone number (06x... or +3816x...).";
      phoneError.classList.remove("d-none");
      phone.classList.add("is-invalid");
      valid = false;
    }

    if (!delivery.checked && !storePickup.checked) {
      acquireError.innerText = "Please select a method of acquiring your PC.";
      acquireError.classList.remove("d-none");
      valid = false;
    }

    if (delivery.checked) {
      if (address.value.trim().length < 20) {
        addressError.innerText = "Please enter a valid address.";
        addressError.classList.remove("d-none");
        address.classList.add("is-invalid");
        valid = false;
      }

      const paymentChecked = document.querySelector(
        "input[name='paymentMethod']:checked",
      );
      if (!paymentChecked) {
        paymentError.innerText = "Please select a payment method.";
        paymentError.classList.remove("d-none");
        valid = false;
      }
    }

    const cart = getCart();
    if (!cart.length) {
      pcError.innerText = "Your cart is empty. Please select a PC to order.";
      pcError.classList.remove("d-none");
      valid = false;
    }

    if (valid) {
      showToast("Order submitted successfully!");

      localStorage.removeItem("cart");
      loadProductsForSummary();

      form.reset();
      addressContainer.classList.add("d-none");
      paymentContainer.classList.add("d-none");
    }
  });
});
