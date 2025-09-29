

      // ===== Global Variables =====
      let currentCustomer = null;
      let selectedBaristaCustomer = null;
      let customers = [];
      let pendingOrders = [];
      let shopOrders = [];
      let customProducts = [];
      let shoppingCart = [];
      const STAMPS_FOR_FREE = 6;
      const DEFAULT_BARISTA_PIN = "1234";

      // ===== Utility Functions =====
      function showNotification(message, type = "success") {
        const notification = document.getElementById("notification");
        const notificationContent = document.getElementById(
          "notification-content"
        );
        const notificationText = document.getElementById("notification-text");

        notificationText.textContent = message;

        if (type === "error") {
          notificationContent.className =
            "bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl shadow-2xl transform transition-all duration-500 backdrop-blur-sm border border-red-500";
        } else {
          notificationContent.className =
            "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-2xl transform transition-all duration-500 backdrop-blur-sm border border-emerald-500";
        }

        notification.classList.remove("hidden");
        notificationContent.style.transform = "translateX(0)";

        setTimeout(() => {
          notificationContent.style.transform = "translateX(100%)";
          setTimeout(() => {
            notification.classList.add("hidden");
          }, 300);
        }, 4000);
      }

      function generateId() {
        return "_" + Math.random().toString(36).substr(2, 9);
      }

      function formatPrice(price) {
        return price.toLocaleString() + " IQD";
      }

      function saveCustomers() {
        localStorage.setItem(
          "cafeEleganceCustomers",
          JSON.stringify(customers)
        );
      }

      function savePendingOrders() {
        localStorage.setItem(
          "cafeElegancePendingOrders",
          JSON.stringify(pendingOrders)
        );
      }

      function saveShopOrders() {
        localStorage.setItem(
          "cafeEleganceShopOrders",
          JSON.stringify(shopOrders)
        );
      }

      function saveCustomProducts() {
        localStorage.setItem(
          "cafeEleganceCustomProducts",
          JSON.stringify(customProducts)
        );
      }

      function saveShoppingCart() {
        localStorage.setItem(
          "cafeEleganceShoppingCart",
          JSON.stringify(shoppingCart)
        );
        updateCartDisplay();
      }

      function loadCustomers() {
        const stored = localStorage.getItem("cafeEleganceCustomers");
        if (stored) {
          customers = JSON.parse(stored);
        } else {
          // Initialize with sample data
          customers = [
            {
              id: generateId(),
              name: "Ahmed Al-Mahmoud",
              phone: "07501234567",
              orders: [
                {
                  id: generateId(),
                  product: "Signature Americano",
                  price: 3200,
                  date: new Date().toISOString(),
                  isFree: false,
                },
              ],
              loyaltyPoints: 1,
            },
          ];
          saveCustomers();
        }
      }

      function loadPendingOrders() {
        const stored = localStorage.getItem("cafeElegancePendingOrders");
        if (stored) {
          pendingOrders = JSON.parse(stored);
        }
        renderPendingOrders();
      }

      function loadShopOrders() {
        const stored = localStorage.getItem("cafeEleganceShopOrders");
        if (stored) {
          shopOrders = JSON.parse(stored);
        }
        renderShopOrders();
      }

      function loadCustomProducts() {
        const stored = localStorage.getItem("cafeEleganceCustomProducts");
        if (stored) {
          customProducts = JSON.parse(stored);
          updateProductSelect();
        }
      }

      function loadShoppingCart() {
        const stored = localStorage.getItem("cafeEleganceShoppingCart");
        if (stored) {
          shoppingCart = JSON.parse(stored);
        }
        updateCartDisplay();
      }

      function updateProductSelect() {
        const select = document.getElementById("barista-product-select");
        const customOption = select.querySelector('option[value="custom"]');

        // Remove existing custom products
        const options = select.querySelectorAll("option");
        options.forEach((option) => {
          if (option.dataset.custom === "true") {
            option.remove();
          }
        });

        // Add custom products before the "custom" option
        customProducts.forEach((product) => {
          const option = document.createElement("option");
          option.value = `${product.name},${product.price}`;
          option.textContent = `${product.name} - ${formatPrice(
            product.price
          )}`;
          option.dataset.custom = "true";
          select.insertBefore(option, customOption);
        });
      }

      // ===== Shopping Cart Functions =====
      function addToCart(name, price, image) {
        const existingItem = shoppingCart.find((item) => item.name === name);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          shoppingCart.push({
            id: generateId(),
            name: name,
            price: price,
            image: image,
            quantity: 1,
          });
        }

        saveShoppingCart();
        showNotification(`${name} added to cart!`);
      }

      function removeFromCart(itemId) {
        shoppingCart = shoppingCart.filter((item) => item.id !== itemId);
        saveShoppingCart();
        renderCartItems();
      }

      function updateQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
          removeFromCart(itemId);
          return;
        }

        const item = shoppingCart.find((item) => item.id === itemId);
        if (item) {
          item.quantity = newQuantity;
          saveShoppingCart();
          renderCartItems();
        }
      }

      function updateCartDisplay() {
        const cartBadges = [
          document.getElementById("cart-badge"),
          document.getElementById("mobile-cart-badge"),
        ];

        const totalItems = shoppingCart.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        cartBadges.forEach((badge) => {
          if (badge) {
            if (totalItems > 0) {
              badge.textContent = totalItems;
              badge.classList.remove("hidden");
            } else {
              badge.classList.add("hidden");
            }
          }
        });
      }

      function toggleCart() {
        document.getElementById("cart-modal").classList.toggle("hidden");
        document.getElementById("cart-modal").classList.toggle("flex");
        renderCartItems();
      }

      function renderCartItems() {
        const container = document.getElementById("cart-items-container");
        const totalElement = document.getElementById("cart-total-amount");

        if (shoppingCart.length === 0) {
          container.innerHTML =
            '<p class="text-center text-amber-700 text-lg">Your cart is empty</p>';
          totalElement.textContent = "0";
          return;
        }

        let total = 0;
        container.innerHTML = "";

        shoppingCart.forEach((item) => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;

          const cartItemDiv = document.createElement("div");
          cartItemDiv.className = "cart-item";
          cartItemDiv.innerHTML = `
          
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <img src="${item.image}" alt="${
            item.name
          }" class="w-12 h-12 rounded-lg object-cover">
            <div class="flex-1 min-w-0">
                 <h4 class="font-semibold text-amber-900 text-sm sm:text-base truncate">${
                   item.name
                 }</h4>
                 <p class="text-amber-700 text-xs sm:text-sm">${formatPrice(
                   item.price
                 )} each</p>
            </div>
            <div class="flex items-center gap-2 sm:gap-3">
            <button class="quantity-btn text-sm" onclick="updateQuantity('${
              item.id
            }', ${item.quantity - 1})">-</button>
              <span class="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">${
                item.quantity
              }</span>
              <button class="quantity-btn text-sm" onclick="updateQuantity('${
                item.id
              }', ${item.quantity + 1})">+</button>
            </div>
             <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
              <p class="font-bold text-amber-900 text-sm sm:text-base">${formatPrice(
                itemTotal
              )}</p>
              <button onclick="removeFromCart('${
                item.id
              }')" class="text-red-600 hover:text-red-800 text-sm p-1">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
          container.appendChild(cartItemDiv);
        });

        totalElement.textContent = formatPrice(total);
      }

      function proceedToCheckout() {
        if (shoppingCart.length === 0) {
          showNotification("Your cart is empty!", "error");
          return;
        }

        document.getElementById("cart-modal").classList.add("hidden");
        document.getElementById("cart-modal").classList.remove("flex");

        // Populate checkout summary
        //   const checkoutItemsList = document.getElementById('checkout-items-list');
        //   const checkoutTotalAmount = document.getElementById('checkout-total-amount');

        //   let total = 0;
        //   checkoutItemsList.innerHTML = '';

        //   shoppingCart.forEach(item => {
        //     const itemTotal = item.price * item.quantity;
        //     total += itemTotal;

        //     const itemDiv = document.createElement('div');
        //     itemDiv.className = 'flex justify-between text-amber-800';
        //     itemDiv.innerHTML = `
        //       <span>${item.name} × ${item.quantity}</span>
        //       <span>${formatPrice(itemTotal)}</span>
        //     `;
        //     checkoutItemsList.appendChild(itemDiv);
        //   });

        //   checkoutTotalAmount.textContent = formatPrice(total);

        //   document.getElementById('checkout-modal').classList.remove('hidden');
        //   document.getElementById('checkout-modal').classList.add('flex');
        // }

        // function submitOrder() {
        //   const name = document.getElementById('checkout-name').value.trim();
        //   const phone = document.getElementById('checkout-phone').value.trim();
        //   const address = document.getElementById('checkout-address').value.trim();
        //   const notes = document.getElementById('checkout-notes').value.trim();

        //   if (!name || !phone || !address) {
        //     showNotification('Please fill in all required fields', 'error');
        //     return;
        //   }

        //   const order = {
        //     id: generateId(),
        //     customerName: name,
        //     customerPhone: phone,
        //     customerAddress: address,
        //     notes: notes,
        //     items: [...shoppingCart],
        //     total: shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        //     date: new Date().toISOString(),
        //     status: 'pending'
        //   };

        //   shopOrders.push(order);
        //   saveShopOrders();
        //   renderShopOrders();

        // Populate checkout summary

        const checkoutItemsList = document.getElementById(
          "checkout-items-list"
        );
        const checkoutTotalAmount = document.getElementById(
          "checkout-total-amount"
        );

        let total = 0;
        checkoutItemsList.innerHTML = "";

        shoppingCart.forEach((item) => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;

          const itemDiv = document.createElement("div");
          itemDiv.className =
            "flex justify-between text-amber-800 text-sm sm:text-base";
          itemDiv.innerHTML = `
          <span class="truncate pr-2">${item.name} × ${item.quantity}</span>
          <span class="font-semibold">${formatPrice(itemTotal)}</span>
        `;
          checkoutItemsList.appendChild(itemDiv);
        });

        checkoutTotalAmount.textContent = formatPrice(total);

        document.getElementById("checkout-modal").classList.remove("hidden");
        document.getElementById("checkout-modal").classList.add("flex");
      }

      // function submitOrder() {
      //   const name = document.getElementById("checkout-name").value.trim();
      //   const phone = document.getElementById("checkout-phone").value.trim();
      //   const governorate = document.getElementById(
      //     "checkout-governorate"
      //   ).value;
      //   const address = document
      //     .getElementById("checkout-address")
      //     .value.trim();
      //   const notes = document.getElementById("checkout-notes").value.trim();

      //   if (!name || !phone || !governorate) {
      //     showNotification("Please fill in all required fields", "error");
      //     return;
      //   }

      //   const order = {
      //     id: generateId(),
      //     customerName: name,
      //     customerPhone: phone,
      //     customerGovernorate: governorate,
      //     customerAddress: address,
      //     notes: notes,
      //     items: [...shoppingCart],
      //     total: shoppingCart.reduce(
      //       (sum, item) => sum + item.price * item.quantity,
      //       0
      //     ),
      //     date: new Date().toISOString(),
      //     status: "pending",
      //   };

      //   shopOrders.push(order);
      //   saveShopOrders();
      //   renderShopOrders();
      


     function submitOrder() {
        const name = document.getElementById("checkout-name").value.trim();
        const phone = document.getElementById("checkout-phone").value.trim();
        const address = document
          .getElementById("checkout-address")
          .value.trim();
        const notes = document.getElementById("checkout-notes").value.trim();

        if (!name || !phone || !address) {
          showNotification("Please fill in all required fields", "error");
          return;
        }

        const order = {
          id: generateId(),
          customerName: name,
          customerPhone: phone,
          customerAddress: address,
          notes: notes,
          items: [...shoppingCart],
          total: shoppingCart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          date: new Date().toISOString(),
          status: "pending",
        };

        shopOrders.push(order);
        saveShopOrders();
        renderShopOrders();

        // ------------------------------------------------------
        //   // Clear cart and close modal
        //   shoppingCart = [];
        //   saveShoppingCart();

        //   document.getElementById('checkout-modal').classList.add('hidden');
        //   document.getElementById('checkout-modal').classList.remove('flex');

        //   // Reset form
        //   document.getElementById('checkout-form').reset();

        //   showNotification('Your order has been placed successfully! We will contact you soon.');
        // }
        


//  ---------------------------------------------------------






        // Clear cart and close modal
        shoppingCart = [];
        saveShoppingCart();

        document.getElementById("checkout-modal").classList.add("hidden");
        document.getElementById("checkout-modal").classList.remove("flex");

        // Reset form
        document.getElementById("checkout-form").reset();

        showNotification(
          "Your order has been placed successfully! We will contact you soon."
        );
      }

      // ===== Shop Orders Functions =====
      function renderShopOrders() {
        const container = document.getElementById("shop-orders-container");
        const section = document.getElementById("shop-orders-section");

        if (shopOrders.length === 0) {
          section.classList.add("hidden");
          return;
        }

        section.classList.remove("hidden");
        container.innerHTML = "";

        shopOrders.forEach((order) => {
          const orderDiv = document.createElement("div");
          orderDiv.className =
            "bg-blue-700/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-600";

          const itemsList = order.items
            .map(
              (item) =>
                `${item.name} × ${item.quantity} (${formatPrice(
                  item.price * item.quantity
                )})`
            )
            .join(", ");

          orderDiv.innerHTML = `
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h4 class="font-bold text-white text-xl mb-2">${
                order.customerName
              }</h4>
              <p class="text-blue-200"><i class="fas fa-phone mr-2"></i>${
                order.customerPhone
              }</p>
              <p class="text-blue-200 text-sm"><i class="fas fa-map-marker-alt mr-2"></i>${
                order.customerAddress
              }</p>
              ${
                order.notes
                  ? `<p class="text-blue-300 text-sm mt-2"><i class="fas fa-sticky-note mr-2"></i>${order.notes}</p>`
                  : ""
              }
            </div>
            <div>
              <h5 class="font-semibold text-blue-200 mb-2">المنتجات:</h5>
              <p class="text-white text-sm">${itemsList}</p>
              <p class="text-blue-200 text-sm mt-2">${new Date(
                order.date
              ).toLocaleString()}</p>
            </div>
            <div class="flex flex-col gap-3">
              <div class="text-right">
                <p class="text-2xl font-bold text-white">${formatPrice(
                  order.total
                )}</p>
              </div>
              <div class="flex gap-3">
                <button onclick="confirmShopOrder('${
                  order.id
                }')" class="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                  تأكيد الطلب
                </button>
                <button onclick="cancelShopOrder('${
                  order.id
                }')" class="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        `;
          container.appendChild(orderDiv);
        });
      }

      function confirmShopOrder(orderId) {
        shopOrders = shopOrders.filter((order) => order.id !== orderId);
        saveShopOrders();
        renderShopOrders();
        showNotification("تم تأكيد طلب المتجر بنجاح");
      }

      function cancelShopOrder(orderId) {
        shopOrders = shopOrders.filter((order) => order.id !== orderId);
        saveShopOrders();
        renderShopOrders();
        showNotification("تم إلغاء طلب المتجر");
      }

      // ===== Product Modal Functions =====
      let currentProduct = null;

      function showProductModal(productData) {
        currentProduct = productData;
        document.getElementById("product-modal-image").src = productData.image;
        document.getElementById("product-modal-image").alt = productData.name;
        document.getElementById("product-modal-title").textContent =
          productData.name;
        document.getElementById("product-modal-price").textContent =
          productData.price + " IQD";
        document.getElementById("product-modal-description").textContent =
          productData.description;

        document.getElementById("product-modal").classList.remove("hidden");
        document.getElementById("product-modal").classList.add("flex");
      }

      function closeProductModal() {
        document.getElementById("product-modal").classList.add("hidden");
        document.getElementById("product-modal").classList.remove("flex");
        currentProduct = null;
      }

      function orderNow() {
        if (!currentCustomer) {
          showNotification("Please login first to place an order", "error");
          closeProductModal();
          document.getElementById("customer-modal").classList.remove("hidden");
          document.getElementById("customer-modal").classList.add("flex");
          return;
        }

        if (!currentProduct) return;

        // Create pending order
        const newOrder = {
          id: generateId(),
          customerId: currentCustomer.id,
          customerName: currentCustomer.name,
          product: currentProduct.name,
          price: currentProduct.priceNum,
          date: new Date().toISOString(),
          status: "pending",
        };

        pendingOrders.push(newOrder);
        savePendingOrders();
        renderPendingOrders();

        showNotification(
          `Order placed: ${currentProduct.name}. Awaiting staff confirmation.`
        );
        closeProductModal();
      }

      // ===== Pending Orders Functions =====
      function renderPendingOrders() {
        const container = document.getElementById("pending-orders-container");
        const section = document.getElementById("pending-orders-section");

        if (pendingOrders.length === 0) {
          section.classList.add("hidden");
          return;
        }

        section.classList.remove("hidden");
        container.innerHTML = "";

        pendingOrders.forEach((order) => {
          const orderDiv = document.createElement("div");
          orderDiv.className =
            "bg-red-700/50 backdrop-blur-sm p-6 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border border-red-600";
          orderDiv.innerHTML = `
          <div class="flex-1">
            <h4 class="font-bold text-white text-xl mb-2">${
              order.customerName
            }</h4>
            <p class="text-red-200 text-lg">${order.product} - ${formatPrice(
            order.price
          )}</p>
            <p class="text-red-300 text-sm">${new Date(
              order.date
            ).toLocaleString()}</p>
          </div>
          <div class="flex gap-3 w-full lg:w-auto">
            <button onclick="confirmOrder('${
              order.id
            }')" class="flex-1 lg:flex-none bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
              تأكيد الدفع
            </button>
            <button onclick="cancelOrder('${
              order.id
            }')" class="flex-1 lg:flex-none bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
              إلغاء
            </button>
          </div>
        `;
          container.appendChild(orderDiv);
        });
      }

      function confirmOrder(orderId) {
        const order = pendingOrders.find((o) => o.id === orderId);
        if (!order) return;

        const customer = customers.find((c) => c.id === order.customerId);
        if (!customer) return;

        let isFree = false;

        // Check if customer is eligible for free drink
        if (customer.loyaltyPoints >= STAMPS_FOR_FREE) {
          isFree = true;
          customer.loyaltyPoints = 0; // Reset stamps
          showNotification(
            "🎉 Complimentary beverage redeemed! Customer stamps reset."
          );
        } else {
          customer.loyaltyPoints += 1;
          showNotification(
            "Order confirmed and payment received. Loyalty stamp added!"
          );
        }

        const newOrder = {
          id: generateId(),
          product: order.product,
          price: order.price,
          date: order.date,
          isFree: isFree,
        };

        customer.orders.push(newOrder);

        // Remove from pending orders
        pendingOrders = pendingOrders.filter((o) => o.id !== orderId);

        saveCustomers();
        savePendingOrders();
        renderPendingOrders();
        updateBaristaCustomerDisplay();
        renderBaristaCustomersTable();

        // Update current customer display if it's the same customer
        if (currentCustomer && currentCustomer.id === customer.id) {
          currentCustomer = customer;
          updateCustomerDisplay();
        }
      }

      function cancelOrder(orderId) {
        pendingOrders = pendingOrders.filter((o) => o.id !== orderId);
        savePendingOrders();
        renderPendingOrders();
        showNotification("Order cancelled");
      }

      // ===== Customer Functions =====
      function findOrCreateCustomer(identifier) {
        // Try to find existing customer by name or phone
        let customer = customers.find(
          (c) =>
            c.name.toLowerCase() === identifier.toLowerCase() ||
            c.phone === identifier
        );

        if (!customer) {
          // Create new customer
          customer = {
            id: generateId(),
            name: identifier,
            phone: identifier.match(/^\d+$/) ? identifier : "",
            orders: [],
            loyaltyPoints: 0,
          };
          customers.push(customer);
          saveCustomers();
          showNotification(
            `Welcome to Café Elegance, ${customer.name}! You've joined our Elite Rewards program.`
          );
        } else {
          showNotification(`Welcome back to Café Elegance, ${customer.name}!`);
        }

        return customer;
      }

      function updateCustomerDisplay() {
        if (!currentCustomer) return;

        const nameDisplays = [
          document.getElementById("customer-name-display"),
          document.getElementById("mobile-customer-name-display"),
        ];

        const stampsDisplays = [
          document.getElementById("customer-stamps-display"),
          document.getElementById("mobile-customer-stamps-display"),
        ];

        const customerStatus = [
          document.getElementById("customer-status"),
          document.getElementById("mobile-customer-status"),
        ];

        nameDisplays.forEach((display) => {
          if (display) display.textContent = currentCustomer.name;
        });

        stampsDisplays.forEach((display) => {
          if (display) {
            display.innerHTML = "";
            for (let i = 1; i <= STAMPS_FOR_FREE; i++) {
              const stamp = document.createElement("div");
              stamp.className = `w-6 h-6 sm:w-7 sm:h-7 border-2 border-amber-600 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                currentCustomer.loyaltyPoints >= i
                  ? "bg-amber-600 text-white scale-110"
                  : "bg-transparent text-amber-600"
              }`;
              stamp.textContent = i;
              display.appendChild(stamp);
            }
          }
        });

        customerStatus.forEach((status) => {
          if (status) status.classList.remove("hidden");
        });

        // Update dashboard if open
        updateCustomerDashboard();
      }

      function updateCustomerDashboard() {
        if (!currentCustomer) return;

        document.getElementById("dashboard-customer-name").textContent =
          currentCustomer.name;
        document.getElementById(
          "dashboard-loyalty-counter"
        ).textContent = `${currentCustomer.loyaltyPoints}/${STAMPS_FOR_FREE}`;

        const progress =
          (currentCustomer.loyaltyPoints / STAMPS_FOR_FREE) * 100;
        document.getElementById(
          "dashboard-loyalty-progress"
        ).style.width = `${Math.min(progress, 100)}%`;

        // Render stamps grid
        const stampsGrid = document.getElementById("dashboard-stamps-grid");
        stampsGrid.innerHTML = "";
        for (let i = 1; i <= STAMPS_FOR_FREE; i++) {
          const stamp = document.createElement("div");
          stamp.className = `stamp-circle ${
            currentCustomer.loyaltyPoints >= i ? "filled" : ""
          }`;
          stamp.textContent = i;
          stampsGrid.appendChild(stamp);
        }

        // Render order history
        const orderHistory = document.getElementById("dashboard-order-history");
        orderHistory.innerHTML = "";

        const recentOrders = currentCustomer.orders.slice(-10).reverse();
        recentOrders.forEach((order) => {
          const orderDiv = document.createElement("div");
          orderDiv.className =
            "bg-white/80 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center shadow-md";
          orderDiv.innerHTML = `
          <div>
            <div class="font-semibold text-amber-900 text-lg">${
              order.product
            }</div>
            <div class="text-sm text-amber-700">${new Date(
              order.date
            ).toLocaleDateString()}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-lg ${
              order.isFree ? "text-emerald-600" : "text-amber-900"
            }">
              ${order.isFree ? "COMPLIMENTARY" : formatPrice(order.price)}
            </div>
            ${
              order.isFree
                ? '<span class="text-xs text-emerald-600">🎉 Elite Reward</span>'
                : ""
            }
          </div>
        `;
          orderHistory.appendChild(orderDiv);
        });
      }

      function customerLogout() {
        currentCustomer = null;
        document.getElementById("customer-status").classList.add("hidden");
        document
          .getElementById("mobile-customer-status")
          .classList.add("hidden");
        document.getElementById("customer-dashboard").classList.add("hidden");
        showNotification("Successfully logged out");
      }

      // ===== Barista Functions =====
      function searchCustomer() {
        const searchTerm = document
          .getElementById("search-customer")
          .value.trim()
          .toLowerCase();
        if (!searchTerm) {
          showNotification("Please enter a search term", "error");
          return;
        }

        const found = customers.filter(
          (c) =>
            c.name.toLowerCase().includes(searchTerm) ||
            c.phone.includes(searchTerm)
        );

        if (found.length === 0) {
          showNotification("Customer not found", "error");
          document
            .getElementById("barista-customer-details")
            .classList.add("hidden");
          return;
        }

        if (found.length === 1) {
          selectBaristaCustomer(found[0].id);
        } else {
          renderBaristaCustomersTable(found);
          showNotification(`Found ${found.length} customers`);
        }
      }

      function selectBaristaCustomer(customerId) {
        selectedBaristaCustomer = customers.find((c) => c.id === customerId);
        if (!selectedBaristaCustomer) return;

        document
          .getElementById("barista-customer-details")
          .classList.remove("hidden");
        updateBaristaCustomerDisplay();
      }

      function updateBaristaCustomerDisplay() {
        if (!selectedBaristaCustomer) return;

        document.getElementById("barista-customer-info").textContent = `${
          selectedBaristaCustomer.name
        } - ${selectedBaristaCustomer.phone || "No phone"}`;

        document.getElementById(
          "barista-loyalty-counter"
        ).textContent = `${selectedBaristaCustomer.loyaltyPoints}/${STAMPS_FOR_FREE}`;

        const progress =
          (selectedBaristaCustomer.loyaltyPoints / STAMPS_FOR_FREE) * 100;
        document.getElementById(
          "barista-loyalty-progress"
        ).style.width = `${Math.min(progress, 100)}%`;

        // Update loyalty status
        const loyaltyStatus = document.getElementById("barista-loyalty-status");
        if (selectedBaristaCustomer.loyaltyPoints >= STAMPS_FOR_FREE) {
          loyaltyStatus.textContent = "مؤهل للمشروب المجاني!";
          loyaltyStatus.className =
            "px-6 py-3 rounded-full text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg float-gently";
        } else {
          loyaltyStatus.textContent = `يحتاج ${
            STAMPS_FOR_FREE - selectedBaristaCustomer.loyaltyPoints
          } أختام أكثر`;
          loyaltyStatus.className =
            "px-6 py-3 rounded-full text-lg font-bold bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg";
        }

        // Render order history
        const orderHistory = document.getElementById("barista-order-history");
        orderHistory.innerHTML = "";

        const recentOrders = selectedBaristaCustomer.orders
          .slice(-10)
          .reverse();
        recentOrders.forEach((order) => {
          const orderDiv = document.createElement("div");
          orderDiv.className =
            "bg-emerald-700/50 backdrop-blur-sm p-4 rounded-xl border border-emerald-600";
          orderDiv.innerHTML = `
          <div class="font-semibold text-white text-lg mb-1">${
            order.product
          }</div>
          <div class="text-sm text-emerald-200">${new Date(
            order.date
          ).toLocaleDateString()}</div>
          <div class="text-lg font-bold ${
            order.isFree ? "text-green-400" : "text-emerald-200"
          }">
            ${order.isFree ? "COMPLIMENTARY" : formatPrice(order.price)}
          </div>
        `;
          orderHistory.appendChild(orderDiv);
        });

        // Populate edit form with current data
        document.getElementById("edit-customer-name").value =
          selectedBaristaCustomer.name;
        document.getElementById("edit-customer-phone").value =
          selectedBaristaCustomer.phone || "";
      }

      function addNewCustomer() {
        const name = document.getElementById("new-customer-name").value.trim();
        const phone = document
          .getElementById("new-customer-phone")
          .value.trim();

        if (!name) {
          showNotification("Please enter customer name", "error");
          return;
        }

        if (
          customers.some((c) => c.name.toLowerCase() === name.toLowerCase())
        ) {
          showNotification("Customer already exists", "error");
          return;
        }

        const newCustomer = {
          id: generateId(),
          name: name,
          phone: phone || "",
          orders: [],
          loyaltyPoints: 0,
        };

        customers.push(newCustomer);
        saveCustomers();
        showNotification("Customer added successfully");

        document.getElementById("new-customer-name").value = "";
        document.getElementById("new-customer-phone").value = "";

        renderBaristaCustomersTable();
      }

      function addCustomerOrder() {
        if (!selectedBaristaCustomer) {
          showNotification("Please select a customer first", "error");
          return;
        }

        const productSelect = document.getElementById("barista-product-select");
        const selectedValue = productSelect.value;

        if (!selectedValue) {
          showNotification("Please select a product", "error");
          return;
        }

        let productName, price;

        if (selectedValue === "custom") {
          // Handle custom product
          const customName = document
            .getElementById("custom-product-name")
            .value.trim();
          const customPrice = parseInt(
            document.getElementById("custom-product-price").value
          );

          if (!customName || !customPrice || customPrice <= 0) {
            showNotification(
              "Please enter valid custom product details",
              "error"
            );
            return;
          }

          productName = customName;
          price = customPrice;

          // Save custom product for future use
          const existingCustomProduct = customProducts.find(
            (p) => p.name === customName
          );
          if (!existingCustomProduct) {
            customProducts.push({ name: customName, price: customPrice });
            saveCustomProducts();
            updateProductSelect();
          }

          // Clear custom fields
          document.getElementById("custom-product-name").value = "";
          document.getElementById("custom-product-price").value = "";
        } else {
          [productName, priceStr] = selectedValue.split(",");
          price = parseInt(priceStr);
        }

        let isFree = false;

        // Check if customer is eligible for free drink
        if (selectedBaristaCustomer.loyaltyPoints >= STAMPS_FOR_FREE) {
          isFree = true;
          selectedBaristaCustomer.loyaltyPoints = 0; // Reset stamps
          showNotification(
            "🎉 Complimentary beverage redeemed! Customer stamps reset."
          );
        } else {
          selectedBaristaCustomer.loyaltyPoints += 1;
          showNotification(
            "Order added and payment confirmed. Loyalty stamp added!"
          );
        }

        const newOrder = {
          id: generateId(),
          product: productName,
          price: price,
          date: new Date().toISOString(),
          isFree: isFree,
        };

        selectedBaristaCustomer.orders.push(newOrder);
        saveCustomers();

        productSelect.value = "";
        document
          .getElementById("custom-product-fields")
          .classList.add("hidden");
        updateBaristaCustomerDisplay();
        renderBaristaCustomersTable();

        // Update current customer display if it's the same customer
        if (
          currentCustomer &&
          currentCustomer.id === selectedBaristaCustomer.id
        ) {
          currentCustomer = selectedBaristaCustomer;
          updateCustomerDisplay();
        }
      }

      // Customer editing functions
      function editCustomer() {
        document
          .getElementById("edit-customer-form")
          .classList.remove("hidden");
        document.getElementById("edit-customer-btn").style.display = "none";
      }

      function saveCustomerChanges() {
        const newName = document
          .getElementById("edit-customer-name")
          .value.trim();
        const newPhone = document
          .getElementById("edit-customer-phone")
          .value.trim();

        if (!newName) {
          showNotification("Name cannot be empty", "error");
          return;
        }

        // Check if name already exists (excluding current customer)
        const existingCustomer = customers.find(
          (c) =>
            c.id !== selectedBaristaCustomer.id &&
            c.name.toLowerCase() === newName.toLowerCase()
        );
        if (existingCustomer) {
          showNotification("Customer name already exists", "error");
          return;
        }

        selectedBaristaCustomer.name = newName;
        selectedBaristaCustomer.phone = newPhone;

        saveCustomers();
        showNotification("Customer information updated successfully");

        cancelCustomerEdit();
        updateBaristaCustomerDisplay();
        renderBaristaCustomersTable();

        // Update current customer display if it's the same customer
        if (
          currentCustomer &&
          currentCustomer.id === selectedBaristaCustomer.id
        ) {
          currentCustomer = selectedBaristaCustomer;
          updateCustomerDisplay();
        }
      }

      function cancelCustomerEdit() {
        document.getElementById("edit-customer-form").classList.add("hidden");
        document.getElementById("edit-customer-btn").style.display =
          "inline-block";
        // Reset form values
        document.getElementById("edit-customer-name").value =
          selectedBaristaCustomer.name;
        document.getElementById("edit-customer-phone").value =
          selectedBaristaCustomer.phone || "";
      }

      function renderBaristaCustomersTable(customerList = null) {
        const tbody = document.getElementById("barista-customers-table");
        const customersToShow = customerList || customers;

        tbody.innerHTML = "";

        customersToShow.forEach((customer) => {
          const row = document.createElement("tr");
          row.className =
            "hover:bg-emerald-700/30 transition-all duration-300 border-b border-emerald-700/50";
          row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-lg text-white font-medium">${
            customer.name
          }</td>
          <td class="px-6 py-4 whitespace-nowrap text-lg text-emerald-200">${
            customer.phone || "-"
          }</td>
          <td class="px-6 py-4 whitespace-nowrap text-lg text-emerald-200">${
            customer.orders.length
          }</td>
          <td class="px-6 py-4 whitespace-nowrap text-lg text-emerald-200">
            <div class="flex items-center gap-3">
              <span>${customer.loyaltyPoints}/${STAMPS_FOR_FREE}</span>
              ${
                customer.loyaltyPoints >= STAMPS_FOR_FREE
                  ? '<span class="text-green-400 text-xl">🎉</span>'
                  : ""
              }
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-lg font-medium">
            <button onclick="selectBaristaCustomer('${customer.id}')" 
                    class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg">
              تحديد
            </button>
          </td>
        `;
          tbody.appendChild(row);
        });
      }






      // ===== EmailJS Contact Form Functions =====
      function showEmailJSStatus(message, type) {
        const statusDiv = document.getElementById('emailjs-status');
        statusDiv.textContent = message;
        statusDiv.className = `emailjs-status emailjs-${type}`;
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
          statusDiv.style.display = 'none';
        }, 5000);
      }

      function initializeContactForm() {
        console.log('🔧 Initializing EmailJS...');
        
        // ⚠️ IMPORTANT: Replace these with your actual EmailJS credentials
        const EMAIL_CONFIG = {
          publicKey: 'bBvH3gDiVxfI-87ZG',        // Replace with your Public Key
          serviceId: 'service_vl1koee',        // Replace with your Service ID  
          templateId: 'template_5hg93ll'       // Replace with your Template ID
        };

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
          console.error('❌ EmailJS library not loaded');
          showEmailJSStatus('EmailJS library failed to load', 'error');
          return;
        }

        try {
          // Initialize EmailJS with your public key
          emailjs.init(EMAIL_CONFIG.publicKey);
          console.log('✅ EmailJS initialized successfully');
          showEmailJSStatus('Email service ready', 'success');
        } catch (error) {
          console.error('❌ EmailJS initialization failed:', error);
          showEmailJSStatus('Failed to initialize email service', 'error');
          return;
        }

        // Star rating functionality
        const stars = document.querySelectorAll(".star");
        const ratingInput = document.getElementById("contact-rating");
        let currentRating = 0;

        stars.forEach((star, index) => {
          star.addEventListener("click", () => {
            currentRating = index + 1;
            ratingInput.value = currentRating;
            updateStars();
          });

          star.addEventListener("mouseover", () => {
            const hoverRating = index + 1;
            stars.forEach((s, i) => {
              s.classList.toggle("active", i < hoverRating);
            });
          });
        });

        document.querySelector(".star-rating").addEventListener("mouseleave", updateStars);

        function updateStars() {
          stars.forEach((star, index) => {
            star.classList.toggle("active", index < currentRating);
          });
        }

        // Form submission handler
        document.getElementById("contact-form").addEventListener("submit", async (e) => {
          e.preventDefault();
          
          const submitBtn = document.getElementById("contact-submit-btn");
          const originalText = submitBtn.innerHTML;

          // Validate rating
          if (!ratingInput.value) {
            showNotification("Please select a rating", "error");
            return;
          }

          // Check if EmailJS is properly configured
          if (!EMAIL_CONFIG.publicKey || EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
            console.error('❌ EmailJS not configured properly');
            showNotification("Email service not configured. Please contact support.", "error");
            showEmailJSStatus('EmailJS credentials not configured', 'error');
            return;
          }

          // Show loading state
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
          submitBtn.disabled = true;
          showEmailJSStatus('Sending your message...', 'loading');

          try {
            console.log('📧 Attempting to send email...');
            
            // Send email using EmailJS
            const result = await emailjs.sendForm(
              EMAIL_CONFIG.serviceId,
              EMAIL_CONFIG.templateId,
              "#contact-form"
            );

            console.log('✅ Email sent successfully:', result);
            showNotification("Thank you for your valuable feedback! Your message has been sent successfully.");
            showEmailJSStatus('Message sent successfully!', 'success');

            // Reset form
            document.getElementById("contact-form").reset();
            ratingInput.value = "";
            currentRating = 0;
            updateStars();

          } catch (error) {
            console.error("❌ EmailJS Error Details:", error);
            
            let errorMessage = "Sorry, there was an error sending your message. ";
            
            if (error.status === 400) {
              errorMessage += "Invalid request. Please check your form data.";
            } else if (error.status === 401) {
              errorMessage += "Authentication failed. Service may be misconfigured.";
            } else if (error.status === 404) {
              errorMessage += "Service or template not found. Please contact support.";
            } else if (error.status === 412) {
              errorMessage += "Request blocked. Please try again later.";
            } else {
              errorMessage += "Please try again later or contact support directly.";
            }

            showNotification(errorMessage, "error");
            showEmailJSStatus(`Error: ${error.text || error.message || 'Unknown error'}`, 'error');

          } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }
        });

        console.log('📝 Contact form initialized with EmailJS');
      }


      // ===== Video Background Functions =====
      function initializeVideoBackground() {
        const video = document.getElementById("hero-video");

        if (video) {
          // Set video properties for better autoplay
          video.muted = true;
          video.playsInline = true;
          video.autoplay = true;
          video.loop = true;
          video.defaultMuted = true;
          video.volume = 0;

          // Multiple attempts to play video
          const playVideo = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log("Video is playing successfully");
                  video.style.opacity = "1";
                })
                .catch((error) => {
                  console.log("Video autoplay failed:", error);
                  // Show fallback image
                  video.style.display = "none";
                });
            }
          };

          // Event listeners for video loading
          video.addEventListener("loadeddata", () => {
            console.log("Video data loaded");
            playVideo();
          });

          video.addEventListener("canplaythrough", () => {
            console.log("Video can play through");
            playVideo();
          });

          // Handle video errors and switch sources
          video.addEventListener("error", (e) => {
            console.log("Video error:", e);
            const sources = video.querySelectorAll("source");
            const currentSrc = video.currentSrc;

            // Try next source
            for (let i = 0; i < sources.length; i++) {
              if (sources[i].src === currentSrc && i < sources.length - 1) {
                video.src = sources[i + 1].src;
                video.load();
                return;
              }
            }
          });

          // Ensure continuous loop
          video.addEventListener("ended", () => {
            video.currentTime = 0;
            video.play();
          });

          // Force immediate load and play
          video.load();

          // Try playing immediately
          setTimeout(() => {
            playVideo();
          }, 500);

          // User interaction fallback
          const userInteractionHandler = () => {
            if (video.paused) {
              playVideo();
            }
            document.removeEventListener("click", userInteractionHandler);
            document.removeEventListener("touchstart", userInteractionHandler);
          };

          document.addEventListener("click", userInteractionHandler);
          document.addEventListener("touchstart", userInteractionHandler);
        }
      }

      // ===== Event Listeners Setup =====
      function setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        let isMenuOpen = false;

        mobileMenuBtn.addEventListener("click", () => {
          isMenuOpen = !isMenuOpen;
          const spans = mobileMenuBtn.querySelectorAll("span");

          if (isMenuOpen) {
            mobileMenu.style.maxHeight = "500px";
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
          } else {
            mobileMenu.style.maxHeight = "0";
            spans.forEach((span) => {
              span.style.transform = "none";
              span.style.opacity = "1";
            });
          }
        });

        // Product modal events
        document.querySelectorAll("[data-product]").forEach((item) => {
          item.addEventListener("click", (e) => {
            const productData = JSON.parse(e.currentTarget.dataset.product);
            showProductModal(productData);
          });
        });

        document
          .getElementById("product-modal-close")
          .addEventListener("click", closeProductModal);
        document
          .getElementById("order-now-btn")
          .addEventListener("click", orderNow);

        // Shopping cart events
        document
          .getElementById("checkout-btn")
          .addEventListener("click", proceedToCheckout);
        document
          .getElementById("cart-modal-close")
          .addEventListener("click", () => {
            document.getElementById("cart-modal").classList.add("hidden");
            document.getElementById("cart-modal").classList.remove("flex");
          });

        // Checkout events
        document
          .getElementById("checkout-form")
          .addEventListener("submit", (e) => {
            e.preventDefault();
            submitOrder();
          });
        document
          .getElementById("checkout-modal-close")
          .addEventListener("click", () => {
            document.getElementById("checkout-modal").classList.add("hidden");
            document.getElementById("checkout-modal").classList.remove("flex");
          });

        // Customer login buttons
        document
          .getElementById("customer-login-btn")
          .addEventListener("click", () => {
            document
              .getElementById("customer-modal")
              .classList.remove("hidden");
            document.getElementById("customer-modal").classList.add("flex");
          });

        document
          .getElementById("mobile-customer-login-btn")
          .addEventListener("click", () => {
            document
              .getElementById("customer-modal")
              .classList.remove("hidden");
            document.getElementById("customer-modal").classList.add("flex");
            if (isMenuOpen) mobileMenuBtn.click();
          });

        document
          .getElementById("hero-loyalty-btn")
          .addEventListener("click", () => {
            document
              .getElementById("customer-modal")
              .classList.remove("hidden");
            document.getElementById("customer-modal").classList.add("flex");
          });

        // Customer login submit
        document
          .getElementById("customer-login-submit")
          .addEventListener("click", () => {
            const identifier = document
              .getElementById("customer-identifier")
              .value.trim();
            if (!identifier) {
              showNotification(
                "Please enter your name or phone number",
                "error"
              );
              return;
            }

            currentCustomer = findOrCreateCustomer(identifier);
            updateCustomerDisplay();

            document.getElementById("customer-modal").classList.add("hidden");
            document.getElementById("customer-modal").classList.remove("flex");
            document.getElementById("customer-identifier").value = "";
          });

        // Customer modal close
        document
          .getElementById("customer-modal-close")
          .addEventListener("click", () => {
            document.getElementById("customer-modal").classList.add("hidden");
            document.getElementById("customer-modal").classList.remove("flex");
          });

        // Customer dashboard
        document
          .getElementById("customer-name-display")
          .addEventListener("click", () => {
            if (currentCustomer) {
              document
                .getElementById("customer-dashboard")
                .classList.remove("hidden");
              document
                .getElementById("customer-dashboard")
                .classList.add("flex");
              updateCustomerDashboard();
            }
          });

        document
          .getElementById("mobile-customer-name-display")
          .addEventListener("click", () => {
            if (currentCustomer) {
              document
                .getElementById("customer-dashboard")
                .classList.remove("hidden");
              document
                .getElementById("customer-dashboard")
                .classList.add("flex");
              updateCustomerDashboard();
            }
          });

        document
          .getElementById("customer-dashboard-close")
          .addEventListener("click", () => {
            document
              .getElementById("customer-dashboard")
              .classList.add("hidden");
            document
              .getElementById("customer-dashboard")
              .classList.remove("flex");
          });

        // Customer logout
        document
          .getElementById("logout-customer-btn")
          .addEventListener("click", customerLogout);
        document
          .getElementById("mobile-logout-customer-btn")
          .addEventListener("click", customerLogout);

        // Barista access buttons
        document
          .getElementById("barista-access-btn")
          .addEventListener("click", () => {
            document.getElementById("barista-modal").classList.remove("hidden");
            document.getElementById("barista-modal").classList.add("flex");
          });

        document
          .getElementById("mobile-barista-access-btn")
          .addEventListener("click", () => {
            document.getElementById("barista-modal").classList.remove("hidden");
            document.getElementById("barista-modal").classList.add("flex");
            if (isMenuOpen) mobileMenuBtn.click();
          });

        // Barista login
        document
          .getElementById("barista-login-submit")
          .addEventListener("click", () => {
            const pin = document.getElementById("barista-pin").value;
            if (pin === DEFAULT_BARISTA_PIN) {
              document.getElementById("barista-modal").classList.add("hidden");
              document.getElementById("barista-modal").classList.remove("flex");
              document
                .getElementById("barista-dashboard")
                .classList.remove("hidden");
              document.getElementById("barista-pin").value = "";
              document.getElementById("barista-error").classList.add("hidden");
              renderBaristaCustomersTable();
              renderPendingOrders();
              renderShopOrders();
            } else {
              document
                .getElementById("barista-error")
                .classList.remove("hidden");
              document.getElementById("barista-pin").value = "";
            }
          });

        // Barista modal close
        document
          .getElementById("barista-modal-close")
          .addEventListener("click", () => {
            document.getElementById("barista-modal").classList.add("hidden");
            document.getElementById("barista-modal").classList.remove("flex");
            document.getElementById("barista-pin").value = "";
            document.getElementById("barista-error").classList.add("hidden");
          });

        // Barista logout
        document
          .getElementById("barista-logout-btn")
          .addEventListener("click", () => {
            document
              .getElementById("barista-dashboard")
              .classList.add("hidden");
            selectedBaristaCustomer = null;
            document
              .getElementById("barista-customer-details")
              .classList.add("hidden");
          });

        // Customer edit functionality
        document
          .getElementById("edit-customer-btn")
          .addEventListener("click", editCustomer);

        // Product select change handler
        document
          .getElementById("barista-product-select")
          .addEventListener("change", (e) => {
            const customFields = document.getElementById(
              "custom-product-fields"
            );
            if (e.target.value === "custom") {
              customFields.classList.remove("hidden");
            } else {
              customFields.classList.add("hidden");
            }
          });

        // Enter key support
        document
          .getElementById("barista-pin")
          .addEventListener("keypress", (e) => {
            if (e.key === "Enter")
              document.getElementById("barista-login-submit").click();
          });

        document
          .getElementById("customer-identifier")
          .addEventListener("keypress", (e) => {
            if (e.key === "Enter")
              document.getElementById("customer-login-submit").click();
          });

        document
          .getElementById("search-customer")
          .addEventListener("keypress", (e) => {
            if (e.key === "Enter") searchCustomer();
          });

        // Menu filter functionality
        const filterButtons = document.querySelectorAll(".filter-btn");
        const menuItems = document.querySelectorAll(".menu-item");

        filterButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            // Update active button
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter items with stagger animation
            menuItems.forEach((item, index) => {
              const itemCategory = item.getAttribute("data-category");
              if (category === "all" || itemCategory === category) {
                setTimeout(() => {
                  item.style.display = "block";
                  item.classList.add("fade-in-up");
                }, index * 100);
              } else {
                item.style.display = "none";
                item.classList.remove("fade-in-up");
              }
            });
          });
        });

        // Shop filter functionality
        const shopFilterButtons = document.querySelectorAll(".shop-filter-btn");
        const shopItems = document.querySelectorAll(".shop-item");

        shopFilterButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const category = button.getAttribute("data-shop-category");

            // Update active button
            shopFilterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter items with stagger animation
            shopItems.forEach((item, index) => {
              const itemCategory = item.getAttribute("data-shop-category");
              if (category === "all" || itemCategory === category) {
                setTimeout(() => {
                  item.style.display = "block";
                  item.classList.add("fade-in-up");
                }, index * 100);
              } else {
                item.style.display = "none";
                item.classList.remove("fade-in-up");
              }
            });
          });
        });

        // Navbar scroll effect
        const navbar = document.getElementById("navbar");
        window.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            navbar.classList.add("navbar-scrolled");
          } else {
            navbar.classList.remove("navbar-scrolled");
          }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              // Close mobile menu if open
              if (isMenuOpen) {
                mobileMenuBtn.click();
              }
            }
          });
        });

        // Add scroll animations
        const observerOptions = {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in-up");
            }
          });
        }, observerOptions);

        // Observe all menu items and sections
        document
          .querySelectorAll(".menu-item, .shop-item, .fade-in-up")
          .forEach((el) => {
            observer.observe(el);
          });
      }

      // ===== Global Functions for Barista Dashboard =====
      window.searchCustomer = searchCustomer;
      window.selectBaristaCustomer = selectBaristaCustomer;
      window.addNewCustomer = addNewCustomer;
      window.addCustomerOrder = addCustomerOrder;
      window.confirmOrder = confirmOrder;
      window.cancelOrder = cancelOrder;
      window.confirmShopOrder = confirmShopOrder;
      window.cancelShopOrder = cancelShopOrder;
      window.saveCustomerChanges = saveCustomerChanges;
      window.cancelCustomerEdit = cancelCustomerEdit;
      window.addToCart = addToCart;
      window.removeFromCart = removeFromCart;
      window.updateQuantity = updateQuantity;
      window.toggleCart = toggleCart;

      // ===== Initialization =====
      function initializeApp() {
        loadCustomers();
        loadPendingOrders();
        loadShopOrders();
        loadCustomProducts();
        loadShoppingCart();
        setupEventListeners();
        initializeContactForm();
        initializeVideoBackground();
        renderBaristaCustomersTable();

        // Add loading complete indicator
        setTimeout(() => {
          document.body.classList.add("loaded");
        }, 500);
      }

      // Start the app when DOM is loaded
      document.addEventListener("DOMContentLoaded", initializeApp);
 

      window.onload = function () {
        var d = document.createElement("div");
        d.id = "aionspaceLoadFinished";
        document.body.appendChild(d);
      };   