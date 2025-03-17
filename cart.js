document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const orderType = document.getElementById("order-type");
    const pickupContainer = document.getElementById("pickup-container");
    const addressContainer = document.getElementById("address-container");
    const clearCartButton = document.getElementById("clear-cart");
    const backToMenuButton = document.getElementById("back-to-menu");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <span>${item.name} ${item.price} ₽</span>
                <button class="decrease" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = total + " ₽";
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("increase")) {
            const index = event.target.dataset.index;
            cart[index].quantity++;
        } else if (event.target.classList.contains("decrease")) {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }
        renderCart();
    });

    orderType.addEventListener("change", function () {
        if (orderType.value === "pickup") {
            pickupContainer.style.display = "block";
            addressContainer.style.display = "none";
        } else {
            pickupContainer.style.display = "none";
            addressContainer.style.display = "block";
        }
    });

    clearCartButton.addEventListener("click", function () {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    });

    
    backToMenuButton.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    renderCart();
});
