function loadOrders() {
    const ordersTableBody = document.getElementById('ordersList');
    if (!ordersTableBody) return;

    ordersTableBody.innerHTML = '';
    
    let orders = [];
    try {
        orders = JSON.parse(localStorage.getItem('orders')) || [];
        if (!Array.isArray(orders)) throw new Error("Invalid data format in localStorage");
    } catch (error) {
        console.error("Error loading orders: ", error);
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.customerName}</td>
            <td>${order.phoneNumber}</td>
            <td>${order.orderDate}</td>
            <td>${order.orderDetails}</td>
            <td>${order.pickupDate}</td>
            <td>${order.paymentMethod}</td>
        `;
        ordersTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const addItemButton = document.getElementById('addItemButton');
    const orderItemsContainer = document.getElementById('orderItems');

    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const customerName = document.getElementById('customerName').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const orderDate = document.getElementById('orderDate').value.trim();
            const pickupDate = document.getElementById('pickupDate').value.trim();
            const paymentMethod = document.getElementById('paymentMethod').value;

            // Ambil semua item yang ada
            const orderDetails = Array.from(orderItemsContainer.querySelectorAll('.order-item')).map(item => {
                const itemName = item.querySelector('#item-name').value;
                const quantity = item.querySelector('.item-quantity').value;
                return `${itemName} (Quantity: ${quantity})`;
            }).join(', ');

            if (!customerName || !orderDate || !orderDetails || !pickupDate || !paymentMethod) {
                alert("Please fill in all the fields.");
                return;
            }

            let orders = [];
            try {
                orders = JSON.parse(localStorage.getItem('orders')) || [];
            } catch (error) {
                console.error("Error retrieving orders: ", error);
            }

            orders.push({ customerName, phoneNumber, orderDate, orderDetails, pickupDate, paymentMethod });
            localStorage.setItem('orders', JSON.stringify(orders));

            orderForm.reset();
            loadOrders();
        });
    }

    if (addItemButton) {
        addItemButton.addEventListener('click', function() {
            const newItem = document.createElement('div');
            newItem.classList.add('order-item', 'mb-3');
            newItem.innerHTML = `
                <label for="itemName" class="form-label">Item Name</label>
                <select class="form-control" id="item-name" required>
                    <option value="none"></option>
                    <option value="bagel">Bagel</option>
                    <option value="biskuit">Biskuit</option>
                    <option value="choux-pastry">Choux Pastry</option>
                    <option value="cookies">Cookies</option>
                    <option value="croissant">Croissant</option>
                    <option value="donat">Donat</option>
                    <option value="kue">Kue</option>
                    <option value="pai">Pai (Pie)</option>
                    <option value="pudding">Pudding</option>
                    <option value="puff-pastry">Puff Pastry</option>
                    <option value="quick-breads">Quick-breads</option>
                    <option value="short-pastry">Short Pastry</option>
                </select>
                <label for="quantity" class="form-label">Quantity</label>
                <input type="number" class="form-control item-quantity" required min="1">
            `;
            orderItemsContainer.appendChild(newItem);
        });
    }

    loadOrders();
});

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = 'index-login.html';
    }
}

function redirectToHome(event) {
    event.preventDefault();
    
    const username = document.querySelector('input[type="text"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    if (username === "" || password === "") {
        alert("Please fill in both fields.");
        return;
    }
    
    window.location.href = "halaman-utama.html";
}

function redirectToLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];

    if (registeredEmails.includes(email)) {
        alert("This email is already registered. Please use another one.");
        return;
    }

    registeredEmails.push(email);
    localStorage.setItem('registeredEmails', JSON.stringify(registeredEmails));

    window.location.href = "index-login.html";
}

function redirectToRegister() {
    window.location.href = "register.html";
}