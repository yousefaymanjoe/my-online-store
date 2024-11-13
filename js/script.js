let shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];
// Check if the shopping basket already exists in localStorage

// Function to add item to basket
function addToBasket(itemName, itemPrice) {
    // Check if item is already in the basket
    const itemIndex = shoppingBasket.findIndex(item => item.name === itemName);
    
    if (itemIndex !== -1) {
        // Increase the quantity if item already exists
        shoppingBasket[itemIndex].quantity += 1;
    } else {
        // Add new item with quantity of 1 if it doesn't exist
        shoppingBasket.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    // Save the updated basket back to localStorage
    localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasket));

    alert(`${itemName} has been added to your basket!`);
}

// Function to search for products
function searchProducts() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const products = document.querySelectorAll(".product-item");

    products.forEach(product => {
        const productName = product.getAttribute("data-name").toLowerCase();
        if (productName.includes(searchInput)) {
            product.style.display = "block"; // Show matching products
        } else {
            product.style.display = "none"; // Hide non-matching products
        }
    });
}

// JavaScript to handle adding items to the basket
function addToBasket(name, price) {
    // Retrieve the basket from localStorage or initialize an empty array if it doesn't exist
    let shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];

    // Check if the item is already in the basket
    const existingItem = shoppingBasket.find(item => item.name === name);

    if (existingItem) {
        // Increase quantity if the item already exists
        existingItem.quantity += 1;
    } else {
        // Add a new item if it doesn't exist
        shoppingBasket.push({ name: name, price: price, quantity: 1 });
    }

    // Save the updated basket to localStorage
    localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasket));

    // Optional: Display a message to the user
    alert(`${name} has been added to your basket!`);
}

// Function to update the basket count displayed on the icon
function updateBasketCount() {
    const shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];
    const totalItems = shoppingBasket.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('basket-count').textContent = totalItems;
}

// Function to add items to the basket
function addToBasket(name, price) {
    let shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];

    const existingItem = shoppingBasket.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingBasket.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasket));

    alert(`${name} has been added to your basket!`);
    updateBasketCount();  // Update the count after adding the item
}

// Call updateBasketCount on page load to display the current count
updateBasketCount();


// new 
function addToBasket(name, price, image) {
    let shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];
    
    // Check if the item already exists in the basket
    const existingItem = shoppingBasket.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1; // If it exists, increase the quantity
    } else {
        shoppingBasket.push({ name, price, image, quantity: 1 }); // If not, add it to the basket
    }

    // Save the updated basket to localStorage
    localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasket));
    updateBasketCount();
}

function updateBasketCount() {
    const basketCount = document.getElementById('basket-count');
    const shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];
    const totalItems = shoppingBasket.reduce((total, item) => total + item.quantity, 0);
    basketCount.textContent = totalItems;
}

function displayBasket() {
    const basketItems = document.getElementById('basket-items');
    const totalPriceElem = document.getElementById('total-price');
    const emptyMessage = document.getElementById('empty-message');
    
    let shoppingBasket = JSON.parse(localStorage.getItem('shoppingBasket')) || [];

    if (shoppingBasket.length === 0) {
        emptyMessage.style.display = 'block';
        basketItems.style.display = 'none';
        totalPriceElem.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        basketItems.style.display = 'block';
        totalPriceElem.style.display = 'block';
        basketItems.innerHTML = '';

        let total = 0;
        shoppingBasket.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                ${item.name} - ${item.price} L.E x ${item.quantity}
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            basketItems.appendChild(listItem);

            total += item.price * item.quantity;
        });

        totalPriceElem.textContent = `Total Price: ${total} L.E`;
    }
}
