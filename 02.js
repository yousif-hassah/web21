 // ===== Initialize Supabase =====
      console.log('🚀 بدء تهيئة Supabase...');
      const SUPABASE_URL = 'https://ldmykzeqqjuwcusiwqwe.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkbXlremVxcWp1d2N1c2l3cXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTQ0MTEsImV4cCI6MjA3NDg5MDQxMX0.8YUZQSDi_y6OVJk-6bwOxugFM0fI4RBGV5nCqY8hDv8';

      const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ تم تهيئة Supabase بنجاح');

      // ===== Global Variables =====
      let currentCustomer = null;
      let selectedBaristaCustomer = null;
      let customers = [];
      let pendingOrders = [];
      let shopOrders = [];
      let customProducts = [];
      let shoppingCart = [];
      let menuItems = [];
      let shopItems = [];
      
      const STAMPS_FOR_FREE = 6;
      const DEFAULT_BARISTA_PIN = "1234";

      // Menu items data - will be loaded from database or predefined
      const DEFAULT_MENU_ITEMS = [

  {

    //HOT CHOCOLATE

    id: 1,
    name: "ORIGINAL HOT CHOCOLATE",
    price: "4000",
    priceNum: 4000,
    image: "/image/40.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT CHOCOLATE",
  },
  {
    id: 2,
    name: "HOT CHOCOLATE CINNAMON",
    price: "5000",
    priceNum: 5000,
    image: "/image/hot choocolate cinnamon.jpg",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT CHOCOLATE",
  },
  {
    id: 3,
    name: "SNOWFLAKE HOT CHOCOLATE",
    price: "4500",
    priceNum: 4500,
    image: "/image/20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT CHOCOLATE",
  },
  {
    id: 4,
    name: "MARSHMALLOW HOT CHOCOLATE",
    price: "5000",
    priceNum: 5000,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT CHOCOLATE",
  },


//HOT COFFEE



  {
    id: 5,
    name: "ESPRESSO",
    price: "2500",
    priceNum: 2500,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 6,
    name: "DOUBLE ESPRESSO",
    price: "3500",
    priceNum: 3500,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 7,
    name: "TURKISH",
    price: "2500",
    priceNum: 2500,
    image: "/image/hot-coffee-turkish-.jpg",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 8,
    name: "CARAMEL MACCHIATO",
    price: "5000",
    priceNum: 5000,
    image: "/image/hot coffee latte.jpg",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 9,
    name: "CORTADO",
    price: "4000",
    priceNum: 4000,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 10,
    name: "AMERICANO",
    price: "4000",
    priceNum: 4000,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 11,
    name: "FLAT WHITE",
    price: "4000",
    priceNum: 4000,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 12,
    name: "LATTE",
    price: "4500",
    priceNum: 4500,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 13,
    name: "CAPPUCCINO",
    price: "4500",
    priceNum: 4500,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 14,
    name: "SPANISH LATTE",
    price: "5000",
    priceNum: 5000,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 15,
    name: "WHITE MOCHA",
    price: "5500",
    priceNum: 5500,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },
  {
    id: 16,
    name: "DARK MOCHA",
    price: "5500",
    priceNum: 5500,
    image: "20.JPG",
    description: "Velvety steamed milk artfully combined with premium espresso for perfect harmony.",
    category: "HOT COFFEE",
  },



    // ICED BLEND
  {
    id: 17,
    name: "VANILLA",
    price: "5000",
    priceNum: 5000,
    image: "/image/iced-blend-vanilla.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED BLEND",
  },
  {
    id: 18,
    name: "OREO",
    price: "5000",
    priceNum: 5000,
    image: "/image/iced-blend-oreo.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED BLEND",
  },
  {
    id: 19,
    name: "CHOCOLATE",
    price: "5000",
    priceNum: 5000,
    image: "/image/iced-blend-chocolate.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED BLEND",
  },
  {
    id: 20,
    name: "PISTACHIO",
    price: "6000",
    priceNum: 6000,
    image: "/image/iced-blend-pistachio.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED BLEND",
  },
  {
    id: 21,
    name: "LOTUS",
    price: "5000",
    priceNum: 5000,
    image: "/image/iced-blend-lotus.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED BLEND",
  },
  {
    id: 22,
    name: "STRAWBERRY",
    price: "5000",
    priceNum: 5000,
    image: "/image/Iced-blend-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED BLEND",
  },

  // ICED COFFEE
  {
    id: 23,
    name: "AFFOGATO",
    price: "4500",
    priceNum: 4500,
    image: "/image/Iced-blend-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED COFFEE",
  },
  {
    id: 24,
    name: "ICED AMERICANO",
    price: "4500",
    priceNum: 4500,
    image: "/image/ice-Americano-.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED COFFEE",
  },
  {
    id: 25,
    name: "ICED LATTE",
    price: "5000",
    priceNum: 5000,
    image: "/image/Iced-blend-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED COFFEE",
  },
  {
    id: 26,
    name: "ICED SPANISH LATTE",
    price: "5000",
    priceNum: 5000,
    image: "/image/Iced-blend-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED COFFEE",
  },
  {
    id: 27,
    name: "ICED MOCHA",
    price: "6000",
    priceNum: 6000,
    image: "/image/Iced-blend-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED COFFEE",
  },
  {
    id: 28,
    name: "ICED SHAKEN",
    price: "6000",
    priceNum: 6000,
    image: "/image/Iced-blend-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED COFFEE",
  },
  {
    id: 29,
    name: "ICED CARAMEL MACCHIATO",
    price: "6000",
    priceNum: 6000,
    image: "/image/Iced-blend-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICED COFFEE",
  },

  // SMOOTHE
  {
    id: 30,
    name: "STRAWBERRY",
    price: "5000",
    priceNum: 5000,
    image: "/image/smoothe-strawberry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SMOOTHE",
  },
  {
    id: 31,
    name: "BLUE BERRY",
    price: "5000",
    priceNum: 5000,
    image: "/image/smoothe-blue-berry.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SMOOTHE",
  },
  {
    id: 32,
    name: "TORPICAL FRUITS",
    price: "6000",
    priceNum: 6000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SMOOTHE",
  },

  // ICE DRINKS
  {
    id: 33,
    name: "LEMON MINT BREEZE",
    price: "5000",
    priceNum: 5000,
    image: "/image/ice-drinks---lemon-mint-breeze.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICE DRINKS",
  },
  {
    id: 34,
    name: "FILP BLUE",
    price: "5000",
    priceNum: 5000,
    image: "/image/ice-drinks-filp blue.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICE DRINKS",
  },
  {
    id: 35,
    name: "QUIET ROAD",
    price: "5500",
    priceNum: 5500,
    image: "/image/ice-drink-quiet road.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICE DRINKS",
  },
  {
    id: 36,
    name: "BLOODY MARY",
    price: "6000",
    priceNum: 6000,
    image: "/image/ice-drinks-bloody mary.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICE DRINKS",
  },
  {
    id: 37,
    name: "ICE TEA LEMON",
    price: "5000",
    priceNum: 5000,
    image: "/image/ice-tea-lemon.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICE DRINKS",
  },
  {
    id: 38,
    name: "ICE TEA PEACH",
    price: "5000",
    priceNum: 5000,
    image: "/image/iced tea peach.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICE DRINKS",
  },
  {
    id: 39,
    name: "HIBISCUS",
    price: "6000",
    priceNum: 6000,
    image: "/image/ice-drinks-hibiscus.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "ICE DRINKS",
  },




   // SIGNATURES
  {
    id: 40,
    name: "21 ICED COFFEE",
    price: "6000",
    priceNum: 6000,
    image: "/image/",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SIGNATURES",
  },
  {
    id: 41,
    name: "21 ICED TEA",
    price: "6000",
    priceNum: 6000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SIGNATURES",
  },
  {
    id: 42,
    name: "TROPICAL TANGO",
    price: "6000",
    priceNum: 6000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SIGNATURES",
  },
  {
    id: 43,
    name: "PURPLE LADY",
    price: "6000",
    priceNum: 6000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SIGNATURES",
  },
  {
    id: 44,
    name: "DARK MOON",
    price: "6000",
    priceNum: 6000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SIGNATURES",
  },

  // SPECIALITY
  {
    id: 45,
    name: "V60",
    price: "5000",
    priceNum: 5000,
    image: "/image/speciality-V60.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SPECIALITY",
  },
  {
    id: 46,
    name: "CHEMEX",
    price: "5000",
    priceNum: 5000,
    image: "/image/SPECIALITY-CHEMEX.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SPECIALITY",
  },
  {
    id: 47,
    name: "FRENCH PRESS",
    price: "5000",
    priceNum: 5000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SPECIALITY",
  },
  {
    id: 48,
    name: "AEROPRESS",
    price: "8000",
    priceNum: 8000,
    image: "/image/",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "SPECIALITY",
  },

  // YOGURT
  {
    id: 49,
    name: "STAWBERRY MANGO",
    price: "5000",
    priceNum: 5000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "YOGURT",
  },
  {
    id: 50,
    name: "STAWBERRY BANANA",
    price: "5000",
    priceNum: 5000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "YOGURT",
  },
  {
    id: 51,
    name: "MIX BERRIES",
    price: "5000",
    priceNum: 5000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "YOGURT",
  },

  // AGED COFFEE
  {
    id: 52,
    name: "COLD BREW",
    price: "6000",
    priceNum: 6000,
    image: "/image/smoothe-torpical-fruitsg.jpg",
    description: "Velvety steamed milk artfully combined with our premium espresso, creating a harmonious blend of comfort and sophistication.",
    category: "AGED COFFEE",
  }




      ];

      const DEFAULT_SHOP_ITEMS = [
     
  {
    id: 1,
    name: "?????",
    price: "0",
    priceNum: 0,
    image: "/image/تنزيل.jpg",
    description: ".",
    category: "equipment",
  },
  {
    id:2,
    name: "?????",
    price: "0",
    priceNum: 0,
    image: "/image/تنزيل.jpg",
    description: ".",
    category: "equipment",
  },
  {
    id: 3,
    name: "?????",
    price: "0",
    priceNum: 0,
    image: "/image/تنزيل.jpg",
    description: ".",
    category: "equipment",
  },
  {
    id: 4,
    name: "?????",
    price: "0",
    priceNum: 0,
    image: "/image/تنزيل.jpg",
    description: ".",
    category: "equipment",
  },
  {
    id: 5,
    name: "?????",
    price: "0",
    priceNum: 0,
    image: "/image/تنزيل.jpg",
    description: ".",
    category: "equipment",
  },
  {
    id: 6,
    name: "?????",
    price: "0",
    priceNum: 0,
    image: "/image/تنزيل.jpg",
    description: ".",
    category: "equipment",
  }
];
     

      // ===== Utility Functions =====
      function showNotification(message, type = "success") {
        console.log(`📢 إشعار (${type}): ${message}`);
        const notification = document.getElementById("notification");
        const notificationContent = document.getElementById("notification-content");
        const notificationText = document.getElementById("notification-text");

        if (!notification || !notificationContent || !notificationText) {
          console.error('❌ عناصر الإشعار غير موجودة');
          return;
        }

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

      function formatPrice(price) {
        return price.toLocaleString() + " IQD";
      }

      function generateId() {
        return "_" + Math.random().toString(36).substr(2, 9);
      }

      // ===== Supabase Database Functions =====
      
      // Load customers from Supabase
      async function loadCustomers() {
        try {
          console.log('🔄 تحميل العملاء من قاعدة البيانات...');
          const { data, error } = await supabase
            .from('customers')
            .select(`
              *,
              orders (*)
            `)
            .order('created_at', { ascending: false });

          if (error) {
            throw error;
          }

          customers = data || [];
          console.log(`✅ تم تحميل ${customers.length} عميل بنجاح`);
          
        } catch (error) {
          console.error('❌ خطأ في تحميل العملاء:', error);
          showNotification('خطأ في تحميل بيانات العملاء: ' + error.message, 'error');
          customers = []; // Fallback to empty array
        }
      }

      // Load pending orders from Supabase
      async function loadPendingOrders() {
        try {
          console.log('🔄 تحميل الطلبات المعلقة...');
          const { data, error } = await supabase
            .from('pending_orders')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

          if (error) {
            throw error;
          }

          pendingOrders = data || [];
          console.log(`✅ تم تحميل ${pendingOrders.length} طلب معلق`);
          renderPendingOrders();
          
        } catch (error) {
          console.error('❌ خطأ في تحميل الطلبات المعلقة:', error);
          showNotification('خطأ في تحميل الطلبات المعلقة: ' + error.message, 'error');
          pendingOrders = []; // Fallback to empty array
        }
      }

      // Load shop orders from Supabase
      async function loadShopOrders() {
        try {
          console.log('🔄 تحميل طلبات المتجر...');
          const { data, error } = await supabase
            .from('shop_orders')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

          if (error) {
            throw error;
          }

          shopOrders = data || [];
          console.log(`✅ تم تحميل ${shopOrders.length} طلب متجر`);
          renderShopOrders();
          
        } catch (error) {
          console.error('❌ خطأ في تحميل طلبات المتجر:', error);
          showNotification('خطأ في تحميل طلبات المتجر: ' + error.message, 'error');
          shopOrders = []; // Fallback to empty array
        }
      }

      // Load custom products from Supabase
      async function loadCustomProducts() {
        try {
          console.log('🔄 تحميل المنتجات المخصصة...');
          const { data, error } = await supabase
            .from('custom_products')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            throw error;
          }

          customProducts = data || [];
          console.log(`✅ تم تحميل ${customProducts.length} منتج مخصص`);
          updateProductSelect();
          
        } catch (error) {
          console.error('❌ خطأ في تحميل المنتجات المخصصة:', error);
          showNotification('خطأ في تحميل المنتجات المخصصة: ' + error.message, 'error');
          customProducts = []; // Fallback to empty array
        }
      }

      // Save customer to Supabase
      async function saveCustomerToSupabase(customer) {
        try {
          console.log('💾 حفظ العميل في قاعدة البيانات...', customer.name);
          
          if (customer.id && customer.id.toString().startsWith('_')) {
            // New customer - insert
            console.log('➕ إضافة عميل جديد');
            const { data, error } = await supabase
              .from('customers')
              .insert([{
                name: customer.name,
                phone: customer.phone || '',
                loyalty_points: customer.loyaltyPoints || customer.loyalty_points || 0
              }])
              .select()
              .single();

            if (error) throw error;
            
            console.log('✅ تم حفظ العميل الجديد:', data);
            return data;
          } else {
            // Existing customer - update
            console.log('🔄 تحديث عميل موجود');
            const { data, error } = await supabase
              .from('customers')
              .update({
                name: customer.name,
                phone: customer.phone || '',
                loyalty_points: customer.loyaltyPoints || customer.loyalty_points || 0
              })
              .eq('id', customer.id)
              .select()
              .single();

            if (error) throw error;
            
            console.log('✅ تم تحديث العميل:', data);
            return data;
          }
        } catch (error) {
          console.error('❌ خطأ في حفظ العميل:', error);
          showNotification('خطأ في حفظ بيانات العميل: ' + error.message, 'error');
          throw error;
        }
      }

      // Save order to Supabase
      async function saveOrderToSupabase(order) {
        try {
          console.log('💾 حفظ الطلب في قاعدة البيانات...', order);
          const { data, error } = await supabase
            .from('orders')
            .insert([{
              customer_id: order.customer_id,
              product_name: order.product,
              price: order.price,
              is_free: order.isFree || false,
              status: 'completed'
            }])
            .select()
            .single();

          if (error) throw error;
          
          console.log('✅ تم حفظ الطلب:', data);
          return data;
          
        } catch (error) {
          console.error('❌ خطأ في حفظ الطلب:', error);
          showNotification('خطأ في حفظ الطلب: ' + error.message, 'error');
          throw error;
        }
      }

      // Save pending order to Supabase
      async function savePendingOrderToSupabase(order) {
        try {
          console.log('💾 حفظ الطلب المعلق...', order);
          const { data, error } = await supabase
            .from('pending_orders')
            .insert([{
              customer_id: order.customerId,
              customer_name: order.customerName,
              product_name: order.product,
              price: order.price,
              status: 'pending'
            }])
            .select()
            .single();

          if (error) throw error;
          
          console.log('✅ تم حفظ الطلب المعلق:', data);
          return data;
          
        } catch (error) {
          console.error('❌ خطأ في حفظ الطلب المعلق:', error);
          showNotification('خطأ في حفظ الطلب المعلق: ' + error.message, 'error');
          throw error;
        }
      }

      // Save shop order to Supabase - FIXED VERSION
      async function saveShopOrderToSupabase(order) {
        try {
          console.log('💾 حفظ طلب المتجر...', order);
          
          // تأكد من وجود جميع البيانات المطلوبة
          if (!order.customerName || !order.customerPhone || !order.customerAddress || 
              !order.items || !Array.isArray(order.items) || order.items.length === 0 || 
              typeof order.total !== 'number') {
            throw new Error('بيانات الطلب غير مكتملة');
          }

          const orderData = {
            customer_name: order.customerName,
            customer_phone: order.customerPhone,
            customer_address: order.customerAddress,
            customer_city: order.customerCity || '',
            notes: order.notes || '',
            items: order.items,
            total: order.total,
            status: 'pending'
          };

          console.log('📝 بيانات الطلب قبل الإرسال:', orderData);

          const { data, error } = await supabase
            .from('shop_orders')
            .insert([orderData])
            .select()
            .single();

          if (error) {
            console.error('❌ خطأ من Supabase:', error);
            throw error;
          }
          
          console.log('✅ تم حفظ طلب المتجر:', data);
          return data;
          
        } catch (error) {
          console.error('❌ خطأ في حفظ طلب المتجر:', error);
          showNotification('خطأ في حفظ طلب المتجر: ' + error.message, 'error');
          throw error;
        }
      }

      // Delete pending order from Supabase
      async function deletePendingOrderFromSupabase(orderId) {
        try {
          console.log('🗑️ حذف الطلب المعلق:', orderId);
          const { error } = await supabase
            .from('pending_orders')
            .delete()
            .eq('id', orderId);

          if (error) throw error;
          
          console.log('✅ تم حذف الطلب المعلق');
          
        } catch (error) {
          console.error('❌ خطأ في حذف الطلب المعلق:', error);
          showNotification('خطأ في حذف الطلب المعلق: ' + error.message, 'error');
          throw error;
        }
      }

      // Delete shop order from Supabase
      async function deleteShopOrderFromSupabase(orderId) {
        try {
          console.log('🗑️ حذف طلب المتجر:', orderId);
          const { error } = await supabase
            .from('shop_orders')
            .delete()
            .eq('id', orderId);

          if (error) throw error;
          
          console.log('✅ تم حذف طلب المتجر');
          
        } catch (error) {
          console.error('❌ خطأ في حذف طلب المتجر:', error);
          showNotification('خطأ في حذف طلب المتجر: ' + error.message, 'error');
          throw error;
        }
      }

      // ===== Customer Functions =====
      async function findOrCreateCustomer(identifier) {
        try {
          console.log('🔍 البحث عن العميل أو إنشاء حساب جديد:', identifier);
          
          // Reload customers to get latest data
          await loadCustomers();
          
          // Try to find existing customer by name or phone
          let customer = customers.find(
            (c) =>
              c.name.toLowerCase() === identifier.toLowerCase() ||
              c.phone === identifier
          );

          if (!customer) {
            console.log('➕ إنشاء عميل جديد');
            // Create new customer locally first
            customer = {
              id: generateId(), // Temporary ID
              name: identifier,
              phone: identifier.match(/^\d+$/) ? identifier : "",
              orders: [],
              loyaltyPoints: 0,
              loyalty_points: 0,
            };

            // Save to Supabase
            const savedCustomer = await saveCustomerToSupabase(customer);
            customer.id = savedCustomer.id;
            customer.loyalty_points = savedCustomer.loyalty_points;
            
            customers.unshift(customer);
            showNotification(`مرحباً بك في Twenty One Cafe، ${customer.name}! تم انضمامك لبرنامج المكافآت.`);
          } else {
            console.log('✅ تم العثور على العميل:', customer.name);
            showNotification(`أهلاً وسهلاً بعودتك، ${customer.name}!`);
          }

          return customer;
        } catch (error) {
          console.error('❌ خطأ في إنشاء/البحث عن العميل:', error);
          showNotification('خطأ في تسجيل الدخول: ' + error.message, 'error');
          throw error;
        }
      }

      function updateCustomerDisplay() {
        if (!currentCustomer) return;

        console.log('🔄 تحديث عرض العميل:', currentCustomer.name);
        
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

        const loyaltyPoints = currentCustomer.loyalty_points || currentCustomer.loyaltyPoints || 0;

        stampsDisplays.forEach((display) => {
          if (display) {
            display.innerHTML = "";
            for (let i = 1; i <= STAMPS_FOR_FREE; i++) {
              const stamp = document.createElement("div");
              stamp.className = `w-6 h-6 sm:w-7 sm:h-7 border-2 border-amber-600 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                loyaltyPoints >= i
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

        const dashboardCustomerName = document.getElementById("dashboard-customer-name");
        if (dashboardCustomerName) {
          dashboardCustomerName.textContent = currentCustomer.name;
        }
        
        const loyaltyPoints = currentCustomer.loyalty_points || currentCustomer.loyaltyPoints || 0;
        
        const dashboardLoyaltyCounter = document.getElementById("dashboard-loyalty-counter");
        if (dashboardLoyaltyCounter) {
          dashboardLoyaltyCounter.textContent = `${loyaltyPoints}/${STAMPS_FOR_FREE}`;
        }

        const progress = (loyaltyPoints / STAMPS_FOR_FREE) * 100;
        const dashboardLoyaltyProgress = document.getElementById("dashboard-loyalty-progress");
        if (dashboardLoyaltyProgress) {
          dashboardLoyaltyProgress.style.width = `${Math.min(progress, 100)}%`;
        }

        // Render stamps grid
        const stampsGrid = document.getElementById("dashboard-stamps-grid");
        if (stampsGrid) {
          stampsGrid.innerHTML = "";
          for (let i = 1; i <= STAMPS_FOR_FREE; i++) {
            const stamp = document.createElement("div");
            stamp.className = `stamp-circle ${loyaltyPoints >= i ? "filled" : ""}`;
            stamp.textContent = i;
            stampsGrid.appendChild(stamp);
          }
        }

        // Render order history
        const orderHistory = document.getElementById("dashboard-order-history");
        if (orderHistory) {
          orderHistory.innerHTML = "";

          const recentOrders = (currentCustomer.orders || []).slice(-10).reverse();
          recentOrders.forEach((order) => {
            const orderDiv = document.createElement("div");
            orderDiv.className = "bg-white/80 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center shadow-md";
            orderDiv.innerHTML = `
              <div>
                <div class="font-semibold text-amber-900 text-lg">${order.product_name || order.product}</div>
                <div class="text-sm text-amber-700">${new Date(order.created_at || order.date).toLocaleDateString()}</div>
              </div>
              <div class="text-right">
                <div class="font-bold text-lg ${order.is_free || order.isFree ? "text-emerald-600" : "text-amber-900"}">
                  ${order.is_free || order.isFree ? "مجاني" : formatPrice(order.price)}
                </div>
                ${order.is_free || order.isFree ? '<span class="text-xs text-emerald-600">🎉 مكافأة ولاء</span>' : ""}
              </div>
            `;
            orderHistory.appendChild(orderDiv);
          });
        }
      }

      function customerLogout() {
        console.log('👋 تسجيل خروج العميل');
        currentCustomer = null;
        const customerStatus = document.getElementById("customer-status");
        const mobileCustomerStatus = document.getElementById("mobile-customer-status");
        const customerDashboard = document.getElementById("customer-dashboard");
        
        if (customerStatus) customerStatus.classList.add("hidden");
        if (mobileCustomerStatus) mobileCustomerStatus.classList.add("hidden");
        if (customerDashboard) customerDashboard.classList.add("hidden");
        
        showNotification("تم تسجيل الخروج بنجاح");
      }

      // ===== Shopping Cart Functions (Local Storage for Cart Only) =====
      function saveShoppingCart() {
        localStorage.setItem("cafeShoppingCart", JSON.stringify(shoppingCart));
        updateCartDisplay();
      }

      function loadShoppingCart() {
        try {
          const stored = localStorage.getItem("cafeShoppingCart");
          if (stored) {
            shoppingCart = JSON.parse(stored);
          }
          updateCartDisplay();
        } catch (error) {
          console.error('❌ خطأ في تحميل سلة التسوق:', error);
          shoppingCart = [];
          updateCartDisplay();
        }
      }

      function addToCart(name, price, image) {
        console.log('🛒 إضافة إلى السلة:', name);
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
        showNotification(`تم إضافة ${name} إلى السلة!`);
      }

      function removeFromCart(itemId) {
        console.log('🗑️ إزالة من السلة:', itemId);
        shoppingCart = shoppingCart.filter((item) => item.id !== itemId);
        saveShoppingCart();
        renderCartItems();
      }

      function updateQuantity(itemId, newQuantity) {
        console.log('🔢 تحديث الكمية:', itemId, newQuantity);
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
        const cartModal = document.getElementById("cart-modal");
        if (cartModal) {
          cartModal.classList.toggle("hidden");
          cartModal.classList.toggle("flex");
          renderCartItems();
        }
      }

      function renderCartItems() {
        const container = document.getElementById("cart-items-container");
        const totalElement = document.getElementById("cart-total-amount");

        if (!container || !totalElement) {
          console.error('❌ عناصر السلة غير موجودة');
          return;
        }

        if (shoppingCart.length === 0) {
          container.innerHTML =
            '<p class="text-center text-amber-700 text-lg">سلة التسوق فارغة</p>';
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
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover">
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-amber-900 text-sm sm:text-base truncate">${item.name}</h4>
                <p class="text-amber-700 text-xs sm:text-sm">${formatPrice(item.price)} للواحد</p>
              </div>
              <div class="flex items-center gap-2 sm:gap-3">
                <button class="quantity-btn text-sm" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                <span class="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">${item.quantity}</span>
                <button class="quantity-btn text-sm" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
              </div>
              <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                <p class="font-bold text-amber-900 text-sm sm:text-base">${formatPrice(itemTotal)}</p>
                <button onclick="removeFromCart('${item.id}')" class="text-red-600 hover:text-red-800 text-sm p-1">
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
          showNotification("سلة التسوق فارغة!", "error");
          return;
        }

        console.log('🛒 الانتقال إلى صفحة الدفع');
        
        const cartModal = document.getElementById("cart-modal");
        if (cartModal) {
          cartModal.classList.add("hidden");
          cartModal.classList.remove("flex");
        }

        // Populate checkout summary
        const checkoutItemsList = document.getElementById("checkout-items-list");
        const checkoutTotalAmount = document.getElementById("checkout-total-amount");

        if (!checkoutItemsList || !checkoutTotalAmount) {
          console.error('❌ عناصر صفحة الدفع غير موجودة');
          return;
        }

        let total = 0;
        checkoutItemsList.innerHTML = "";

        shoppingCart.forEach((item) => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;

          const itemDiv = document.createElement("div");
          itemDiv.className = "flex justify-between text-amber-800 text-sm sm:text-base";
          itemDiv.innerHTML = `
            <span class="truncate pr-2">${item.name} × ${item.quantity}</span>
            <span class="font-semibold">${formatPrice(itemTotal)}</span>
          `;
          checkoutItemsList.appendChild(itemDiv);
        });

        checkoutTotalAmount.textContent = formatPrice(total);

        const checkoutModal = document.getElementById("checkout-modal");
        if (checkoutModal) {
          checkoutModal.classList.remove("hidden");
          checkoutModal.classList.add("flex");
        }
      }

      async function submitOrder() {
        console.log('💳 تقديم طلب الشراء');
        
        const nameInput = document.getElementById("checkout-name");
        const phoneInput = document.getElementById("checkout-phone");
        const cityInput = document.getElementById("checkout-city");
        const addressInput = document.getElementById("checkout-address");
        const notesInput = document.getElementById("checkout-notes");

        if (!nameInput || !phoneInput || !cityInput || !addressInput || !notesInput) {
          console.error('❌ عناصر النموذج غير موجودة');
          showNotification("خطأ في النموذج - يرجى إعادة تحميل الصفحة", "error");
          return;
        }

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const city = cityInput.value.trim();
        const address = addressInput.value.trim();
        const notes = notesInput.value.trim();

        if (!name || !phone || !city || !address) {
          showNotification("يرجى ملء جميع الحقول المطلوبة", "error");
          return;
        }

        if (shoppingCart.length === 0) {
          showNotification("سلة التسوق فارغة!", "error");
          return;
        }

        try {
          // Show loading
          const submitBtn = document.querySelector('#checkout-form button[type="submit"]');
          if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>جاري الإرسال...';
            submitBtn.disabled = true;

            const order = {
              customerName: name,
              customerPhone: phone,
              customerCity: city,
              customerAddress: address,
              notes: notes,
              items: [...shoppingCart],
              total: shoppingCart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              ),
            };

            console.log('📤 إرسال طلب المتجر:', order);

            // Save to Supabase
            const savedOrder = await saveShopOrderToSupabase(order);
            
            // Update local array and render
            shopOrders.unshift(savedOrder);
            renderShopOrders();

            // Clear cart and close modal
            shoppingCart = [];
            saveShoppingCart();

            const checkoutModal = document.getElementById("checkout-modal");
            if (checkoutModal) {
              checkoutModal.classList.add("hidden");
              checkoutModal.classList.remove("flex");
            }

            // Reset form
            const checkoutForm = document.getElementById("checkout-form");
            if (checkoutForm) {
              checkoutForm.reset();
            }

            showNotification("تم تقديم طلبك بنجاح! سنتواصل معك قريباً.");

            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }
          
        } catch (error) {
          console.error('❌ خطأ في تقديم الطلب:', error);
          showNotification("خطأ في تقديم الطلب: " + error.message, "error");
          
          // Restore button
          const submitBtn = document.querySelector('#checkout-form button[type="submit"]');
          if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>تأكيد الشراء';
            submitBtn.disabled = false;
          }
        }
      }

      // ===== Product Modal Functions =====
      let currentProduct = null;

      function showProductModal(productData) {
        console.log('👀 عرض تفاصيل المنتج:', productData.name);
        
        currentProduct = productData;
        
        const productModalImage = document.getElementById("product-modal-image");
        const productModalTitle = document.getElementById("product-modal-title");
        const productModalPrice = document.getElementById("product-modal-price");
        const productModalDescription = document.getElementById("product-modal-description");
        const productModal = document.getElementById("product-modal");

        if (productModalImage) {
          productModalImage.src = productData.image;
          productModalImage.alt = productData.name;
        }
        if (productModalTitle) productModalTitle.textContent = productData.name;
        if (productModalPrice) productModalPrice.textContent = productData.price + " IQD";
        if (productModalDescription) productModalDescription.textContent = productData.description;

        if (productModal) {
          productModal.classList.remove("hidden");
          productModal.classList.add("flex");
        }
      }

      function closeProductModal() {
        const productModal = document.getElementById("product-modal");
        if (productModal) {
          productModal.classList.add("hidden");
          productModal.classList.remove("flex");
        }
        currentProduct = null;
      }

      async function orderNow() {
        console.log('🛍️ طلب المنتج الآن');
        
        if (!currentCustomer) {
          showNotification("يرجى تسجيل الدخول أولاً لتقديم الطلب", "error");
          closeProductModal();
          const customerModal = document.getElementById("customer-modal");
          if (customerModal) {
            customerModal.classList.remove("hidden");
            customerModal.classList.add("flex");
          }
          return;
        }

        if (!currentProduct) return;

        try {
          // Show loading
          const orderBtn = document.getElementById("order-now-btn");
          if (orderBtn) {
            const originalText = orderBtn.innerHTML;
            orderBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>جاري الطلب...';
            orderBtn.disabled = true;

            // Create pending order
            const newOrder = {
              customerId: currentCustomer.id,
              customerName: currentCustomer.name,
              product: currentProduct.name,
              price: currentProduct.priceNum,
            };

            // Save to Supabase
            const savedOrder = await savePendingOrderToSupabase(newOrder);
            
            // Update local array
            pendingOrders.unshift(savedOrder);
            renderPendingOrders();

            showNotification(`تم تقديم الطلب: ${currentProduct.name}. في انتظار تأكيد الموظف.`);
            closeProductModal();

            // Restore button
            orderBtn.innerHTML = '<i class="fas fa-shopping-bag mr-2"></i>اطلب الآن';
            orderBtn.disabled = false;
          }
          
        } catch (error) {
          console.error('❌ خطأ في تقديم الطلب:', error);
          showNotification("خطأ في تقديم الطلب: " + error.message, "error");
          
          // Restore button
          const orderBtn = document.getElementById("order-now-btn");
          if (orderBtn) {
            orderBtn.innerHTML = '<i class="fas fa-shopping-bag mr-2"></i>اطلب الآن';
            orderBtn.disabled = false;
          }
        }
      }

      // ===== Menu and Shop Items Rendering =====
      function renderMenuItems() {
        console.log('🍽️ عرض عناصر القائمة');
        
        const container = document.getElementById("menu-items-container");
        if (!container) {
          console.error('❌ حاوي عناصر القائمة غير موجود');
          return;
        }

        container.innerHTML = "";

        menuItems.forEach((item) => {
          const menuItemDiv = document.createElement("div");
          menuItemDiv.className = "menu-item fade-in-up";
          menuItemDiv.setAttribute("data-category", item.category);
          
          menuItemDiv.innerHTML = `
            <div class="menu-item-card rounded-3xl p-6 shadow-lg cursor-pointer transition-all duration-500"
                 data-product='${JSON.stringify({
                   name: item.name,
                   price: item.price,
                   priceNum: item.priceNum,
                   image: item.image,
                   description: item.description
                 })}'>
              <div class="relative mb-6">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 rounded-2xl object-cover shadow-md" loading="lazy"/>
                <div class="absolute top-4 right-4 price-badge shadow-lg">
                  ${item.price} IQD
                </div>
              </div>
              <h3 class="text-2xl font-playfair font-bold text-amber-900 mb-3">
                ${item.name}
              </h3>
              <p class="text-amber-700 leading-relaxed">
                ${item.description}
              </p>
            </div>
          `;
          
          container.appendChild(menuItemDiv);
        });

        // Re-attach click events for menu items
        setupMenuItemEvents();
      }

      function renderShopItems() {
        console.log('🏪 عرض عناصر المتجر');
        
        const container = document.getElementById("shop-items-container");
        if (!container) {
          console.error('❌ حاوي عناصر المتجر غير موجود');
          return;
        }

        container.innerHTML = "";

        shopItems.forEach((item) => {
          const shopItemDiv = document.createElement("div");
          shopItemDiv.className = "shop-item fade-in-up";
          shopItemDiv.setAttribute("data-shop-category", item.category);
          
          shopItemDiv.innerHTML = `
            <div class="menu-item-card rounded-3xl p-6 shadow-lg cursor-pointer transition-all duration-500">
              <div class="relative mb-6">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 rounded-2xl object-cover shadow-md" loading="lazy"/>
                <div class="absolute top-4 right-4 price-badge shadow-lg">
                  ${item.price} IQD
                </div>
              </div>
              <h3 class="text-2xl font-playfair font-bold text-amber-900 mb-3">
                ${item.name}
              </h3>
              <p class="text-amber-700 leading-relaxed mb-4">
                ${item.description}
              </p>
              <button onclick="addToCart('${item.name}', ${item.priceNum}, '${item.image}')" 
                      class="w-full btn-primary py-3 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                <i class="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </button>
            </div>
          `;
          
          container.appendChild(shopItemDiv);
        });
      }

      function setupMenuItemEvents() {
        // Setup click events for menu items
        document.querySelectorAll("[data-product]").forEach((item) => {
          item.addEventListener("click", (e) => {
            try {
              const productData = JSON.parse(e.currentTarget.dataset.product);
              showProductModal(productData);
            } catch (error) {
              console.error('❌ خطأ في بيانات المنتج:', error);
              showNotification('خطأ في عرض تفاصيل المنتج', 'error');
            }
          });
        });
      }

      // ===== Pending Orders Functions =====
      function renderPendingOrders() {
        console.log('📋 عرض الطلبات المعلقة');
        
        const container = document.getElementById("pending-orders-container");
        const section = document.getElementById("pending-orders-section");

        if (!container || !section) return;

        if (pendingOrders.length === 0) {
          section.classList.add("hidden");
          return;
        }

        section.classList.remove("hidden");
        container.innerHTML = "";

        pendingOrders.forEach((order) => {
          const orderDiv = document.createElement("div");
          orderDiv.className = "bg-red-700/50 backdrop-blur-sm p-6 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border border-red-600";
          orderDiv.innerHTML = `
            <div class="flex-1">
              <h4 class="font-bold text-white text-xl mb-2">${order.customer_name}</h4>
              <p class="text-red-200 text-lg">${order.product_name} - ${formatPrice(order.price)}</p>
              <p class="text-red-300 text-sm">${new Date(order.created_at).toLocaleString('ar-EG')}</p>
            </div>
            <div class="flex gap-3 w-full lg:w-auto">
              <button onclick="confirmOrder('${order.id}')" class="flex-1 lg:flex-none bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                تأكيد الدفع
              </button>
              <button onclick="cancelOrder('${order.id}')" class="flex-1 lg:flex-none bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                إلغاء
              </button>
            </div>
          `;
          container.appendChild(orderDiv);
        });
      }

      async function confirmOrder(orderId) {
        console.log('✅ تأكيد الطلب:', orderId);
        
        try {
          const order = pendingOrders.find((o) => o.id === orderId);
          if (!order) {
            showNotification("الطلب غير موجود", "error");
            return;
          }

          const customer = customers.find((c) => c.id === order.customer_id);
          if (!customer) {
            showNotification("العميل غير موجود", "error");
            return;
          }

          let isFree = false;
          const currentPoints = customer.loyalty_points || 0;

          // Check if customer is eligible for free drink
          if (currentPoints >= STAMPS_FOR_FREE) {
            isFree = true;
            customer.loyalty_points = 0; // Reset stamps
            customer.loyaltyPoints = 0; // For local compatibility
            showNotification("🎉 تم استبدال المشروب المجاني! تم إعادة تعيين الأختام.");
          } else {
            customer.loyalty_points = currentPoints + 1;
            customer.loyaltyPoints = currentPoints + 1; // For local compatibility
            showNotification("تم تأكيد الطلب واستلام الدفعة. تمت إضافة ختم ولاء!");
          }

          // Save customer updates to Supabase
          await saveCustomerToSupabase(customer);

          // Save order to Supabase
          const newOrder = {
            customer_id: customer.id,
            product: order.product_name,
            price: order.price,
            isFree: isFree,
          };
          await saveOrderToSupabase(newOrder);

          // Update customer orders locally
          if (!customer.orders) customer.orders = [];
          customer.orders.push(newOrder);

          // Delete pending order from Supabase
          await deletePendingOrderFromSupabase(orderId);

          // Remove from local array
          pendingOrders = pendingOrders.filter((o) => o.id !== orderId);

          renderPendingOrders();
          updateBaristaCustomerDisplay();
          renderBaristaCustomersTable();

          // Update current customer display if it's the same customer
          if (currentCustomer && currentCustomer.id === customer.id) {
            currentCustomer = customer;
            updateCustomerDisplay();
          }
          
        } catch (error) {
          console.error('❌ خطأ في تأكيد الطلب:', error);
          showNotification("خطأ في تأكيد الطلب: " + error.message, "error");
        }
      }

      async function cancelOrder(orderId) {
        console.log('❌ إلغاء الطلب:', orderId);
        
        try {
          // Delete from Supabase
          await deletePendingOrderFromSupabase(orderId);
          
          // Remove from local array
          pendingOrders = pendingOrders.filter((o) => o.id !== orderId);
          
          renderPendingOrders();
          showNotification("تم إلغاء الطلب");
          
        } catch (error) {
          console.error('❌ خطأ في إلغاء الطلب:', error);
          showNotification("خطأ في إلغاء الطلب: " + error.message, "error");
        }
      }

      // ===== Shop Orders Functions =====
      function renderShopOrders() {
        console.log('🛒 عرض طلبات المتجر');
        
        const container = document.getElementById("shop-orders-container");
        const section = document.getElementById("shop-orders-section");

        if (!container || !section) return;

        if (shopOrders.length === 0) {
          section.classList.add("hidden");
          return;
        }

        section.classList.remove("hidden");
        container.innerHTML = "";

        shopOrders.forEach((order) => {
          const orderDiv = document.createElement("div");
          orderDiv.className = "bg-blue-700/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-600";

          const itemsList = order.items
            .map(
              (item) =>
                `${item.name} × ${item.quantity} (${formatPrice(item.price * item.quantity)})`
            )
            .join(", ");

          const cityText = order.customer_city ? ` - ${order.customer_city}` : '';

          orderDiv.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 class="font-bold text-white text-xl mb-2">${order.customer_name}</h4>
                <p class="text-blue-200"><i class="fas fa-phone mr-2"></i>${order.customer_phone}</p>
                <p class="text-blue-200 text-sm"><i class="fas fa-map-marker-alt mr-2"></i>${order.customer_address || 'لا يوجد عنوان'}${cityText}</p>
                ${order.notes ? `<p class="text-blue-300 text-sm mt-2"><i class="fas fa-sticky-note mr-2"></i>${order.notes}</p>` : ""}
              </div>
              <div>
                <h5 class="font-semibold text-blue-200 mb-2">المنتجات:</h5>
                <p class="text-white text-sm">${itemsList}</p>
                <p class="text-blue-200 text-sm mt-2">${new Date(order.created_at).toLocaleString('ar-EG')}</p>
              </div>
              <div class="flex flex-col gap-3">
                <div class="text-right">
                  <p class="text-2xl font-bold text-white">${formatPrice(order.total)}</p>
                </div>
                <div class="flex gap-3">
                  <button onclick="confirmShopOrder('${order.id}')" class="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                    تأكيد الطلب
                  </button>
                  <button onclick="cancelShopOrder('${order.id}')" class="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          `;
          container.appendChild(orderDiv);
        });
      }

      async function confirmShopOrder(orderId) {
        console.log('✅ تأكيد طلب المتجر:', orderId);
        
        try {
          // Delete from Supabase
          await deleteShopOrderFromSupabase(orderId);
          
          // Remove from local array
          shopOrders = shopOrders.filter((order) => order.id !== orderId);
          
          renderShopOrders();
          showNotification("تم تأكيد طلب المتجر بنجاح");
          
        } catch (error) {
          console.error('❌ خطأ في تأكيد طلب المتجر:', error);
          showNotification("خطأ في تأكيد طلب المتجر: " + error.message, "error");
        }
      }

      async function cancelShopOrder(orderId) {
        console.log('❌ إلغاء طلب المتجر:', orderId);
        
        try {
          // Delete from Supabase
          await deleteShopOrderFromSupabase(orderId);
          
          // Remove from local array
          shopOrders = shopOrders.filter((order) => order.id !== orderId);
          
          renderShopOrders();
          showNotification("تم إلغاء طلب المتجر");
          
        } catch (error) {
          console.error('❌ خطأ في إلغاء طلب المتجر:', error);
          showNotification("خطأ في إلغاء طلب المتجر: " + error.message, "error");
        }
      }

      // ===== Barista Functions =====
      async function searchCustomer() {
        console.log('🔍 البحث عن عميل');
        
        const searchInput = document.getElementById("search-customer");
        if (!searchInput) {
          showNotification("عنصر البحث غير موجود", "error");
          return;
        }

        const searchTerm = searchInput.value.trim().toLowerCase();
        if (!searchTerm) {
          showNotification("يرجى إدخال مصطلح بحث", "error");
          return;
        }

        // Reload fresh data from Supabase
        await loadCustomers();

        const found = customers.filter(
          (c) =>
            c.name.toLowerCase().includes(searchTerm) ||
            (c.phone && c.phone.includes(searchTerm))
        );

        if (found.length === 0) {
          showNotification("العميل غير موجود", "error");
          const baristaCustomerDetails = document.getElementById("barista-customer-details");
          if (baristaCustomerDetails) {
            baristaCustomerDetails.classList.add("hidden");
          }
          return;
        }

        if (found.length === 1) {
          selectBaristaCustomer(found[0].id);
        } else {
          renderBaristaCustomersTable(found);
          showNotification(`تم العثور على ${found.length} عملاء`);
        }
      }

      function selectBaristaCustomer(customerId) {
        console.log('👤 تحديد عميل للباريستا:', customerId);
        
        selectedBaristaCustomer = customers.find((c) => c.id === customerId);
        if (!selectedBaristaCustomer) return;

        const baristaCustomerDetails = document.getElementById("barista-customer-details");
        if (baristaCustomerDetails) {
          baristaCustomerDetails.classList.remove("hidden");
        }
        updateBaristaCustomerDisplay();
      }

      function updateBaristaCustomerDisplay() {
        if (!selectedBaristaCustomer) return;

        console.log('🔄 تحديث عرض العميل للباريستا:', selectedBaristaCustomer.name);

        const baristaCustomerInfo = document.getElementById("barista-customer-info");
        if (baristaCustomerInfo) {
          baristaCustomerInfo.textContent = 
            `${selectedBaristaCustomer.name} - ${selectedBaristaCustomer.phone || "لا يوجد هاتف"}`;
        }

        const loyaltyPoints = selectedBaristaCustomer.loyalty_points || 0;
        
        const baristaLoyaltyCounter = document.getElementById("barista-loyalty-counter");
        if (baristaLoyaltyCounter) {
          baristaLoyaltyCounter.textContent = `${loyaltyPoints}/${STAMPS_FOR_FREE}`;
        }

        const progress = (loyaltyPoints / STAMPS_FOR_FREE) * 100;
        const baristaLoyaltyProgress = document.getElementById("barista-loyalty-progress");
        if (baristaLoyaltyProgress) {
          baristaLoyaltyProgress.style.width = `${Math.min(progress, 100)}%`;
        }

        // Update loyalty status
        const loyaltyStatus = document.getElementById("barista-loyalty-status");
        if (loyaltyStatus) {
          if (loyaltyPoints >= STAMPS_FOR_FREE) {
            loyaltyStatus.textContent = "مؤهل للمشروب المجاني!";
            loyaltyStatus.className =
              "px-6 py-3 rounded-full text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg float-gently";
          } else {
            loyaltyStatus.textContent = `يحتاج ${STAMPS_FOR_FREE - loyaltyPoints} أختام أكثر`;
            loyaltyStatus.className =
              "px-6 py-3 rounded-full text-lg font-bold bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg";
          }
        }

        // Render order history
        const orderHistory = document.getElementById("barista-order-history");
        if (orderHistory) {
          orderHistory.innerHTML = "";

          const recentOrders = (selectedBaristaCustomer.orders || []).slice(-10).reverse();
          recentOrders.forEach((order) => {
            const orderDiv = document.createElement("div");
            orderDiv.className = "bg-emerald-700/50 backdrop-blur-sm p-4 rounded-xl border border-emerald-600";
            orderDiv.innerHTML = `
              <div class="font-semibold text-white text-lg mb-1">${order.product_name || order.product}</div>
              <div class="text-sm text-emerald-200">${new Date(order.created_at || order.date).toLocaleDateString('ar-EG')}</div>
              <div class="text-lg font-bold ${order.is_free || order.isFree ? "text-green-400" : "text-emerald-200"}">
                ${order.is_free || order.isFree ? "مجاني" : formatPrice(order.price)}
              </div>
            `;
            orderHistory.appendChild(orderDiv);
          });
        }

        // Populate edit form with current data
        const editCustomerName = document.getElementById("edit-customer-name");
        const editCustomerPhone = document.getElementById("edit-customer-phone");
        if (editCustomerName) editCustomerName.value = selectedBaristaCustomer.name;
        if (editCustomerPhone) editCustomerPhone.value = selectedBaristaCustomer.phone || "";
      }

      async function addNewCustomer() {
        console.log('➕ إضافة عميل جديد');
        
        const nameInput = document.getElementById("new-customer-name");
        const phoneInput = document.getElementById("new-customer-phone");

        if (!nameInput || !phoneInput) {
          showNotification("عناصر النموذج غير موجودة", "error");
          return;
        }

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name) {
          showNotification("يرجى إدخال اسم العميل", "error");
          return;
        }

        try {
          if (customers.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
            showNotification("العميل موجود بالفعل", "error");
            return;
          }

          const newCustomer = {
            id: generateId(),
            name: name,
            phone: phone || "",
            orders: [],
            loyaltyPoints: 0,
            loyalty_points: 0,
          };

          // Save to Supabase
          const savedCustomer = await saveCustomerToSupabase(newCustomer);
          newCustomer.id = savedCustomer.id;

          customers.unshift(newCustomer);
          showNotification("تم إضافة العميل بنجاح");

          nameInput.value = "";
          phoneInput.value = "";

          renderBaristaCustomersTable();
          
        } catch (error) {
          console.error('❌ خطأ في إضافة العميل:', error);
          showNotification("خطأ في إضافة العميل: " + error.message, "error");
        }
      }

      async function addCustomerOrder() {
        console.log('📝 إضافة طلب للعميل');
        
        if (!selectedBaristaCustomer) {
          showNotification("يرجى تحديد عميل أولاً", "error");
          return;
        }

        const productSelect = document.getElementById("barista-product-select");
        if (!productSelect) {
          showNotification("عنصر اختيار المنتج غير موجود", "error");
          return;
        }

        const selectedValue = productSelect.value;

        if (!selectedValue) {
          showNotification("يرجى اختيار منتج", "error");
          return;
        }

        try {
          let productName, price;

          if (selectedValue === "custom") {
            // Handle custom product
            const customNameInput = document.getElementById("custom-product-name");
            const customPriceInput = document.getElementById("custom-product-price");

            if (!customNameInput || !customPriceInput) {
              showNotification("عناصر المنتج المخصص غير موجودة", "error");
              return;
            }

            const customName = customNameInput.value.trim();
            const customPrice = parseInt(customPriceInput.value);

            if (!customName || !customPrice || customPrice <= 0) {
              showNotification("يرجى إدخال تفاصيل المنتج المخصص بشكل صحيح", "error");
              return;
            }

            productName = customName;
            price = customPrice;

            // Save custom product to Supabase if it doesn't exist
            const existingCustomProduct = customProducts.find((p) => p.name === customName);
            if (!existingCustomProduct) {
              const { data, error } = await supabase
                .from('custom_products')
                .insert([{ name: customName, price: customPrice, created_by: 'Barista' }])
                .select()
                .single();

              if (!error) {
                customProducts.push(data);
                updateProductSelect();
              }
            }

            // Clear custom fields
            customNameInput.value = "";
            customPriceInput.value = "";
          } else {
            [productName, priceStr] = selectedValue.split(",");
            price = parseInt(priceStr);
          }

          let isFree = false;
          const currentPoints = selectedBaristaCustomer.loyalty_points || 0;

          // Check if customer is eligible for free drink
          if (currentPoints >= STAMPS_FOR_FREE) {
            isFree = true;
            selectedBaristaCustomer.loyalty_points = 0;
            selectedBaristaCustomer.loyaltyPoints = 0;
            showNotification("🎉 تم استبدال المشروب المجاني! تم إعادة تعيين الأختام.");
          } else {
            selectedBaristaCustomer.loyalty_points = currentPoints + 1;
            selectedBaristaCustomer.loyaltyPoints = currentPoints + 1;
            showNotification("تم إضافة الطلب وتأكيد الدفع. تمت إضافة ختم ولاء!");
          }

          // Save customer updates to Supabase
          await saveCustomerToSupabase(selectedBaristaCustomer);

          // Save order to Supabase
          const newOrder = {
            customer_id: selectedBaristaCustomer.id,
            product: productName,
            price: price,
            isFree: isFree,
          };
          const savedOrder = await saveOrderToSupabase(newOrder);

          // Update customer orders locally
          if (!selectedBaristaCustomer.orders) selectedBaristaCustomer.orders = [];
          selectedBaristaCustomer.orders.push(savedOrder);

          productSelect.value = "";
          const customProductFields = document.getElementById("custom-product-fields");
          if (customProductFields) {
            customProductFields.classList.add("hidden");
          }
          
          updateBaristaCustomerDisplay();
          renderBaristaCustomersTable();

          // Update current customer display if it's the same customer
          if (currentCustomer && currentCustomer.id === selectedBaristaCustomer.id) {
            currentCustomer.loyalty_points = selectedBaristaCustomer.loyalty_points;
            currentCustomer.loyaltyPoints = selectedBaristaCustomer.loyalty_points;
            updateCustomerDisplay();
          }
          
        } catch (error) {
          console.error('❌ خطأ في إضافة الطلب:', error);
          showNotification("خطأ في إضافة الطلب: " + error.message, "error");
        }
      }

      function updateProductSelect() {
        const select = document.getElementById("barista-product-select");
        if (!select) return;

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
          option.textContent = `${product.name} - ${formatPrice(product.price)}`;
          option.dataset.custom = "true";
          select.insertBefore(option, customOption);
        });
      }

      // Customer editing functions
      function editCustomer() {
        const editCustomerForm = document.getElementById("edit-customer-form");
        const editCustomerBtn = document.getElementById("edit-customer-btn");
        
        if (editCustomerForm) editCustomerForm.classList.remove("hidden");
        if (editCustomerBtn) editCustomerBtn.style.display = "none";
      }

      async function saveCustomerChanges() {
        console.log('💾 حفظ تغييرات العميل');
        
        const editCustomerName = document.getElementById("edit-customer-name");
        const editCustomerPhone = document.getElementById("edit-customer-phone");

        if (!editCustomerName || !editCustomerPhone) {
          showNotification("عناصر النموذج غير موجودة", "error");
          return;
        }

        const newName = editCustomerName.value.trim();
        const newPhone = editCustomerPhone.value.trim();

        if (!newName) {
          showNotification("الاسم لا يمكن أن يكون فارغاً", "error");
          return;
        }

        try {
          // Check if name already exists (excluding current customer)
          const existingCustomer = customers.find(
            (c) =>
              c.id !== selectedBaristaCustomer.id &&
              c.name.toLowerCase() === newName.toLowerCase()
          );
          if (existingCustomer) {
            showNotification("اسم العميل موجود بالفعل", "error");
            return;
          }

          selectedBaristaCustomer.name = newName;
          selectedBaristaCustomer.phone = newPhone;

          // Save to Supabase
          await saveCustomerToSupabase(selectedBaristaCustomer);

          showNotification("تم تحديث معلومات العميل بنجاح");

          cancelCustomerEdit();
          updateBaristaCustomerDisplay();
          renderBaristaCustomersTable();

          // Update current customer display if it's the same customer
          if (currentCustomer && currentCustomer.id === selectedBaristaCustomer.id) {
            currentCustomer.name = selectedBaristaCustomer.name;
            currentCustomer.phone = selectedBaristaCustomer.phone;
            updateCustomerDisplay();
          }
          
        } catch (error) {
          console.error('❌ خطأ في تحديث العميل:', error);
          showNotification("خطأ في تحديث معلومات العميل: " + error.message, "error");
        }
      }

      function cancelCustomerEdit() {
        const editCustomerForm = document.getElementById("edit-customer-form");
        const editCustomerBtn = document.getElementById("edit-customer-btn");
        const editCustomerName = document.getElementById("edit-customer-name");
        const editCustomerPhone = document.getElementById("edit-customer-phone");
        
        if (editCustomerForm) editCustomerForm.classList.add("hidden");
        if (editCustomerBtn) editCustomerBtn.style.display = "inline-block";
        
        // Reset form values
        if (selectedBaristaCustomer) {
          if (editCustomerName) editCustomerName.value = selectedBaristaCustomer.name;
          if (editCustomerPhone) editCustomerPhone.value = selectedBaristaCustomer.phone || "";
        }
      }

      async function renderBaristaCustomersTable(customerList = null) {
        console.log('👥 عرض جدول العملاء');
        
        const tbody = document.getElementById("barista-customers-table");
        if (!tbody) return;
        
        // If no specific list provided, reload from Supabase
        if (!customerList) {
          await loadCustomers();
        }
        
        const customersToShow = customerList || customers;
        tbody.innerHTML = "";

        customersToShow.forEach((customer) => {
          const row = document.createElement("tr");
          row.className = "hover:bg-emerald-700/30 transition-all duration-300 border-b border-emerald-700/50";
          
          const loyaltyPoints = customer.loyalty_points || 0;
          const orderCount = customer.orders ? customer.orders.length : 0;
          
          row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-lg text-white font-medium">${customer.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-lg text-emerald-200">${customer.phone || "-"}</td>
            <td class="px-6 py-4 whitespace-nowrap text-lg text-emerald-200">${orderCount}</td>
            <td class="px-6 py-4 whitespace-nowrap text-lg text-emerald-200">
              <div class="flex items-center gap-3">
                <span>${loyaltyPoints}/${STAMPS_FOR_FREE}</span>
                ${loyaltyPoints >= STAMPS_FOR_FREE ? '<span class="text-green-400 text-xl">🎉</span>' : ""}
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
      function initializeContactForm() {
        console.log('📧 تهيئة EmailJS...');
        
        const EMAIL_CONFIG = {
          publicKey: 'bBvH3gDiVxfI-87ZG',
          serviceId: 'service_vl1koee',
          templateId: 'template_5hg93ll'
        };

        if (typeof emailjs === 'undefined') {
          console.error('❌ مكتبة EmailJS غير محملة');
          return;
        }

        try {
          emailjs.init(EMAIL_CONFIG.publicKey);
          console.log('✅ تم تهيئة EmailJS بنجاح');
        } catch (error) {
          console.error('❌ فشل في تهيئة EmailJS:', error);
          return;
        }

        // Star rating functionality
        const stars = document.querySelectorAll(".star");
        const ratingInput = document.getElementById("contact-rating");
        let currentRating = 0;

        if (stars.length > 0 && ratingInput) {
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

          const starRating = document.querySelector(".star-rating");
          if (starRating) {
            starRating.addEventListener("mouseleave", updateStars);
          }

          function updateStars() {
            stars.forEach((star, index) => {
              star.classList.toggle("active", index < currentRating);
            });
          }
        }

        // Form submission handler
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
          contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById("contact-submit-btn");
            if (!submitBtn) return;

            const originalText = submitBtn.innerHTML;

            if (!ratingInput || !ratingInput.value) {
              showNotification("يرجى اختيار التقييم", "error");
              return;
            }

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> جاري الإرسال...';
            submitBtn.disabled = true;

            try {
              const result = await emailjs.sendForm(
                EMAIL_CONFIG.serviceId,
                EMAIL_CONFIG.templateId,
                "#contact-form"
              );

              console.log('✅ تم إرسال الإيميل بنجاح:', result);
              showNotification("شكراً لك على ملاحظاتك القيمة! تم إرسال رسالتك بنجاح.");

              // Reset form
              contactForm.reset();
              if (ratingInput) ratingInput.value = "";
              currentRating = 0;
              updateStars();

            } catch (error) {
              console.error("❌ خطأ في EmailJS:", error);
              showNotification("عذراً، حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.", "error");
            } finally {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
            }
          });
        }

        console.log('📧 تم تهيئة نموذج الاتصال مع EmailJS');
      }

      // ===== Video Background Functions =====
      function initializeVideoBackground() {
        console.log('🎥 تهيئة خلفية الفيديو...');
        
        const video = document.getElementById("hero-video");
        if (!video) {
          console.log('⚠️ عنصر الفيديو غير موجود');
          return;
        }

        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.loop = true;
        video.defaultMuted = true;
        video.volume = 0;

        const playVideo = () => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("✅ الفيديو يعمل بنجاح");
                video.style.opacity = "1";
              })
              .catch((error) => {
                console.log("⚠️ فشل تشغيل الفيديو تلقائياً:", error);
                video.style.display = "none";
              });
          }
        };

        video.addEventListener("loadeddata", playVideo);
        video.addEventListener("canplaythrough", playVideo);
        video.addEventListener("error", (e) => {
          console.log("❌ خطأ في الفيديو:", e);
        });

        video.load();
        setTimeout(playVideo, 500);
      }

      // ===== Event Listeners Setup =====
      function setupEventListeners() {
        console.log('🎯 إعداد مستمعات الأحداث...');

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        let isMenuOpen = false;

        if (mobileMenuBtn && mobileMenu) {
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
        }

        // Product modal events
        const productModalClose = document.getElementById("product-modal-close");
        const orderNowBtn = document.getElementById("order-now-btn");
        
        if (productModalClose) productModalClose.addEventListener("click", closeProductModal);
        if (orderNowBtn) orderNowBtn.addEventListener("click", orderNow);

        // Shopping cart events
        const checkoutBtn = document.getElementById("checkout-btn");
        const cartModalClose = document.getElementById("cart-modal-close");
        
        if (checkoutBtn) checkoutBtn.addEventListener("click", proceedToCheckout);
        if (cartModalClose) {
          cartModalClose.addEventListener("click", () => {
            const cartModal = document.getElementById("cart-modal");
            if (cartModal) {
              cartModal.classList.add("hidden");
              cartModal.classList.remove("flex");
            }
          });
        }

        // Checkout events
        const checkoutForm = document.getElementById("checkout-form");
        const checkoutModalClose = document.getElementById("checkout-modal-close");
        
        if (checkoutForm) {
          checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();
            submitOrder();
          });
        }
        
        if (checkoutModalClose) {
          checkoutModalClose.addEventListener("click", () => {
            const checkoutModal = document.getElementById("checkout-modal");
            if (checkoutModal) {
              checkoutModal.classList.add("hidden");
              checkoutModal.classList.remove("flex");
            }
          });
        }

        // Customer login buttons
        const customerLoginButtons = [
          document.getElementById("customer-login-btn"),
          document.getElementById("mobile-customer-login-btn"),
          document.getElementById("hero-loyalty-btn"),
        ];

        customerLoginButtons.forEach(btn => {
          if (btn) {
            btn.addEventListener("click", () => {
              const customerModal = document.getElementById("customer-modal");
              if (customerModal) {
                customerModal.classList.remove("hidden");
                customerModal.classList.add("flex");
              }
              if (isMenuOpen && mobileMenuBtn) mobileMenuBtn.click();
            });
          }
        });

        // Customer login submit
        const customerLoginSubmit = document.getElementById("customer-login-submit");
        if (customerLoginSubmit) {
          customerLoginSubmit.addEventListener("click", async () => {
            const customerIdentifier = document.getElementById("customer-identifier");
            if (!customerIdentifier) return;

            const identifier = customerIdentifier.value.trim();
            if (!identifier) {
              showNotification("يرجى إدخال الاسم أو رقم الهاتف", "error");
              return;
            }

            try {
              currentCustomer = await findOrCreateCustomer(identifier);
              updateCustomerDisplay();

              const customerModal = document.getElementById("customer-modal");
              if (customerModal) {
                customerModal.classList.add("hidden");
                customerModal.classList.remove("flex");
              }
              customerIdentifier.value = "";
            } catch (error) {
              console.error('❌ خطأ في تسجيل الدخول:', error);
            }
          });
        }

        // Customer modal close
        const customerModalClose = document.getElementById("customer-modal-close");
        if (customerModalClose) {
          customerModalClose.addEventListener("click", () => {
            const customerModal = document.getElementById("customer-modal");
            if (customerModal) {
              customerModal.classList.add("hidden");
              customerModal.classList.remove("flex");
            }
          });
        }

        // Customer dashboard
        const customerNameDisplays = [
          document.getElementById("customer-name-display"),
          document.getElementById("mobile-customer-name-display"),
        ];

        customerNameDisplays.forEach(display => {
          if (display) {
            display.addEventListener("click", () => {
              if (currentCustomer) {
                const customerDashboard = document.getElementById("customer-dashboard");
                if (customerDashboard) {
                  customerDashboard.classList.remove("hidden");
                  customerDashboard.classList.add("flex");
                  updateCustomerDashboard();
                }
              }
            });
          }
        });

        const customerDashboardClose = document.getElementById("customer-dashboard-close");
        if (customerDashboardClose) {
          customerDashboardClose.addEventListener("click", () => {
            const customerDashboard = document.getElementById("customer-dashboard");
            if (customerDashboard) {
              customerDashboard.classList.add("hidden");
              customerDashboard.classList.remove("flex");
            }
          });
        }

        // Customer logout
        const logoutButtons = [
          document.getElementById("logout-customer-btn"),
          document.getElementById("mobile-logout-customer-btn"),
        ];

        logoutButtons.forEach(btn => {
          if (btn) {
            btn.addEventListener("click", customerLogout);
          }
        });

        // Barista access buttons
        const baristaAccessButtons = [
          document.getElementById("barista-access-btn"),
          document.getElementById("mobile-barista-access-btn"),
        ];

        baristaAccessButtons.forEach(btn => {
          if (btn) {
            btn.addEventListener("click", () => {
              const baristaModal = document.getElementById("barista-modal");
              if (baristaModal) {
                baristaModal.classList.remove("hidden");
                baristaModal.classList.add("flex");
              }
              if (isMenuOpen && mobileMenuBtn) mobileMenuBtn.click();
            });
          }
        });

        // Barista login
        const baristaLoginSubmit = document.getElementById("barista-login-submit");
        if (baristaLoginSubmit) {
          baristaLoginSubmit.addEventListener("click", () => {
            const baristaPin = document.getElementById("barista-pin");
            const baristaError = document.getElementById("barista-error");
            
            if (!baristaPin) return;

            const pin = baristaPin.value;
            if (pin === DEFAULT_BARISTA_PIN) {
              const baristaModal = document.getElementById("barista-modal");
              const baristaDashboard = document.getElementById("barista-dashboard");
              
              if (baristaModal) {
                baristaModal.classList.add("hidden");
                baristaModal.classList.remove("flex");
              }
              if (baristaDashboard) {
                baristaDashboard.classList.remove("hidden");
              }
              
              baristaPin.value = "";
              if (baristaError) baristaError.classList.add("hidden");
              
              renderBaristaCustomersTable();
              renderPendingOrders();
              renderShopOrders();
            } else {
              if (baristaError) baristaError.classList.remove("hidden");
              baristaPin.value = "";
            }
          });
        }

        // Barista modal close
        const baristaModalClose = document.getElementById("barista-modal-close");
        if (baristaModalClose) {
          baristaModalClose.addEventListener("click", () => {
            const baristaModal = document.getElementById("barista-modal");
            const baristaPin = document.getElementById("barista-pin");
            const baristaError = document.getElementById("barista-error");
            
            if (baristaModal) {
              baristaModal.classList.add("hidden");
              baristaModal.classList.remove("flex");
            }
            if (baristaPin) baristaPin.value = "";
            if (baristaError) baristaError.classList.add("hidden");
          });
        }

        // Barista logout
        const baristaLogoutBtn = document.getElementById("barista-logout-btn");
        if (baristaLogoutBtn) {
          baristaLogoutBtn.addEventListener("click", () => {
            const baristaDashboard = document.getElementById("barista-dashboard");
            const baristaCustomerDetails = document.getElementById("barista-customer-details");
            
            if (baristaDashboard) baristaDashboard.classList.add("hidden");
            if (baristaCustomerDetails) baristaCustomerDetails.classList.add("hidden");
            
            selectedBaristaCustomer = null;
          });
        }

        // Customer edit functionality
        const editCustomerBtn = document.getElementById("edit-customer-btn");
        if (editCustomerBtn) {
          editCustomerBtn.addEventListener("click", editCustomer);
        }

        // Product select change handler
        const baristaProductSelect = document.getElementById("barista-product-select");
        if (baristaProductSelect) {
          baristaProductSelect.addEventListener("change", (e) => {
            const customFields = document.getElementById("custom-product-fields");
            if (customFields) {
              if (e.target.value === "custom") {
                customFields.classList.remove("hidden");
              } else {
                customFields.classList.add("hidden");
              }
            }
          });
        }

        // Enter key support
        const enterKeyElements = [
          { input: "barista-pin", button: "barista-login-submit" },
          { input: "customer-identifier", button: "customer-login-submit" },
          { input: "search-customer", button: null, action: searchCustomer },
        ];

        enterKeyElements.forEach(({ input, button, action }) => {
          const inputEl = document.getElementById(input);
          if (inputEl) {
            inputEl.addEventListener("keypress", (e) => {
              if (e.key === "Enter") {
                if (action) {
                  action();
                } else if (button) {
                  const btnEl = document.getElementById(button);
                  if (btnEl) btnEl.click();
                }
              }
            });
          }
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
                }, index * 50);
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
                }, index * 50);
              } else {
                item.style.display = "none";
                item.classList.remove("fade-in-up");
              }
            });
          });
        });

        // Navbar scroll effect
        const navbar = document.getElementById("navbar");
        if (navbar) {
          window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
              navbar.classList.add("navbar-scrolled");
            } else {
              navbar.classList.remove("navbar-scrolled");
            }
          });
        }

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
              if (isMenuOpen && mobileMenuBtn) {
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
        document.querySelectorAll(".menu-item, .shop-item, .fade-in-up").forEach((el) => {
          observer.observe(el);
        });

        console.log('✅ تم إعداد جميع مستمعات الأحداث');
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

      // ===== Real-time Updates =====
      function setupRealTimeUpdates() {
        console.log('🔔 إعداد التحديثات الفورية...');
        
        try {
          // Subscribe to pending orders changes
          supabase
            .channel('pending_orders_channel')
            .on('postgres_changes', 
              { event: '*', schema: 'public', table: 'pending_orders' }, 
              (payload) => {
                console.log('🔄 تحديث الطلبات المعلقة:', payload);
                loadPendingOrders();
              }
            )
            .subscribe();

          // Subscribe to shop orders changes
          supabase
            .channel('shop_orders_channel')
            .on('postgres_changes', 
              { event: '*', schema: 'public', table: 'shop_orders' }, 
              (payload) => {
                console.log('🔄 تحديث طلبات المتجر:', payload);
                loadShopOrders();
              }
            )
            .subscribe();

          // Subscribe to customers changes
          supabase
            .channel('customers_channel')
            .on('postgres_changes', 
              { event: '*', schema: 'public', table: 'customers' }, 
              (payload) => {
                console.log('🔄 تحديث العملاء:', payload);
                loadCustomers();
                if (selectedBaristaCustomer) {
                  renderBaristaCustomersTable();
                }
              }
            )
            .subscribe();

          console.log('✅ تم تفعيل التحديثات الفورية');
        } catch (error) {
          console.error('❌ خطأ في إعداد التحديثات الفورية:', error);
        }
      }

      // ===== Initialization =====
      async function initializeApp() {
        try {
          console.log('🚀 بدء تهيئة التطبيق...');
          
          // Initialize data arrays
          menuItems = [...DEFAULT_MENU_ITEMS];
          shopItems = [...DEFAULT_SHOP_ITEMS];
          
          // Load data from Supabase
          await Promise.all([
            loadCustomers(),
            loadPendingOrders(), 
            loadShopOrders(),
            loadCustomProducts()
          ]);
          
          // Load cart from localStorage
          loadShoppingCart();
          
          // Render initial content
          renderMenuItems();
          renderShopItems();
          
          // Setup event listeners
          setupEventListeners();
          
          // Initialize other components
          initializeContactForm();
          initializeVideoBackground();
          
          // Render initial data for barista
          await renderBaristaCustomersTable();
          
          // Setup real-time updates
          setupRealTimeUpdates();
          
          // Add loading complete indicator
          setTimeout(() => {
            document.body.classList.add("loaded");
            showNotification('🎉 مرحباً بك في Twenty One Cafe!');
          }, 1000);
          
          console.log('✅ تم تهيئة التطبيق بنجاح');
          
        } catch (error) {
          console.error('❌ خطأ في تهيئة التطبيق:', error);
          showNotification('خطأ في بدء التطبيق: ' + error.message, 'error');
        }
      }

      // Start the app when DOM is loaded
      document.addEventListener("DOMContentLoaded", initializeApp);

      // Add load finished indicator
      window.onload = function () {
        var d = document.createElement("div");
        d.id = "aionspaceLoadFinished";
        document.body.appendChild(d);
      };