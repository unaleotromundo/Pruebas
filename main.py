import streamlit as st

st.set_page_config(
    page_title="🎯 Plan de Mejoras - Feria Virtual",
    page_icon="🚀",
    layout="wide"
)

st.markdown("""
<style>
    .improvement-card {
        background-color: white;
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }
    .priority-critica {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
        padding: 0.1rem 0.6rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: bold;
    }
    .priority-alta {
        background-color: #ffedd5;
        color: #c2410c;
        border: 1px solid #fed7aa;
        padding: 0.1rem 0.6rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: bold;
    }
    .priority-media {
        background-color: #fef9c3;
        color: #854d0e;
        border: 1px solid #fde047;
        padding: 0.1rem 0.6rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: bold;
    }
    .priority-baja {
        background-color: #dbeafe;
        color: #1d4ed8;
        border: 1px solid #93c5fd;
        padding: 0.1rem 0.6rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: bold;
    }
    .quick-wins {
        background: linear-gradient(to right, #10b981, #059669);
        border-radius: 16px;
        padding: 1.5rem;
        color: white;
        margin-top: 2rem;
    }
</style>
""", unsafe_allow_html=True)

st.title("🎯 Plan de Mejoras - Feria Virtual")
st.markdown("Recomendaciones priorizadas para hacer tu plataforma más profesional y práctica")

improvements = {
    "ux": [
        {
            "priority": "Alta",
            "title": "Onboarding para nuevos usuarios",
            "description": "Tour guiado para comerciantes que se registran por primera vez",
            "icon": "👥",
            "code": r"""// Agregar en initializeApp()
if (isFirstVisit) {
  showOnboardingTour();
}

function showOnboardingTour() {
  const steps = [
    { element: '#register', title: '¡Bienvenido!', text: 'Registra tu puesto aquí' },
    { element: '#products', title: 'Explora', text: 'Descubre productos locales' },
    { element: '#cartIcon', title: 'Carrito', text: 'Guarda productos para contactar' }
  ];
  // Implementar con una librería como Intro.js o Driver.js
}"""
        },
        {
            "priority": "Alta",
            "title": "Vista previa antes de publicar productos",
            "description": "Mostrar cómo se verá el producto antes de guardarlo",
            "icon": "👁️",
            "code": r"""// En el modal de producto
<button onclick="previewProduct()">
  <i class="fas fa-eye"></i> Vista Previa
</button>

function previewProduct() {
  const tempProduct = {
    name: document.getElementById('productName').value,
    price: document.getElementById('productPrice').value,
    // ... resto de datos
  };
  // Renderizar en un modal temporal
}"""
        },
        {
            "priority": "Media",
            "title": "Confirmación visual al agregar al carrito",
            "description": "Toast mejorado con imagen del producto",
            "icon": "🛒",
            "code": r"""function showCartToast(product) {
  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.innerHTML = `
    <img src="${product.imageUrl}" alt="">
    <div>
      <strong>${product.name}</strong>
      <p>Agregado al carrito</p>
    </div>
    <button onclick="toggleCart()">Ver carrito</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
}"""
        },
        {
            "priority": "Media",
            "title": "Favoritos/Lista de deseos",
            "description": "Permitir guardar productos sin agregarlos al carrito",
            "icon": "❤️",
            "code": r"""// Agregar botón de favorito en cada producto
<button class="btn-favorite" onclick="toggleFavorite('${product.id}')">
  <i class="fas fa-heart"></i>
</button>

// Sistema de favoritos con localStorage
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFavorite(productId) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteUI();
}"""
        }
    ],
    "features": [
        {
            "priority": "Alta",
            "title": "Sistema de valoraciones y reseñas",
            "description": "Permitir a los usuarios calificar productos y vendedores",
            "icon": "⭐",
            "code": r"""// Nueva tabla en Supabase: product_reviews
{
  id: uuid,
  product_id: uuid,
  user_email: text,
  rating: integer (1-5),
  comment: text,
  created_at: timestamp
}

// Mostrar estrellas en productos
<div class="product-rating">
  <span class="stars">★★★★☆</span>
  <span class="rating-count">(24 reseñas)</span>
</div>"""
        },
        {
            "priority": "Alta",
            "title": "Notificaciones push (opcional)",
            "description": "Alertar sobre nuevos productos de vendedores favoritos",
            "icon": "🔔",
            "code": r"""// Pedir permiso para notificaciones
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      // Guardar token de notificación
      subscribeToVendor(vendorId);
    }
  });
}"""
        },
        {
            "priority": "Media",
            "title": "Compartir productos en redes sociales",
            "description": "Botones para compartir en WhatsApp, Facebook, Twitter",
            "icon": "📤",
            "code": r"""function shareProduct(product) {
  const url = window.location.origin + '?product=' + product.id;
  const text = `Mira este producto: ${product.name} por $${product.price}`;
  
  // WhatsApp
  window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
  
  // Web Share API (móviles)
  if (navigator.share) {
    navigator.share({ title: product.name, text, url });
  }
}"""
        },
        {
            "priority": "Media",
            "title": "Chat en vivo (Chatbot mejorado)",
            "description": "Asistente para ayudar a encontrar productos",
            "icon": "💬",
            "code": r"""// Ya tienes Botpress, mejorar las respuestas:
// 1. Buscar productos por texto
// 2. Recomendar categorías
// 3. Ayuda con el registro
// 4. FAQs automatizadas"""
        },
        {
            "priority": "Baja",
            "title": "Historial de pedidos",
            "description": "Guardar qué productos contactó cada usuario",
            "icon": "📦",
            "code": r"""// Nueva tabla: order_history
{
  id: uuid,
  user_email: text,
  vendor_id: uuid,
  products: jsonb,
  contacted_at: timestamp
}

// Guardar cuando se contacta por WhatsApp
function saveOrderHistory(vendorId, items) {
  supabase.from('order_history').insert({
    user_email: currentUser?.email || 'anonymous',
    vendor_id: vendorId,
    products: items,
    contacted_at: new Date().toISOString()
  });
}"""
        }
    ],
    "performance": [
        {
            "priority": "Alta",
            "title": "Lazy loading de imágenes",
            "description": "Cargar imágenes solo cuando sean visibles",
            "icon": "📈",
            "code": r"""// Ya tienes loading="lazy" en algunas imágenes, aplicarlo a TODAS

// Además, agregar Intersection Observer para productos
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('.product-image[data-src]').forEach(img => {
  observer.observe(img);
});"""
        },
        {
            "priority": "Alta",
            "title": "Caché de productos",
            "description": "No recargar productos si ya están en memoria",
            "icon": "📥",
            "code": r"""// Ya tienes dataCache, pero no lo usas efectivamente
async function loadProducts(containerId = 'productsGrid', filter = {}) {
  const cacheKey = JSON.stringify(filter);
  const cached = dataCache.products[cacheKey];
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('📦 Usando productos en caché');
    renderProducts(cached.data);
    return;
  }
  
  // Cargar de Supabase solo si no hay caché válido
  const { data } = await supabase.from('products').select('*');
  dataCache.products[cacheKey] = { data, timestamp: Date.now() };
  renderProducts(data);
}"""
        },
        {
            "priority": "Media",
            "title": "Paginación de productos",
            "description": "Cargar productos de 20 en 20 en lugar de todos",
            "icon": "🔍",
            "code": r"""let currentPage = 1;
const PRODUCTS_PER_PAGE = 20;

async function loadProducts(page = 1) {
  const from = (page - 1) * PRODUCTS_PER_PAGE;
  const to = from + PRODUCTS_PER_PAGE - 1;
  
  const { data, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .range(from, to);
  
  renderProducts(data);
  renderPagination(count);
}

// Botones de paginación
function renderPagination(totalCount) {
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  // Crear botones 1, 2, 3... Anterior, Siguiente
}"""
        },
        {
            "priority": "Media",
            "title": "Service Worker para modo offline",
            "description": "Funcionar sin internet (mostrar productos en caché)",
            "icon": "📤",
            "code": r"""// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('feria-v1').then(cache => {
      return cache.addAll([
        '/',
        '/style.css',
        '/script.js',
        '/products.js',
        '/cart.js',
        '/catalog.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Registrar en index.html
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}"""
        }
    ],
    "security": [
        {
            "priority": "Crítica",
            "title": "Validación de inputs",
            "description": "Sanitizar todos los datos del usuario",
            "icon": "⚠️",
            "code": r"""// Crear función de sanitización
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Aplicar en todos los formularios
const productName = sanitizeInput(document.getElementById('productName').value);

// Validar precios
function validatePrice(price) {
  const num = parseFloat(price);
  if (isNaN(num) || num < 0) {
    throw new Error('Precio inválido');
  }
  return num;
}"""
        },
        {
            "priority": "Alta",
            "title": "Rate limiting",
            "description": "Limitar peticiones a Supabase para evitar abusos",
            "icon": "⚠️",
            "code": r"""// Implementar throttle/debounce
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Aplicar en búsqueda
const debouncedSearch = debounce(filterProducts, 300);
document.getElementById('productSearchInput').oninput = debouncedSearch;"""
        },
        {
            "priority": "Media",
            "title": "Verificación de email",
            "description": "Confirmar email antes de permitir publicar",
            "icon": "⚠️",
            "code": r"""// Supabase ya tiene esto con confirmEmail: true
// Mostrar mensaje si no está verificado
if (!currentUser.email_verified) {
  showToast('Por favor verifica tu email para publicar productos', 'warning');
  // Bloquear botón de nuevo producto
}"""
        }
    ]
}

def get_priority_badge(priority):
    colors = {
        "Crítica": "priority-critica",
        "Alta": "priority-alta",
        "Media": "priority-media",
        "Baja": "priority-baja"
    }
    cls = colors.get(priority, "priority-media")
    return f'<span class="{cls}">{priority}</span>'

tab_ux, tab_features, tab_perf, tab_sec = st.tabs(["👥 UX/UI", "📦 Funcionalidades", "📈 Rendimiento", "⚠️ Seguridad"])

for tab_key, tab_obj, category in zip(
    ["ux", "features", "performance", "security"],
    [tab_ux, tab_features, tab_perf, tab_sec],
    ["ux", "features", "performance", "security"]
):
    with tab_obj:
        for item in improvements[category]:
            badge = get_priority_badge(item["priority"])
            st.markdown(f"""
            <div class="improvement-card">
                <h3>{item['icon']} {item['title']} {badge}</h3>
                <p>{item['description']}</p>
            </div>
            """, unsafe_allow_html=True)
            with st.expander("Ver código de ejemplo"):
                st.code(item["code"], language="javascript")

st.markdown("""
<div class="quick-wins">
    <h2>✅ Quick Wins - Implementa Hoy</h2>
    <ul>
        <li>✅ Corregir encoding UTF-8 en todos los archivos (reemplaza "Ã" por caracteres correctos)</li>
        <li>✅ Agregar loading="lazy" a TODAS las imágenes de productos</li>
        <li>✅ Implementar debounce en el buscador para reducir queries</li>
        <li>✅ Agregar meta tags Open Graph para compartir en redes sociales</li>
        <li>✅ Crear página de "Cómo funciona" para nuevos usuarios</li>
    </ul>
</div>
""", unsafe_allow_html=True)