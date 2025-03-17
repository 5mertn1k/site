document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const pizzaName = button.dataset.name;
            const pizzaPrice = parseInt(button.dataset.price);

            const existingPizza = cart.find(pizza => pizza.name === pizzaName);

            if (existingPizza) {
                existingPizza.quantity++;
            } else {
                cart.push({ name: pizzaName, price: pizzaPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Добавлено в корзину: ${pizzaName}`);
        });
    });
});
